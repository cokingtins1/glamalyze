"use server";

import { getReviewTimeStamp } from "@/lib/utils";
import {
	PrismaClient,
	Product,
	Review,
	Reviewer,
	SephoraProduct,
} from "@prisma/client";
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

	const metaData: SephoraProduct = {
		retailer_id: "Sephora123",
		product_id: "95c080b6-816b-424d-ad39-9b9b8b3b1d2d",
		sku_id: "2230829",
		product_name: "ORIGINAL Beautyblender Makeup Sponge",
		brand_name: "Beautyblender",
		price: 20,
		total_reviews: 9774,
		avg_rating: 4.5,
		percent_recommended: null,
		review_histogram: [72, 15, 5, 3, 4],
	};

	const productData: Product = {
		product_id: "95c080b6-816b-424d-ad39-9b9b8b3b1d2d",
		product_name: metaData.product_name,
		brand_id: crypto.randomUUID(),
		brand_name: metaData.brand_name,
		product_image_url: "image.png",
		retailer_id: [metaData.retailer_id],
	};

	const reviewsData: Review[] = [
		{
			review_id: "3a77c3a6-cd33-42fd-b245-34995589d9f6",
			product_id: "95c080b6-816b-424d-ad39-9b9b8b3b1d2d",
			retailer_id: "Sephora123",
			review_headline: null,
			review_text:
				"I use this to apply liquid and cream products. It works so well in seamlessly blending bc cream, skin tints, and even foundation. I also use it to blend countour and liquid blush. Since it is a makeup sponge, it is so soft and gentle on my skin!",
			review_rating: 5,
			review_date: getReviewTimeStamp("4 h ago"),
			reviewer_name: "Michutch",
			reviewer_id: "7312927d-7ccd-478e-8a44-6640c858872b",
			verified_buyer: false,
			up_votes: 1,
			down_votes: 0,
		},
		{
			review_id: "66f0eda2-39f5-4da5-a1db-6871acb89f66",
			product_id: "95c080b6-816b-424d-ad39-9b9b8b3b1d2d",
			retailer_id: "Sephora123",
			review_headline: null,
			review_text:
				"This beauty blender is the softest makeup sponge I’ve ever used! I use it for blending my concealer and foundation, it blends effortlessly. The sponge doesn’t feel stiff either. I like this way more than other makeup sponges I’ve used.",
			review_rating: 5,
			review_date: getReviewTimeStamp("7 h ago"),
			reviewer_name: "diane0000",
			reviewer_id: "1497e4b9-3980-4ef7-b66f-211339c49c37",
			verified_buyer: false,
			up_votes: 0,
			down_votes: 0,
		},
		{
			review_id: "6fa1a70a-557c-4e65-858f-641f606f4602",
			product_id: "95c080b6-816b-424d-ad39-9b9b8b3b1d2d",
			retailer_id: "Sephora123",
			review_headline: null,
			review_text:
				"I cannot say how great it works to spread the foundation. \n" +
				"I love it and definitely recommand it!",
			review_rating: 5,
			review_date: getReviewTimeStamp("19 h ago"),
			reviewer_name: "Atefeh88",
			reviewer_id: "a28323e3-61b7-484c-9c3b-dd6f59eec3a4",
			verified_buyer: false,
			up_votes: 0,
			down_votes: 0,
		},
		{
			review_id: "7303600c-3644-496e-bac4-3ea071090f76",
			product_id: "95c080b6-816b-424d-ad39-9b9b8b3b1d2d",
			retailer_id: "Sephora123",
			review_headline: "Seamless Makeup!",
			review_text:
				"I’ve never used the original beauty blender before because I thought others would do the same thing, but this is so much better! My makeup comes on silky smooth and my foundation, contour and blush come out perfectly blended and not patchy at all. I used to think it was the product that came out patchy but the tools you use to blend definitely make a difference. Repurchasing!",
			review_rating: 5,
			review_date: getReviewTimeStamp("21 h ago"),
			reviewer_name: "ritaashlee",
			reviewer_id: "4d9e2671-134f-4bf3-8bc3-3361318b3045",
			verified_buyer: false,
			up_votes: 0,
			down_votes: 0,
		},
		{
			review_id: "c247bc97-8e0a-4092-869d-cb8d50287d85",
			product_id: "95c080b6-816b-424d-ad39-9b9b8b3b1d2d",
			retailer_id: "Sephora123",
			review_headline: "My only fav. Beauty blender",
			review_text:
				"The original Beauty Blender is a makeup essential that lives up to its hype. Its unique shape and texture effortlessly blend foundation, concealer, and cream products for a flawless finish. The soft, bouncy material ensures seamless application without streaks or cakiness, even in hard-to-reach areas like around the nose and eyes. Plus, it's easy to clean and durable, making it a long-lasting investment for achieving professional-quality makeup looks at home.",
			review_rating: 5,
			review_date: getReviewTimeStamp("1 d ago"),
			reviewer_name: "Nikiwaki21",
			reviewer_id: "b5cc1da8-648c-4499-9bbf-be9866d82b51",
			verified_buyer: false,
			up_votes: 0,
			down_votes: 0,
		},
		{
			review_id: "1b846a92-6abd-4f38-b1c7-9a31e0915352",
			product_id: "95c080b6-816b-424d-ad39-9b9b8b3b1d2d",
			retailer_id: "Sephora123",
			review_headline: "A must have!",
			review_text:
				"i love this! i have never had an actual beauty blender but i def get the hype! it is so soft and makes my makeup go on super smooth. my application is always flawless with this and it doesn't soak up all my makeup.",
			review_rating: 5,
			review_date: getReviewTimeStamp("1 d ago"),
			reviewer_name: "ugcbyley",
			reviewer_id: "c3a5faa3-4dc6-4033-baef-f73a9748ea8b",
			verified_buyer: false,
			up_votes: 0,
			down_votes: 0,
		},
		{
			review_id: "9e9d1f55-19da-4565-b33b-11c2b68077aa",
			product_id: "95c080b6-816b-424d-ad39-9b9b8b3b1d2d",
			retailer_id: "Sephora123",
			review_headline: null,
			review_text:
				"the best sponge! worth the price and splurge. it works to well to do pretty much my makeup routine which is perfect for travel since i dont have to fuss with bringing so many different brushes. perfect for a quick everyday routine",
			review_rating: 5,
			review_date: getReviewTimeStamp("1 d ago"),
			reviewer_name: "alyzzaaxo",
			reviewer_id: "40b02c66-2ec8-42fd-be67-ca65f8c5f653",
			verified_buyer: false,
			up_votes: 0,
			down_votes: 0,
		},
		{
			review_id: "7dd11918-d902-4113-9135-aad9c1849505",
			product_id: "95c080b6-816b-424d-ad39-9b9b8b3b1d2d",
			retailer_id: "Sephora123",
			review_headline: "Og",
			review_text:
				"The og beauty blender is the og for a reason I guess this is actually my first original one and there definitely is a difference. This one is soo much more bouncy and not as wet and just blends all my cream products super effortlessly",
			review_rating: 5,
			review_date: getReviewTimeStamp("1 d ago"),
			reviewer_name: "cherrybombbabe",
			reviewer_id: "3470221b-28a0-4939-afdf-d9713cac5ff5",
			verified_buyer: false,
			up_votes: 0,
			down_votes: 0,
		},
		{
			review_id: "cdd78c7a-53bf-425b-ae53-eebf7939bcc6",
			product_id: "95c080b6-816b-424d-ad39-9b9b8b3b1d2d",
			retailer_id: "Sephora123",
			review_headline: "smooth",
			review_text:
				"I received this from beauty blender in exchange for my honest review. Honestly, I didn’t understand what the hype before but after tried it, I can definitely see why it is one of a kind. It’s so smooth. It leaves my make up flawless..",
			review_rating: 5,
			review_date: getReviewTimeStamp("1 d ago"),
			reviewer_name: "seily",
			reviewer_id: "1e9328c8-8125-4b23-8d2d-6bf7e868f34c",
			verified_buyer: false,
			up_votes: 0,
			down_votes: 0,
		},
		{
			review_id: "f21cf8d6-4e62-4f2b-9cd7-75ec83bc2c8a",
			product_id: "95c080b6-816b-424d-ad39-9b9b8b3b1d2d",
			retailer_id: "Sephora123",
			review_headline: "The best one in the business",
			review_text:
				"Another amazing sponge blender from Beauty Blender! They are the the one and only best one ever since they are the original og ones. They are so soft and blends really well for your makeup. They are always well worth the price!",
			review_rating: 5,
			review_date: getReviewTimeStamp("1 d ago"),
			reviewer_name: "Sheena35504",
			reviewer_id: "e507b976-c6ba-4fb2-8873-042639a1d933",
			verified_buyer: false,
			up_votes: 0,
			down_votes: 0,
		},
		{
			review_id: "1cee66d1-9bd9-4142-9470-9d03b2707b5d",
			product_id: "95c080b6-816b-424d-ad39-9b9b8b3b1d2d",
			retailer_id: "Sephora123",
			review_headline: null,
			review_text:
				"I have used this product for years and absolutely love it! It helps my makeup go on smoothly and flawlessly! There is not a better makeup sponge on the market! I highly recommend this to anyone that wants to make makeup application easy!",
			review_rating: 5,
			review_date: getReviewTimeStamp("1 d ago"),
			reviewer_name: "kmberry14",
			reviewer_id: "db56798f-37b0-4058-a9b9-51e673233d34",
			verified_buyer: false,
			up_votes: 0,
			down_votes: 0,
		},
		{
			review_id: "885fe3bd-89b0-4940-9aeb-bf6154b6fc61",
			product_id: "95c080b6-816b-424d-ad39-9b9b8b3b1d2d",
			retailer_id: "Sephora123",
			review_headline: null,
			review_text:
				"What more can be said about these? The best for applying and blending flawlessly.",
			review_rating: 5,
			review_date: getReviewTimeStamp("2 d ago"),
			reviewer_name: "cecrn4",
			reviewer_id: "938eb063-f720-47b9-bf40-49cd38d0ef2a",
			verified_buyer: false,
			up_votes: 0,
			down_votes: 0,
		},
	];


	const reviewers: Reviewer[] = reviewsData.map((review) => {
		return {
			reviewer_id: review.reviewer_id,
			reviewer_name: review.reviewer_name,
		};
	});

	await prisma.product.create({ data: productData });
	await prisma.sephoraProduct.create({ data: metaData });

	await prisma.reviewer.createMany({ data: reviewers });
	await prisma.review.createMany({ data: reviewsData });

	const end = new Date().getTime();
	console.log(`Execution time: ${(end - start) / 1000} seconds`);

	// console.log(product, sephoraProduct, ultaProduct)
}
