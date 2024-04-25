import { AllProductsSelectors } from "../../types";
import { Page } from "puppeteer";
import { AllProducts } from "@prisma/client";

export async function scrapeAllProducts(
	page: Page,
	options: AllProductsSelectors
) {
	page.on("console", (msg) => console.log("PAGE LOG:", msg.text()));

	const productData = await page.evaluate((options) => {
		function getNumber(text: string | null): number | null {
			if (!text) return 69;

			const regex = /(\d{1,3}(,\d{3})*(\.\d+)?)/;
			const match = text.match(regex);

			if (!match) return 69;

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

		function getSku(url: string | null) {
			if (!url) return "SKU ERROR";

			const regex = /skuId=(\d+)/;
			const match = url.match(regex);
			return match ? match[1] : null;
		}

		const {
			allProductsContSelector,
			productCardContSelector,
			productNameSelector,
			productImageSelector, // get srcset
			brandNameSelector,
			productPriceSelector,
			skuIdSelector,
			avgRatingSelector, // get style width
			totalReviewsSelector,
			pageLinkSelector,

			loadMoreSelector,
		} = options;

		const allProductsCont = document.querySelector(allProductsContSelector);

		if (!allProductsCont) return [];

		const productCards = allProductsCont.querySelectorAll(
			productCardContSelector
		);

		if (!productCards) return [];

		const result: AllProducts[] = [];

		let count: number = 0;
		productCards.forEach((card: Element) => {
			count++;
			const productNameEl = card.querySelector(productNameSelector);

			const productName = productNameEl
				? productNameEl.textContent
				: null;

			if (!productName) {
				console.log("PRODUCT NAME:", count);
			}
			const productImageEl = card.querySelector(productImageSelector);
			const productSourceEl = productImageEl
				? productImageEl.querySelector("source")
				: null;
			const productImageUrl = productSourceEl
				? productSourceEl.getAttribute("srcset")
				: null;

			const brandNameEl = card.querySelector(brandNameSelector);
			const brandName = brandNameEl ? brandNameEl.textContent : null;

			const productPriceContEl = card.querySelector(productPriceSelector);
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

			const pageLinkEl = card.querySelector(pageLinkSelector);
			const pageLink = pageLinkEl
				? pageLinkEl.getAttribute("href")
				: null;

			const skuId = pageLink ? getSku(pageLink) : null;

			const avgRatingEl = card.querySelector(avgRatingSelector);
			const avgRating = avgRatingEl
				? avgRatingEl.getAttribute("style")
				: null;

			const totalReviewsEl = card.querySelector(totalReviewsSelector);
			const totalReviews = totalReviewsEl
				? totalReviewsEl.textContent
				: null;

			result.push({
				product_id: crypto.randomUUID(),
				product_name: productName,
				product_image_url: productImageUrl,
				retailer_id: "Sephora123",
				brand_id: crypto.randomUUID(),
				brand_name: brandName,
				product_price: productPrices,
				sku_id: skuId,
				avg_rating: getNumber(avgRating),
				total_reviews: getNumber(totalReviews),
				page_link: pageLink,
			});
		});

		return result;
	}, options.sephoraSelectors);

	return productData;
}
