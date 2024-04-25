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
			headless: true,
		});
		const page = await browser.newPage();

		await page.goto(url);
		// logic to navigate to brand page...

		// brand page is open
		// load all content (scrolls to bottom)
		await loadAllProducts(page);

		let loadMoreButton = await page.$(
			options.sephoraSelectors.loadMoreSelector
		);

		console.log("load more button exists:", !!loadMoreButton);
		while (loadMoreButton) {
			console.log("loading more products...");
			await page.click(options.sephoraSelectors.loadMoreSelector);
			await loadAllProducts(page);
			loadMoreButton = await page.$(
				options.sephoraSelectors.loadMoreSelector
			);
		}

		const data = await scrapeAllProducts(page, options);

		// while load more button exists, load content
		// begin scraping...

		await browser.close();

		return data;
	} catch (error) {
		console.error("Error occurred:", error);
		return [];
	}
}
