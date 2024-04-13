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
			function getNumber(text: string | null) {
				if (!text) return null;
				const regex = /(\d+)/;
				const match = text.match(regex);

				const number = match ? parseInt(match[0]) : null;
				return number;
			}

			const priceParent = document.querySelector(priceSelector);
			const price = priceParent?.firstElementChild?.textContent || null;

			const totalReviewsText =
				document.querySelector(totalReviewsSelector)?.textContent ||
				null;

			const totalReviews = getNumber(totalReviewsText);

			const averageRatingText =
				document.querySelector(averageRatingSelector)?.textContent ||
				null;
			const averageRating =
				averageRatingText !== null
					? parseFloat(averageRatingText)
					: null;

			const recommendedText =
				document.querySelectorAll(recommendedSelector)[1].textContent ||
				null;

			let recommended;
			if (recommendedText) recommended = getNumber(recommendedText);

			const reviewHistogram = document.querySelector(
				'[data-comp="HistogramChart "]'
			);
			const reviewHistItems =
				reviewHistogram?.querySelectorAll(reviewDistSelector);
			let reviewHistData: (number | null)[] = [];

			if (reviewHistItems && reviewHistItems.length > 0) {
				reviewHistData = Array.from(reviewHistItems).map((item) => {
					const countElement = item.getAttribute("style");

					const width = getNumber(countElement);

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
