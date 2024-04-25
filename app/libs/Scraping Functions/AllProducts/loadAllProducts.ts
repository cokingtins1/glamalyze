import { Page } from "puppeteer";

export async function loadAllProducts(page: Page) {
	function delay(time: number) {
		return new Promise(function (resolve) {
			setTimeout(resolve, time);
		});
	}

	// const reviewsSelector = ".css-1j53ife";

	// await page.waitForSelector(reviewsSelector);
	// await page.click(reviewsSelector);
	// await delay(1000);

	// await page.evaluate(() => window.scrollBy(0, window.innerHeight));
	await page.keyboard.down("End");
	await delay(2000);

	await page.keyboard.down("End");
	await delay(2000);

	await page.keyboard.down("End");

	await delay(2000);
	await page.evaluate(() => {
		window.scrollBy(0, -500);
	});
	await delay(500);

	await page.evaluate(() => {
		window.scrollBy(0, -200);
	});

	await delay(500);

	await page.evaluate(() => {
		window.scrollBy(0, -200);
	});

	return;
}
