import { LaunchOptions } from "puppeteer";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

// export async function returnBrowser() {
// 	puppeteer.use(StealthPlugin());

// 	const options: LaunchOptions = {
// 		headless: true,
// 		args: [
// 			"--no-sandbox",
// 			"--disable-gpu",
// 			"--disable-dev-shm-usage",
// 			"--disable-setuid-sandbox",
// 			"--no-first-run",
// 			"--no-zygote",
// 			"--single-process",
// 		],
// 		executablePath:
// 			process.env.NODE_ENV === "production"
// 				? "/usr/bin/chromium-browser" // Path to Chromium in Alpine
// 				: puppeteer.executablePath(),
// 	};

// 	try {
// 		const browser = await puppeteer.launch(options);
// 		return browser;
// 	} catch (error) {
// 		console.error("Failed to launch browser:", error);
// 		throw error;
// 	}
// }

export async function returnBrowser() {
	puppeteer.use(StealthPlugin());

	// Base options that work for both environments
	const options: LaunchOptions = {
		headless: true,
		args: [
			"--no-sandbox",
			"--disable-gpu",
			"--disable-dev-shm-usage",
			"--disable-setuid-sandbox",
			"--no-first-run",
			"--no-zygote",
			"--single-process",
		],
	};

	// Add executablePath based on environment
	if (process.env.NODE_ENV === "production") {
		options.executablePath = "/usr/bin/chromium-browser";
	} else {
		// For development, we'll try multiple possible paths
		const possiblePaths = [
			process.env.CHROME_PATH, // Custom environment variable
			"/usr/bin/google-chrome", // Linux
			"/usr/bin/chromium-browser", // Linux Chromium
			"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", // macOS
			"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", // Windows
			"C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe", // Windows (x86)
		];

		// Find the first existing Chrome installation
		const fs = require("fs");
		const existingPath = possiblePaths.find(
			(path) => path && fs.existsSync(path)
		);

		if (existingPath) {
			options.executablePath = existingPath;
			console.log(`Using Chrome at: ${existingPath}`);
		} else {
			console.log(
				"No Chrome installation found, falling back to default puppeteer behavior"
			);
			// Don't set executablePath, let puppeteer use its bundled Chromium
		}
	}

	try {
		const browser = await puppeteer.launch(options);
		return browser;
	} catch (error) {
		console.error("Failed to launch browser:", error);
		throw error;
	}
}
