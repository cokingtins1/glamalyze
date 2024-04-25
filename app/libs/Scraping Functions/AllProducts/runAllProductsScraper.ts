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
		await loadAllProducts(page);

		let loadMoreButton = await page.$(
			options.sephoraSelectors.loadMoreSelector
		);

		while (loadMoreButton) {
			await page.click(options.sephoraSelectors.loadMoreSelector);
			await loadAllProducts(page);
			loadMoreButton = await page.$(
				options.sephoraSelectors.loadMoreSelector
			);
		}

		const data = await scrapeAllProducts(page, options);

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
