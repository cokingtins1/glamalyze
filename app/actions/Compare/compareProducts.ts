"use server";

import { PrismaClient } from "@prisma/client";
import { getUltaData } from "../getUltaData";
import { getSephoraData } from "../getSephoraData";
import { ZodNull } from "zod";
import updateData from "./updateData";
import { AllProducts, Review } from "@/app/libs/types";
import { padding } from "@mui/system";

const prisma = new PrismaClient();
export default async function compareProducts(slug: string) {
	const start = new Date().getTime();

	function getSku(slug: string) {
		const string = decodeURIComponent(slug);

		const uSkuPattern = /u:\[([\d,]+)\]/;
		const sSkuPattern = /s:\[([\d,]+)\]/;

		const uSkuMatch = string.match(uSkuPattern);
		const u_sku = uSkuMatch
			? uSkuMatch[1].split(",").map((sku) => ({ sku, retailer: "Ulta" }))
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
				return getSephoraData(
					`https://www.${p.page_link}`,
					p.product_id
				);
			}
		});
		const data = await Promise.all(promises);
		return data;
	}

	const skuArray = getSku(slug);
	const productInfo = await getProductDetails(skuArray);

	if (productInfo.length === 0) {
		throw new Error("One or both pages not found.");
	}

	const scrapedData = await fetchData(productInfo);
	const filteredData = scrapedData.filter((data) => data !== undefined);

	if (filteredData) {
		await updateData(filteredData);
	}

	let data: {
		productData: AllProducts | null;
		reviewsData: Review[] | null;
	}[] = [];

	for (const p of productInfo) {
		if (p.retailer === "Ulta") {
			const pData = await prisma.ultaProduct.findUnique({
				where: { product_id: p.product_id },
			});
			const rData = await prisma.ultaReview.findMany({
				where: { product_id: p.product_id },
			});
			data.push({ productData: pData, reviewsData: rData });
		} else if (p.retailer === "Sephora") {
			const pData = await prisma.sephoraProduct.findUnique({
				where: { product_id: p.product_id },
			});
			const rData = await prisma.sephoraReview.findMany({
				where: { product_id: p.product_id },
			});
			data.push({ productData: pData, reviewsData: rData });
		}
	}

	const end = new Date().getTime();
	console.log(`Execution time: ${(end - start) / 1000} seconds`);

	return data;

	// const { metaData: ultaMetaData, reviewsData: ultaReviewsData } = ultaResult;
	// const { metaData: sephoraMetaData, reviewsData: sephoraReviewsData } =
	// 	sephoraResult;

	// // await new Promise((resolve) => setTimeout(resolve, 3000));

	// return {
	// 	ultaMetaData,
	// 	ultaReviewsData,
	// 	sephoraMetaData,
	// 	sephoraReviewsData,
	// };
}
