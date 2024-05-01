import { alphaPos, nextLetter } from "@/lib/utils";
import { AllBrands, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getBrands(
	retailer: string,
	startIndex: string,
	endIndex: string
) {
	let brands: AllBrands[] = [];
	let zBrands: AllBrands[] = [];

	if (endIndex === "Z") {
		endIndex = "*";
	} else if (endIndex === "*") {
		brands = await prisma.allBrands.findMany({
			where: { retailer_id: retailer },
		});

		return brands;
	}

	const indexOrder = [alphaPos(startIndex), alphaPos(endIndex)];
	const startIndexPos = Math.min(...indexOrder);
	const endIndexPos = Math.max(...indexOrder);

	startIndex = String.fromCharCode(64 + startIndexPos);
	endIndex = String.fromCharCode(65 + endIndexPos);

	if (startIndex === endIndex) {
		brands = await prisma.allBrands.findMany({
			where: {
				AND: [
					{ retailer_id: retailer },
					{
						brand_name: {
							startsWith: startIndex,
							mode: "insensitive",
						},
					},
				],
			},
		});
	} else {
		brands = await prisma.allBrands.findMany({
			where: {
				AND: [
					{ retailer_id: retailer },
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

	return [...brands, ...zBrands];
}
