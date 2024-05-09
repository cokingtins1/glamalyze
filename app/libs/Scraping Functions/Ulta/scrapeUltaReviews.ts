import { Page } from "puppeteer";

import { OptionProps, Review } from "../../types";

export async function scrapeUltaReviews(page: Page, options: OptionProps) {
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
			reviewListContSelector
		);

		console.log("REVIEW LIST CONTAINER", !!reviewListContainer);

		if (!reviewListContainer) return [];

		const reviews =
			reviewListContainer.querySelectorAll(reviewContSelector);
		console.log("REVIEWs LENGTH", reviews.length);

		const result: Review[] = [];

		reviews?.forEach((review: Element) => {
			const reviewId = crypto.randomUUID();
			const product_Id = productId;

			const headerEl =
				review.querySelector<HTMLHeadingElement>(headlineSelector);
			const header = headerEl ? headerEl.textContent : null;

			const reviewEl = review.querySelector(reviewTextSelector);
			const reviewText = reviewEl
				? (reviewEl as HTMLDivElement).textContent
				: null;

			const ratingEl = review.querySelector(ratingSelector)?.textContent;
			const rating = ratingEl ? parseInt(ratingEl || "0") : null;

			const reviewDateContEl = review.querySelector(reviewDateSelector);
			const reviewDateEl = reviewDateContEl?.querySelectorAll("span")[1];

			const reviewDateText = reviewDateEl
				? reviewDateEl.textContent
				: null;

			const reviewNameCont = review.querySelector(reviewerNameSelector);
			const reviewNameEl = reviewNameCont
				?.querySelector("span")
				?.querySelectorAll("span");

			const reviewNameText =
				reviewNameEl?.length === 2 ? reviewNameEl[1].textContent : null;

			const verifiedBuyerEl = review.querySelector(verifiedBuyerSelector);
			const verifiedBuyer = verifiedBuyerEl !== null;

			const voteContEl = review.querySelector(upVoteSelector);
			const voteEls =
				voteContEl?.querySelectorAll<HTMLButtonElement>("button");

			let upVoteText: number | null = null;
			let downVoteText: number | null = null;

			if (voteEls?.length === 2) {
				const ariaUpVote = voteEls[0]
					.getAttribute("aria-label")
					?.split(" ");
				upVoteText = ariaUpVote ? getNumber(ariaUpVote[0]) : null;

				const ariaDownVote = voteEls[1]
					.getAttribute("aria-label")
					?.split(" ");
				downVoteText = ariaDownVote ? getNumber(ariaDownVote[0]) : null;
			}

			result.push({
				review_id: reviewId,
				product_id: product_Id,
				retailer_id: "Ulta",
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
		// Ulta Formats:
		// "x day(s) ago" (1-30 days)
		// "x month(s) ago" (after 30 days)
		// "x year(s) ago"

		if (!dateString) return null;

		const currentDate = new Date();

		const dateParts = dateString.trim().split(" ");

		const [count, mdy, trailer] = dateParts;

		let reviewDate: Date | null = null;
		if (mdy === "day" || mdy === "days") {
			reviewDate = new Date(
				currentDate.setDate(currentDate.getDate() - parseInt(count))
			);
		} else if (mdy === "month" || mdy === "months") {
			reviewDate = new Date(
				currentDate.setMonth(currentDate.getMonth() - parseInt(count))
			);
		} else if (mdy === "year" || mdy === "years") {
			reviewDate = new Date(
				currentDate.setFullYear(
					currentDate.getFullYear() - parseInt(count)
				)
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
