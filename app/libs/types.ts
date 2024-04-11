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
	averageRating: string | null;
	reviewHistData: (number | null)[] | null;
};

export type Review = {
	headline: string | null;
	reviewText: string | null;
	verifiedBuyer: boolean;
	stars: string | null;
};
