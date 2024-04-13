import { Page } from "puppeteer";

export async function test(page: Page) {
	const reviewData = await page.evaluate(() => {
		// const reviewListContainer = document.querySelector(
		// 	'.css-dc1lim eanm77i0'
		// );
		// if (!reviewListContainer) return [];

		// const testReturn = document.querySelectorAll(".css-13o7eu2.eanm77i0");

		const result: {
			headline: string | null;
			reviewText: string | null;
			verifiedBuyer: boolean;
			stars: number | null;
		}[] = [];

		const testContainer = document.querySelectorAll(
			".css-1l6ttej.eanm77i0"
		)[1];

		const reviewElements = testContainer.querySelectorAll(
			".css-13o7eu2.eanm77i0"
		);

		reviewElements.forEach((review) => {
			const headerEl = review.querySelector(".css-m9drnf.eanm77i0");

			const reviewEl = review.querySelector(".css-1pw69zl.eanm77i0");
			const ratingEl = review
				.querySelector(".css-mu0xdx")
				?.getAttribute("aria-label"); // Selector for rating

			const verifiedBuyerEl = review.querySelector(
				".css-gtt1cr.eanm77i0"
			);

			const verifiedBuyer = verifiedBuyerEl !== null;

			const header = headerEl
				? (headerEl as HTMLHeadingElement).textContent
				: null;
			const reviewText = reviewEl
				? (reviewEl as HTMLDivElement).textContent
				: null;
			const stars = ratingEl
				? parseInt((ratingEl) || "0")
				: null; // get aria-label

			result.push({
				headline: header,
				reviewText: reviewText,
				verifiedBuyer: verifiedBuyer,
				stars: stars,
			});
		});

		return result;

		// const result: {
		// 	headline: string | null;
		// }[] = [];

		// reviews.forEach((review: any) => {
		// 	const headerEl = review.querySelector(".css-m9drnf.eanm77i0");
		// 	const header = headerEl
		// 		? (headerEl as HTMLHeadingElement).textContent
		// 		: null;

		// 	result.push({
		// 		headline: header,
		// 	});
		// });
		// return result;
	});
	return reviewData;
}
