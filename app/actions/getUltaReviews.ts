"use server";

import { runUltaScraper } from "../libs/Scraping Functions/Ulta/runUltaScraper";
import { MetaData, ReviewsScrape } from "../libs/types";

export async function getUltaReviews(
	url: string | null,
	productId: string,
	reviewsPresent: boolean
): Promise<ReviewsScrape> {
	try {
		const { metaData, reviewsData, response } = await runUltaScraper(
			url as string,
			productId,
			reviewsPresent,
			{
				reviewSelector: {
					reviewListContSelector: '[data-testid="review-list"]',
					reviewContSelector: ".pr-review",
					headlineSelector: ".pr-rd-review-headline.pr-h2",
					reviewTextSelector: ".pr-rd-description-text",
					reviewDateSelector:
						".pr-rd-details.pr-rd-author-submission-date",
					reviewerNameSelector:
						".pr-rd-details.pr-rd-author-nickname",
					ratingSelector: ".pr-snippet-rating-decimal",
					verifiedBuyerSelector: ".pr-rd-badging-text",
					upVoteSelector:
						".pr-helpful-voting.pr-rd-helpful-action-btn-group",
					downVoteSelector: "",
					productId: productId,
				},
				globalSelector: {
					nextPageSelector:
						".pr-rd-pagination-btn.pr-rd-pagination-btn--next",
					priceSelector: ".ProductPricing",
					totalReviewsSelector: ".pr-snippet-review-count",
					averageRatingSelector: ".pr-snippet-rating-decimal",
					reviewDistSelector:
						".pr-ratings-histogram.pr-histogram-list",
					recommendedSelector: ".pr-reco-value",
					brandNameSelector: ".Link_Huge.Link_Huge--compact",
					productNameSelector:
						".Text-ds.Text-ds--title-5.Text-ds--left",
					productId: productId,
				},
				paginationLimit: 3,
				reviewsLimit: 5,
				filters: {
					mostHelpful: {
						selector: "#pr-rd-sort-by",
						name: "mosthelpful",
					},
				},
			}
		);

		if (Array.isArray(reviewsData)) {
			return { metaData, reviewsData, response };
		} else {
			throw new Error("No reviews data found");
		}
	} catch (error) {
		console.log(error);
		const metaData: MetaData = {
			product_id: productId,
			review_histogram: [],
			product_price: null,
			retailer_id: "Ulta",
			avg_rating: null,
			percent_recommended: null,
			total_reviews: null,
		};

		return {
			metaData,
			reviewsData: [],
			response: { status: { success: false, messasge: "" } },
		};
	}
}
