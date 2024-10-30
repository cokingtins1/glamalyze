"use server";

import { PrismaClient } from "@prisma/client";
import { getUltaReviews } from "../getUltaReviews";
import { getSephoraReviews } from "../getSephoraReviews";
import updateData from "./updateData";
import { AllProducts, Review } from "@/app/libs/types";
import { unstable_cache } from "next/cache";
import oneOffScrapeProduct from "@/app/libs/DashboardFunctions/oneOffScrapeProduct";
import oneOffScrapeReview from "@/app/libs/DashboardFunctions/oneOffScrapeReview";

const prisma = new PrismaClient();
export default async function compareProducts(slug: string) {
	const start = new Date().getTime();

	if (!slug) {
		return [];
	}

	function getSku(slug: string) {
		const parts = slug.split(", ");
		return parts.map((part) => {
			const retailer = part.startsWith("u") ? "Ulta" : "Sephora";
			const sku = part.match(/\d+/)?.[0];
			return {
				sku: sku ?? "",
				retailer,
			};
		});
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
			const expirationThreshold = 365; // days
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
					orderBy: {
						up_votes: "desc",
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
					orderBy: {
						up_votes: "desc",
					},
				});

				existingData.push({
					productData: productData,
					reviewsData: reviewData,
				});
			}
		}

		const validData = existingData.filter((item) => {
			return item.productData !== null && item.reviewsData?.length > 0;
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

	async function getProductDetails(
		skuArray: { sku: string; retailer: string }[]
	) {
		const result: {
			product_id: string;
			page_link: string | null;
			retailer: string;
			brandId: string;
		}[] = [];

		for (const { sku, retailer } of skuArray) {
			let productData;

			if (retailer === "Ulta") {
				productData = await prisma.ultaProduct.findFirst({
					where: { sku_id: sku },
					select: {
						product_id: true,
						page_link: true,
						brand_id: true,
					},
				});
			} else if (retailer === "Sephora") {
				productData = await prisma.sephoraProduct.findFirst({
					where: { sku_id: sku },
					select: {
						product_id: true,
						page_link: true,
						brand_id: true,
					},
				});
			}
			if (productData) {
				result.push({
					product_id: productData.product_id,
					page_link: productData.page_link || null,
					retailer: retailer,
					brandId: productData.brand_id,
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
				return getUltaReviews(p.page_link, p.product_id, true);
			} else if (
				p.retailer === "Sephora" &&
				p.page_link !== null &&
				p.product_id !== null
			) {
				return getSephoraReviews(
					`https://www.${p.page_link}`,
					p.product_id,
					true
				);
			}
		});
		const data = await Promise.all(promises);
		return data;
	}

	const skuArray = getSku(slug);
	console.log("skuArray:", skuArray);
	const productInfo = await getProductDetails(skuArray);
	// const id = "003dcc25-50ac-47fa-92ad-3ebbbdf183ad";
	// const res = await checkScraped(id);
	// console.log("res:", res);

	// console.log("productInfo", productInfo);
	// const productInfo = [
	// 	{
	// 		product_id: "balls",
	// 		page_link: "balls",
	// 		retailer: "balls",
	// 	},
	// ];

	if (productInfo.length === 0) {
		throw new Error("One or both pages not found.");
	}

	// const { validData, invalidIndices } = await checkExisting(productInfo);

	// if (validData.length === productInfo.length) {
	// 	const end = new Date().getTime();
	// 	// console.log(`Execution time: ${(end - start) / 1000} seconds`);
	// 	return validData;
	// }

	// const scrapedData = await fetchData(
	// 	invalidIndices.map((index) => productInfo[index])
	// );
	// const filteredData = scrapedData.filter((data) => data !== undefined);

	// if (filteredData) {
	// 	await updateData(filteredData);
	// }

	async function checkScraped(id: string) {
		let found = false;

		const res = await prisma.allProduct.findUnique({
			where: { product_id: id },
			select: { review_histogram: true },
		});

		if (res) {
			found = res.review_histogram.length > 0;
		}

		return found;
	}

	let data: {
		productData: AllProducts | null;
		reviewsData: Review[] | null;
	}[] = [];

	for (const p of productInfo) {
		let errors = "";
		const dataExists = await checkScraped(p.product_id);
		if (!dataExists) {
			if (!p.page_link) {
				errors = "no page link found";
				return;
			}
			console.log("scraping data...");
			await oneOffScrapeProduct(p.retailer, p.page_link, p.brandId);
			await oneOffScrapeReview(
				p.page_link,
				p.product_id,
				true,
				p.retailer
			);
		}
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
	// console.log(`Execution time: ${(end - start) / 1000} seconds`);

	return data;
}
