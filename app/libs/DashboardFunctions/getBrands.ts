import { alphaPos, nextLetter } from "@/lib/utils";
import { PrismaClient, SephoraBrand, UltaBrand } from "@prisma/client";

const prisma = new PrismaClient();

export async function getBrands(
	retailer: string,
	startIndex: string,
	endIndex: string
) {
	let brands: UltaBrand[] | SephoraBrand[] = [];
	let zBrands: UltaBrand[] | SephoraBrand[] = [];

	if (endIndex === "Z") {
		endIndex = "*";
	} else if (endIndex === "*") {
		if (retailer === "ulta") {
			brands = await prisma.ultaBrand.findMany({});
		} else if (retailer === "sephora") {
			brands = await prisma.sephoraBrand.findMany({});
		}
		return brands;
	}

	const indexOrder = [alphaPos(startIndex), alphaPos(endIndex)];
	const startIndexPos = Math.min(...indexOrder);
	const endIndexPos = Math.max(...indexOrder);


	startIndex = String.fromCharCode(64 + startIndexPos);
	endIndex = String.fromCharCode(65 + endIndexPos);

	if (retailer === "ulta") {
		if (startIndex === endIndex) {
			brands = await prisma.ultaBrand.findMany({
				where: {
					brand_name: {
						startsWith: startIndex,
						mode: "insensitive",
					},
				},
			});
		} else {
			brands = await prisma.ultaBrand.findMany({
				where: {
					AND: [
						{
							brand_name: {
								gte: startIndex,
								lte: endIndex,
								mode: "insensitive",
							},
						},
					],
				},
			});
		}
	} else if (retailer === "sephora") {
		if (startIndex === endIndex) {
			brands = await prisma.sephoraBrand.findMany({
				where: {
					brand_name: {
						startsWith: startIndex,
						mode: "insensitive",
					},
				},
			});
		} else {
			brands = await prisma.sephoraBrand.findMany({
				where: {
					AND: [
						{
							brand_name: {
								gte: startIndex,
								lte: endIndex,
								mode: "insensitive",
							},
						},
					],
				},
			});
		}
	}
	return [...brands, ...zBrands];
}
