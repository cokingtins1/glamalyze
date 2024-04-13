import { Page } from "puppeteer";

import { OptionProps } from "../../types";

export async function scrapeSephoraReviews(page: Page, options: OptionProps) {
	const reviewData = await page.evaluate(
		(options: any) => {
			const reviewListContainer = document.querySelectorAll(
				options?.reviewSelector.reviewListContainer
			)[1];

			if (!reviewListContainer) return [];

			const reviews = reviewListContainer.querySelectorAll(
				options?.reviewSelector.reviewContainer
			);

			const result: {
				headline: string | null;
				reviewText: string | null;
				verifiedBuyer: boolean;
				stars: number | null;
			}[] = [];

			reviews.forEach((review: any) => {
				const headerEl = review.querySelector(
					options?.reviewSelector.headline
				);

				const reviewEl = review.querySelector(
					options?.reviewSelector.reviewText
				);
				const ratingEl = review
					.querySelector(options?.reviewSelector.rating)
					?.getAttribute("aria-label");

				const verifiedBuyerEl = review.querySelector(
					options?.reviewSelector.verifiedBuyer
				);

				const verifiedBuyer = verifiedBuyerEl !== null;

				const header = headerEl
					? (headerEl as HTMLHeadingElement).textContent
					: null;
				const reviewText = reviewEl
					? (reviewEl as HTMLDivElement).textContent
					: null;
				const stars = ratingEl ? parseInt(ratingEl || "0") : null; 

				result.push({
					headline: header,
					reviewText: reviewText,
					verifiedBuyer: verifiedBuyer,
					stars: stars,
				});
			});

			return result;
		},
		options,
	);
	return reviewData;
}
