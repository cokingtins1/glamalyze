import { getAllSephoraProducts } from "@/app/actions/getAllSephoraProducts";
import { getAllUltaProducts } from "@/app/actions/getAllUltaProducts";
import { getBrands } from "@/app/libs/DashboardFunctions/getBrands";
import { scrapeSchema } from "@/app/libs/types";
import {
	AllProducts,
	PrismaClient,
	ScrapeLog,
	SephoraBrand,
	UltaBrand,
} from "@prisma/client";
import { NextResponse } from "next/server";
import { number } from "zod";

const prisma = new PrismaClient();

export async function POST(req: Request) {
	const start = new Date().getTime();
	let end: number = new Date().getTime();
	const body = await req.json();

	const result = scrapeSchema.safeParse(body);
	let zodErrors = {};

	if (!result.success) {
		result.error.issues.forEach((issue) => {
			zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
		});
	}

	if (result.success === false) {
		return NextResponse.json(
			Object.keys(zodErrors).length > 0
				? { errors: zodErrors }
				: { success: { data: "data..." } }
		);
	}
	const { retailer, target, startIndex, endIndex } = result.data;

	console.log(result.data);

	let scrapeIndex = "";

	if (target === "products") {
		const brands = await getBrands(retailer, startIndex, endIndex);
		console.dir(
			brands.map((b) => b.brand_name),
			{ maxArrayLength: null }
		);

		if (brands.length === 0) {
			end = new Date().getTime();

			return NextResponse.json({
				message: {
					executionTime: `${(end - start) / 1000}`,
					scrapeIndex: scrapeIndex,
				},
			});
		}

		await runProductScraper(brands, retailer);
	}

	async function runProductScraper(
		brands: UltaBrand[] | SephoraBrand[],
		retailer: string
	) {
		const numBrands = brands.length;

		let count = 0;
		let data: AllProducts[] = [];
		while (count < numBrands) {
			const url = brands[count].brand_page_link;
			console.log(
				"current index:",
				`${count} of ${numBrands}`,
				"brand name:",
				brands[count].brand_name
			);

			if (retailer === "ulta") {
				data = await getAllUltaProducts(url);
			} else if (retailer === "sephora") {
				data = await getAllSephoraProducts(url);
			}

			if (data) {
                console.log(data.map(p => p.created_at))
                console.log(data.map(p => p.updated_at))
				const results = await validateResult(
					data,
					url,
					brands[count].brand_name,
					count,
					numBrands
				);
				if (results.length > 0) {
					await prisma.allProducts.createMany({ data: results });
				}
			}
			count++;
		}

		scrapeIndex = `${brands[0].brand_name} to
			${brands[brands.length - 1].brand_name}`;

		console.log("scrape index", scrapeIndex);
		await prisma.scrapeLog.create({
			data: {
				scrape_id: crypto.randomUUID(),
				scrape_date: new Date(),
				retailer: retailer,
				target: target,
				scrapeRange: [
					`${brands[0].brand_name}`,
					`${brands[brands.length - 1].brand_name}`,
				],
				failedOn: null,
			},
		});
	}

	async function validateResult(
		data: AllProducts[],
		url: string | null,
		brandIndex: string | null,
		index: number,
		scrapeLength: number
	) {
		const nullArray = data.filter(
			(product) =>
				product.product_name == null || product.brand_name == null
		);

		if (nullArray.length > 0) {
			const scrapeLogEntries: ScrapeLog[] = nullArray.map((p) => {
				return {
					scrape_id: crypto.randomUUID(),
					scrape_date: new Date(),
					retailer: p.retailer_id,
					target: target,
					scrapeRange: [`${index} / ${scrapeLength}`],
					failedOn: `${brandIndex}: ${url} `,
				};
			});

			await prisma.scrapeLog.createMany({ data: scrapeLogEntries });
		}

		const filteredArray = data.filter(
			(product) =>
				product.product_name !== null || product.brand_name !== null
		);

		return filteredArray;
	}

	end = new Date().getTime();

	return NextResponse.json({
		message: {
			executionTime: `${(end - start) / 1000}`,
			scrapeIndex: scrapeIndex,
		},
	});
}
