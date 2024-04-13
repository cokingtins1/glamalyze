import { Page } from "puppeteer";

export async function loadContent(page: Page) {
	function delay(time: number) {
		return new Promise(function (resolve) {
			setTimeout(resolve, time);
		});
	}

	await page.evaluate(() => window.scrollBy(0, window.innerHeight));
	await page.keyboard.down("End");
	await page.keyboard.down("End");
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

    return
}
