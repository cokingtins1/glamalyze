"use server";

import { runUltaAllProductsScraper } from "../libs/Scraping Functions/Ulta-AllProducts/runUltaAllProductsScraper";
import { AllProducts } from "../libs/types";

export async function getAllUltaProducts(
	url: string | null,
	brandId: string
): Promise<AllProducts[]> {
	if (!url) return [];

	try {
		const allProducts = await runUltaAllProductsScraper(url as string, {
			sephoraSelectors: {
				allProductsContSelector: '[data-test="products-list"]',
				productCardContSelector:
					".Text-ds.Text-ds--title-6.Text-ds--left",
				productNameSelector: ".Text-ds.Text-ds--body-2.Text-ds--left",
				productImageSelector: ".Image img",
				brandNameSelector:
					".Text-ds.Text-ds--body-2.Text-ds--left.Text-ds--neutral-600",
				productPriceSelector:
					".Text-ds.Text-ds--body-2.Text-ds--left.Text-ds--black",
				skuIdSelector: "string",
				avgRatingSelector: ".sr-only",
				totalReviewsSelector: '[data-at="review_count"]',
				pageLinkSelector: ".Link_Huge.Link_Huge--secondary",

				loadMoreSelector:
					".Button-ds.LoadContent__button.Button-ds--compact.Button-ds--withHover.Button-ds--secondary",
				brandId: brandId,
			},
		});

		return allProducts;
	} catch (error) {
		console.log(error);

		return [];
	}
}
