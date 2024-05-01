import { OptionProps } from "../../types";
import { Page } from "puppeteer";
import { loadSephoraContent } from "./loadSephoraContent";
import { SephoraProduct } from "@prisma/client";

export async function scrapeSephoraMetadata(page: Page, options: OptionProps) {
	await loadSephoraContent(page);

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

		type Retailer = "Sephora" | "Ulta";
		function getSku(url: URL | null, retailer: Retailer) {
			if (!url) return null;

			let param;

			switch (retailer) {
				case "Sephora":
					param = "skuId";
					break;
				case "Ulta":
					param = "sku";
					break;
				default:
					param = "sku";
			}

			const searchParams = url.searchParams;
			const skuNum = searchParams.get(param);
			return skuNum;
		}

		const {
			priceSelector,
			totalReviewsSelector,
			averageRatingSelector,
			reviewDistSelector,
			recommendedSelector,
			brandNameSelector,
			productNameSelector,
		} = options;

		// for (const [key, value] of Object.entries(options)) {
		// 	console.log(`${key}: ${value}`);
		// }

		const result: SephoraProduct = {
			product_id: crypto.randomUUID(),
			sku_id: null,
			product_name: null,
			brand_name: null,
			price: null,
			total_reviews: null,
			avg_rating: null,
			percent_recommended: null,
			review_histogram: [],
			retailer_id: "",
			queries: [""],
		};

		result.retailer_id = "Sephora";
		const path = window.location.href;

		result.sku_id = path ? getSku(new URL(path), "Sephora") : null;

		const brandNameEl = document.querySelector(brandNameSelector);
		result.brand_name = brandNameEl?.textContent || null;

		const productNameEl = document.querySelector(productNameSelector);

		result.product_name = productNameEl?.textContent || null;

		const priceParent = document.querySelector(priceSelector);
		const priceText = priceParent?.firstElementChild?.textContent || null;

		result.price = getNumber(priceText);

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

	// if (!metaData) {
	// 	// Handle case where metaData is an empty array (never[])
	// 	return null;
	// }
	//average rating
	//rating distribution

	//price

	return metaData;
}
