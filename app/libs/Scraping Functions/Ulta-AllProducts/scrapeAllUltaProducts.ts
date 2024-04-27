import { AllProductsSelectors } from "../../types";
import { Page } from "puppeteer";
import { AllProducts } from "@prisma/client";

export async function scrapeAllUltaProducts(
	page: Page,
	options: AllProductsSelectors
) {
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
		} = options;

		const allProductsCont = document.querySelector(allProductsContSelector);

		if (!allProductsCont) return [];

		const resultsEl = document.querySelector(
			".Text-ds.Text-ds--title-6.Text-ds--left"
		);

		if (!resultsEl) return [];

		const totalResultsText = resultsEl.textContent?.trim();
		if (!totalResultsText) return [];

		const resultsNum = parseInt(
			totalResultsText.split(" ")[0].replace(/\D/g, "")
		);

		const result: AllProducts[] = [];

		const productCard = allProductsCont.querySelectorAll("li");

		productCard.forEach((card: Element) => {
			const skuId = card.getAttribute("data-sku-id");

			if (!skuId) return [];

			const productNameParent = card.querySelector(
				".ProductCard__product"
			);

			const productNameEl = productNameParent
				? productNameParent.querySelector(":scope > span")
				: null;

			const productName = productNameEl
				? productNameEl.textContent
				: null;

			const productImageEl = card.querySelector(productImageSelector);

			const productImageUrlText = productImageEl
				? productImageEl.getAttribute("src")
				: null;

			const productImageUrl = productImageUrlText ?? "";

			const brandNameEl = card.querySelector(brandNameSelector);
			const brandName = brandNameEl ? brandNameEl.textContent : null;

			const productPriceContEl = card.querySelector(productPriceSelector);

			const productPriceRangeText = productPriceContEl
				? productPriceContEl.textContent
				: "";

			let productPrices: number[] = [];

			if (productPriceRangeText) {
				const parsedPrice = productPriceRangeText.split(" ");

				if (parsedPrice?.length === 4) {
					const [minPriceText, _, maxPriceText] = parsedPrice;
					productPrices.push(getNumber(minPriceText) ?? 0);
					productPrices.push(getNumber(maxPriceText) ?? 0);
				} else {
					productPrices.push(getNumber(productPriceRangeText) ?? 0);
				}
			}

			const pageLinkEl = card.querySelector(pageLinkSelector);
			const pageLink = pageLinkEl
				? pageLinkEl.getAttribute("href")
				: null;

			const avgRatingCont = card.querySelector(".ReviewStarsCard");
			const avgRatingEl = avgRatingCont
				? avgRatingCont.querySelector(avgRatingSelector)
				: null;
			const avgRatingText = avgRatingEl ? avgRatingEl.textContent : null;

			let avgRating = 0.0;
			let totalReviews = 0;
			if (avgRatingText) {
				const textArray = avgRatingText.split(" ");

				avgRating = parseFloat(textArray[0]);
				totalReviews = parseInt(textArray[6]);
			}

			result.push({
				product_id: crypto.randomUUID(),
				product_name: productName,
				product_image_url: [productImageUrl],
				retailer_id: "Ulta123",
				brand_id: crypto.randomUUID(),
				brand_name: brandName,
				product_price: productPrices,
				sku_id: skuId,
				avg_rating: avgRating,
				total_reviews: totalReviews,
				page_link: pageLink,
			});
		});

		Array.from({ length: resultsNum }).forEach((order, index) => {
			let selector: string = "";
			if (index < 60) {
				selector = `div[style*="order:${index}"]`;
			} else if (index >= 60) {
				selector = `div[style*="order: ${index};"]`;
			}

			const productCard = allProductsCont.querySelector(selector);

			if (!productCard) return [];
			const productNameEl =
				productCard.querySelector(productNameSelector);

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
