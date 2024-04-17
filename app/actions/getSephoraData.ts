"use server";

import { runSephoraScraper } from "../libs/Scraping Functions/Sephora/runSephoraScraper";

export async function getSephoraData(url: string) {
	try {
		// Sephora Scraper:
		const { metaData, reviewsData } = await runSephoraScraper(
			url as string,
			{
				reviewSelector: {
					reviewListContainer: ".css-1l6ttej.eanm77i0", //Done
					reviewContainer: ".css-13o7eu2.eanm77i0", //Done
					headline: ".css-m9drnf.eanm77i0", //Done
					reviewText: ".css-1pw69zl.eanm77i0", //Done

					rating: ".css-mu0xdx", //Done
					verifiedBuyer: '[data-at="verified_purchase_badge"]', //Done
				},
				globalSelector: {
					nextPageSelector: ".css-140qkrj", // Done
					priceSelector: ".css-18jtttk", // Done
					totalReviewsSelector: ".css-nv7myq.eanm77i0", //Done
					averageRatingSelector: ".css-1ac1x0l.eanm77i0", //Done
					reviewDistSelector:
						".Histogram-bar.css-rw2r6e.eanm77i0", //not used
					recommendedSelector: ".css-1ac1x0l.eanm77i0",
					brandNameSelector: '[data-at="brand_name"]',
					productNameSelector: '[data-at="product_name"]'
					
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
