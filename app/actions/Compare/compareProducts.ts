"use server";

import { AllProducts, Retailer, Review } from "@/app/libs/types";
import oneOffScrapeProduct from "@/app/libs/DashboardFunctions/oneOffScrapeProduct";
import oneOffScrapeReview from "@/app/libs/DashboardFunctions/oneOffScrapeReview";
import { prisma } from "@/prisma/_base";
import { checkExpired } from "@/app/libs/utils";

export default async function compareProducts(slug: string) {
	if (!slug) {
		return [];
	}

	function getSku(slug: string) {
		const parts = slug.split(", ");
		return parts.map((part) => {
			const retailer: Retailer = part.startsWith("u")
				? "Ulta"
				: "Sephora";
			const sku = part.match(/\d+/)?.[0];
			return {
				sku: sku ?? "",
				retailer,
			};
		});
	}

	async function getProductDetails(
		skuArray: { sku: string; retailer: Retailer }[]
	) {
		const result: {
			product_id: string;
			product_name: string | null;
			page_link: string | null;
			retailer: "Ulta" | "Sephora";
			brandId: string;
			updated_at: Date | null;
		}[] = [];

		for (const { sku, retailer } of skuArray) {
			let productData;

			if (retailer === "Ulta") {
				productData = await prisma.ultaProduct.findFirst({
					where: { sku_id: sku },
					select: {
						product_id: true,
						product_name: true,
						page_link: true,
						brand_id: true,
						updated_at: true,
					},
				});
			} else if (retailer === "Sephora") {
				productData = await prisma.sephoraProduct.findFirst({
					where: { sku_id: sku },
					select: {
						product_id: true,
						product_name: true,
						page_link: true,
						brand_id: true,
						updated_at: true,
					},
				});
			}
			if (productData) {
				result.push({
					product_id: productData.product_id,
					product_name: productData.product_name,
					page_link: productData.page_link || null,
					retailer: retailer,
					brandId: productData.brand_id,
					updated_at: productData.updated_at,
				});
			}
		}

		return result;
	}

	const skuArray = getSku(slug);
	const productInfo = await getProductDetails(skuArray);

	if (productInfo.length === 0) {
		throw new Error("One or both pages not found.");
	}

	async function checkScraped(id: string, retailer: string) {
		let found = false;
		let reviewsPresent = true;
		let expired = false;

		expired = await checkExpired(id, retailer, 365);

		const res = await prisma.allProduct.findUnique({
			where: { product_id: id },
			select: { review_histogram: true },
		});

		if (retailer === "Ulta") {
			const reviews = await prisma.ultaReview.findMany({
				where: { product_id: id },
			});
			reviews.length === 0 && (reviewsPresent = false);
		} else if (retailer === "Sephora") {
			const reviews = await prisma.sephoraReview.findMany({
				where: { product_id: id },
			});
			reviews.length === 0 && (reviewsPresent = false);
		}

		if (res) {
			found = expired ? false : reviewsPresent;
		}

		return found;
	}

	let data: {
		productData: AllProducts | null;
		reviewsData: Review[] | null;
	}[] = [];

	for (const p of productInfo) {
		let errors = "";
		const dataExists = await checkScraped(p.product_id, p.retailer);
		if (!dataExists) {
			if (!p.page_link) {
				errors = "no page link found";
				return;
			}
			console.log(`scraping ${p.product_name}...`);

			let failedCount = 0;
			let maxTrys = 2;
			let reviewSuccess = false;

			while (failedCount < maxTrys && !reviewSuccess) {
				reviewSuccess = await oneOffScrapeReview(
					p.page_link,
					p.product_id,
					true,
					p.retailer
				);
				!reviewSuccess && failedCount++;
				!reviewSuccess && console.log("scraping reviews again...");
			}

			console.log("done scraping data");
		}
		if (p.retailer === "Ulta") {
			const pData = await prisma.ultaProduct.findUnique({
				where: { product_id: p.product_id },
			});
			const rData = await prisma.ultaReview.findMany({
				where: { product_id: p.product_id },
			});
			const uniqueReviews = Array.from(
				new Map(
					rData.map((review: Review) => [review.review_text, review])
				).values()
			);
			data.push({ productData: pData, reviewsData: uniqueReviews });
		} else if (p.retailer === "Sephora") {
			const pData = await prisma.sephoraProduct.findUnique({
				where: { product_id: p.product_id },
			});
			const rData = await prisma.sephoraReview.findMany({
				where: { product_id: p.product_id },
			});
			const uniqueReviews = Array.from(
				new Map(
					rData.map((review: Review) => [review.review_text, review])
				).values()
			);
			data.push({ productData: pData, reviewsData: uniqueReviews });
		}
	}

	return data;
}
