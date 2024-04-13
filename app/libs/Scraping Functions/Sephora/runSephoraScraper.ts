import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

import { OptionProps } from "../../types";
import { scrapeSephoraReviews } from "./scrapeSephoraReviews";

import { scrapeSephoraMetadata } from "./scrapeSephoraMetadata";

import { MetaData, Review } from "../../types";
import { loadSephoraContent } from "./loadSephoraContent";

import { test } from "./test";

export async function runSephoraScraper(
	url: string,
	options: OptionProps
): Promise<{ metaData: MetaData | null; reviewsData: Review[] }> {
	if (!url || !options) return { metaData: null, reviewsData: [] };
	const start = new Date().getTime();

	puppeteer.use(StealthPlugin());

	try {
		const browser = await puppeteer.launch({
			headless: true,
		});
		const page = await browser.newPage();

		await page.goto(url);

		let reviewsData = [];
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

				console.log("clicking page!");
				await page.waitForSelector("#custom_sort");
				await page.click("#custom_sort");
				const textContent = await page.evaluate(() => {
					const element = document.querySelector(
						"#custom_sort > :first-child"
					);
					return element ? element.textContent : null;
				});
				console.log(textContent);

				await page.click(`text=${textContent}`);

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

				// const testResult: any = await test(page);
				// console.log("testResult", testResult);

				// const reviewData = [
				// 	{
				// 		headline: "test",
				// 		reviewText: "test",
				// 		verifiedBuyer: false,
				// 		stars: 5,
				// 	},
				// ];

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