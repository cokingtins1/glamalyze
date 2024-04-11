import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

export async function puppeteerScraper(url: string) {
	if (!url) return;
	const start = new Date().getTime();

	function delay(time: number) {
		return new Promise(function (resolve) {
			setTimeout(resolve, time);
		});
	}
	puppeteer.use(StealthPlugin());

	try {
		const browser = await puppeteer.launch({ headless: true });
		const page = await browser.newPage();
		await page.goto(url);

		// const consentButton = await page.$("#onetrust-accept-btn-handler");
		// console.log("consent button", consentButton);
		// if (consentButton) {
		// 	await consentButton.click();
		// }

		//next pagination
		let reviewsData = [];
		let moreReviewsExist = true;
		let count = 0;

		while (moreReviewsExist) {
			count++;

			await page.evaluate(() => window.scrollBy(0, window.innerHeight));
			await page.keyboard.down("End");
			await page.keyboard.down("End");
			await page.keyboard.down("End");

			await delay(500);
			await page.evaluate(() => {
				window.scrollBy(0, -500);
			});
			// await delay(500);

			await page.evaluate(() => {
				window.scrollBy(0, -200);
			});

			// await delay(500);

			await page.evaluate(() => {
				window.scrollBy(0, -200);
			});

			const nextSelector =
				".pr-rd-pagination-btn.pr-rd-pagination-btn--next";

			const moreReviews = await page.$(nextSelector);
			console.log("moreReviews", !!moreReviews, moreReviews);

			if (!moreReviews || count >= 2) {
				moreReviewsExist = false;
			} else {
				const commentSelector = "#pr-review-display";
				await page.waitForSelector(commentSelector);
				// console.log("comments found:", await page.$(commentSelector));

				const reviewData = await page.evaluate(() => {
					const reviewList = document.querySelector(
						'[data-testid="review-list"]'
					);
					if (!reviewList) return [];

					const reviews = reviewList.querySelectorAll(".pr-review");

					return Array.from(reviews).map((review) => {
						const headerEl = review.querySelector(
							".pr-rd-review-headline.pr-h2"
						);

						const reviewEl = review.querySelector(
							".pr-rd-description-text"
						);
						const ratingEl = review.querySelector(
							".pr-snippet-rating-decimal"
						);

						const verifiedBuyerEl = review.querySelector(
							".pr-rd-badging-text"
						);

						const verifiedBuyer = verifiedBuyerEl !== null;

						const header = headerEl
							? (headerEl as HTMLHeadingElement).textContent
							: null;

						const reviewText = reviewEl
							? (reviewEl as HTMLParagraphElement).textContent
							: null;
						const stars = ratingEl
							? (ratingEl as HTMLDivElement).textContent
							: null;

						return {
							headline: header,
							reviewText: reviewText,
							verifiedBuyer: verifiedBuyer,
							stars: stars,
						};
					});
				});
				reviewsData.push(...reviewData);
				// console.log("reviews Data", reviewsData);

				// Click on the next button
				await page.click(nextSelector);
			}
		}

		const end = new Date().getTime();

		console.log(`Execution time: ${(end - start) / 1000} seconds`);
		await browser.close();
		return reviewsData;
	} catch (error) {
		console.error("Error occurred:", error);
		return [];
	}
}
