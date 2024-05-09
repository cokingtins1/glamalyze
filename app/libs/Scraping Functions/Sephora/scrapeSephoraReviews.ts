import { Page } from "puppeteer";

import { OptionProps, Review } from "../../types";

export async function scrapeSephoraReviews(page: Page, options: OptionProps) {
	// page.on("console", (msg) => console.log("PAGE LOG:", msg.text()));

	const reviewData = await page.evaluate((options) => {
		const {
			reviewListContSelector,
			reviewContSelector,
			headlineSelector,
			reviewTextSelector,
			reviewDateSelector,
			reviewerNameSelector,
			ratingSelector,
			verifiedBuyerSelector,
			upVoteSelector,
			productId,
		} = options;

		function getNumber(text: string | null): number | null {
			if (!text) return null;
			const regex = /(\d{1,3}(,\d{3})*(\.\d+)?)/;
			const match = text.match(regex);

			if (!match) return null;

			let numberString = match[0].replace(/[^\d.]/g, "");
			if (numberString.includes(".")) {
				return parseFloat(numberString);
			} else {
				return parseInt(numberString, 10);
			}
		}

		const reviewListContainer = document.querySelector(
			"#ratings-reviews-container"
		);

		console.log("REVIEW LIST CONTAINER:", !!reviewListContainer);

		if (!reviewListContainer) return [];

		const reviewContChild = reviewListContainer.querySelector(
			reviewListContSelector
		);

		console.log("REVIEW CONT CHILD:", !!reviewContChild);

		if (!reviewContChild) return [];

		const test = '[data-comp="Review StyledComponent BaseComponent "]'
		const reviews = document.querySelectorAll(
			'[data-comp="Review StyledComponent BaseComponent "]'
		);
		const found1 = document.querySelectorAll(reviewContSelector)
		const found2 = document.querySelectorAll(test)

		console.log("REVIEWS LENGTH", reviews.length);
		console.log("test1", found1.length);
		console.log("test2", found2.length);

		const result: Review[] = [];

		reviews?.forEach((review: Element) => {
			const reviewId = crypto.randomUUID();
			const product_id = productId;

			const headerEl =
				review.querySelector<HTMLHeadingElement>(headlineSelector);
			const header = headerEl ? headerEl.textContent : null;

			console.log("HEADER:", !!header);

			const reviewEl = review.querySelector(reviewTextSelector);
			const reviewText = reviewEl
				? (reviewEl as HTMLDivElement).textContent
				: null;

			const ratingEl = review
				.querySelector(ratingSelector)
				?.getAttribute("aria-label");
			const rating = ratingEl ? parseInt(ratingEl || "0") : null;

			const reviewDateEl =
				review.querySelector<HTMLSpanElement>(reviewDateSelector);
			const reviewDateText = reviewDateEl
				? reviewDateEl.textContent
				: null;

			const reviewNameEl =
				review.querySelector<HTMLAnchorElement>(reviewerNameSelector);
			const reviewNameText = reviewNameEl
				? reviewNameEl.textContent
				: null;

			const verifiedBuyerEl = review.querySelector(verifiedBuyerSelector);
			const verifiedBuyer = verifiedBuyerEl !== null;

			const voteEls =
				review.querySelectorAll<HTMLButtonElement>(upVoteSelector);

			let upVoteText: number | null = null;
			let downVoteText: number | null = null;

			if (voteEls.length === 2) {
				upVoteText = getNumber(
					voteEls[0].querySelector("span")?.textContent || ""
				);
				downVoteText = getNumber(
					voteEls[1].querySelector("span")?.textContent || ""
				);
			}

			result.push({
				review_id: reviewId,
				product_id: product_id,
				retailer_id: "Sephora",
				review_headline: header,
				review_text: reviewText,
				review_rating: rating,
				review_date: null,
				review_date_string: reviewDateText,
				reviewer_name: reviewNameText,
				verified_buyer: verifiedBuyer,
				up_votes: upVoteText,
				down_votes: downVoteText,
				created_at: null,
				updated_at: null,
			});
		});

		return result;
	}, options.reviewSelector);

	function getReviewTimeStamp(dateString: string | null): Date | null {
		// Sephora Formats:
		// "x h ago"
		// "x d ago" (1-30 days)
		// "20 Mar 2024" (after 30 days)

		if (!dateString) return null;

		const currentDate = new Date();
		const dateParts = dateString.trim().split(" ");

		const [count, mdh, trailer] = dateParts;

		const monthNames = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		];

		let reviewDate: Date | null = null;
		if (mdh === "h") {
			reviewDate = new Date(
				currentDate.setHours(currentDate.getHours() - parseInt(count))
			);
		} else if (mdh === "d") {
			reviewDate = new Date(
				currentDate.setDate(currentDate.getDate() - parseInt(count))
			);
		} else if (monthNames.includes(mdh)) {
			const monthIndex = monthNames.indexOf(mdh);
			reviewDate = new Date(
				parseInt(trailer),
				monthIndex,
				parseInt(count)
			);
		}

		return reviewDate instanceof Date ? reviewDate : null;
	}

	if (reviewData.length > 0) {
		reviewData.forEach((p) => {
			p.review_date = getReviewTimeStamp(p.review_date_string);
			(p.created_at = new Date()), (p.updated_at = new Date());
		});
	}

	return reviewData;
}
