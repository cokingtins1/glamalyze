// import * as cherrio from "cheerio"
// import { Browser } from "puppeteer"
// import puppeteer from "puppeteer"

// export async function getProductData() {
// 	// const url =
// 	// 	"https://books.toscrape.com/"
// 	// const browser: Browser = await puppeteer.launch({ headless: false })
// 	// const page = await browser.newPage()
// 	// await page.goto(url)

// 	// const reviewsData = await page.evaluate((url) => {
// 	// 	const reviewPods = Array.from(document.querySelectorAll(".product_pod"))
// 	// 	const data = reviewPods.map((book: any) => ({
// 	// 		title: book.querySelector('h3 a').getAttribute('title'),
// 	// 		price: book.querySelector('.price_color').innerText
// 	// 	}))
// 	// 	return data
// 	// }, url)
// 	// console.log(reviewsData)
// 	// await browser.close()
// 	// return reviewsData
// 	const auth = `${process.env.BRIGHT_USERNAME}:${process.env.BRIGHT_PASSWORD}`
// 	browser = await puppeteer.connect({
// 		browserWSEndpoint: `wss://${auth}@brd.superproxy.io:9222`,
// 	})
// 	const page = await browser.newPage()
// 	page.setDefaultNavigationTimeout(2 * 60 * 1000)
// 	const url = "https://www.ulta.com/shop/makeup/face/concealer"
// 	await page.goto(url)
// 	const product = await page.$$(
// 		"#MainWrapper > div.DynamicTitle > div > div > h1"
// 	)
// 	console.log(product)
// 	return product
// }
