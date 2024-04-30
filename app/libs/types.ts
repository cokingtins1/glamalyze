import { z } from "zod";

export type OptionProps = {
	reviewSelector: {
		reviewListContSelector: string;
		reviewContSelector: string;
		headlineSelector: string;
		reviewTextSelector: string;
		reviewDateSelector: string;
		reviewerNameSelector: string;
		ratingSelector: string;
		verifiedBuyerSelector: string;
		upVoteSelector: string;
		downVoteSelector: string;
	};
	globalSelector: {
		nextPageSelector: string;
		priceSelector: string;
		totalReviewsSelector: string;
		averageRatingSelector: string;
		reviewDistSelector: string;
		recommendedSelector: string;
		brandNameSelector: string;
		productNameSelector: string;
	};
	filters: {
		mostHelpful: { selector: string; name: string };
	};
	paginationLimit?: number;
	reviewsLimit?: number;
};

export type AllProductsSelectors = {
	sephoraByBrand?: {};
	sephoraSelectors: {
		allProductsContSelector: string;
		productCardContSelector: string;
		productNameSelector: string;
		productImageSelector: string;
		brandNameSelector: string;
		productPriceSelector: string;
		skuIdSelector: string;
		avgRatingSelector: string;
		totalReviewsSelector: string;
		pageLinkSelector: string;
		loadMoreSelector: string;
	}
	
};

export const querySchema = z.object({
	ultaUrl: z.string().min(2, { message: "Please enter a valid URL" }),
	sephoraUrl: z.string().min(2, { message: "Please enter a valid URL" }),
});

export type TQuerySchema = z.infer<typeof querySchema>;

export const scrapeSchema = z.object({
	retailer: z.string(),
	target: z.string(),
	startIndex: z.string().max(1),
	endIndex: z.string().max(1)
	
})

export type TScrapeSchema = z.infer<typeof scrapeSchema>;

