import { Page } from "puppeteer";

import { OptionProps } from "../../types";
import { Review } from "@prisma/client";

export async function scrapeUltaReviews(page: Page, options: OptionProps) {
	let consoleMessage: any = [];

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

		function getReviewTimeStamp(dateString: string | null): string | null {
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
					currentDate.setMonth(
						currentDate.getMonth() - parseInt(count)
					)
				);
			} else if (mdy === "year" || mdy === "years") {
				reviewDate = new Date(
					currentDate.setFullYear(
						currentDate.getFullYear() - parseInt(count)
					)
				);
			}

			return reviewDate instanceof Date ? reviewDate.toISOString() : null;
		}

		const reviewListContainer = document.querySelector(
			reviewListContSelector
		);

		if (!reviewListContainer) return [];

		const reviews =
			reviewListContainer.querySelectorAll(reviewContSelector);

		const result: Review[] = [];

		reviews?.forEach((review: Element) => {
			const reviewId = crypto.randomUUID();
			const productId = crypto.randomUUID();

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
				? getReviewTimeStamp(reviewDateEl.textContent)
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
				product_id: productId,
				retailer_id: "Ulta123",
				review_headline: header,
				review_text: reviewText,
				review_rating: rating,
				review_date: reviewDateText,
				reviewer_name: reviewNameText,
				reviewer_id: crypto.randomUUID(),
				verified_buyer: verifiedBuyer,
				up_votes: upVoteText,
				down_votes: downVoteText,
				query_id: crypto.randomUUID(),
			});
		});

		return result;
	}, options.reviewSelector);

	return reviewData;
}
