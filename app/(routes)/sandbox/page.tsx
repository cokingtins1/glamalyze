import { Button } from "@/components/ui/button";
import { productSeeds } from "@/lib/seeding/seedingFuncs";
import { randomUserName } from "@/lib/utils";
import { PrismaClient } from "@prisma/client";
import { randomInt } from "crypto";
import dayjs from "dayjs";
import { generate } from "random-words";
import React from "react";
import { getAllSephoraProducts } from "../../actions/getAllSephoraProducts";
import elements from "@/app/libs/JSON/elemets.json";
import { AllProducts, AllProductsSelectors } from "../../libs/types";
import { getAllUltaProducts } from "../../actions/getAllUltaProducts";
import { getAllUltaBrands } from "../../actions/getAllUltaBrands";
import { getAllSephoraBrands } from "../../actions/getAllSephoraBrands";
import { withPgTrgm } from "prisma-extension-pg-trgm";

// const prisma = new PrismaClient();
const prisma = new PrismaClient().$extends(withPgTrgm());

export default async function Page() {
	async function handleSubmit() {
		"use server";

		console.log("running query...");
		const dupeFromBrand: AllProducts[] = await prisma.$queryRaw`
		SELECT LOWER(brand_name) AS brand_name, COUNT(*) AS num_duplicates
		FROM "AllBrands"
		GROUP BY LOWER(brand_name)
		HAVING COUNT(*) > 1;
		`;

		// const dupeFromProd: AllProducts[] = await prisma.$queryRaw`
		// 	SELECT DISTINCT ts.brand_name
		// 	FROM "UltaProduct" tu
		// 	JOIN "SephoraProduct" ts on LOWER(ts.brand_name) = LOWER(tu.brand_name)
		// 	ORDER BY ts.brand_name
		// `;

		//common brand name ? => fuzzy search on product_name

		const uuidArray = Array.from({ length: 121 })
			.map(() => {
				return {
					id: crypto.randomUUID(),
				};
			})
			.map((val) => val.id);

		console.dir(uuidArray, { maxArrayLength: null });
		// const brandNames1 = dupeFromBrand?.map((obj) => obj.brand_name);

		// console.dir(brandNames1, { maxArrayLength: null });
		// console.dir(brandNames2, { maxArrayLength: null });

		// const unique = [...brandNames1, ...brandNames2].filter(
		// 	(brandName, index, array) => array.indexOf(brandName) === index
		// );

		// console.log(result);
		// console.log(result.length)

		// console.dir(same, { maxArrayLength: null });
		// console.log(same.length);

		// const url = "https://www.sephora.com/brand/gisou";
		// const allProducts = await getAllSephoraProducts(url, "");
		// console.dir(allProducts, { maxArrayLength: null });

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

	// const same: AllProducts[] = await prisma.$queryRaw`
	// 		SELECT sephora.*, ulta.*, sephora.product_name AS sephora_product, ulta.product_name AS ulta_product
	// 		FROM "AllProducts" sephora
	// 		JOIN "AllProducts" ulta ON sephora.product_name LIKE CONCAT('%', ulta.product_name, '%')
	// 		WHERE sephora.retailer_id = 'Sephora'
	// 		AND ulta.retailer_id = 'Ulta'
	// `;

	// 	const same: AllProducts[] = await prisma.$queryRaw`
	// 		SELECT sephora.*, ulta.*, sephora.product_name AS sephora_product, ulta.product_name AS ulta_product
	// 		FROM "AllProducts" sephora
	// 		JOIN "AllProducts" ulta ON similarity(sephora.product_name, ulta.product_name) > 0.45
	// 		WHERE sephora.retailer_id = 'Sephora'
	// 		AND ulta.retailer_id = 'Ulta'
	// `;

	// const same: AllProducts[] = await prisma.$queryRaw`
	// 		SELECT *
	// 		FROM "AllProducts" ta
	// 		JOIN "AllProducts" tb
	// 			ON ta.product_name = tb.product_name
	// 			OR similarity(ta.product_name, tb.product_name) > 0.2
	// 		WHERE ta.retailer_id = 'Sephora'
	// 		AND tb.retailer_id = 'Ulta'
	// 		ORDER BY ta.product_name = tb.product_name DESC, similarity(ta.product_name, tb.product_name) DESC
	// 		LIMIT 3
	// `;

	// console.log(same.slice(0, 5));
	// console.log(same.length);

	// console.dir(same, { maxArrayLength: null });

	return (
		<form action={handleSubmit}>
			<Button type="submit">Scrape All Products</Button>
		</form>
	);
}
