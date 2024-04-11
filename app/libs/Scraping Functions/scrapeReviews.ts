import { Page } from "puppeteer";

import { OptionProps } from "../types";

export async function scrapeReviews(page: Page, options: OptionProps) {
	const reviewData = await page.evaluate(
		(options: any) => {
			const reviewListContainer = document.querySelector(
				options?.reviewSelector.reviewListContainer
			);
			if (!reviewListContainer) return [];

			const reviews = reviewListContainer.querySelectorAll(
				options?.reviewSelector.reviewContainer
			);

			const result: {
				headline: string | null;
				reviewText: string | null;
				verifiedBuyer: boolean;
				stars: string | null;
			}[] = [];

			Array.from(reviews).map((review: any) => {
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
		options.reviewsLimit
	);
	return reviewData;
}
