import { SephoraProduct, UltaProduct } from "@prisma/client";
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
		brandId: string;
	};
};

export const querySchema = z.object({
	query: z.string().min(1, { message: "Please enter a valid URL" }),
});

export type TQuerySchema = z.infer<typeof querySchema>;

export const scrapeSchema = z.object({
	retailer: z.string(),
	target: z.string(),
	startIndex: z.string().max(1),
	endIndex: z.string().max(1),
	brandUrl: z.string(),
	// .refine(

	// 	(value) => {

	// 		return value === undefined || value.includes("ulta.com") || value.includes("sephora.com");
	// 	},
	// 	{
	// 		message:
	// 			"Brand URL must contain either 'ulta.com' or 'sephora.com'",
	// 	}
	// ),
});

export type TScrapeSchema = z.infer<typeof scrapeSchema>;

export type SearchParams = { [key: string]: string | string[] | undefined };

export type SearchResults = {
	data: AllProducts & {
		product_name_similarity_score: number | null;
		product_name_word_similarity_score: number | null;
	};
};

export type AllProducts = UltaProduct | SephoraProduct;
