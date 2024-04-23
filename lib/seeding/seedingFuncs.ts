import {
	Product,
	Query,
	Review,
	Reviewer,
	SephoraProduct,
	UltaProduct,
	User,
} from "@prisma/client";
import { generate } from "random-words";

import dayjs from "dayjs";
import { randomInt } from "crypto";

function randomNum(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomUserName() {
	const randomNumber = randomNum(10, 999999);

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

	return new Date(currentDate.getTime() + randomDifference);
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
			allowedqueries: allowedQueries[randomNum(0, 2)],
		};
	});

	return userBank;
}

export function productSeeds(query: Query) {
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
			retailerBank[Math.floor(Math.random() * retailerBank.length)]
		);
	}

	const generatedName = generate({
		exactly: 2,
		join: "",
	});

	const name = generatedName.charAt(0).toUpperCase() + generatedName.slice(1);
	const productBank = {
		product_id: crypto.randomUUID(),
		product_name: name,
		product_image_url: `https://picsum.photos/id/${randomNum(
			1,
			200
		)}/200/300`,
		retailer_id: retailer,
		brand_id: crypto.randomUUID(),
		brand_name: randomBrandName(),
		queries: [query.query_id],
	};

	return productBank;
}

export function reviewerSeeds(length: number): Reviewer[] {
	const reviewerBank = Array.from({ length: length }, () => {
		return {
			reviewer_name: randomUserName(),
			reviewer_id: crypto.randomUUID(),
			retailer_id: Math.random() < 0.5 ? "Sephora123" : "Ulta123",
		};
	});

	return reviewerBank;
}

export function querySeeds(allUsers: User[]): Query {
	const userIds = allUsers.map((q) => q.user_id);

	const queryBank: Query = {
		query_id: crypto.randomUUID(),
		created_at: new Date(),
		user_id: userIds[randomNum(0, userIds.length - 1)],
		filters: ["None"],
		product_id: crypto.randomUUID(), // assign placeholder id
		retailer_id: Math.random() < 0.5 ? "Sephora123" : "Ulta123",
	};

	return queryBank;
}

export function reviewSeeds(
	query: Query,
	product: Product,
	reviewers: Reviewer[],
	length: number
): Review[] {
	const retailerBank = ["Sephora123", "Ulta123"];
	let reviews: Review[] = [];

	retailerBank.forEach((retailerId) => {
		const productReviews: Review[] = Array.from({ length: length }, () => {
			let randIndex = randomNum(0, reviewers.length - 1);
			const randReviewer = {
				reviewer_id: reviewers[randIndex].reviewer_id,
				reviewer_name: reviewers[randIndex].reviewer_name,
			};

			return {
				review_id: crypto.randomUUID(),
				product_id: product.product_id,
				retailer_id: retailerId,
				review_headline: generate({ min: 3, max: 8, join: " " }),
				review_text: randomText(),
				review_rating: randomNum(1, 5),
				review_date: getRandomTimestamp(),
				reviewer_name: randReviewer.reviewer_name,
				reviewer_id: randReviewer.reviewer_id,
				verified_buyer: Math.random() < 0.5,
				up_votes: Math.floor(Math.random() * 100) + 1,
				down_votes: Math.floor(Math.random() * 100) + 1,
				query_id: query.query_id,
			};
		});
		reviews = reviews.concat(productReviews);
	});

	return reviews;
}

export function retailerProductSeeds(
	query: Query,
	product: Product
): SephoraProduct[] | UltaProduct[] {
	const retailerBank = ["Sephora123", "Ulta123"];
	let productData: (SephoraProduct | UltaProduct)[] = [];

	retailerBank.forEach((retailer) => {
		const ratingArray = Array.from({ length: 5 }).map(() => randomInt(99));
		const totalReviews = ratingArray.reduce(
			(acc, currVal) => acc + currVal,
			0
		);
		const weightedSum = ratingArray.reduce(
			(sum, count, index) => sum + count * (index + 1),
			0
		);

		const avgRating = parseFloat((weightedSum / totalReviews).toFixed(1));
		const data = {
			retailer_id: retailer,
			product_id: product.product_id,
			sku_id: randomInt(999999).toString(),
			product_name: product.product_name,
			brand_name: product.brand_name,
			price: parseFloat(`${randomInt(100)}.${randomInt(100)}`),
			total_reviews: totalReviews,
			avg_rating: avgRating,
			percent_recommended: null,
			review_histogram: ratingArray,
			queries: [query.query_id],
		};
		productData.push(data);
	});

	return productData;
}
