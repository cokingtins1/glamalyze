import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

import fs from "fs";

export async function detectionTest() {
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

		await page.goto("https://nowsecure.nl/");

		await delay(3000);

		await page.screenshot({ path: "detection.png", fullPage: true });

		await browser.close();
		console.log("detection finished");
	} catch (error) {
		console.log(error);
	}
}
