import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

import { MetaData, OptionProps, Review, ScrapeResponse } from "../../types";
import { scrapeSephoraReviews } from "./scrapeSephoraReviews";

import { scrapeSephoraMetadata } from "./scrapeSephoraMetadata";

import { loadSephoraContent } from "./loadSephoraContent";
import { loadContent } from "../Ulta/loadContent";
import { loadAllProducts } from "../Sephora-AllProducts/loadAllProducts";

export async function runSephoraScraper(
	url: string,
	productId: string,
	reviewsPresent: boolean,
	options: OptionProps
): Promise<{
	metaData: MetaData;
	reviewsData: Review[];
	response: ScrapeResponse;
}> {
	let metaData: MetaData = {
		product_id: productId,
		review_histogram: [],
		product_price: null,
		retailer_id: "Ulta",
		avg_rating: null,
		percent_recommended: null,
		total_reviews: null,
		product_image_url: [],
	};
	let reviewsData: Review[] = [];

	let response: ScrapeResponse = {
		status: {
			success: false,
			messasge: "",
		},
	};

	if (!url || !options) {
		response.status.success = false;
		response.status.messasge = "No Url provided";
		return { metaData, reviewsData, response };
	}

	puppeteer.use(StealthPlugin());

	function delay(time: number) {
		return new Promise(function (resolve) {
			setTimeout(resolve, time);
		});
	}
	const browser = await puppeteer.launch({
		headless: true,
	});

	try {
		const page = await browser.newPage();

		await page.goto(url);

		let reviewsData: Review[] = [];
		let moreReviewsExist = true;
		let pageCount = 0;
		let currentPage = 1;

		// Scrape metadata once

		const metaData = await scrapeSephoraMetadata(page, options);

		if (!reviewsPresent) {
			return {
				metaData,
				reviewsData,
				response: {
					status: {
						success: true,
						messasge: "No Reviews per product table",
					},
				},
			};
		}

		while (moreReviewsExist) {
			pageCount++;

			// Filter Code:
			if (pageCount === 1) {
				let reviewsPresent = await page.evaluate(() => {
					let cont = document.querySelector(".css-1g8klpm.eanm77i0");
					if (!cont) return false;
					let el = cont.querySelector(".css-s2d5ab");
					return el ? true : false;
				});
				if (reviewsPresent) {
					response.status.success = false;
					response.status.messasge = "No Reviews Found";

					return { metaData, reviewsData, response };
				}

				let sortButton = await page.evaluate(() => {
					let el = document.querySelector("#custom_sort_trigger");
					return el ? true : false;
				});

				console.log(sortButton);

				if (!sortButton) {
					response.status.success = false;
					response.status.messasge = "Sort button not found";

					return { metaData, reviewsData, response };
				}

				await page.click("#custom_sort_trigger");
				await page.click("#custom_sort > :first-child");
				await delay(1000);
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

		// await browser.close();
		response.status.success = true;
		response.status.messasge = `${reviewsData.length} reviews found `;
		return { metaData, reviewsData, response };
	} catch (error) {
		response.status.success = false;
		response.status.messasge = "";
		console.error("Error occurred:", error);
		return { metaData, reviewsData, response };
	} finally {
		const pages = await browser.pages();

		for (const page of pages) await page.close();
		await browser.close();
	}
}
