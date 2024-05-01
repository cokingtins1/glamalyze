import { loadContent } from "./loadContent";
import { OptionProps } from "../../types";
import { Page } from "puppeteer";
import { UltaProduct } from "@prisma/client";

export async function scrapeUltaMetadata(page: Page, options: OptionProps) {
	await loadContent(page);

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

		const result: UltaProduct = {
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

		result.retailer_id = "Ulta";
		const path = window.location.href;

		result.sku_id = path ? getSku(new URL(path), "Ulta") : null;

		const productInfoContSel = ".ProductInformation";
		const productInfoCont = document.querySelector(productInfoContSel);

		const brandNameEl = productInfoCont
			? productInfoCont.querySelector(brandNameSelector)
			: null;

		result.brand_name = brandNameEl?.textContent || null;

		const productNameEl =
			productInfoCont?.querySelector(productNameSelector);

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
			document.querySelector(recommendedSelector)?.textContent || null;

		if (recommendedText)
			result.percent_recommended = getNumber(recommendedText);

		const reviewHistogram = document.querySelector(reviewDistSelector);
		const reviewHistItems = reviewHistogram?.querySelectorAll("li");

		let reviewHistData: number[] = [];

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
