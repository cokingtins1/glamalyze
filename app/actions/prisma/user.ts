"use server";

import { PrismaClient, Review } from "@prisma/client";
const prisma = new PrismaClient();

export async function main() {
	const start = new Date().getTime();

	function randomNumber(max: number, min: number) {
		const random1 = Math.floor(Math.random() * (max - min + 1)) + min;
		const random2 = Math.floor(Math.random() * (max - min + 1)) + min;
		const random3 = Math.floor(Math.random() * (max - min + 1)) + min;
		return `${random1}${random2}${random3}`;
	}
	const sephoraRetailerId = "Sephora123";
	const ultaRetailerId = "Ulta123";

	const globalProductId = "93957123-2318-464c-996a-1875984745ab";

	const testDataUlta = {
		metaData: {
			company: "Ulta",
			price: "$52.00 ",
			totalReviews: 1679,
			averageRating: 4.1,
			reviewHistData: [1118, 249, 169, 168, 219],
			recommended: 85,
		},
		reviewsData: [
			{
				headline: "Fantastic coverage, I'm obsessed!",
				reviewText:
					"This foundation is honestly so light feeling on my skin, but also gives beautiful coverage! My new #1 Worth every penny!!",
				verifiedBuyer: true,
				stars: 5,
			},
			{
				headline: "Amazing foundation",
				reviewText:
					"First time using it. I heard mixed reviews on it, but after trying it myslef I will definitely purchase again!",
				verifiedBuyer: false,
				stars: 5,
			},
			{
				headline: "Meh",
				reviewText: "Is not long wearing as it claims",
				verifiedBuyer: true,
				stars: 3,
			},
			{
				headline: "Everything was not good.",
				reviewText:
					"I read many people's reviews and even did some test makeup, but this product wasn't for me. I have normal skin with redness, so I chose this product to cover up my redness, but it contains too much powder, so it gets stuck in my pores and makes my skin look worse. I tried mixing it with serum, but the results were the same. And because it didn't settle on my skin, it almost looked like I had no makeup on in the afternoon. I will never purchase it again.",
				verifiedBuyer: false,
				stars: 1,
			},
			{
				headline: "Great foundation",
				reviewText:
					"Great coverage , smooth application, long lasting wear",
				verifiedBuyer: true,
				stars: 5,
			},
			{
				headline: "No",
				reviewText:
					"Once you finish putting on your makeup it looks flawless ( Moisturize, prime or not, bake etc. ) !!! But after 4 hrs it tends to separate, cake up and crease. Which I was hoping for it not to do. \n" +
					"\n" +
					"Skin type; Dry",
				verifiedBuyer: true,
				stars: 1,
			},
			{
				headline: "I love this foundation!",
				reviewText:
					"I am in the shade Gobi I was a little skeptical trying out this foundation cause I saw mixed reviews on YouTube about it. I wore it for 7 hours and it still looked amazing! I used the too faced hangover primer with it and it made my skin look flawless. I definitely recommend this foundation. One thing that I do want to point out is when you first apply the foundation if you touch it, it will remove the foundation but once the foundation dries it is transfer resistant!",
				verifiedBuyer: false,
				stars: 5,
			},
			{
				headline:
					"This formula has quality control issues because it separates",
				reviewText:
					"In the Q&A section someone asked if this is silicone or water based and the answer was both. That explains why the formula easily separates on your skin and in the bottle. It's a quality control issue because even when the bottle was brand new it separates like no other. Impossible to make it look good on your skin. Going in the trash sadly. Expected so much better from NARS.",
				verifiedBuyer: false,
				stars: 1,
			},
			{
				headline: "Top Tier!!",
				reviewText:
					"Ugh where do I start?? I love this foundation!\n" +
					"1. Lightweight\n" +
					"2. Great coverage\n" +
					"3. Long lasting\n" +
					"4. Sweat proof went to the gym & it lasted even though I was sweating ALOT\n" +
					"5. Excellent shade range \n" +
					"6. It rarely ever transfers, it will only be a bit",
				verifiedBuyer: false,
				stars: 5,
			},
			{
				headline: "No I would not buy this foundation again",
				reviewText:
					"This foundation is not good for oily skin. I was so shiny and it broke down and separated on different areas on my face especially my nose. I did like the texture of the foundation itself but definitely does not hold up in the heat.",
				verifiedBuyer: true,
				stars: 2,
			},
		],
	};

	// const retailer = await prisma.retailer.create({
	// 	data: {
	// 		retailer_id: ultaRetailerId,
	// 	},
	// });

	const randomId_1 = crypto.randomUUID();
	const scrapedData = {
		product_id: randomId_1,
		product_name: "Test Product",
		company_id: "123abc",
		company_name: "Comany ABC",
		product_image_url: "xyz.png",
		retailer_id: [sephoraRetailerId, ultaRetailerId],

		sephoraProduct: {
			productId: randomId_1,
			productName: "Foundation 123",
			price: 19.99 * 100,
			reviews: 1182,
			avg_rating: 4.5,
			percent_recommended: 81,
		},

		ultaProduct: {
			productId: randomId_1,
			productName: "Foundation 456",
			price: 24.99 * 100,
			reviews: 652,
			avg_rating: 3.6,
			percent_recommended: 75,
		},
	};

	// const product = await prisma.product.create({
	// 	data: {
	// 		product_id: scrapedData.product_id,
	// 		product_name: scrapedData.product_name,
	// 		company_id: scrapedData.company_id,
	// 		company_name: scrapedData.company_name,
	// 		product_image_url: scrapedData.product_image_url,
	// 		retailer_id: scrapedData.retailer_id,
	// 	},
	// });

	// const sephoraProduct = await prisma.sephoraProduct.create({
	// 	data: {
	// 		product_id: scrapedData.sephoraProduct.productId,
	// 		product_name: scrapedData.sephoraProduct.productName,
	// 		price: scrapedData.sephoraProduct.price,
	// 		reviews: scrapedData.sephoraProduct.reviews,
	// 		avg_rating: scrapedData.sephoraProduct.avg_rating,
	// 		percent_recommended: scrapedData.sephoraProduct.percent_recommended,
	// 	},
	// });

	// const ultaProduct = await prisma.ultaProduct.create({
	// 	data: {
	// 		product_id: scrapedData.ultaProduct.productId,
	// 		product_name: scrapedData.ultaProduct.productName,
	// 		price: scrapedData.ultaProduct.price,
	// 		reviews: scrapedData.ultaProduct.reviews,
	// 		avg_rating: scrapedData.ultaProduct.avg_rating,
	// 		percent_recommended: scrapedData.ultaProduct.percent_recommended,
	// 	},
	// });

	// for (const review of testDataUlta.reviewsData) {
	// 	await prisma.review.create({
	// 		data: {
	// 			review_id: crypto.randomUUID(),
	// 			product_id: globalProductId,
	// 			retailer_id: ultaRetailerId,
	// 			review_text: review.reviewText,
	// 			review_rating: review.stars,
	// 			review_date: new Date().toISOString(),
	// 			review_author: `Reviewer${randomNumber(1, 10)}`,
	// 			verified_buyer: review.verifiedBuyer,
	// 			up_votes: parseInt(randomNumber(1, 10)),
	// 			down_votes: parseInt(randomNumber(1, 10)),
	// 		},
	// 	});
	// }

	// const bigData = Array.from({ length: 10 }).map(() => ({
	// 	review_id: crypto.randomUUID(),
	// 	product_id: globalProductId,
	// 	retailer_id: ultaRetailerId,
	// 	review_text: "Dummy Text",
	// 	review_rating: 5,
	// 	review_date: new Date().toISOString(),
	// 	review_author: `Reviewer${randomNumber(1, 10)}`,
	// 	verified_buyer: true,
	// 	up_votes: parseInt(randomNumber(1, 10)),
	// 	down_votes: parseInt(randomNumber(1, 10)),
	// }));

	const bigData: Review[] = [
		{
			review_id: "dab99ee0-ed3d-49a0-875e-e9ea6ffcaa76",
			product_id: "93957123-2318-464c-996a-1875984745ab",
			retailer_id: "Ulta123",
			review_text: "Dummy Text",
			review_rating: 5,
			review_date: "2024-04-16T18:44:26.853Z",
			review_author: "Reviewer993",
			verified_buyer: true,
			up_votes: 895,
			down_votes: 657,
		},
		{
			review_id: "de75c53f-b76b-428f-b814-9cef6d069c2f",
			product_id: "93957123-2318-464c-996a-1875984745ab",
			retailer_id: "Ulta123",
			review_text: "Dummy Text",
			review_rating: 5,
			review_date: "2024-04-16T18:44:26.853Z",
			review_author: "Reviewer926",
			verified_buyer: true,
			up_votes: 554,
			down_votes: 937,
		},
		{
			review_id: "9146f6c7-e5da-4ba3-9a00-713eb61cad35",
			product_id: "93957123-2318-464c-996a-1875984745ab",
			retailer_id: "Ulta123",
			review_text: "Dummy Text",
			review_rating: 5,
			review_date: "2024-04-16T18:44:26.853Z",
			review_author: "Reviewer788",
			verified_buyer: true,
			up_votes: 849,
			down_votes: 739,
		},
		{
			review_id: "856831fd-710d-47e8-a2a4-f37ad4a29a79",
			product_id: "93957123-2318-464c-996a-1875984745ab",
			retailer_id: "Ulta123",
			review_text: "Dummy Text",
			review_rating: 5,
			review_date: "2024-04-16T18:44:26.853Z",
			review_author: "Reviewer556",
			verified_buyer: true,
			up_votes: 778,
			down_votes: 949,
		},
		{
			review_id: "a097593b-d6ac-43e6-83aa-db29f7678095",
			product_id: "93957123-2318-464c-996a-1875984745ab",
			retailer_id: "Ulta123",
			review_text: "Dummy Text",
			review_rating: 5,
			review_date: "2024-04-16T18:44:26.853Z",
			review_author: "Reviewer536",
			verified_buyer: true,
			up_votes: 462,
			down_votes: 344,
		},
		{
			review_id: "11dc9e53-31ce-4eae-be0d-0a4719f07382",
			product_id: "93957123-2318-464c-996a-1875984745ab",
			retailer_id: "Ulta123",
			review_text: "Dummy Text",
			review_rating: 5,
			review_date: "2024-04-16T18:44:26.853Z",
			review_author: "Reviewer675",
			verified_buyer: true,
			up_votes: 592,
			down_votes: 494,
		},
		{
			review_id: "4b012b66-3f54-4ea0-8ae3-1a07e5f8c9ee",
			product_id: "93957123-2318-464c-996a-1875984745ab",
			retailer_id: "Ulta123",
			review_text: "Dummy Text",
			review_rating: 5,
			review_date: "2024-04-16T18:44:26.853Z",
			review_author: "Reviewer428",
			verified_buyer: true,
			up_votes: 774,
			down_votes: 283,
		},
		{
			review_id: "b4dd5de2-a144-4973-bf8d-c2e5e54b8455",
			product_id: "93957123-2318-464c-996a-1875984745ab",
			retailer_id: "Ulta123",
			review_text: "Dummy Text",
			review_rating: 5,
			review_date: "2024-04-16T18:44:26.853Z",
			review_author: "Reviewer733",
			verified_buyer: true,
			up_votes: 496,
			down_votes: 684,
		},
		{
			review_id: "3d0e543a-64ab-47df-9a2e-78896c0e9300",
			product_id: "93957123-2318-464c-996a-1875984745ab",
			retailer_id: "Ulta123",
			review_text: "Dummy Text",
			review_rating: 5,
			review_date: "2024-04-16T18:44:26.853Z",
			review_author: "Reviewer973",
			verified_buyer: true,
			up_votes: 453,
			down_votes: 357,
		},
		{
			review_id: "1c162b75-18dc-4634-bda9-f3aa60f92a7a",
			product_id: "93957123-2318-464c-996a-1875984745ab",
			retailer_id: "Ulta123",
			review_text: "Dummy Text",
			review_rating: 5,
			review_date: "2024-04-16T18:44:26.853Z",
			review_author: "Reviewer758",
			verified_buyer: true,
			up_votes: 434,
			down_votes: 276,
		},
	];

	await prisma.review.createMany({ data: bigData });

	const end = new Date().getTime();
	console.log(`Execution time: ${(end - start) / 1000} seconds`);

	// console.log(product, sephoraProduct, ultaProduct)
}
