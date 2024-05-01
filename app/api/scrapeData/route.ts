import { getAllSephoraProducts } from "@/app/actions/getAllSephoraProducts";
import { getAllUltaProducts } from "@/app/actions/getAllUltaProducts";
import { getBrands } from "@/app/libs/DashboardFunctions/getBrands";
import { scrapeSchema } from "@/app/libs/types";
import {
	AllBrands,
	AllProducts,
	PrismaClient,
	ScrapeLog,
} from "@prisma/client";
import { NextResponse } from "next/server";

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
	const { retailer, target, startIndex, endIndex, brandUrl } = result.data;

	console.log(result.data);

	let scrapeIndex = "";

	if (target === "products") {
		let brands: AllBrands[] = [];
		if (brandUrl) {
			
		} else {
			brands = await getBrands(retailer, startIndex, endIndex);
		}
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

		// await runProductScraper(brands, retailer);
	}

	async function runProductScraper(brands: AllBrands[], retailer: string) {
		const numBrands = brands.length;

		let count = 0;
		let data: AllProducts[] = [];
		while (count < numBrands) {
			const url = brands[count].brand_page_link;
			const brandId = brands[count].brand_id;
			console.log(
				"current index:",
				`${count} of ${numBrands}`,
				"brand name:",
				brands[count].brand_name
			);

			if (retailer === "Ulta") {
				data = await getAllUltaProducts(url, brandId);
			} else if (retailer === "Sephora") {
				data = await getAllSephoraProducts(url, brandId);
			}

			if (data) {
				const { productsToInsert, productsToUpdate } =
					await validateResult(
						data,
						brandId,
						url,
						brands[count].brand_name,
						count,
						numBrands
					);
				if (productsToInsert.length > 0) {
					await prisma.allProducts.createMany({
						data: productsToInsert,
					});
				}
				if (productsToUpdate.length > 0) {
					for (const product of productsToUpdate) {
						const {
							sku_id,
							product_id,
							created_at,
							...updateData
						} = product;
						await prisma.allProducts.update({
							where: { product_id: product.product_id },
							data: updateData,
						});
					}
				}
			}
			count++;
		}

		scrapeIndex = `${brands[0].brand_name} to
			${brands[brands.length - 1].brand_name}`;

		end = new Date().getTime();

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
				executionTime: (end - start) / 1000,
			},
		});
	}

	async function validateResult(
		data: AllProducts[],
		brandId: string,
		url: string | null,
		brandIndex: string | null,
		index: number,
		scrapeLength: number
	) {
		// const nullArray = data.filter(
		// 	(product) =>
		// 		product.product_name == null || product.brand_name == null
		// );

		// if (nullArray.length > 0) {
		// 	end = new Date().getTime();

		// 	const scrapeLogEntries: ScrapeLog[] = nullArray.map((p) => {
		// 		return {
		// 			scrape_id: crypto.randomUUID(),
		// 			scrape_date: new Date(),
		// 			retailer: p.retailer_id,
		// 			target: target,
		// 			scrapeRange: [`${index} / ${scrapeLength}`],
		// 			failedOn: `${brandIndex}: ${url} `,
		// 			executionTime: (end - start) / 1000,
		// 		};
		// 	});

		// 	await prisma.scrapeLog.createMany({ data: scrapeLogEntries });
		// }

		// check if sku exists on retailer -> upsert

		// gets list of products with sku ids...
		// for each product, check if sku id exists in AllProducts

		const filteredArray = data.filter(
			(product) =>
				product.product_name !== null || product.brand_name !== null
		);

		const brandSkus = await prisma.allProducts.findMany({
			where: { brand_id: brandId },
			select: { sku_id: true },
		});

		const existingSkus = brandSkus.map((p) => p.sku_id);

		const productsToUpdate = filteredArray.filter((p) =>
			existingSkus.includes(p.sku_id)
		);

		const productsToInsert = filteredArray.filter(
			(p) => !existingSkus.includes(p.sku_id)
		);

		return { productsToInsert, productsToUpdate };
	}

	end = new Date().getTime();

	return NextResponse.json({
		message: {
			executionTime: `${(end - start) / 1000}`,
			scrapeIndex: scrapeIndex,
		},
	});
}
