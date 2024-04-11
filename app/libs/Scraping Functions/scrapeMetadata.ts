import { loadContent } from "../loadContent";
import { OptionProps } from "../types";
import { Page } from "puppeteer";

export async function scrapeMetadata(page: Page, options: OptionProps) {
	await loadContent(page);

	//Reviews Metadata:
	const {
		priceSelector,
		totalReviewsSelector,
		averageRatingSelector,
		reviewDistSelector,
	} = options.globalSelector;

	const metaData = await page.evaluate(
		(
			priceSelector,
			totalReviewsSelector,
			averageRatingSelector,
			reviewDistSelector
		) => {
			const priceParent = document.querySelector(priceSelector);
			const price = priceParent?.firstElementChild?.textContent || null;

			const totalReviews =
				document.querySelector(totalReviewsSelector)?.textContent ||
				null;

			const averageRatingText =
				document.querySelector(averageRatingSelector)?.textContent ||
				null;
			const averageRating =
				averageRatingText !== null
					? parseFloat(averageRatingText)
					: null;

			const reviewHistogram = document.querySelector(reviewDistSelector);
			const reviewHistItems = reviewHistogram?.querySelectorAll("li");
			let reviewHistData: (number | null)[] = [];

			if (reviewHistItems && reviewHistItems.length > 0) {
				reviewHistData = Array.from(reviewHistItems).map((item) => {
					const countElement = item.querySelector(
						".pr-histogram-count"
					);
					return countElement
						? parseInt(countElement.textContent as string)
						: null;
				});
			}

			return { price, totalReviews, averageRating, reviewHistData };
		},
		priceSelector,
		totalReviewsSelector,
		averageRatingSelector,
		reviewDistSelector
	);

	// if (!metaData) {
	// 	// Handle case where metaData is an empty array (never[])
	// 	return null;
	// }
	//average rating
	//rating distribution

	//price

	return metaData;
}
