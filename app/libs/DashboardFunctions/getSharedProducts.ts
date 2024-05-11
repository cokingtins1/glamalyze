import { PrismaClient, SharedProduct } from "@prisma/client";
import { AllProducts, TScrapeSchema } from "../types";
import { alphaPos } from "@/lib/utils";

const prisma = new PrismaClient();

export async function getSharedProducts(
	input: TScrapeSchema
): Promise<SharedProduct[]> {
	let { retailer, target, startIndex, endIndex, brandUrl } = input;

	let products: SharedProduct[] = [];

	const indexOrder = [alphaPos(startIndex), alphaPos(endIndex)];
	const startIndexPos = Math.min(...indexOrder);
	const endIndexPos = Math.max(...indexOrder);

	startIndex = String.fromCharCode(64 + startIndexPos);
	endIndex = String.fromCharCode(65 + endIndexPos);

	console.log(startIndex, endIndex);

	if (startIndex === endIndex) {
		products = await prisma.sharedProduct.findMany({
			where: {
				ulta_product_name: {
					startsWith: startIndex,
					mode: "insensitive",
				},
			},
		});
	} else {
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

	return products;
}
