import { checkBrandExists } from "@/app/actions/checkBrandExists";
import { alphaPos } from "@/app/libs/utils";
import { AllBrands, PrismaClient } from "@prisma/client";
import { TScrapeSchema } from "../types";
import { prisma } from '@/prisma/_base';

export async function getBrands(input: TScrapeSchema) {
	let { retailer, target, startIndex, endIndex, url } = input;

	let brands: AllBrands[] = [];
	let zBrands: AllBrands[] = [];

	if (url) {
		const brand = await prisma.allBrands.findFirst({
			where: {
				OR: [
					{ ulta_page_link: { contains: url } },
					{ sephora_page_link: { contains: url } },
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
			} = await checkBrandExists(url, retailer);

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
