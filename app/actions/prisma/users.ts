"use server";

import { productSeeds, reviewerSeeds, userSeeds } from "@/lib/seeding/seedingFuncs";
import {
	getRandomTimestamp,
	getReviewTimeStamp,
	randomUserName,
} from "@/lib/utils";
import {
	PrismaClient,
	Product,
	Query,
	Review,
	Reviewer,
	SephoraProduct,
	User,
} from "@prisma/client";
import { randomInt } from "crypto";
import { generate } from "random-words";
import { seedProduct, seedReview, seedReviewer, seedUser } from './seed';

const prisma = new PrismaClient();

export async function main(userId: string) {
	function randomText() {
		return generate({ min: 10, max: 100, join: " " });
	}

	// await prisma.product.deleteMany({});
	// await prisma.review.deleteMany({});
	// await prisma.reviewer.deleteMany({});

	const start = new Date().getTime();

	// const userId = "69957123-2318-464c-996a-1875984745ab";
	const queryId = crypto.randomUUID();
	const productId = crypto.randomUUID();
	const retailerId = "Sephora123";

	const user = await prisma.user.findUnique({
		where: {
			user_id: userId,
		},
	});

	if(!user){
		await prisma.user.create({
			data: {
				user_id: "",
				user_email: "seancokingtin@gmail.com",
				user_name: "cokingtins1",
				created_at: new Date(),
			}
		})
	}

	const productSeed = productSeeds(10);
	const reviewerSeed = reviewerSeeds(10);
	const userSeed = userSeeds(100)

	await seedUser(userSeed)
	await seedProduct(productSeed)
	await seedReviewer(reviewerSeed)


	// const userData: User = {
	// 	user_id: userId,
	// 	user_email: "seancokingtin@gmail.com",
	// 	user_name: "cokingtins1",
	// 	created_at: new Date(),
	// };

	const queryData: Query = {
		query_id: queryId,
		user_id: userId,
		created_at: new Date(),
		filters: ["Most Helpful"],
		product_id: productId,
		retailer_id: "Sephora123",
	};

	const metaData: SephoraProduct = {
		retailer_id: "Sephora123",
		product_id: productId,
		sku_id: randomInt(999999).toString(),
		product_name: "ORIGINAL Beautyblender Makeup Sponge",
		brand_name: "Beautyblender",
		price: parseFloat(
			randomInt(100).toString() + "." + randomInt(100).toString
		),
		total_reviews: randomInt(99999),
		avg_rating: parseFloat(
			randomInt(6).toString() + "." + randomInt(6).toString
		),
		percent_recommended: null,
		review_histogram: Array.from({ length: 5 }).map(() => randomInt(99)),
	};

	const productData: Product = {
		product_id: productId,
		product_name: metaData.product_name,
		brand_id: crypto.randomUUID(),
		brand_name: metaData.brand_name,
		product_image_url: "image.png",
		retailer_id: [metaData.retailer_id],
		queries: [""]
	};

	const reviewSeeds = Array.from({ length: 10 }).map(() => ({
		review_id: crypto.randomUUID(),
		product_id: productId,
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
	}));

	const reviewsData: Review[] = [
		{
			review_id: "3a77c3a6-cd33-42fd-b245-34995589d9f6",
			product_id: productId,
			retailer_id: "Sephora123",
			review_headline: null,
			review_text: randomText(),
			review_rating: 5,
			review_date: getReviewTimeStamp("4 h ago"),
			reviewer_name: "Michutch",
			reviewer_id: "7312927d-7ccd-478e-8a44-6640c858872b",
			verified_buyer: false,
			up_votes: 1,
			down_votes: 0,
			query_id: queryId,
		},
		{
			review_id: "66f0eda2-39f5-4da5-a1db-6871acb89f66",
			product_id: productId,
			retailer_id: "Sephora123",
			review_headline: null,
			review_text: randomText(),
			review_rating: 5,
			review_date: getReviewTimeStamp("7 h ago"),
			reviewer_name: "diane0000",
			reviewer_id: "1497e4b9-3980-4ef7-b66f-211339c49c37",
			verified_buyer: false,
			up_votes: 0,
			down_votes: 0,
			query_id: queryId,
		},
		{
			review_id: "6fa1a70a-557c-4e65-858f-641f606f4602",
			product_id: productId,
			retailer_id: "Sephora123",
			review_headline: null,
			review_text: randomText(),
			review_rating: 5,
			review_date: getReviewTimeStamp("19 h ago"),
			reviewer_name: "Atefeh88",
			reviewer_id: "a28323e3-61b7-484c-9c3b-dd6f59eec3a4",
			verified_buyer: false,
			up_votes: 0,
			down_votes: 0,
			query_id: queryId,
		},
		{
			review_id: "7303600c-3644-496e-bac4-3ea071090f76",
			product_id: productId,
			retailer_id: "Sephora123",
			review_headline: "Seamless Makeup!",
			review_text: randomText(),
			review_rating: 5,
			review_date: getReviewTimeStamp("21 h ago"),
			reviewer_name: "ritaashlee",
			reviewer_id: "4d9e2671-134f-4bf3-8bc3-3361318b3045",
			verified_buyer: false,
			up_votes: 0,
			down_votes: 0,
			query_id: queryId,
		},
		{
			review_id: "c247bc97-8e0a-4092-869d-cb8d50287d85",
			product_id: productId,
			retailer_id: "Sephora123",
			review_headline: "My only fav. Beauty blender",
			review_text: randomText(),
			review_rating: 5,
			review_date: getReviewTimeStamp("1 d ago"),
			reviewer_name: "Nikiwaki21",
			reviewer_id: "b5cc1da8-648c-4499-9bbf-be9866d82b51",
			verified_buyer: false,
			up_votes: 0,
			down_votes: 0,
			query_id: queryId,
		},
		{
			review_id: "1b846a92-6abd-4f38-b1c7-9a31e0915352",
			product_id: productId,
			retailer_id: "Sephora123",
			review_headline: "A must have!",
			review_text: randomText(),
			review_rating: 5,
			review_date: getReviewTimeStamp("1 d ago"),
			reviewer_name: "ugcbyley",
			reviewer_id: "c3a5faa3-4dc6-4033-baef-f73a9748ea8b",
			verified_buyer: false,
			up_votes: 0,
			down_votes: 0,
			query_id: queryId,
		},
		{
			review_id: "9e9d1f55-19da-4565-b33b-11c2b68077aa",
			product_id: productId,
			retailer_id: "Sephora123",
			review_headline: null,
			review_text: randomText(),
			review_rating: 5,
			review_date: getReviewTimeStamp("1 d ago"),
			reviewer_name: "alyzzaaxo",
			reviewer_id: "40b02c66-2ec8-42fd-be67-ca65f8c5f653",
			verified_buyer: false,
			up_votes: 0,
			down_votes: 0,
			query_id: queryId,
		},
		{
			review_id: "7dd11918-d902-4113-9135-aad9c1849505",
			product_id: productId,
			retailer_id: "Sephora123",
			review_headline: "Og",
			review_text: randomText(),
			review_rating: 5,
			review_date: getReviewTimeStamp("1 d ago"),
			reviewer_name: "cherrybombbabe",
			reviewer_id: "3470221b-28a0-4939-afdf-d9713cac5ff5",
			verified_buyer: false,
			up_votes: 0,
			down_votes: 0,
			query_id: queryId,
		},
		{
			review_id: "cdd78c7a-53bf-425b-ae53-eebf7939bcc6",
			product_id: productId,
			retailer_id: "Sephora123",
			review_headline: "smooth",
			review_text: randomText(),
			review_rating: 5,
			review_date: getReviewTimeStamp("1 d ago"),
			reviewer_name: "seily",
			reviewer_id: "1e9328c8-8125-4b23-8d2d-6bf7e868f34c",
			verified_buyer: false,
			up_votes: 0,
			down_votes: 0,
			query_id: queryId,
		},
		{
			review_id: "f21cf8d6-4e62-4f2b-9cd7-75ec83bc2c8a",
			product_id: productId,
			retailer_id: "Sephora123",
			review_headline: "The best one in the business",
			review_text: randomText(),
			review_rating: 5,
			review_date: getReviewTimeStamp("1 d ago"),
			reviewer_name: "Sheena35504",
			reviewer_id: "e507b976-c6ba-4fb2-8873-042639a1d933",
			verified_buyer: false,
			up_votes: 0,
			down_votes: 0,
			query_id: queryId,
		},
		{
			review_id: "1cee66d1-9bd9-4142-9470-9d03b2707b5d",
			product_id: productId,
			retailer_id: "Sephora123",
			review_headline: null,
			review_text: randomText(),
			review_rating: 5,
			review_date: getReviewTimeStamp("1 d ago"),
			reviewer_name: "kmberry14",
			reviewer_id: "db56798f-37b0-4058-a9b9-51e673233d34",
			verified_buyer: false,
			up_votes: 0,
			down_votes: 0,
			query_id: queryId,
		},
		{
			review_id: "885fe3bd-89b0-4940-9aeb-bf6154b6fc61",
			product_id: productId,
			retailer_id: "Sephora123",
			review_headline: null,
			review_text: randomText(),
			review_rating: 5,
			review_date: getReviewTimeStamp("2 d ago"),
			reviewer_name: "cecrn4",
			reviewer_id: "938eb063-f720-47b9-bf40-49cd38d0ef2a",
			verified_buyer: false,
			up_votes: 0,
			down_votes: 0,
			query_id: queryId,
		},
	];

	const reviewers: Reviewer[] = reviewSeeds.map((review) => {
		return {
			reviewer_id: review.reviewer_id,
			reviewer_name: review.reviewer_name,
			retailer_id: retailerId,
		};
	});

	// await prisma.user.create({ data: userData }); // do only once
	await prisma.product.create({ data: productData });
	await prisma.query.create({ data: queryData });

	await prisma.sephoraProduct.create({ data: metaData });

	await prisma.reviewer.createMany({ data: reviewers });
	await prisma.review.createMany({ data: reviewSeeds });

	const end = new Date().getTime();
	console.log(`Execution time: ${(end - start) / 1000} seconds`);

	// console.log(product, sephoraProduct, ultaProduct)
}
