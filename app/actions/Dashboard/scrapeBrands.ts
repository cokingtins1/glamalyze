"use server";

import { FieldValues } from "react-hook-form";
import { getAllUltaBrands } from "@/app/actions/getAllUltaBrands";
import { getAllSephoraBrands } from "@/app/actions/getAllSephoraBrands";
import { PrismaClient, SephoraBrand, UltaBrand } from "@prisma/client";

const prisma = new PrismaClient();
export async function scrapeBrands(formData: FieldValues) {
	console.log(formData);

	let data: UltaBrand[] | SephoraBrand[] = [];
	if (formData.ulta) {
		// data = await getAllUltaBrands();
	} else if (formData.sephora) {
		// data = await getAllSephoraBrands();
	}

	if (formData.ulta && data.length > 0) {
		// await prisma.ultaBrand.createMany({ data: data });
		// await prisma.ultaBrand.update({
		// 	where: { brand_id: "a28265e1-4577-44a8-b0d7-fb40beda804e" },
		// 	data: { brand_name: "TEST" },
		// });
	}

	return new Promise(function (resolve) {
		setTimeout(resolve, 2000);
	});
}
