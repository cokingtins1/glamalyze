import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

export async function checkBrandExists(
	url: string,
	retailer: string
): Promise<{
	exists: boolean;
	brandName: string | null;
	pageUrl: string | null;
}> {
	puppeteer.use(StealthPlugin());

	try {
		const browser = await puppeteer.launch({
			headless: true,
		});
		const page = await browser.newPage();
		await page.setViewport({
			width: 1920,
			height: 1080,
		});

		try {
			const response = await page.goto(url, {
				waitUntil: "domcontentloaded",
			});
			const status = response?.status();

			if (status === 200) {
				const selector =
					retailer === "Ulta"
						? ".Text-ds.Text-ds--title-6.Text-ds--left"
						: ".css-hc7wlr.eanm77i0";
				const { brandName, url } = await page.evaluate((selector) => {
					const brandNameEl = document.querySelector(selector);

					const brandName = brandNameEl
						? brandNameEl.textContent
						: null;
					return { brandName: brandName, url: window.location.href };
				}, selector);
				console.log("Page exists.");
				return { exists: true, brandName: brandName, pageUrl: url };
			} else {
				console.log(`Page does not exist. Status code: ${status}`);
				return { exists: false, brandName: null, pageUrl: null };
			}
		} catch (error) {
			console.error("Error occurred:", error);
			return { exists: false, brandName: null, pageUrl: null };
		} finally {
			await browser.close();
		}
	} catch (error) {
		console.error("Error occurred:", error);
		return { exists: false, brandName: null, pageUrl: null };
	}
}
