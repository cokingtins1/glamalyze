import { Page } from "puppeteer";

import { OptionProps } from "../../types";
import { Review } from "@prisma/client";

export async function scrapeSephoraReviews(page: Page, options: OptionProps) {
	const reviewData = await page.evaluate((options: any) => {
		const reviewListContainer = document.querySelectorAll(
			options?.reviewSelector.reviewListContainer
		)[1];

		if (!reviewListContainer) return [];

		const reviews = reviewListContainer.querySelectorAll(
			options?.reviewSelector.reviewContainer
		);

		const result: Review[] = [
			{
				review_id: "",
				product_id: "",
				retailer_id: "",
				review_headline: null,
				review_text: null,
				review_rating: null,
				review_date: null,
				reviewer_name: null,
				reviewer_id: "",
				verified_buyer: null,
				up_votes: null,
				down_votes: null,
			},
		];

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
			const rating = ratingEl ? parseInt(ratingEl || "0") : null;

			result.push({
				review_id: crypto.randomUUID(),
				product_id: "",
				retailer_id: "",
				review_headline: header,
				review_text: reviewText,
				review_rating: rating,
				review_date: null, // Need to scrape
				reviewer_name: null, // Need to scrape
				reviewer_id: "", 
				verified_buyer: verifiedBuyer,
				up_votes: null, // Need to scrape
				down_votes: null, // Need to scrape
			});
		});

		return result;
	}, options);
	return reviewData;
}
