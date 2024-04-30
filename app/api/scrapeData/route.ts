import { getAllUltaProducts } from "@/app/actions/getAllUltaProducts";
import { scrapeSchema, TScrapeSchema } from "@/app/libs/types";
import {
	AllProducts,
	PrismaClient,
	SephoraBrand,
	UltaBrand,
} from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
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

	let brands: UltaBrand[] | SephoraBrand[] = [];
	if (retailer === "ulta") {
		brands = await prisma.ultaBrand.findMany();
	} else if (retailer === "sephora") {
		brands = await prisma.sephoraBrand.findMany();
	}

	async function runProductScraper(
		brands: UltaBrand[] | SephoraBrand[],
		retailer: "ulta" | "sephora"
	) {
		const numBrands = endIndex || brands.length;

		let count = startIndex || 0;
		let data: AllProducts[];
		while (count < numBrands) {
			if (retailer === "ulta") {
				var url = brands[count].brand_page_link;
				data = await getAllUltaProducts(url);
				await validateResult(data, url);
			}
			count++;
		}
	}

	async function validateResult(data: AllProducts[], url: string | null) {
		//remove null values -> store them in status object of scrapeLog

		let nullValues: string[];

		//insert non null values into respective table
	}

	console.log(retailer);

	return NextResponse.json({ success: { data: "data..." } });
}
