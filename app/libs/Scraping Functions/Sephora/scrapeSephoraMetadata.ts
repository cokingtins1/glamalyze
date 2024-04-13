import { OptionProps } from "../../types";
import { Page } from "puppeteer";
import { loadSephoraContent } from "./loadSephoraContent";

export async function scrapeSephoraMetadata(page: Page, options: OptionProps) {
	await loadSephoraContent(page);

	//Reviews Metadata:
	const {
		priceSelector,
		totalReviewsSelector,
		averageRatingSelector,
		reviewDistSelector,
		recommendedSelector,
	} = options.globalSelector;

	const metaData = await page.evaluate(
		(
			priceSelector,
			totalReviewsSelector,
			averageRatingSelector,
			reviewDistSelector,
			recommendedSelector
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

			const recommendedEl =
				document.querySelector(recommendedSelector)?.textContent ||
				null;

			const reviewHistogram = document.querySelector(
				'[data-comp="HistogramChart "]'
			);
			const reviewHistItems =
				reviewHistogram?.querySelectorAll(reviewDistSelector);
			let reviewHistData: (number | null)[] = [];

			if (reviewHistItems && reviewHistItems.length > 0) {
				reviewHistData = Array.from(reviewHistItems).map((item) => {
					const regex = /(\d+)/;
					const countElement = item.getAttribute("style");
					const match = countElement?.match(regex);
					const width = match ? parseInt(match[0]) : null;
					return width;
				});
			}

			const company = "Sephora";
			return {
				company,
				price,
				totalReviews,
				averageRating,
				reviewHistData,
				recommended,
			};
		},
		priceSelector,
		totalReviewsSelector,
		averageRatingSelector,
		reviewDistSelector,
		recommendedSelector
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
