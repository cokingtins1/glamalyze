import { Product, User } from "@prisma/client";
import { generate } from "random-words";

import dayjs from "dayjs";

function randomUserName() {
	const randomNumber = Math.floor(Math.random() * (999999 - 10 + 1)) + 10;

	const usernameWords = generate({
		exactly: 2,
		join: "",
	});

	return usernameWords + randomNumber;
}

function getRandomTimestamp() {
	const currentDate = new Date();

	// Timestamp of April 18, 2022
	const targetDate = new Date("2022-04-18");

	const difference = targetDate.getTime() - currentDate.getTime();
	const randomDifference = Math.floor(Math.random() * difference);

	const randomDate = new Date(currentDate.getTime() + randomDifference);

	return randomDate.toISOString();
}

function randomText() {
	return generate({ min: 10, max: 100, join: " " });
}

function randomBrandName() {
	const brandName = generate({
		exactly: 1,
		wordsPerString: 2,
		formatter: (word) =>
			word.slice(0, 1).toUpperCase().concat(word.slice(1)),
	});
	return brandName[0];
}

export function userSeeds(length: number) {
	const userBank: User[] = Array.from({ length: length }, () => {
		const userName = randomUserName();

		const allowedQueries = [1, 10, 100];
		return {
			user_id: crypto.randomUUID(),
			user_name: userName,
			user_email: userName + "@gmail.com",
			created_at: new Date(),
			billing_period_start: new Date(),
			billing_period_end: dayjs().add(1, "month").toDate(),
			queries_in_period: 0,
		};
	});

	return userBank;
}

export function productSeeds(length: number) {
	const productBank: Product[] = Array.from(
		{ length: length },
		(_, index) => {
			const retailerBank = ["Sephora123", "Ulta123"];

			const retailer: string[] = [];
			const includeFirst = Math.random() < 0.5;
			const includeSecond = Math.random() < 0.5;

			if (includeFirst || includeSecond) {
				if (includeFirst) {
					retailer.push(retailerBank[0]);
				}
				if (includeSecond) {
					retailer.push(retailerBank[1]);
				}
			} else {
				retailer.push(
					retailerBank[
						Math.floor(Math.random() * retailerBank.length)
					]
				);
			}

			const generatedName = generate({
				exactly: 2,
				join: "",
			});

			const name =
				generatedName.charAt(0).toUpperCase() + generatedName.slice(1);

			return {
				product_id: crypto.randomUUID(),
				product_name: name,
				product_image_url: `https://picsum.photos/id/${
					index + 100
				}/200/300`,
				retailer_id: retailer,
				brand_id: crypto.randomUUID(),
				brand_name: randomBrandName(),
				queries: [""],
			};
		}
	);

	return productBank;
}

export function reviewerSeeds(length: number) {
	const reviewerBank = Array.from({ length: length }, () => {
		return {
			reviewer_name: randomUserName(),
			id: crypto.randomUUID(),
			retailer_id: Math.random() < 0.5 ? "Sephora123" : "Ulta123",
		};
	});

	return reviewerBank;
}

export function randomReview(productId: string, queryId: string) {
	const review = {
		review_id: crypto.randomUUID(),
		product_id: crypto.randomUUID(),
		retailer_id: "Sephora123",
		review_headline: generate({ min: 3, max: 8, join: " " }),
		review_text: randomText(),
		review_rating: Math.floor(Math.random() * 5) + 1,
		review_date: getRandomTimestamp(),
		reviewer_name: randomUserName(),
		reviewer_id: crypto.randomUUID(),
		verified_buyer: Math.random() < 0.5,
		up_votes: Math.floor(Math.random() * 100) + 1,
		down_votes: Math.floor(Math.random() * 100) + 1,
		query_id: queryId,
	};

	return review;
}
