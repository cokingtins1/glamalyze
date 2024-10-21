import axios from "axios";
import * as cheerio from "cheerio";
import puppeteer from "puppeteer-core"


export async function scraper(url: string) {
	if (!url) return;

	const username = String(process.env.BRIGHT_DATA_USERNAME);
	const password = String(process.env.BRIGHT_DATA_PASSWORD);
	const port = 22225;
	const session_id = (1000000 * Math.random()) | 0;
	const options = {
		auth: {
			username: `${username}-session-${session_id}`,
			password: password,
		},
		host: "brd.superproxy.io",
		port,
		rejectUnauthorized: false,
	};

	try {
		const res = await axios.get(url, options);
		const $ = cheerio.load(res.data);
		const title = $("#productTitle").text().trim();

		console.log(title);
	} catch (error: any) {
		throw new Error(`Failed to scapre product: ${error.message}`);
	}
}
