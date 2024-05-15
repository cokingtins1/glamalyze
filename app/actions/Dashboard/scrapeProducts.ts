"use server";

import { FieldValues } from "react-hook-form";
import { AllProducts, PrismaClient } from "@prisma/client";
import { getAllUltaProducts } from "../getAllUltaProducts";
import { getAllSephoraProducts } from "../getAllSephoraProducts";

const prisma = new PrismaClient();
export async function scrapeProducts(formData: FieldValues) {
	const ultaBrands = await prisma.ultaBrand.findMany();
	const sephoraBrands = await prisma.sephoraBrand.findMany();

	const allBrands = [...ultaBrands, ...sephoraBrands];

	async function runScrapeLoop(){

	}

	let data: AllProducts[] = [];
	// if (formData.ulta) {
	// 	data = await getAllUltaProducts("");
	// } else if (formData.sephora) {
	// 	data = await getAllSephoraProducts("");
	// }

	if (formData.ulta && data.length > 0) {
		await prisma.ultaBrand.createMany({ data: data });
		// await prisma.ultaBrand.update({
		// 	where: { brand_id: "a28265e1-4577-44a8-b0d7-fb40beda804e" },
		// 	data: { brand_name: "TEST" },
		// });
	}

	return new Promise(function (resolve) {
		setTimeout(resolve, 2000);
	});
}
