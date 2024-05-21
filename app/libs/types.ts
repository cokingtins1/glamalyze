import {
	SephoraProduct,
	SephoraReview,
	SharedProduct,
	UltaProduct,
	UltaReview,
} from "@prisma/client";
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
		productId: string;
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
		productId: string;
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
	query: z.string().min(1, { message: "Please enter a search term" }),
	ulta: z.boolean(),
	sephora: z.boolean(),
});

export type TQuerySchema = z.infer<typeof querySchema>;

export const chatSchema = z.object({
	reviewsText: z.string().optional(),
	prompt: z.string().optional(),
});

export type TChatSchema = z.infer<typeof chatSchema>;

export const scrapeSchema = z.object({
	retailer: z.enum(["Ulta", "Sephora", "Shared"], {
		errorMap: () => ({ message: "Select a Retailer" }),
	}),
	target: z.enum(["Reviews", "Products", "Brands"], {
		errorMap: () => ({ message: "Select a Target" }),
	}),
	startIndex: z
		.string()
		.max(1)
		.min(1, { message: "A start index is required" }),
	endIndex: z.string().max(1).min(1, { message: "An end index is required" }),
	// productLimit: z.string().transform((v) => Number(v) || Infinity),
	url: z.string().optional(),
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

export type MetaData = Pick<
	UltaProduct | SephoraProduct,
	| "product_id"
	| "review_histogram"
	| "product_price"
	| "retailer_id"
	| "avg_rating"
	| "percent_recommended"
	| "total_reviews"
	| "product_image_url"
>;

export type ScrapeResponse = {
	status: {
		success: boolean;
		messasge: string;
	};
};

export type Review = UltaReview | SephoraReview;

export type ScrapeReturnMessage = {
	message: {
		executionTime: string;
		scrapeIndex: string;
		error: string;
	};
};

export type ReviewsScrape = {
	metaData: MetaData;
	reviewsData: Review[];
	response: ScrapeResponse;
};

export type SharedLinks = {
	id: string[];
	sharedId: string[];
	page_link: string[];
	name: string[];
	total_reviews: number[];
};

export type QueryResult = {
	filteredShared: SharedProduct[];
	filteredUlta: AllProducts[];
	filteredSephora: AllProducts[];
};
