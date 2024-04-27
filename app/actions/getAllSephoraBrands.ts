import { SephoraBrand } from "@prisma/client";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

import { scrapeAllSephoraBrands } from "../libs/Scraping Functions/Sephora-AllProducts/scrapeAllSephoraBrands";

export async function getAllSephoraBrands(): Promise<SephoraBrand[]> {
	puppeteer.use(StealthPlugin());

	function delay(time: number) {
		return new Promise(function (resolve) {
			setTimeout(resolve, time);
		});
	}

	try {
		const browser = await puppeteer.launch({
			headless: true,
		});
		const page = await browser.newPage();
		await page.setViewport({
			width: 1920,
			height: 1080,
		});

		await page.goto("https://www.sephora.com/brands-list");

		await delay(3000);

		const allBrands = await scrapeAllSephoraBrands(page);

		await browser.close();

		return allBrands;
	} catch (error) {
		console.error("Error occurred:", error);
		return [];
	}
}
