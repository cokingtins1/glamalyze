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

	function delay(time: number) {
		return new Promise(function (resolve) {
			setTimeout(resolve, time);
		});
	}

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

			// Filter Code:
			if (pageCount === 1) {
				await page.waitForSelector("#custom_sort_trigger");
				await page.click("#custom_sort_trigger");
				await page.click("#custom_sort > :first-child");
				await delay(1000)
			}

			const nextSelector = options.globalSelector.nextPageSelector;
			const moreReviews = await page.$(nextSelector);

			if (
				!moreReviews ||
				(options?.paginationLimit &&
					pageCount >= options.paginationLimit)
			) {
				const reviewData = await scrapeSephoraReviews(page, options);
				if (reviewData?.length === 0) {
					moreReviewsExist = false;
				} else {
					reviewsData.push(...reviewData);
					await moreReviews?.click();
				}

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
