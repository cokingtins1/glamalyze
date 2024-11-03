import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

export async function returnBrowser() {
	puppeteer.use(StealthPlugin());
	const browser = await puppeteer.launch({
		headless: true,
		args: [
			"--disable-setuid-sandbox",
			"--no-sandbox",
			"--single-process",
			"--no-zygote",
		],
		executablePath:
			process.env.NODE_ENV === "production"
				? process.env.PUPPETEER_EXECUTABLE_PATH
				: puppeteer.executablePath(),
	});

	return browser;
}
