import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

import { OptionProps } from "../../types";
import { scrapeSephoraReviews } from "./scrapeSephoraReviews";

import { scrapeSephoraMetadata } from "./scrapeSephoraMetadata";

import { loadSephoraContent } from "./loadSephoraContent";

import { test } from "./test";
import { Review, SephoraProduct } from "@prisma/client";

export async function runSephoraScraper(
	url: string,
	options: OptionProps
): Promise<{ metaData: SephoraProduct; reviewsData: Review[] }> {
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
		const browser = await puppeteer.launch({
			headless: true,
		});
		const page = await browser.newPage();

		await page.goto(url);

		let reviewsData: Review[] = [];
		let moreReviewsExist = true;
		let pageCount = 0;
		let currentPage = 1;

		// Scrape metadata once

		let metaData: SephoraProduct | null = null;
		metaData = await scrapeSephoraMetadata(page, options);

		while (moreReviewsExist) {
			pageCount++;

			// Navigation Code:

			// Filter Code:
			if (pageCount === 1) {
				// Only select filter on first pagination

				await page.waitForSelector("#custom_sort");
				await page.click("#custom_sort");
				// const textContent = await page.evaluate(() => {
				// 	const element = document.querySelector(
				// 		"#custom_sort > :first-child"
				// 	);
				// 	// if (element) {
				// 	// 	console.log("clicking button");
				// 	// 	(element as HTMLButtonElement).click();
				// 	// }
				// 	page.click("#custom_sort > :first-child")
				// 	return element ? element.textContent : null;
				// });
				// console.log(textContent);

				// await page.click(`text=${textContent}`);

				// await page.waitForSelector("#css-1aawth6.eanm77i0")
				// await page.click(".css-1aawth6.eanm77i0");
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
				const reviewData = await scrapeSephoraReviews(page, options);

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
		// console.log(`Execution time: ${(end - start) / 1000} seconds`);
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
				queries: [""]
			},
			reviewsData: [],
		};
	}
}
