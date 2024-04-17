"use server";

import { Review, SephoraProduct } from "@prisma/client";
import { runSephoraScraper } from "../libs/Scraping Functions/Sephora/runSephoraScraper";

export async function getSephoraData(
	url: string
): Promise<{ metaData: SephoraProduct; reviewsData: Review[] }> {
	try {
		// Sephora Scraper:
		const { metaData, reviewsData } = await runSephoraScraper(
			url as string,
			{
				reviewSelector: {
					reviewListContSelector: ".css-1l6ttej.eanm77i0", //Done
					reviewContSelector: ".css-13o7eu2.eanm77i0", //Done
					headlineSelector: ".css-m9drnf.eanm77i0", //Done
					reviewTextSelector: ".css-1pw69zl.eanm77i0", //Done
					reviewDateSelector: '[data-at="time_posted"]',
					reviewerNameSelector: ".css-11cofee.eanm77i0",
					ratingSelector: ".css-mu0xdx", //Done
					verifiedBuyerSelector:
						'[data-at="verified_purchase_badge"]', //Done
					upVoteSelector: ".css-36ie0l",
					downVoteSelector: ".css-36ie0l",
				},
				globalSelector: {
					nextPageSelector: ".css-140qkrj", // Done
					priceSelector: ".css-18jtttk", // Done
					totalReviewsSelector: ".css-nv7myq.eanm77i0", //Done
					averageRatingSelector: ".css-1ac1x0l.eanm77i0", //Done
					reviewDistSelector: ".Histogram-bar.css-rw2r6e.eanm77i0", //not used
					recommendedSelector: ".css-1ac1x0l.eanm77i0",
					brandNameSelector: '[data-at="brand_name"]',
					productNameSelector: '[data-at="product_name"]',
				},
				paginationLimit: 3,
				reviewsLimit: 5,
				filters: {
					mostHelpful: {
						selector: "#custom_sort", //Done
						name: "mosthelpful", // Not used
					},
				},
			}
		);

		// console.log("metaData and reviewsData:", metaData, reviewsData);
		return { metaData, reviewsData };
	} catch (error) {
		console.log(error);
		const metaData: SephoraProduct = {
			product_id: "",
			product_name: null,
			brand_name: null,
			price: null,
			total_reviews: null,
			avg_rating: null,
			percent_recommended: null,
			review_histogram: [],
			sku_id: null,
		};
		return { metaData, reviewsData: [] };
	}
}
