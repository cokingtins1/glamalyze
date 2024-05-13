import { MetaData, OptionProps } from "../../types";
import { Page } from "puppeteer";
import { loadContent } from '../Ulta/loadContent';

export async function scrapeSephoraMetadata(page: Page, options: OptionProps) {
	await loadContent(page)

	const metaData = await page.evaluate((options) => {
		function getNumber(text: string | null): number | null {
			if (!text) return null;
			const regex = /(\d{1,3}(,\d{3})*(\.\d+)?)/;
			const match = text.match(regex);

			if (!match) return null;

			let numberString = match[0].replace(/[^\d.]/g, "");
			if (numberString.includes(".")) {
				return parseFloat(numberString);
			} else {
				return parseInt(numberString, 10);
			}
		}

		const {
			priceSelector,
			totalReviewsSelector,
			averageRatingSelector,
			reviewDistSelector,
			recommendedSelector,
			productId,
		} = options;

		// for (const [key, value] of Object.entries(options)) {
		// 	console.log(`${key}: ${value}`);
		// }

		const result: MetaData = {
			product_id: productId,
			avg_rating: null,
			percent_recommended: null,
			review_histogram: [],
			total_reviews: null,
			retailer_id: "Sephora",
			product_price: null,
		};

		result.retailer_id = "Sephora";

		const priceParent = document.querySelector(priceSelector);
		const priceText = priceParent?.firstElementChild?.textContent || null;

		result.product_price = getNumber(priceText);

		const totalReviewsText =
			document.querySelector(totalReviewsSelector)?.textContent || null;

		result.total_reviews = totalReviewsText
			? parseInt(totalReviewsText)
			: 0;

		const averageRatingText =
			document.querySelector(averageRatingSelector)?.textContent || null;

		result.avg_rating = getNumber(averageRatingText);

		const recommendedText =
			document.querySelectorAll(recommendedSelector)[1]?.textContent ||
			null;

		if (recommendedText)
			result.percent_recommended = getNumber(recommendedText);

		const reviewHistogram = document.querySelector(
			'[data-comp="HistogramChart "]'
		);
		const reviewHistItems =
			reviewHistogram?.querySelectorAll(reviewDistSelector);

		if (reviewHistItems && reviewHistItems.length > 0) {
			result.review_histogram = Array.from(reviewHistItems)
				.map((item) => {
					let width;
					const countElement = item.getAttribute("style");

					if (!countElement) {
						width = 0;
					} else {
						width = getNumber(countElement);
					}

					return width;
				})
				.filter((width) => width !== null) as number[];
		}

		return result;
	}, options.globalSelector);

	return metaData;
}
