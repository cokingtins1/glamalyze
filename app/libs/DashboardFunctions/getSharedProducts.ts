import { PrismaClient, SharedProduct } from "@prisma/client";
import { SharedLinks, TScrapeSchema } from "../types";
import { alphaPos } from "@/lib/utils";

const prisma = new PrismaClient();

export async function getSharedProducts(
	input: TScrapeSchema
): Promise<SharedLinks[]> {
	let { retailer, target, startIndex, endIndex, url } = input;

	let products: SharedProduct[] = [];
	let allLinks: SharedLinks[] = [];

	const indexOrder = [alphaPos(startIndex), alphaPos(endIndex)];
	const startIndexPos = Math.min(...indexOrder);
	const endIndexPos = Math.max(...indexOrder);

	startIndex = String.fromCharCode(64 + startIndexPos);
	endIndex = String.fromCharCode(65 + endIndexPos);

	if (url) {
		const specificProduct = await prisma.sharedProduct.findFirst({
			where: {
				OR: [
					{ ulta_page_link: { contains: url } },
					{ sephora_page_link: { contains: url } },
				],
			},
		});
		console.log("specific Produce",specificProduct)

		if (specificProduct) {
			products.push(specificProduct);
		}
	} else if (startIndex === endIndex && !url) {
		products = await prisma.sharedProduct.findMany({
			where: {
				ulta_product_name: {
					startsWith: startIndex,
					mode: "insensitive",
				},
			},
		});
	} else if (startIndex !== endIndex && !url) {
		products = await prisma.sharedProduct.findMany({
			where: {
				ulta_product_name: {
					gte: startIndex,
					lte: endIndex,
					mode: "insensitive",
				},
			},
		});
	}

	products.forEach((p) => {
		const linkObj: SharedLinks = {
			id: [],
			page_link: [],
			name: [],
			total_reviews: [],
		};

		if (p.ulta_page_link !== null) {
			linkObj.id.push(p.ulta_product_id);
			linkObj.page_link.push(p.ulta_page_link);
			linkObj.name.push(p.ulta_product_name);
			linkObj.total_reviews.push(p.ulta_total_reviews);
		}
		if (p.sephora_page_link !== null) {
			linkObj.id.push(p.sephora_product_id);
			linkObj.page_link.push(p.sephora_page_link);
			linkObj.name.push(p.sephora_product_name);
			linkObj.total_reviews.push(p.sephora_total_reviews);
		}

		allLinks.push(linkObj);
	});

	return allLinks;
}
