import axios from "axios";
import * as cheerio from "cheerio";
// import puppeteer from "puppeteer-extra";
// import puppeteer, { Page } from "puppeteer";

import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

export async function puppeteerScraper(url: string) {
	if (!url) return;

	let browser;
	const username = String(process.env.BRIGHT_USERNAME);
	const password = String(process.env.BRIGHT_PASSWORD);
	const auth = `${username}:${password}`;

	function delay(time: number) {
		return new Promise(function (resolve) {
			setTimeout(resolve, time);
		});
	}
	puppeteer.use(StealthPlugin());

	(async () => {
		const browser = await puppeteer.launch({ headless: true });
		const page = await browser.newPage();
		await page.goto(url);

		const consentButton = await page.$("#onetrust-accept-btn-handler");
		console.log("consent button", consentButton);
		if (consentButton) {
			await consentButton.click();
		}

		//next pagination
		let reviewsData = [];
		let moreReviewsExist = true;

		while (moreReviewsExist) {
			await page.evaluate(() => window.scrollBy(0, window.innerHeight));
			await page.keyboard.down("End");
			await page.keyboard.down("End");
			await page.keyboard.down("End");

			await delay(1000);
			await page.evaluate(() => {
				window.scrollBy(0, -500);
			});
			await delay(500);

			await page.evaluate(() => {
				window.scrollBy(0, -200);
			});

			await delay(500);

			await page.evaluate(() => {
				window.scrollBy(0, -200);
			});

			const nextSelector =
				".pr-rd-pagination-btn.pr-rd-pagination-btn--next";

			const moreReviews = await page.$(nextSelector);
			console.log("moreReviews", !!moreReviews, moreReviews);

			if (!moreReviews) {
				moreReviewsExist = false;
			} else {
				const commentSelector = '[data-testid="review-list"]';
				await page.waitForSelector(commentSelector);
				console.log("comments found:", await page.$(commentSelector));

				const reviewTexts = await page.evaluate(() => {
					const reviewList = document.querySelector(
						'[data-testid="review-list"]'
					);
					if (!reviewList) return [];
					const reviews = reviewList.querySelectorAll(".pr-review");
					return Array.from(reviews).map((review) => {
						const descriptionElement = review.querySelector(
							".pr-rd-description-text"
						);
						return descriptionElement
							? (descriptionElement as HTMLParagraphElement).innerText
							: null;
					});
				});
				reviewsData.push(...reviewTexts);
				console.log("reviews Data", reviewsData);

				// Click on the next button
				await page.click(nextSelector);
			}
		}

		await browser.close();
	})();



	// try {
	// 	browser = await puppeteer.connect({
	// 		browserWSEndpoint: `wss://${auth}@brd.superproxy.io:9222`,
	// 		defaultViewport: { width: 1600, height: 3700 },
	// 	});

	// 	// browser = await puppeteer.launch({
	// 	// 	headless: false,
	// 	// 	// defaultViewport: { width: 1600, height: 3700 },
	// 	// });

	// 	const page = await browser.newPage();

	// 	await page.goto(url);

	// 	// await page.setViewport({ width: 1600, height });

	// 	const consentButton = await page.$("#onetrust-accept-btn-handler");
	// 	console.log("consent button", consentButton);
	// 	if (consentButton) {
	// 		await page.click("#onetrust-accept-btn-handler");
	// 	}

	// 	//next pagination
	// 	let reviewsData = [];
	// 	let moreReviewsExist = true;

	// 	while (moreReviewsExist) {
	// 		await page.evaluate(() => window.scrollBy(0, window.innerHeight));
	// 		await page.keyboard.down("End");
	// 		await page.keyboard.down("End");
	// 		await page.keyboard.down("End");

	// 		await delay(1000);
	// 		await page.evaluate(() => {
	// 			window.scrollBy(0, -500);
	// 		});
	// 		await delay(500);

	// 		await page.evaluate(() => {
	// 			window.scrollBy(0, -200);
	// 		});

	// 		await delay(500);

	// 		await page.evaluate(() => {
	// 			window.scrollBy(0, -200);
	// 		});

	// 		const nextSelector =
	// 			".pr-rd-pagination-btn.pr-rd-pagination-btn--next";

	// 		const moreReviews = await page.$(nextSelector);
	// 		console.log("moreReviews", !!moreReviews, moreReviews);

	// 		if (!moreReviews) {
	// 			moreReviewsExist = false;
	// 		} else {
	// 			const commentSelector = '[data-testid="review-list"]';
	// 			await page.waitForSelector(commentSelector);

	// 			console.log("commnets found:", await page.$(commentSelector));

	// 			const reviewTexts = await page.evaluate(() => {
	// 				const reviewList = document.querySelector(
	// 					'[data-testid="review-list"]'
	// 				);
	// 				if (!reviewList) return [];
	// 				const reviews = reviewList.querySelectorAll(".pr-review");
	// 				return Array.from(reviews).map((review) => {
	// 					const descriptionElement = review.querySelector(
	// 						".pr-rd-description-text"
	// 					);
	// 					return descriptionElement
	// 						? (descriptionElement as HTMLParagraphElement)
	// 								.innerText
	// 						: null;
	// 				});
	// 			});
	// 			reviewsData.push(...reviewTexts);
	// 			console.log("reviews Data", reviewsData);

	// 			// Click on the next button
	// 			await page.click(nextSelector);
	// 		}
	// 	}

	// 	return reviewsData;
	// } catch (error) {
	// 	console.error("Error occurred:", error);
	// 	return [];
	// } finally {
	// 	if (browser) {
	// 		await browser.close();
	// 	}
	// }
}
