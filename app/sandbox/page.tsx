import { Button } from "@/components/ui/button";
import { productSeeds } from "@/lib/seeding/seedingFuncs";
import { randomUserName } from "@/lib/utils";
import { AllProducts, PrismaClient, Review } from "@prisma/client";
import { randomInt } from "crypto";
import dayjs from "dayjs";
import { generate } from "random-words";
import React from "react";
import { getAllSephoraProducts } from "../actions/getAllSephoraProducts";
import elements from "@/app/libs/JSON/elemets.json";
import { AllProductsSelectors } from "../libs/types";
import { getAllUltaProducts } from "../actions/getAllUltaProducts";
import { getAllUltaBrands } from "../actions/getAllUltaBrands";
import { getAllSephoraBrands } from "../actions/getAllSephoraBrands";

const prisma = new PrismaClient();

export default async function Page() {
	async function handleSubmit() {
		"use server";

		const start = new Date().getTime();

		const url = "https://www.sephora.com/brand/augustinus-bader ";
		// const allProducts = await getAllSephoraProducts(url);
		// console.dir(allProducts, { maxArrayLength: null });

		const end = new Date().getTime();

		console.log(
			`Execution time in route.ts: ${(end - start) / 1000} seconds`
		);

		// console.dir(allProducts, { maxArrayLength: null });

		// const uniqueSkuIds: { [key: string]: boolean } = {};
		// const uniqueResults = allProducts.filter((product) => {
		// 	if (product.sku_id !== null && product.sku_id !== undefined) {
		// 		if (!uniqueSkuIds[product.sku_id]) {
		// 			uniqueSkuIds[product.sku_id] = true;
		// 			return true;
		// 		}
		// 	}

		// 	return false;
		// });

		// console.dir(uniqueResults, { maxArrayLength: null });
		// console.dir("unique results length", uniqueResults.length);

		// console.log("productData:", allProducts);
		// console.log("Length:", allProducts.length);

		// console.log(
		// 	"Filtered Products",
		// 	allProducts.map((item) => item.product_name)
		// );

		function log(data: AllProducts[]) {
			const productNames = data.map((item) => item.brand_name);
			const uniqueArray = productNames.filter((value, index, self) => {
				return self.indexOf(value) === index;
			});

			console.log("unique length:", uniqueArray.length);
			// console.dir(uniqueArray, { maxArrayLength: null });
		}

		// const alpha = await prisma.allProducts.findMany({
		// 	where: {
		// 		AND: [
		// 			{
		// 				retailer_id: "Sephora",
		// 				brand_name: "Algenist",
		// 			},
		// 		],
		// 	},
		// });

		// const sephoraProducts = await prisma.allProducts.findMany({
		// 	where: { retailer_id: "Sephora" },
		// });

		// const sephoraBrands = await prisma.allBrands.findMany({
		// 	where: { retailer_id: "Sephora" },
		// });

		// const brandsNotFoundInProducts = sephoraBrands
		// 	.filter(
		// 		(brand) =>
		// 			!sephoraProducts.some(
		// 				(product) => product.brand_name === brand.brand_name
		// 			)
		// 	)
		// 	.map((brand) => brand.brand_name);

		// console.log("not found:", brandsNotFoundInProducts);
		// console.log("not found length:", brandsNotFoundInProducts.length);

		// let newSephora: AllProducts[] = [];
		// for (const product of sephoraProducts) {
		// 	const matchingBrand = sephoraProducts.find(
		// 		(brand) => brand.brand_name === product.brand_name
		// 	);

		// 	if (matchingBrand) {
		// 		newSephora.push({
		// 			...product,
		// 			brand_id: matchingBrand.brand_id,
		// 		});
		// 	}
		// }

		const brandId = "51048bae-6fd9-4ae2-b107-53e1ebeff9cc";
		const dummyProducts = await prisma.allProducts.findMany({
			where: { brand_id: brandId },
		});

		const brandSkus = await prisma.allProducts.findMany({
			where: { brand_id: brandId },
			select: { sku_id: true },
		});

		const existingSkus = brandSkus.map((p) => p.sku_id);

		const productsToUpdate = dummyProducts.filter((p) =>
			existingSkus.includes(p.sku_id)
		);

		const productsToInsert = dummyProducts.filter(
			(p) => !existingSkus.includes(p.sku_id)
		);

		console.log("brandSkus", productsToUpdate.map(p => p.product_id));
		console.log("update", productsToUpdate.length);
		console.log("existing", dummyProducts.length);

		// if (newSephora.length > 0) {
		// 	// console.log(newSephora.length);
		// 	// log(newSephora);
		// 	// await prisma.allProducts.deleteMany({
		// 	// 	where: { retailer_id: "Sephora" },
		// 	// });
		// 	// await prisma.allProducts.createMany({ data: newSephora });
		// 	console.log("done");
		// }

		// console.log(log(newUlta));
		// log(newUlta)

		// console.log("all products:", log(allProducts));
		// console.log(alpha);
		// log(alpha);
		// console.log(
		// 	"raw length",
		// 	alpha.map((p) => p.product_name)
		// );

		// log(data);
		// console.log(data.length);
		// const newData = data
		// 	.map((item) => {
		// 		return { ...item, brand_id: brandId };
		// 	})
		// 	.filter((item) => item.sku_id !== null);
		// console.log(newData)
		// console.log(
		// 	data.map((item, index) => `${index}: ${item.product_name}`)
		// );
		// console.log(data);
		// console.log(
		// 	newData
		// 		.sort((a, b) => {
		// 			const nameA = a.product_name.toUpperCase();
		// 			const nameB = b.product_name.toUpperCase();
		// 			if (nameA < nameB) {
		// 				return -1;
		// 			}
		// 			if (nameA > nameB) {
		// 				return 1;
		// 			}
		// 			return 0;
		// 		})
		// 		.map((item) => item.product_name)
		// );

		// const search = "Woods Trilogy Set";
		// console.log(data.some((item) => item.product_name === search));
	}

	return (
		<form action={handleSubmit}>
			<Button type="submit">Scrape All Products</Button>
		</form>
	);
}
