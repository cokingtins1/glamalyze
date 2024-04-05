import { puppeteerScraper } from "../libs/puppeteerScraper";
import { runScraper } from "../libs/runScraper";
import { scraper } from "../libs/scraper";

export default function URLInput() {
	async function handleSubmit(formData: FormData) {
		"use server";

		const url = formData.get("url");

		try {
			// const product = await scraper(url as string);
			// const product = await puppeteerScraper(url as string);

			const product = await runScraper(url as string, {
				reviewSelector: {
					reviewListContainer: '[data-testid="review-list"]',
					reviewContainer: ".pr-review",
					headline: ".pr-rd-review-headline.pr-h2",
					reviewText: ".pr-rd-description-text",

					rating: ".pr-snippet-rating-decimal",
					verifiedBuyer: ".pr-rd-badging-text",
				},
				globalSelector: {
					nextPageSelector:
						".pr-rd-pagination-btn.pr-rd-pagination-btn--next",
				},
				paginationLimit: 3,
			});
			console.log(product);
		} catch (error) {}
	}
	return (
		<form className="flex gap-4 items-center" action={handleSubmit}>
			<label htmlFor="url" className="text-white">
				URL
			</label>
			<input name="url" className="text-black" type="text" />
			<button className="bg-green-500 rounded-lg p-2" type="submit">
				Get Data
			</button>
		</form>
	);
}
