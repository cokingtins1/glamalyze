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
import Link from "next/link";
import { getUltaData } from "@/app/actions/getUltaData";
import { getSephoraData } from "@/app/actions/getSephoraData";

const prisma = new PrismaClient();
// const prisma = new PrismaClient().$extends(withPgTrgm());

export default async function Page() {
	async function handleSubmit() {
		"use server";

		function getSku(slug: string) {
			const string = decodeURIComponent(slug);

			const uSkuPattern = /u:\[([\d,]+)\]/;
			const sSkuPattern = /s:\[([\d,]+)\]/;

			const uSkuMatch = string.match(uSkuPattern);
			const u_sku = uSkuMatch
				? uSkuMatch[1]
						.split(",")
						.map((sku) => ({ sku, retailer: "Ulta" }))
				: [];

			const sSkuMatch = string.match(sSkuPattern);
			const s_sku = sSkuMatch
				? sSkuMatch[1]
						.split(",")
						.map((sku) => ({ sku, retailer: "Sephora" }))
				: [];

			return [...u_sku, ...s_sku];
		}

		async function getProductDetails(
			skuArray: { sku: string; retailer: string }[]
		) {
			const result: {
				product_id: string;
				page_link: string | null;
				retailer: string;
			}[] = [];

			for (const { sku, retailer } of skuArray) {
				let productData;
				if (retailer === "Ulta") {
					productData = await prisma.ultaProduct.findFirst({
						where: { sku_id: sku },
						select: { product_id: true, page_link: true },
					});
				} else if (retailer === "Sephora") {
					productData = await prisma.sephoraProduct.findFirst({
						where: { sku_id: sku },
						select: { product_id: true, page_link: true },
					});
				}
				if (productData) {
					result.push({
						product_id: productData.product_id,
						page_link: productData.page_link || null,
						retailer: retailer,
					});
				}
			}

			return result;
		}

		async function fetchData(
			products: {
				product_id: string;
				page_link: string | null;
				retailer: string;
			}[]
		) {
			const promises = products.map(async (p) => {
				if (
					p.retailer === "Ulta" &&
					p.page_link !== null &&
					p.product_id !== null
				) {
					return getUltaData(p.page_link, p.product_id);
				} else if (
					p.retailer === "Sephora" &&
					p.page_link !== null &&
					p.product_id !== null
				) {
					return getSephoraData(p.page_link, p.product_id);
				}
			});
			const data = await Promise.all(promises);
			return data;
		}

		const slug = "u:[2614776],s:[2641884]";

		const skuArray = getSku(slug);
		// const productInfo = await getProductDetails(skuArray);

		const url =
			"https://www.sephora.com/product/papaya-isla-eau-de-parfum-P505624?skuId=2674901&icid2=products%20grid:p505624:product";

		const id = "5cc0424d-94f8-4ff4-810c-12625a767efe";
		await getSephoraData(url, id);

		// const scrapedData = await fetchData(productInfo);
		// console.log(scrapedData)

		// const dupeFromProd: AllProducts[] = await prisma.$queryRaw`
		// 	SELECT DISTINCT ts.brand_name
		// 	FROM "UltaProduct" tu
		// 	JOIN "SephoraProduct" ts on LOWER(ts.brand_name) = LOWER(tu.brand_name)
		// 	ORDER BY ts.brand_name
		// `;

		//common brand name ? => fuzzy search on product_name

		// const sim = await prisma.$queryRaw`
		// SELECT
		// 	p1.brand_id AS brand_id,
		// 	p1.brand_name AS brand_name,
		// 	p1.product_name AS ulta_product_name,
		// 	p2.product_name AS sephora_product_name,
		// 	p1.product_id AS ulta_product_id,
		// 	p2.product_id AS sephora_product_id,
		// 	p1.avg_rating AS ulta_avg_rating,
		// 	p2.avg_rating AS sephora_avg_rating,
		// 	p1.total_reviews AS ulta_total_reviews,
		// 	p2.total_reviews AS sephora_total_reviews,
		// 	p1.product_image_url AS ulta_product_image_url,
		// 	p2.product_image_url AS sephora_product_image_url,
		// 	p1.sku_id AS ulta_sku_id,
		// 	p2.sku_id AS sephora_sku_id,
		// 	p1.page_link AS ulta_page_link,
		// 	p2.page_link AS sephora_page_link,
		// 	p1.product_price AS ulta_product_price,
		// 	p2.product_price AS sephora_product_price,
		// 	p1.created_at AS created_at,
		// 	p1.updated_at AS updated_at,
		// 	similarity(p1.product_name, p2.product_name) AS similarity_score
		// FROM
		// 	"UltaProduct" AS p1
		// JOIN
		// 	"SephoraProduct" AS p2
		// ON
		// 	p1.brand_id = p2.brand_id
		// 	AND similarity(p1.product_name, p2.product_name) >= 0.7
		// WHERE
		// 	similarity(p1.product_name, p2.product_name) >= 0.7
		// ORDER BY
		// 	similarity_score DESC

		// `;

		// const mappedResults = sim.map((result: any) => {
		// 	const {
		// 		ulta_product_name_similarity_score,
		// 		ulta_product_name_word_similarity_score,
		// 		...rest
		// 	} = result;
		// 	return {
		// 		id: crypto.randomUUID(),
		// 		...rest
		// 	};
		// });

		// console.log(mappedResults.slice(0,10))

		// await prisma.sharedProduct.createMany({ data: mappedResults });
		// console.log("done")

		// console.dir(sim, { maxArrayLength: null });
		// console.log(sim);
		// console.log(sim.length);
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

	const ref = "https://localhost:3000/compare/u:[2614776],s:[2641884]";

	return (
		<>
			<div className='space-y-8'>
				<Link href={ref}>
					<Button type="submit">Test Compare</Button>
				</Link>
				<form action={handleSubmit}>
					<Button type="submit">Scrape All Products</Button>
				</form>
			</div>
		</>
	);
}
