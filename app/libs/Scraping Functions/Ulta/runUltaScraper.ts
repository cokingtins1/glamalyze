import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
// import { puppeteer } from "@/app/actions/_puppeteer_base";

import { MetaData, OptionProps, Review, ScrapeResponse } from "../../types";
import { scrapeUltaReviews } from "./scrapeUltaReviews";
import { loadContent } from "./loadContent";
import { scrapeUltaMetadata } from "./scrapeUltaMetadata";
import { returnBrowser } from "@/app/actions/_puppeteer_base";

export async function runUltaScraper(
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
	const browser = await returnBrowser();

	try {
		const page = await browser.newPage();
		await page.goto(url);

		let reviewsData: Review[] = [];
		let moreReviewsExist = true;
		let pageCount = 0;
		let currentPage = 1;

		// Check for for "Page can't load"

		const pageCantLoad = await page.evaluate(() => {
			let result = false;
			const msgEl = document.querySelector(
				".Text-ds.Text-ds--title-2.Text-ds--center"
			);
			const msgText = msgEl ? msgEl.textContent : "";

			if (msgText?.includes("beauty rest")) {
				result = true;
			}
			return result;
		});

		if (pageCantLoad) {
			return {
				metaData,
				reviewsData,
				response: {
					status: {
						success: true,
						messasge: "Page can't be loaded",
					},
				},
			};
		}

		// Scrape metadata once

		metaData = await scrapeUltaMetadata(page, options);

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

			// Navigation Code:

			await loadContent(page);

			let reviewsPresent = await page.evaluate(() => {
				let el = document.querySelector(".pr-rd-no-reviews");
				return el ? true : false;
			});

			if (reviewsPresent) {
				response.status.success = false;
				response.status.messasge = "No Reviews Found";

				return { metaData, reviewsData, response };
			}

			// Filter Code:

			if (pageCount === 1) {
				const { selector, name } = options.filters.mostHelpful;

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
