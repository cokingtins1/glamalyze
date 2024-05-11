import { checkBrandExists } from "@/app/actions/checkBrandExists";
import { alphaPos } from "@/lib/utils";
import { AllBrands, PrismaClient } from "@prisma/client";
import { TScrapeSchema } from "../types";

const prisma = new PrismaClient();

export async function getBrands(input: TScrapeSchema) {
	let { retailer, target, startIndex, endIndex, brandUrl } = input;

	let brands: AllBrands[] = [];
	let zBrands: AllBrands[] = [];

	if (brandUrl) {
		const brand = await prisma.allBrands.findFirst({
			where: {
				OR: [
					{ ulta_page_link: { contains: brandUrl } },
					{ sephora_page_link: { contains: brandUrl } },
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
					ulta_page_link: retailer === "Ulta" ? pageUrl : null,
					sephora_page_link: retailer === "Sephora" ? pageUrl : null,
					created_at: new Date(),
					updated_at: new Date(),
				},
				select: {
					brand_id: true,
					brand_name: true,
					ulta_page_link: true,
					sephora_page_link: true,
					created_at: true,
					updated_at: true,
				},
			});
			return [newBrand];
		}
	}

	if (endIndex === "Z") {
		endIndex = "*";
	} else if (endIndex === "*") {
		brands = await prisma.allBrands.findMany({
			where: {
				OR: [
					{ ulta_page_link: { contains: retailer } },
					{ sephora_page_link: { contains: retailer } },
				],
			},
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
				brand_name: {
					startsWith: startIndex,
					mode: "insensitive",
				},
			},
		});
	} else {
		brands = await prisma.allBrands.findMany({
			where: {
				brand_name: {
					gte: startIndex,
					lte: endIndex,
					mode: "insensitive",
				},
			},
		});
	}
	const result = [...brands, ...zBrands];

	return result;
}
