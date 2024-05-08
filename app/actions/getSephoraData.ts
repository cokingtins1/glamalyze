"use server";

import { SephoraProduct } from "@prisma/client";
import { runSephoraScraper } from "../libs/Scraping Functions/Sephora/runSephoraScraper";
import { MetaData, Review } from '../libs/types';

export async function getSephoraData(
	url: string | null, productId: string
): Promise<{ metaData: MetaData; reviewsData: Review[] }> {
	try {
		const { metaData, reviewsData } = await runSephoraScraper(
			url as string,
			productId,
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
		const metaData: MetaData = {
			product_id: productId,
			review_histogram: [],
			product_price: null
			
		};
		return { metaData, reviewsData: [] };
	}
}
