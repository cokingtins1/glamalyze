"use server";

import { runScraper } from "../libs/runScraper";

export async function getScrapedData(formData: FormData) {
	const url = formData.get("url");

	try {
		const { metaData, reviewsData } = await runScraper(url as string, {
			reviewSelector: {
				reviewListContainer: '[data-testid="review-list"]',
				reviewContainer: ".pr-review",
				headline: ".pr-rd-review-headline.pr-h2",
				reviewText: ".pr-rd-description-text",

				rating: ".pr-snippet-rating-decimal",
				verifiedBuyer: ".pr-rd-badging-text",
			},
			globalSelector: {
				nextPageSelector:
					".pr-rd-pagination-btn.pr-rd-pagination-btn--next",
				priceSelector: ".ProductPricing",
				totalReviewsSelector: ".pr-snippet-review-count",
				averageRatingSelector: ".pr-snippet-rating-decimal",
				reviewDistSelector: ".pr-ratings-histogram.pr-histogram-list",
			},
			paginationLimit: 3,
			reviewsLimit: 5,
			filters: {
				mostHelpful: {
					selector: "#pr-rd-sort-by",
					name: "mosthelpful",
				},
			},
		});

		console.log("metaData and reviewsData:", metaData, reviewsData);
		if (Array.isArray(reviewsData)) {
			return { metaData, reviewsData };
		} else {
			throw new Error("No reviews data found");
		}
	} catch (error) {
		console.log(error);
		return { metaData: null, reviewsData: [] };
	}
}
