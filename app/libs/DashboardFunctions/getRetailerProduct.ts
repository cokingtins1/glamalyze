import { AllProduct } from "@prisma/client";
import { SharedLinks, TScrapeSchema } from "../types";
import { alphaPos } from "@/app/libs/utils";
import { prisma } from "@/prisma/_base";

export async function getRetailerProduct(
	input: TScrapeSchema
): Promise<SharedLinks[]> {
	let { retailer, target, startIndex, endIndex, url } = input;

	let products: AllProduct[] = [];

	const indexOrder = [alphaPos(startIndex), alphaPos(endIndex)];
	const startIndexPos = Math.min(...indexOrder);
	const endIndexPos = Math.max(...indexOrder);

	if (startIndex === "#" || endIndex === "#") {
		const special = [
			"#",
			"(",
			"+",
			"0",
			"1",
			"2",
			"3",
			"5",
			"6",
			"7",
			'"',
			"'",
		];
		products = await prisma.allProduct.findMany({
			where: {
				AND: [
					{
						OR: special.map((char) => ({
							product_name: {
								startsWith: char,
								mode: "insensitive",
							},
						})),
					},
					{ product_price: null },
					{ scraped: false },
				],
			},
		});

		return trimData(products);
	}

	startIndex = String.fromCharCode(64 + startIndexPos);
	endIndex = String.fromCharCode(65 + endIndexPos);

	if (url) {
		const specificProduct = await prisma.allProduct.findFirst({
			where: { page_link: { contains: url } },
		});

		if (specificProduct) {
			products.push(specificProduct);
		}
	} else if (startIndex === endIndex && !url) {
		products = await prisma.allProduct.findMany({
			where: {
				AND: [
					{
						product_name: {
							startsWith: startIndex,
							mode: "insensitive",
						},
					},
					{ product_price: null },
					{ scraped: false },
				],
			},
		});
	} else if (startIndex !== endIndex && !url) {
		products = await prisma.allProduct.findMany({
			where: {
				AND: [
					{
						product_name: {
							gte: startIndex,
							lte: endIndex,
							mode: "insensitive",
						},
					},
					{ product_price: null },
					{ scraped: false },
				],
			},
		});
	}

	function trimData(data: AllProduct[]) {
		const trimmedData: SharedLinks[] = data.map((p) => {
			const linkObj: SharedLinks = {
				id: [],
				page_link: [],
				name: [],
				total_reviews: [],
				sharedId: [],
			};

			if (p.page_link !== null && p.retailer_id === "Ulta") {
				linkObj.id.push(p.product_id, "");
				linkObj.sharedId.push(p.product_id);
				linkObj.page_link.push(p.page_link);
				linkObj.name.push(p.product_name ?? "", "");
				linkObj.total_reviews.push(p.total_reviews ?? 0, 0);
			}
			if (p.page_link !== null && p.retailer_id === "Sephora") {
				linkObj.id.push("", p.product_id);
				linkObj.sharedId.push(p.product_id);
				linkObj.page_link.push("", p.page_link);
				linkObj.name.push("", p.product_name ?? "");
				linkObj.total_reviews.push(0, p.total_reviews ?? 0);
			}
			return linkObj;
		});

		return trimmedData;
	}

	return trimData(products);
}
