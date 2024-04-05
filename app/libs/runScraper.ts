import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

type OptionProps = {
	reviewSelector: {
		reviewListContainer?: string;
		reviewContainer?: string;
		headline?: string;
		reviewText?: string;
		verifiedBuyer?: string;
		rating?: string;
	};
	globalSelector: {
		nextPageSelector: string;
	};
	paginationLimit?: number;
	reviewsLimit?: number;
};

export async function runScraper(url: string, options: OptionProps) {
	if (!url || !options) return [];
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

		let reviewsData = [];
		let moreReviewsExist = true;
		let count = 0;
		let reviewCount = 0;

		while (moreReviewsExist) {
			count++;

			await page.evaluate(() =>
				window.scrollBy(0, window.innerHeight * 2)
			);
			await delay(1000);
			await page.evaluate(() => window.scrollBy(0, -window.innerHeight));

			const nextSelector = options.globalSelector.nextPageSelector;
			const moreReviews = await page.$(nextSelector);

			if (
				!moreReviews ||
				(options?.paginationLimit && count >= options.paginationLimit)
			) {
				moreReviewsExist = false;
			} else {
				const reviewData = await page.evaluate((options: any) => {
					const reviewListContainer = document.querySelector(
						options?.reviewSelector.reviewListContainer
					);
					if (!reviewListContainer) return [];

					const reviews = reviewListContainer.querySelectorAll(
						options?.reviewSelector.reviewContainer
					);

					return Array.from(reviews).map((review: any) => {
						if (
							options.reviewsLimit &&
							reviewCount === options.reviewsLimit
						)
							return;
						const headerEl = review.querySelector(
							options?.reviewSelector.headline
						);
						const reviewEl = review.querySelector(
							options?.reviewSelector.reviewText
						);
						const ratingEl = review.querySelector(
							options?.reviewSelector.rating
						);
						const verifiedBuyerEl = review.querySelector(
							options?.reviewSelector.verifiedBuyer
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

						reviewCount++;

						return {
							headline: header,
							reviewText: reviewText,
							verifiedBuyer: verifiedBuyer,
							stars: stars,
						};
					});
				}, options);

				reviewsData.push(...reviewData);
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
