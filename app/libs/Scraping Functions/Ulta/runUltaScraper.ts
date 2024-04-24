import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

import { OptionProps } from "../../types";
import { scrapeUltaReviews } from "./scrapeUltaReviews";
import { loadContent } from "./loadContent";
import { scrapeUltaMetadata } from "./scrapeUltaMetadata";
import { Review, UltaProduct } from "@prisma/client";

export async function runUltaScraper(
	url: string,
	options: OptionProps
): Promise<{ metaData: UltaProduct; reviewsData: Review[] }> {
	if (!url || !options)
		return {
			metaData: {
				product_id: crypto.randomUUID(),
				sku_id: null,
				product_name: null,
				brand_name: null,
				price: null,
				total_reviews: null,
				avg_rating: null,
				percent_recommended: null,
				review_histogram: [],
				retailer_id: "",
				queries: [""],
			},
			reviewsData: [],
		};
	const start = new Date().getTime();

	puppeteer.use(StealthPlugin());

	try {
		const browser = await puppeteer.launch({ headless: true });
		const page = await browser.newPage();
		await page.goto(url);

		let reviewsData: Review[] = [];
		let moreReviewsExist = true;
		let pageCount = 0;
		let currentPage = 1;

		// Scrape metadata once

		const metaData = await scrapeUltaMetadata(page, options);

		while (moreReviewsExist) {
			pageCount++;

			// Navigation Code:

			await loadContent(page);

			// Filter Code:
			const { selector, name } = options.filters.mostHelpful;

			if (pageCount === 1) {
				// Only select filter on first pagination
				await page.select(selector, name);
			}

			const nextSelector = options.globalSelector.nextPageSelector;
			const moreReviews = await page.$(nextSelector);

			if (
				!moreReviews ||
				(options?.paginationLimit &&
					pageCount >= options.paginationLimit)
			) {
				moreReviewsExist = false;
			} else {
				const reviewData = await scrapeUltaReviews(page, options);

				if (reviewData?.length === 0) {
					moreReviewsExist = false;
				} else {
					reviewsData.push(...reviewData);

					await moreReviews?.click();
				}
			}

			// Navigate to new page
			currentPage++;
		}

		const end = new Date().getTime();
		console.log(`Execution time: ${(end - start) / 1000} seconds`);
		await browser.close();
		return { metaData, reviewsData };
	} catch (error) {
		console.error("Error occurred:", error);
		return {
			metaData: {
				product_id: crypto.randomUUID(),
				sku_id: null,
				product_name: null,
				brand_name: null,
				price: null,
				total_reviews: null,
				avg_rating: null,
				percent_recommended: null,
				review_histogram: [],
				retailer_id: "",
				queries: [""],
			},
			reviewsData: [],
		};
	}
}
