import { z } from "zod";

export type OptionProps = {
	reviewSelector: {
		reviewListContainer?: string;
		reviewContainer?: string;
		headline?: string;
		reviewText?: string;
		verifiedBuyer?: string;
		rating?: string;
	};
	globalSelector: {
		nextPageSelector: string;
		priceSelector: string;
		totalReviewsSelector: string;
		averageRatingSelector: string;
		reviewDistSelector: string;
	};
	filters: {
		mostHelpful: { selector: string; name: string };
	};
	paginationLimit?: number;
	reviewsLimit?: number;
};

export type MetaData = {
	price: string | null;
	totalReviews: string | null;
	averageRating: number | null;
	reviewHistData: (number | null)[] | null;
};

export type Review = {
	headline: string | null;
	reviewText: string | null;
	verifiedBuyer: boolean;
	stars: number | null;
};

export const querySchema = z.object({
	url: z.string().min(2, { message: "Please enter a valid URL" }),
});

export type TQuerySchema = z.infer<typeof querySchema>;
