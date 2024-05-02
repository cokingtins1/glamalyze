import { checkBrandExists } from "@/app/actions/checkBrandExists";
import { scrapeBrands } from "@/app/actions/Dashboard/scrapeBrands";
import { getAllUltaProducts } from "@/app/actions/getAllUltaProducts";
import { alphaPos, nextLetter } from "@/lib/utils";
import { AllBrands, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getBrands(
	retailer: string,
	startIndex: string,
	endIndex: string,
	brandUrl: string
) {
	let brands: AllBrands[] = [];
	let zBrands: AllBrands[] = [];

	if (brandUrl) {
		const brand = await prisma.allBrands.findFirst({
			where: {
				AND: [
					{ brand_page_link: { contains: brandUrl } },
					{ retailer_id: retailer },
				],
			},
		});

		if (brand) {
			console.log("brand exists in DB");
			return [brand];
		} else {
			const {
				exists: brandPageExists,
				brandName,
				pageUrl,
			} = await checkBrandExists(brandUrl, retailer);

			console.log("brandName:", brandName);

			if (!brandPageExists) return [];

			const newBrand = await prisma.allBrands.create({
				data: {
					brand_id: crypto.randomUUID(),
					brand_name: brandName,
					brand_page_link: pageUrl,
					created_at: new Date(),
					updated_at: new Date(),
					retailer_id: retailer,
				},
				select: {
					brand_id: true,
					brand_name: true,
					brand_page_link: true,
					created_at: true,
					updated_at: true,
					retailer_id: true,
				},
			});
			return [newBrand];
		}
	}

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
	const result = [...brands, ...zBrands];

	return result;
}
