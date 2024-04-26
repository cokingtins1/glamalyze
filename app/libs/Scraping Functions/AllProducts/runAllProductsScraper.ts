import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

import { AllProductsSelectors } from "../../types";

import { AllProducts } from "@prisma/client";
import { loadAllProducts } from "./loadAllProducts";
import { scrapeAllProducts } from "./scrapeAllProducts";

export async function runAllProductsScraper(
	url: string,
	options: AllProductsSelectors
): Promise<AllProducts[]> {
	puppeteer.use(StealthPlugin());

	try {
		const browser = await puppeteer.launch({
			headless: false,
		});
		const page = await browser.newPage();
		await page.setViewport({
			width: 1920,
			height: 1080,
		});

		await page.goto(url);
		// logic to navigate to brand page...

		// brand page is open
		// load all content (scrolls to bottom)

		let loadMoreButton = await page.$(
			options.sephoraSelectors.loadMoreSelector
		);

		// const totalResults = await page.evaluate(() => {
		// 	const totalResultsEl = document.querySelector(
		// 		'[data-at="number_of_products"]'
		// 	);

		// 	if (!totalResultsEl) return null;

		// 	const totalResultsText = totalResultsEl.textContent?.trim();
		// 	if (!totalResultsText) return null;

		// 	const totalResultsArr = totalResultsText?.split(" ");

		// 	if (totalResultsArr.length < 1) return null;

		// 	const totalResultsNum = parseInt(
		// 		totalResultsArr[0].replace(/[^0-9]/g, "")
		// 	);

		// 	if (isNaN(totalResultsNum)) return null;
		// 	return totalResultsNum;
		// });

		const totalResults = 0;
		console.log("totalResults:", totalResults);

		let data: AllProducts[] = [];
		if (!totalResults || totalResults === 0) {
			console.log("running fallback");
			while (loadMoreButton) {
				await loadAllProducts(page, false);
				await page.click(options.sephoraSelectors.loadMoreSelector);
				await loadAllProducts(page, true);


				const results = await page.evaluate(() => {
					const resultsEl = document.querySelector(
						".css-1k3zwd9.eanm77i0"
					);

					const resultsText = resultsEl
						? resultsEl.textContent
						: "ERROR";

					return resultsText;
				});

				console.log("Showing Results:", results);

				loadMoreButton = await page.$(
					options.sephoraSelectors.loadMoreSelector
				);
			}
			data = await scrapeAllProducts(page, options);
		} else {
			const resultsPerPage = 60;
			const pageCount = Math.ceil(totalResults / resultsPerPage);
			console.log("page count found", pageCount);

			if (!pageCount || pageCount < 1) return [];

			let currentPage = 0;
			while (currentPage < pageCount) {
				currentPage++;

				console.log("currentPage", currentPage);
				console.log("url:", `${url}?currentPage=${currentPage}`);

				await page.goto(`${url}?currentPage=${currentPage}`);
				await loadAllProducts(page, true);
				const pageData = await scrapeAllProducts(page, options);

				if (pageData?.length > 0) {
					// console.log("pageData", pageData);
					console.log("pageData length", pageData.length);
					data.push(...pageData);
				}
			}
		}

		// console.log("data:",data)

		// while load more button exists, load content
		// begin scraping...

		// await browser.close();

		// const data = [
		// 	{
		// 		product_id: crypto.randomUUID(),
		// 		product_name: "",
		// 		product_image_url: "",
		// 		retailer_id: "Sephora123",
		// 		brand_id: crypto.randomUUID(),
		// 		brand_name: "",
		// 		product_price: [0, 0],
		// 		sku_id: "",
		// 		avg_rating: 0,
		// 		total_reviews: 0,
		// 		page_link: "",
		// 	},
		// ];

		return data;
	} catch (error) {
		console.error("Error occurred:", error);
		return [];
	}
}
