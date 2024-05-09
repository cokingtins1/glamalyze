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
import { AllProducts, AllProductsSelectors, Review } from "../../libs/types";
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

		async function checkExisting(
			products: {
				product_id: string;
				page_link: string | null;
				retailer: string;
			}[]
		) {
			let existingData: {
				productData: AllProducts | null;
				reviewsData: Review[];
			}[] = [];
			for (const { product_id, retailer } of products) {
				const expirationThreshold = 7; // days
				const today = new Date();
				const expiration = new Date(
					today.getTime() - expirationThreshold * 24 * 60 * 60 * 1000
				);

				if (retailer === "Ulta") {
					const productData = await prisma.ultaProduct.findUnique({
						where: {
							updated_at: { gt: expiration },
							product_id: product_id,
						},
					});

					const reviewData = await prisma.ultaReview.findMany({
						where: {
							updated_at: { gt: expiration },
							product_id: product_id,
						},
					});

					existingData.push({
						productData: productData,
						reviewsData: reviewData,
					});
				} else if (retailer === "Sephora") {
					const productData = await prisma.sephoraProduct.findUnique({
						where: {
							updated_at: { gt: expiration },
							product_id: product_id,
						},
					});

					const reviewData = await prisma.sephoraReview.findMany({
						where: {
							updated_at: { gt: expiration },
							product_id: product_id,
						},
					});

					existingData.push({
						productData: productData,
						reviewsData: reviewData,
					});
				}
			}

			const validData = existingData.filter((item) => {
				return (
					item.productData !== null && item.reviewsData?.length > 0
				);
			});
			const invalidIndices = existingData
				.map((item, index) =>
					item.productData === null || item.reviewsData.length === 0
						? index
						: null
				)
				.filter((index) => index !== null);

			return { validData, invalidIndices };
		}

		const slug = "u:[2614776],s:[2641884]";

		// const productInfo = await getProductDetails(skuArray);

		const url =
			"https://www.sephora.com/product/dior-rouge-dior-lipstick-P467760?skuId=2750966&icid2=products grid:p467760:product";

		const id = "4f65289a-b720-4c56-883b-3b0ed83a3aa7";
		console.log("getting data");
		const data = await getSephoraData(url, id);
		console.log("done");

		console.log(data);

		// const skuArray = getSku(slug);
		// const productInfo = await getProductDetails(skuArray);
		// const {validData, invalidIndices} = await checkExisting(productInfo);

		// console.log(validData);
		// console.log(invalidIndices);

		function log(data: AllProducts[]) {
			const productNames = data.map((item) => item.brand_name);
			const uniqueArray = productNames.filter((value, index, self) => {
				return self.indexOf(value) === index;
			});

			console.log("unique length:", uniqueArray.length);
			// console.dir(uniqueArray, { maxArrayLength: null });
		}
	}

	const ref = "/compare/u:[2614776],s:[2641884]";

	return (
		<>
			<div className="space-y-8">
				<Link href={ref}>
					<Button type="button">Test Compare</Button>
				</Link>
				<form action={handleSubmit}>
					<Button type="submit">Scrape All Products</Button>
				</form>
			</div>
		</>
	);
}
