import { AllProducts, AllProductsSelectors } from "../../types";
import { Page } from "puppeteer";

export async function scrapeAllSephoraProducts(
	page: Page,
	options: AllProductsSelectors
) {
	// page.on("console", (msg) => console.log("PAGE LOG:", msg.text()));

	const productData = await page.evaluate((options) => {
		function getNumber(text: string | null): number | null {
			if (!text) return 0;

			const regex = /(\d{1,3}(,\d{3})*(\.\d+)?)/;
			const match = text.match(regex);

			if (!match) return 0;

			let numberString = match[0].replace(/[^\d.]/g, "");
			let numberValue: number;

			if (numberString.includes(".")) {
				numberValue = parseFloat(numberString);
			} else {
				numberValue = parseInt(numberString, 10);
			}

			if (text.toLowerCase().includes("k")) {
				numberValue *= 1000;
			}

			return numberValue;
		}

		function getSku(url: string | null): string {
			if (!url) return "SKU ERROR";

			const regex = /skuId=(\d+)/;
			const match = url.match(regex);
			return match ? match[1] : "SKU ERROR";
		}

		function parseImageUrl(url: string | null): string[] {
			if (!url) return ["URL ERROR"];

			const parsedString = url.split(" ");

			if (parsedString.length !== 4) return [url];

			const [smallImage, one, largeImage, two] = parsedString;

			return [smallImage, largeImage];
		}

		const {
			allProductsContSelector,
			productCardContSelector,
			productNameSelector,
			productImageSelector,
			brandNameSelector,
			productPriceSelector,
			skuIdSelector,
			avgRatingSelector,
			totalReviewsSelector,
			pageLinkSelector,

			loadMoreSelector,
			brandId,
		} = options;

		const allProductsCont = document.querySelector(allProductsContSelector);
		console.log("allProductsCont:", allProductsCont);

		if (!allProductsCont) return [];

		const resultsEl = document.querySelector(
			'[data-at="number_of_products"]'
		);

		if (!resultsEl) return [];

		const totalResultsText = resultsEl.textContent?.trim();
		if (!totalResultsText) return [];

		console.log("totalResultsText:", totalResultsText);

		const resultsNum = parseInt(
			totalResultsText.split(" ")[0].replace(/\D/g, "")
		);

		console.log("resultsNum:", resultsNum);

		if (Number.isNaN(resultsNum)) return [];

		const result: AllProducts[] = [];
		Array.from({ length: resultsNum }).forEach((order, index) => {
			let selector: string = "";
			if (index < 60) {
				console.log("INDEX:", index);
				selector = `div[style="order:${index}"]`;
				console.log("SELECTOR:", selector);
			} else if (index >= 60) {
				selector = `div[style="order: ${index};"]`;
			}

			const productCard = allProductsCont.querySelector(selector);

			console.log("PRODUCTCARD:", !!productCard);

			if (!productCard) return [];
			const productNameEl =
				productCard.querySelector(productNameSelector);

			console.log("PRODUCT NAME EL:", !!productNameEl);

			const productName = productNameEl
				? productNameEl.textContent
				: null;

			if (!productName) {
				console.log("PRODUCT NAME:", productName);
			}
			const productImageEl =
				productCard.querySelector(productImageSelector);
			const productSourceEl = productImageEl
				? productImageEl.querySelector("source")
				: null;
			const productImageUrlText = productSourceEl
				? productSourceEl.getAttribute("srcset")
				: null;
			const productImageUrl = parseImageUrl(productImageUrlText);

			const brandNameEl = productCard.querySelector(brandNameSelector);
			const brandName = brandNameEl ? brandNameEl.textContent : null;

			const productPriceContEl =
				productCard.querySelector(productPriceSelector);
			const productPriceRange = productPriceContEl
				? productPriceContEl.querySelectorAll("span")
				: [];

			let productPrices: number[] = [];

			if (productPriceRange.length > 0) {
				productPriceRange.forEach((element) => {
					const priceText = element.textContent;
					if (priceText) {
						const parsedPrice = priceText?.split(" ");

						if (parsedPrice?.length === 3) {
							const [minPriceText, _, maxPriceText] = parsedPrice;
							productPrices.push(getNumber(minPriceText) ?? 0);
							productPrices.push(getNumber(maxPriceText) ?? 0);
						} else {
							productPrices.push(getNumber(priceText) ?? 0);
						}
					}
				});
			}

			const pageLinkEl = productCard.querySelector(pageLinkSelector);
			const pageLink = pageLinkEl
				? pageLinkEl.getAttribute("href")
				: null;

			const skuId = pageLink ? getSku(pageLink) : null;

			const avgRatingEl = productCard.querySelector(avgRatingSelector);
			const avgRating = avgRatingEl
				? avgRatingEl.getAttribute("style")
				: null;

			const totalReviewsEl =
				productCard.querySelector(totalReviewsSelector);
			const totalReviews = totalReviewsEl
				? totalReviewsEl.textContent
				: null;

			result.push({
				product_id: crypto.randomUUID(),
				product_name: productName,
				product_image_url: productImageUrl,
				retailer_id: "Sephora",
				brand_id: brandId,
				brand_name: brandName,
				product_price_range: productPrices,
				sku_id: skuId,
				avg_rating: getNumber(avgRating),
				total_reviews: getNumber(totalReviews),
				page_link: pageLink,
				created_at: null,
				updated_at: null,
				product_price: null,
				percent_recommended: null,
				review_histogram: [],
			});
		});

		return result;
	}, options.selectors);

	if (productData.length > 0) {
		productData.forEach((p) => {
			p.created_at = new Date();
			p.updated_at = new Date();
		});
	}

	return productData;
}
