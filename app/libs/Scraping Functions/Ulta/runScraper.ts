import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

import { OptionProps } from "../../types";
import { scrapeReviews } from "./scrapeReviews";
import { loadContent } from "./loadContent";
import { scrapeMetadata } from "./scrapeMetadata";

import { MetaData, Review } from "../../types";

export async function runScraper(
	url: string,
	options: OptionProps
): Promise<{ metaData: MetaData | null; reviewsData: Review[] }> {
	if (!url || !options) return { metaData: null, reviewsData: [] };
	const start = new Date().getTime();

	puppeteer.use(StealthPlugin());

	try {
		const browser = await puppeteer.launch({ headless: true });
		const page = await browser.newPage();
		await page.goto(url);

		let reviewsData = [];
		let moreReviewsExist = true;
		let pageCount = 0;
		let currentPage = 1;

		// Scrape metadata once

		const metaData = await scrapeMetadata(page, options);

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
				const reviewData = await scrapeReviews(page, options);

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
		return { metaData: null, reviewsData: [] };
	}
}
