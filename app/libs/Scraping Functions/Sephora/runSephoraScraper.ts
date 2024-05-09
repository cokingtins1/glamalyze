import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

import { MetaData, OptionProps, Review } from "../../types";
import { scrapeSephoraReviews } from "./scrapeSephoraReviews";

import { scrapeSephoraMetadata } from "./scrapeSephoraMetadata";

import { loadSephoraContent } from "./loadSephoraContent";

export async function runSephoraScraper(
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
				retailer_id: "Sephora",
				avg_rating: null,
				percent_recommended: null,
				total_reviews: null,
			},
			reviewsData: [],
		};

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

		const metaData = await scrapeSephoraMetadata(page, options);

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

		await browser.close();
		return { metaData, reviewsData };
	} catch (error) {
		console.log("url:", url);
		console.error("Error occurred:", error);
		return {
			metaData: {
				product_id: productId,
				review_histogram: [],
				product_price: null,
				retailer_id: "Sephora",
				avg_rating: null,
				percent_recommended: null,
				total_reviews: null,
			},
			reviewsData: [],
		};
	}
}
