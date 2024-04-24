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

export const querySchema = z.object({
	ultaUrl: z.string().min(2, { message: "Please enter a valid URL" }),
	sephoraUrl: z.string().min(2, { message: "Please enter a valid URL" }),
});

export type TQuerySchema = z.infer<typeof querySchema>;
