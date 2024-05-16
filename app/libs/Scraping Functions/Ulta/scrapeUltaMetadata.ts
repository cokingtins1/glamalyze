import { loadContent } from "./loadContent";
import { MetaData, OptionProps } from "../../types";
import { Page } from "puppeteer";

export async function scrapeUltaMetadata(page: Page, options: OptionProps) {
	await loadContent(page);

	// page.on("console", (msg) => console.log("PAGE LOG:", msg.text()));

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
			retailer_id: "Ulta",
			product_price: null,
			product_image_url: [],
		};

		result.retailer_id = "Ulta";

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
			document.querySelector(recommendedSelector)?.textContent || null;

		if (recommendedText)
			result.percent_recommended = getNumber(recommendedText);

		const reviewHistogram = document.querySelector(reviewDistSelector);
		const reviewHistItems = reviewHistogram?.querySelectorAll("li");

		let reviewHistData: number[] = [];

		let imageParent = document.querySelector(".CarouselMobile--Image");
		let imageCont = imageParent
			? imageParent.querySelector(".Image")
			: null;
		const imageEl = imageCont ? imageCont.querySelector("img") : null;
		const imageSrc = imageEl ? imageEl.getAttribute("src") : "";
		result.product_image_url.push(imageSrc as string);

		if (reviewHistItems && reviewHistItems.length > 0) {
			reviewHistData = Array.from(reviewHistItems).map((item) => {
				const countElement = item.querySelector(".pr-histogram-count");

				return countElement
					? parseInt(countElement.textContent as string)
					: 0;
			});
		}

		result.review_histogram = reviewHistData;

		return result;
	}, options.globalSelector);

	return metaData;
}
