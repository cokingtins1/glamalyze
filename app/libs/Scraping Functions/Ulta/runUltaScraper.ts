import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

import { MetaData, OptionProps, Review } from "../../types";
import { scrapeUltaReviews } from "./scrapeUltaReviews";
import { loadContent } from "./loadContent";
import { scrapeUltaMetadata } from "./scrapeUltaMetadata";

export async function runUltaScraper(
	url: string,
	productId: string,
	options: OptionProps
): Promise<{ metaData: MetaData; reviewsData: Review[] }> {
	if (!url || !options)
		return {
			metaData: {
				product_id: productId,
				review_histogram: [],
				product_price: null,
				retailer_id: "Ulta",
				avg_rating: null,
				percent_recommended: null,
				total_reviews: null,
			},
			reviewsData: [],
		};

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
				const reviewData = await scrapeUltaReviews(page, options);
				if (reviewData?.length === 0) {
					moreReviewsExist = false;
				} else {
					reviewsData.push(...reviewData);

					await moreReviews?.click();
				}
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

		await browser.close();
		return { metaData, reviewsData };
	} catch (error) {
		console.error("Error occurred:", error);
		return {
			metaData: {
				product_id: productId,
				review_histogram: [],
				product_price: null,
				retailer_id: "Ulta",
				avg_rating: null,
				percent_recommended: null,
				total_reviews: null,
			},
			reviewsData: [],
		};
	}
}
