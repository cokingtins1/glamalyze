"use server";

import { UltaProduct } from "@prisma/client";
import { runUltaScraper } from "../libs/Scraping Functions/Ulta/runUltaScraper";

export async function getUltaData(url: string) {
	try {
		const { metaData, reviewsData } = await runUltaScraper(url as string, {
			reviewSelector: {
				reviewListContSelector: '[data-testid="review-list"]',
				reviewContSelector: ".pr-review",
				headlineSelector: ".pr-rd-review-headline.pr-h2",
				reviewTextSelector: ".pr-rd-description-text",
				reviewDateSelector:
					".pr-rd-details.pr-rd-author-submission-date",
				reviewerNameSelector: ".pr-rd-details.pr-rd-author-nickname",
				ratingSelector: ".pr-snippet-rating-decimal",
				verifiedBuyerSelector: ".pr-rd-badging-text",
				upVoteSelector:
					".pr-helpful-voting.pr-rd-helpful-action-btn-group",
				downVoteSelector: "",
			},
			globalSelector: {
				nextPageSelector:
					".pr-rd-pagination-btn.pr-rd-pagination-btn--next",
				priceSelector: ".ProductPricing",
				totalReviewsSelector: ".pr-snippet-review-count",
				averageRatingSelector: ".pr-snippet-rating-decimal",
				reviewDistSelector: ".pr-ratings-histogram.pr-histogram-list",
				recommendedSelector: ".pr-reco-value",
				brandNameSelector: ".Link_Huge.Link_Huge--compact",
				productNameSelector: ".Text-ds.Text-ds--title-5.Text-ds--left",
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

		if (Array.isArray(reviewsData)) {
			return { metaData, reviewsData };
		} else {
			throw new Error("No reviews data found");
		}
	} catch (error) {
		console.log(error);
		const metaData: UltaProduct = {
			product_id: "",
			product_name: null,
			brand_name: null,
			price: null,
			total_reviews: null,
			avg_rating: null,
			percent_recommended: null,
			review_histogram: [],
			sku_id: null,
			retailer_id: "",
			queries: [""],
		};
		return { metaData, reviewsData: [] };
	}
}
