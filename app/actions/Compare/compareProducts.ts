"use server";

import { PrismaClient } from "@prisma/client";
import { getUltaReviews } from "../getUltaReviews";
import { getSephoraReviews } from "../getSephoraReviews";
import updateData from "./updateData";
import { AllProducts, Review } from "@/app/libs/types";

const prisma = new PrismaClient();
export default async function compareProducts(slug: string) {
	const start = new Date().getTime();

	if (!slug) {
		// return [];
	}

	await new Promise((resolve) => setTimeout(resolve, 2000));
	type DummyData = {
		productData: AllProducts | null;
		reviewsData: Review[] | null;
	}[];
	const dummyData: DummyData = [
		{
			productData: {
				product_id: "e0880ff2-8806-4651-b0e8-bf0840e344bf",
				created_at: new Date(),
				updated_at: new Date(),
				product_name: "Industrial Strength Hand Healer",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2535964?w=614&h=614&fmt=auto",
				],
				retailer_id: "Ulta",
				brand_id: "a56b7b5c-8bbe-4bf2-9912-8847e63db656",
				brand_name: "Jack Black",
				review_histogram: [2563, 50, 10, 0, 2],
				product_price_range: [48.0],
				product_price: 46,
				sku_id: "2535964",
				avg_rating: 4.8,
				total_reviews: 400,
				page_link:
					"https://www.ulta.com/p/industrial-strength-hand-healer-xlsImpprod18881055?sku=2535964",
				percent_recommended: 98,
			},
			reviewsData: [
				{
					review_id: "c97ec896-7a5f-45ad-99b7-ccc18331ff98",
					product_id: "e0880ff2-8806-4651-b0e8-bf0840e344bf",
					created_at: new Date(),
					updated_at: new Date(),
					retailer_id: "Ulta",
					review_rating: 5,
					verified_buyer: true,
					up_votes: 6,
					down_votes: 0,
					review_text:
						'Went in to store and asked the sales gal for the "BEST" hand cream she had, money was no object at this point as my fingers were cracking and peeling and cuticle oil and the hand serums I had were not doing anything.   My husband actually uses a lot of Jack Black products but we did not have this one.  In 1 application I noticed a difference, 4 days later my hands are 90% better.  Highly recommend this product!',
					review_headline: "BEST hand cream out there",
					reviewer_name: "Terri",
					review_date: new Date(),
					review_date_string: " 2 years ago",
				},
				{
					review_id: "6c13e6c2-8089-4dde-b14f-f6133e436320",
					product_id: "e0880ff2-8806-4651-b0e8-bf0840e344bf",
					created_at: new Date(),
					updated_at: new Date(),
					retailer_id: "Ulta",
					review_rating: 5,
					verified_buyer: false,
					up_votes: 4,
					down_votes: 0,
					review_text:
						"I bought this hand cream for my boyfriend who had really dry callused hands (he goes to the gym).  I also bought him a hand callus remover but that's beside the point. This hand cream made his hands feel sooooo soft like a baby. It absorbed very nicely and wasn't greasy. He really loves this hand cream and is always thanking me for buying it for him. Highly recommend!!",
					review_headline: "Amazing",
					reviewer_name: "Michelle",
					review_date: new Date(),
					review_date_string: " 1 year ago",
				},
				{
					review_id: "7b40c513-0f60-407b-8190-9b5e5cc07968",
					product_id: "e0880ff2-8806-4651-b0e8-bf0840e344bf",
					created_at: new Date(),
					updated_at: new Date(),
					retailer_id: "Ulta",
					review_rating: 5,
					verified_buyer: false,
					up_votes: 3,
					down_votes: 0,
					review_text:
						"I'm a COVID ICU RN so all I do is wash/sanitize my hands and this stuff is one of the only hand creams that works for me. I have super sensitive skin and am hypersensitive to smells so this stuff is great. By the end of my shift my hands are raw and burning and this cream is so soothing. It isn't greasy at all. I always have at least one back up!",
					review_headline: "I'm a nurse",
					reviewer_name: "BexRN",
					review_date: new Date(),
					review_date_string: " 3 years ago",
				},
				{
					review_id: "9b54fa96-70e8-4c51-ad8b-e03d6aaaa5e8",
					product_id: "e0880ff2-8806-4651-b0e8-bf0840e344bf",
					created_at: new Date(),
					updated_at: new Date(),
					retailer_id: "Ulta",
					review_rating: 5,
					verified_buyer: true,
					up_votes: 3,
					down_votes: 0,
					review_text:
						"This is the only hand cream that I can use in the winter for my extra dry skin on my hands. I originally bought this for my husband, but it quickly became my go-to when the weather turned cold and dry. It definitely smells manly, but if you can get past that it is well worth it for women too!",
					review_headline: "Best hand cream!",
					reviewer_name: "HCM630",
					review_date: new Date(),
					review_date_string: " 4 years ago",
				},
				{
					review_id: "b8227746-e286-4c0a-b20a-af5360469fc5",
					product_id: "e0880ff2-8806-4651-b0e8-bf0840e344bf",
					created_at: new Date(),
					updated_at: new Date(),
					retailer_id: "Ulta",
					review_rating: 5,
					verified_buyer: true,
					up_votes: 3,
					down_votes: 0,
					review_text:
						"I wash my hands so many times a day being in the medical field. This has been the first thing that has helped my hands in years. I now have people at work asking what I use.",
					review_headline: "Amazing",
					reviewer_name: "Carol (extreme hand washer)",
					review_date: new Date(),
					review_date_string: " 5 years ago",
				},
				{
					review_id: "9b9b67d8-583d-48e6-ab06-896d250ce962",
					product_id: "e0880ff2-8806-4651-b0e8-bf0840e344bf",
					created_at: new Date(),
					updated_at: new Date(),
					retailer_id: "Ulta",
					review_rating: 5,
					verified_buyer: true,
					up_votes: 3,
					down_votes: 1,
					review_text:
						"I have very dry hands with psoriasis all over my body but I like to try to have moisturized hands. Before I found this product I couldn't find something that would keep my hands moisturized and soft. It would take something huge to make me switch from this product. It's an absolute must have product in my purse.",
					review_headline: "The best cream for hand sine ever had",
					reviewer_name: "CMDavis6974",
					review_date: new Date(),
					review_date_string: " 8 years ago",
				},
				{
					review_id: "e23a8a37-b8a4-4745-baae-00487788d354",
					product_id: "e0880ff2-8806-4651-b0e8-bf0840e344bf",
					created_at: new Date(),
					updated_at: new Date(),
					retailer_id: "Ulta",
					review_rating: 1,
					verified_buyer: false,
					up_votes: 3,
					down_votes: 12,
					review_text:
						'You will find Cetyl Alcohol in most lotions. However, it is usually down the ingredient list a bit. In this product, it is the second ingredient. I made the mistake of not looking at the ingredient and trusting that with a name like "Industrial Strength Hand Healer" this product must be able to help my cracked and dry skin. That was the wrong assumption. This is SO drying. It made my hands worse, and I am sorry I used ANY, because I wish I could return it. The Eucalyptus scent is overbearing as well. I will not buy this again, and I will steer clear of this brand. Good luck finding good lotions! They are out there, but you really have to pay attention to what makes the product work.',
					review_headline: "Do not buy this lotion!",
					reviewer_name: "Train",
					review_date: new Date(),
					review_date_string: " 3 years ago",
				},
				{
					review_id: "c5f2c9af-2d10-42ec-8c85-7a9d5c8e9c26",
					product_id: "e0880ff2-8806-4651-b0e8-bf0840e344bf",
					created_at: new Date(),
					updated_at: new Date(),
					retailer_id: "Ulta",
					review_rating: 5,
					verified_buyer: true,
					up_votes: 3,
					down_votes: 0,
					review_text:
						"Best hand lotion for men. Works better than anything else I have tried.  Non-greasy. Nice, neutral masculine scent",
					review_headline: "Amazing",
					reviewer_name: "ThomasF",
					review_date: new Date(),
					review_date_string: " 2 years ago",
				},
				{
					review_id: "033e657f-dd6d-492e-a153-f75133acf781",
					product_id: "e0880ff2-8806-4651-b0e8-bf0840e344bf",
					created_at: new Date(),
					updated_at: new Date(),
					retailer_id: "Ulta",
					review_rating: 5,
					verified_buyer: true,
					up_votes: 3,
					down_votes: 0,
					review_text:
						"I found a sample of this amazing hand cream in a women's shelter. The cleaners we used to clean the house was very hard on my hands causing deep cracks in my fingers. After the use of this product not only did it stop the pain but the cracks began to close within a couple of days. I can't wait to order some and recommend it to my friends and family. Jonice S.",
					review_headline: "Awesome product",
					reviewer_name: "Jonice",
					review_date: new Date(),
					review_date_string: " 2 years ago",
				},
				{
					review_id: "ab363427-3b28-4780-97f4-8f05a3d34287",
					product_id: "e0880ff2-8806-4651-b0e8-bf0840e344bf",
					created_at: new Date(),
					updated_at: new Date(),
					retailer_id: "Ulta",
					review_rating: 4,
					verified_buyer: false,
					up_votes: 3,
					down_votes: 0,
					review_text:
						"I have dry skin. Every winter it gets worse. I am always looking for the best moisturizer for dry skin. I read all the reviews on this one and thought I would give it a try. It is good, nice soothing smell, but doesn't stay very long. I always seem to be re-applying it. I use it on my hands and on my feet after the shower. I use on my hands in the morning when I get up and during the day as needed. My hands feel good but seems like I am always putting on more. Not really worth the price over drugstore brands.",
					review_headline: "Good, but not that good",
					reviewer_name: "HOLLY",
					review_date: new Date(),
					review_date_string: " 5 years ago",
				},
				{
					review_id: "4ba2050e-17f4-49f0-a1e0-941f78986825",
					product_id: "e0880ff2-8806-4651-b0e8-bf0840e344bf",
					created_at: new Date(),
					updated_at: new Date(),
					retailer_id: "Ulta",
					review_rating: 5,
					verified_buyer: true,
					up_votes: 3,
					down_votes: 0,
					review_text: `Got this for my boyfriend who works on cars and had 150 grit sandpaper hands. It is instantly moisturizing without being greasy and has a nice, faint herbal scent. It's a good dupe for "working hands" lotion for those looking for something less greasy.`,
					review_headline: "Sooo soft",
					reviewer_name: "Jess",
					review_date: new Date(),
					review_date_string: " 2 years ago",
				},
				{
					review_id: "eaf37daa-63ba-4b45-9735-3c4d46eb7195",
					product_id: "e0880ff2-8806-4651-b0e8-bf0840e344bf",
					created_at: new Date(),
					updated_at: new Date(),
					retailer_id: "Ulta",
					review_rating: 3,
					verified_buyer: true,
					up_votes: 2,
					down_votes: 1,
					review_text:
						"I didn't find this product to be any better or worse than any other hand lotion. The price would suggest that it works better than most, but it doesn't.",
					review_headline: "Nothing to write home about",
					reviewer_name: "RandyS",
					review_date: new Date(),
					review_date_string: " 1 year ago",
				},
				{
					review_id: "43a029af-fa9e-4989-8efa-a552f145b433",
					product_id: "e0880ff2-8806-4651-b0e8-bf0840e344bf",
					created_at: new Date(),
					updated_at: new Date(),
					retailer_id: "Ulta",
					review_rating: 5,
					verified_buyer: true,
					up_votes: 2,
					down_votes: 0,
					review_text:
						"Best hand lotion/cream I've ever used. Will continue to buy.",
					review_headline: "Best ever!",
					reviewer_name: "susant",
					review_date: new Date(),
					review_date_string: " 1 year ago",
				},
				{
					review_id: "5720e278-df8a-4128-9727-6cdb056fbb01",
					product_id: "e0880ff2-8806-4651-b0e8-bf0840e344bf",
					created_at: new Date(),
					updated_at: new Date(),
					retailer_id: "Ulta",
					review_rating: 5,
					verified_buyer: false,
					up_votes: 2,
					down_votes: 0,
					review_text:
						"I work a manual labor job in a warehouse, and I can't tell you how many greasy & unhelpful products I've tried to use to heal my cracked winter knuckles. I had pretty much stopped trying to heal them and was just suffering through it when on a whim I tried this product. By the next morning, my cracked skin was smooth again! It goes on easily (although it definitely stings for a bit if your hands get as cracked as mine do) and dries down quickly with NO greasy feeling -- which means I can use this at work without having to wipe my hands down afterward. \n" +
						"\n" +
						"My only con is that it does have a strong eucalyptus smell -- reminds me of Vick's Vapo-Rub, and I kind of hate it. But for me, the effectiveness of the lotion is worth it, and the smell does dissipate/you get used to it.",
					review_headline: "Literally magic",
					reviewer_name: "CL",
					review_date: new Date(),
					review_date_string: " 1 year ago",
				},
				{
					review_id: "b233d6c0-2f03-4538-913a-b53ca6d3a048",
					product_id: "e0880ff2-8806-4651-b0e8-bf0840e344bf",
					created_at: new Date(),
					updated_at: new Date(),
					retailer_id: "Ulta",
					review_rating: 5,
					verified_buyer: true,
					up_votes: 2,
					down_votes: 0,
					review_text:
						"My hands get extremely dry from daily activities (washing dishes is the worst).  I have used this lotion for years.  I love it.  The only downside is the price.  But it is worth every penny. I only use it at night and it keeps my hands soft and supple.",
					review_headline: "Best Hand Cream",
					reviewer_name: "Judith",
					review_date: new Date(),
					review_date_string: " 2 years ago",
				},
				{
					review_id: "d0fbce5d-ffcf-4d31-83ed-02a6a15419cd",
					product_id: "e0880ff2-8806-4651-b0e8-bf0840e344bf",
					created_at: new Date(),
					updated_at: new Date(),
					retailer_id: "Ulta",
					review_rating: 5,
					verified_buyer: true,
					up_votes: 1,
					down_votes: 0,
					review_text:
						"My sister bought this for my partner every Christmas.   He had rough hands from working outside. And since my brother-in-law was an artist in pottery, he used hand healer regularly. Now, since I'm older, my hands dry out constantly. So, I'm buying Hand Healer for myself. It's a fantastic hand moisturizer. Better than another product I've tried. Great for stopping my hang nails from forming! So FYI, women can use it too!",
					review_headline:
						"Great hand moisturizer! Not just for men, but women too!",
					reviewer_name: "CINDYB",
					review_date: new Date(),
					review_date_string: " 1 year ago",
				},
				{
					review_id: "c1e18828-bd63-45fc-82da-a74de1b82f6f",
					product_id: "e0880ff2-8806-4651-b0e8-bf0840e344bf",
					created_at: new Date(),
					updated_at: new Date(),
					retailer_id: "Ulta",
					review_rating: 5,
					verified_buyer: true,
					up_votes: 1,
					down_votes: 0,
					review_text:
						"Product works great - my favorite go to hand lotion.",
					review_headline: "Best hand lotion",
					reviewer_name: "RichardD",
					review_date: new Date(),
					review_date_string: " 1 year ago",
				},
				{
					review_id: "07113d60-cc94-4656-a6bd-e34837d9f55c",
					product_id: "e0880ff2-8806-4651-b0e8-bf0840e344bf",
					created_at: new Date(),
					updated_at: new Date(),
					retailer_id: "Ulta",
					review_rating: 5,
					verified_buyer: true,
					up_votes: 1,
					down_votes: 0,
					review_text:
						"Perfect for dry hands, especially in winter. It's very effective at treating my hands and making them much softer.",
					review_headline: "Great hand lotion",
					reviewer_name: "ElliotP",
					review_date: new Date(),
					review_date_string: " 4 months ago",
				},
				{
					review_id: "2252b970-54b9-431b-95bb-5052f67fdf6b",
					product_id: "e0880ff2-8806-4651-b0e8-bf0840e344bf",
					created_at: new Date(),
					updated_at: new Date(),
					retailer_id: "Ulta",
					review_rating: 4,
					verified_buyer: true,
					up_votes: 1,
					down_votes: 0,
					review_text:
						"I use the product every day and it works quite well.\n" +
						"The only issue is that it leaves a greasy feel after you apply it.",
					review_headline: "Works well but greasy",
					reviewer_name: "JIMS",
					review_date: new Date(),
					review_date_string: " 4 months ago",
				},
				{
					review_id: "8e9d5c8d-49e3-43f5-869d-c7982e6f74e9",
					product_id: "e0880ff2-8806-4651-b0e8-bf0840e344bf",
					created_at: new Date(),
					updated_at: new Date(),
					retailer_id: "Ulta",
					review_rating: 5,
					verified_buyer: true,
					up_votes: 1,
					down_votes: 0,
					review_text:
						"Great for the fall/winter season when your hands get particularly dry. Always keep this in stock for times my hands need a little extra lovin'",
					review_headline: "Works wonders",
					reviewer_name: "Eros",
					review_date: new Date(),
					review_date_string: " 7 months ago",
				},
				{
					review_id: "9bd68fc7-9d7d-4c51-befa-f31849bec55d",
					product_id: "e0880ff2-8806-4651-b0e8-bf0840e344bf",
					created_at: new Date(),
					updated_at: new Date(),
					retailer_id: "Ulta",
					review_rating: 5,
					verified_buyer: true,
					up_votes: 1,
					down_votes: 0,
					review_text:
						"I do have a problem with it.  I actually purchased it for my elbows.  It healed my sunburn hands nicely.  Highly recommend. Lovely product.  Your packaging is the bomb.  Tidy and compact.",
					review_headline: "Magnificent",
					reviewer_name: "JacquelineF",
					review_date: new Date(),
					review_date_string: " 10 months ago",
				},
				{
					review_id: "0acaff10-7203-4e5c-bc4a-d258d8982c80",
					product_id: "e0880ff2-8806-4651-b0e8-bf0840e344bf",
					created_at: new Date(),
					updated_at: new Date(),
					retailer_id: "Ulta",
					review_rating: 5,
					verified_buyer: true,
					up_votes: 1,
					down_votes: 1,
					review_text:
						"I have been using this product for a few years. I like to work in my yard, do woodworking, and renovations around my house but, I am a white-collar professional, so when I go to work I like my hands to look the part. Thanks to this product my beat-up hands heal quickly and look great. I recommend this product to people all the time.",
					review_headline: "Amazing Stuff",
					reviewer_name: "stevet",
					review_date: new Date(),
					review_date_string: " 11 months ago",
				},
				{
					review_id: "f3a6dfd0-d7e6-494e-8dce-979f7ea12507",
					product_id: "e0880ff2-8806-4651-b0e8-bf0840e344bf",
					created_at: new Date(),
					updated_at: new Date(),
					retailer_id: "Ulta",
					review_rating: 5,
					verified_buyer: true,
					up_votes: 0,
					down_votes: 0,
					review_text:
						"Works well. Has a nice minty smell and goes on smooth without any greasy or too thick feeling.",
					review_headline: "Good product",
					reviewer_name: "LuckyF",
					review_date: new Date(),
					review_date_string: " 1 year ago",
				},
				{
					review_id: "50abbfc1-e888-49fe-8c72-0ff2e3bfc3a0",
					product_id: "e0880ff2-8806-4651-b0e8-bf0840e344bf",
					created_at: new Date(),
					updated_at: new Date(),
					retailer_id: "Ulta",
					review_rating: 5,
					verified_buyer: true,
					up_votes: 0,
					down_votes: 0,
					review_text:
						"During the winter months, I used to suffer through dried hands and cracked cuticles that were very painful.  I tried a number of hand creams and skin repair creams.  None of them really worked.  I have been really impressed with the Jack Black Hand Healer.  I put it on my hands every night before I go to sleep and the next morning my hands are soft and smooth.  Since I have been using JB hand healer, I have not had any cracking or dryness in my hands at all this winter.  Great stuff!!",
					review_headline: "The Best So Far",
					reviewer_name: "EdwardV",
					review_date: new Date(),
					review_date_string: " 1 year ago",
				},
				{
					review_id: "eac1a130-4099-45e4-8889-cd99d8667dbb",
					product_id: "e0880ff2-8806-4651-b0e8-bf0840e344bf",
					created_at: new Date(),
					updated_at: new Date(),
					retailer_id: "Ulta",
					review_rating: 3,
					verified_buyer: false,
					up_votes: 0,
					down_votes: 0,
					review_text: `I have dry skin/hands and have tried multiple lotions in hope of finding "the one".  Sadly this was not it.  Not care for smell and was ordinary.  However, design and feel / functionality of bottle and pump was sleek and nice. Jack Black's lip balm's are fabulous!`,
					review_headline: "Not 4 Me - Chapped Hands",
					reviewer_name: "ironmaidn",
					review_date: new Date(),
					review_date_string: " 4 months ago",
				},
				{
					review_id: "11d17553-91f7-436b-866e-bdca7e4ccc04",
					product_id: "e0880ff2-8806-4651-b0e8-bf0840e344bf",
					created_at: new Date(),
					updated_at: new Date(),
					retailer_id: "Ulta",
					review_rating: 5,
					verified_buyer: true,
					up_votes: 0,
					down_votes: 0,
					review_text:
						"The Jack Black Hand Healer is the bomb. I use it on my hands at least once per day during the winter months and no d so far have only had one finger crack which healed quickly.",
					review_headline: "Hands down the best hand healer!",
					reviewer_name: "RogerW",
					review_date: new Date(),
					review_date_string: " 3 months ago",
				},
				{
					review_id: "9ad23818-18ad-4cf6-be91-7bafa2657ce7",
					product_id: "e0880ff2-8806-4651-b0e8-bf0840e344bf",
					created_at: new Date(),
					updated_at: new Date(),
					retailer_id: "Ulta",
					review_rating: 5,
					verified_buyer: true,
					up_votes: 0,
					down_votes: 0,
					review_text:
						"I've probably purchased this over 20 times.  It's my favorite go to addition to any gift.   Hand Healer makes everyone's hands feel better, and the scent is incredible.  Soothing.",
					review_headline: "Hand Healer",
					reviewer_name: "DebraA",
					review_date: new Date(),
					review_date_string: " 3 months ago",
				},
			],
		},
		{
			productData: {
				product_id: "a10d8294-2774-4d23-88b1-9b36fef151d5",
				created_at: new Date(),
				updated_at: new Date(),
				product_name: "Industrial Strength Hand Healer",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s1381581-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s1381581-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora",
				brand_id: "a56b7b5c-8bbe-4bf2-9912-8847e63db656",
				brand_name: "Jack Black",
				review_histogram: [77, 16, 4, 1, 1],
				product_price_range: [12.99],
				product_price: 48,
				sku_id: "1381581",
				avg_rating: 4.7,
				total_reviews: 418,
				page_link:
					"https://www.sephora.com/product/industrial-strength-hand-healer-P12572?skuId=1381581&icid2=products grid:p12572:product",
				percent_recommended: null,
			},
			reviewsData: [
				{
					review_id: "48efa803-e261-4336-81c6-0c309bc3e1d6",
					product_id: "a10d8294-2774-4d23-88b1-9b36fef151d5",
					created_at: new Date(),
					updated_at: new Date(),
					retailer_id: "Sephora",
					review_rating: 5,
					verified_buyer: false,
					up_votes: 20,
					down_votes: 1,
					review_text:
						"I got the small size for my dad to try for the holidays and I ended up buying him the full size for Father’s Day because he loved it so much! I inherited my dry skin from him and he really struggles with his hands. He uses this lotion nightly before bed and it really keeps his hands much softer and hydrated. If my no nonsense Dad loves this lotion, it’s a winner!",
					review_headline: "My Dad is Hooked!",
					reviewer_name: "ivmeow",
					review_date: new Date(),
					review_date_string: "29 Jul 2020",
				},

				{
					review_id: "66e07dab-bb8a-47e4-9c97-31da5f591806",
					product_id: "a10d8294-2774-4d23-88b1-9b36fef151d5",
					created_at: new Date(),
					updated_at: new Date(),
					retailer_id: "Sephora",
					review_rating: 5,
					verified_buyer: false,
					up_votes: 17,
					down_votes: 0,
					review_text:
						"If you have dry skin, dry cuticles, your nails are fragile - look no further, this is made for you. I work at the restaurant and willy nilly my hands are being washed infinite amount of times. For the last 10 years I have used Khiel's, Lancome, Clarins, Bliss, and lots of their cheaper siblings from drug stores. Nothing works as fast and as well as the Jack Black Hand Healer. Don't want to sound as if working for the company but this is the best and your hands will support my opinion as mine do even after using it only 2 weeks.",
					review_headline: "Thank you for creating this cream",
					reviewer_name: "knowtheshow",
					review_date: new Date(),
					review_date_string: "15 May 2013",
				},

				{
					review_id: "ae28086b-ec07-45bc-a73b-831572fb3dc6",
					product_id: "a10d8294-2774-4d23-88b1-9b36fef151d5",
					created_at: new Date(),
					updated_at: new Date(),
					retailer_id: "Sephora",
					review_rating: 5,
					verified_buyer: false,
					up_votes: 15,
					down_votes: 0,
					review_text:
						"My hubby gets horribly dry hands in the winter - his skin cracks and his knuckles bleed and it's just awful. This winter I bought him the Jack Black Industrial Strength Hand Healer. I chose this because it was formulated for a man (unlike almost all other hand lotions) and it's mostly natural ingredients, which we prefer. My husband actually used it and liked it. That's no small feat, trust me! It smells great and works on even the driest of hands.",
					review_headline: "my husband actually uses it!",
					reviewer_name: "threnodynx",
					review_date: new Date(),
					review_date_string: "20 Aug 2009",
				},

				{
					review_id: "dabaf049-cf5b-42db-81bc-8655a3e2be3c",
					product_id: "a10d8294-2774-4d23-88b1-9b36fef151d5",
					created_at: new Date(),
					updated_at: new Date(),
					retailer_id: "Sephora",
					review_rating: 2,
					verified_buyer: false,
					up_votes: 13,
					down_votes: 8,
					review_text:
						"This is a nice hand cream but I can’t handle the smell. Just like vapo rub—strong menthol. It doesn’t fade either; very permeating and absolutely not what I want to smell like. Will not repurchase.",
					review_headline: "Smells like vapo rub",
					reviewer_name: "tantallum99",
					review_date: new Date(),
					review_date_string: "26 Apr 2021",
				},
				{
					review_id: "448c0b8c-0b29-4ae0-8ea3-1efca8a3dbdd",
					product_id: "a10d8294-2774-4d23-88b1-9b36fef151d5",
					created_at: new Date(),
					updated_at: new Date(),
					retailer_id: "Sephora",
					review_rating: 2,
					verified_buyer: false,
					up_votes: 13,
					down_votes: 8,
					review_text:
						"This is a nice hand cream but I can’t handle the smell. Just like vapo rub—strong menthol. It doesn’t fade either; very permeating and absolutely not what I want to smell like. Will not repurchase.",
					review_headline: "Smells like vapo rub",
					reviewer_name: "tantallum99",
					review_date: new Date(),
					review_date_string: "26 Apr 2021",
				},
				{
					review_id: "0b2deee6-e441-4ffc-830b-9cba26ffd71a",
					product_id: "a10d8294-2774-4d23-88b1-9b36fef151d5",
					created_at: new Date(),
					updated_at: new Date(),
					retailer_id: "Sephora",
					review_rating: 5,
					verified_buyer: false,
					up_votes: 12,
					down_votes: 24,
					review_text:
						"I purchased this for my father and he never used it because he apparently doesn't appreciate gifts...\n" +
						"\n" +
						" that being said it's a really good hand lotion if cracking skin is an issue you have. I for one, have father issues apparently haha",
					review_headline: "tmi",
					reviewer_name: "luxlotus",
					review_date: new Date(),
					review_date_string: "5 Oct 2016",
				},
				{
					review_id: "63e8a01e-b139-4fc9-ac17-783854eb60bf",
					product_id: "a10d8294-2774-4d23-88b1-9b36fef151d5",
					created_at: new Date(),
					updated_at: new Date(),
					retailer_id: "Sephora",
					review_rating: 5,
					verified_buyer: false,
					up_votes: 12,
					down_votes: 24,
					review_text:
						"I purchased this for my father and he never used it because he apparently doesn't appreciate gifts...\n" +
						"\n" +
						" that being said it's a really good hand lotion if cracking skin is an issue you have. I for one, have father issues apparently haha",
					review_headline: "tmi",
					reviewer_name: "luxlotus",
					review_date: new Date(),
					review_date_string: "5 Oct 2016",
				},
				{
					review_id: "3d3be042-7f01-46b6-a3cd-2cc5593c996b",
					product_id: "a10d8294-2774-4d23-88b1-9b36fef151d5",
					created_at: new Date(),
					updated_at: new Date(),
					retailer_id: "Sephora",
					review_rating: 5,
					verified_buyer: false,
					up_votes: 11,
					down_votes: 0,
					review_text:
						"This is the best hand cream I have tried. It is quickly absorbed into the skin, not sticky and no film, quickly heals small cracks on the skin of the hands. The cream has a pleasant unobtrusive scent of eucalyptus. I love this product!",
					review_headline: null,
					reviewer_name: "OxanaV",
					review_date: new Date(),
					review_date_string: "29 Jul 2020",
				},
				{
					review_id: "f18dfde2-f2ad-43d3-9f71-d108db48555f",
					product_id: "a10d8294-2774-4d23-88b1-9b36fef151d5",
					created_at: new Date(),
					updated_at: new Date(),
					retailer_id: "Sephora",
					review_rating: 5,
					verified_buyer: false,
					up_votes: 11,
					down_votes: 0,
					review_text:
						"This is the best hand cream I have tried. It is quickly absorbed into the skin, not sticky and no film, quickly heals small cracks on the skin of the hands. The cream has a pleasant unobtrusive scent of eucalyptus. I love this product!",
					review_headline: null,
					reviewer_name: "OxanaV",
					review_date: new Date(),
					review_date_string: "29 Jul 2020",
				},
				{
					review_id: "2da5d3fc-845c-4a41-954e-a9d563be33a3",
					product_id: "a10d8294-2774-4d23-88b1-9b36fef151d5",
					created_at: new Date(),
					updated_at: new Date(),
					retailer_id: "Sephora",
					review_rating: 5,
					verified_buyer: false,
					up_votes: 10,
					down_votes: 0,
					review_text:
						"I agree with the other reviews. This lotion is incredible, I am so glad I decided on this one.\n" +
						"I've been using it for about a week now and my hands and elbows feel amazing. I tend to neglect my hands and elbows and consequently they are dry and rough. I usually favor the balms but then I leave greasy finger prints all over everything. I have yet to find a lotion that actually feels like it's moisturizing and doesn't over power me with a heavy perfume so strong I can taste it. This industrial strength hand healer goes on thick, absorbs quickly and the eucalyptus scent fades in a matter of seconds. My hands and elbows feel baby soft. This lotion is rich so I don't need to keep reapplying. No more annoying stench or greasy paw prints all over my belongs! I will happily repurchase this product.",
					review_headline: "F A B U L O U S !",
					reviewer_name: "libbyr",
					review_date: new Date(),
					review_date_string: "30 Aug 2013",
				},
				{
					review_id: "c71c4dcb-c8c4-448e-b0c2-27f6a990df0f",
					product_id: "a10d8294-2774-4d23-88b1-9b36fef151d5",
					created_at: new Date(),
					updated_at: new Date(),
					retailer_id: "Sephora",
					review_rating: 5,
					verified_buyer: false,
					up_votes: 10,
					down_votes: 0,
					review_text:
						"I have this hand cream in both the small and large sizes for travel and home use. This is a luxurious cream and helps keep my work worn hands soft. It has a scent like a combination of licorice and mint that fades quickly. It will smear if you must wash your hands soon after applying.",
					review_headline: "Luxurious Hand Cream",
					reviewer_name: "LB1964",
					review_date: new Date(),
					review_date_string: "4 Jul 2014",
				},
				{
					review_id: "8fb9be21-d083-41ef-a619-4856d9af8eff",
					product_id: "a10d8294-2774-4d23-88b1-9b36fef151d5",
					created_at: new Date(),
					updated_at: new Date(),
					retailer_id: "Sephora",
					review_rating: 5,
					verified_buyer: false,
					up_votes: 9,
					down_votes: 1,
					review_text:
						"It's winter, which means dry hands, and with the current state of the world, lots of extra hand washing. My hands were dry, cracked, and hurting so I rushed to Sephora for a solution. I like to keep hand lotion by my kitchen sink, so needed a pump option. this one did the trick. This lotion is thick and nourishing without being greasy at all. it absorbs quickly and lasts through hand washing. It does have a noticable eucalyptus scent when you first put it on, but the scent dissipates really quickly and is not bothersome. overall, worth the price.",
					review_headline: "Fantastic lotion for dry hands",
					reviewer_name: "fragrancejunkie7",
					review_date: new Date(),
					review_date_string: "2 Feb 2022",
				},
				{
					review_id: "46994005-e6a9-4a7a-afe5-56cde16f2607",
					product_id: "a10d8294-2774-4d23-88b1-9b36fef151d5",
					created_at: new Date(),
					updated_at: new Date(),
					retailer_id: "Sephora",
					review_rating: 5,
					verified_buyer: false,
					up_votes: 9,
					down_votes: 1,
					review_text:
						"My mom has the worst hands, it makes me cry how hard she works despite deep cracks in her hands- Jack said this will do the job & wow he was right! So happy I got it for her. Almost overnight my mom's hands are healing, smother, and less painful. The medicated lotion is really spot on in its texture -very silky!",
					review_headline: "Omg hands down - great stuff!",
					reviewer_name: "Laceandleather",
					review_date: new Date(),
					review_date_string: "28 Sep 2012",
				},
				{
					review_id: "67c1fd21-a8b5-428e-94d0-28e5ba1ed5f2",
					product_id: "a10d8294-2774-4d23-88b1-9b36fef151d5",
					created_at: new Date(),
					updated_at: new Date(),
					retailer_id: "Sephora",
					review_rating: 5,
					verified_buyer: false,
					up_votes: 8,
					down_votes: 1,
					review_text:
						"My mom has always had dry hands in the winter, but chemotherapy & the necessity of constant hand washing have taken that to new heights. This is the only thing that brings her relief, and I order her a giant bottle for Christmas each year.",
					review_headline: "Fantastic",
					reviewer_name: "bougieskincare",
					review_date: new Date(),
					review_date_string: "1 Nov 2023",
				},
				{
					review_id: "79c4a518-2044-40d2-b95b-7c889c1c7757",
					product_id: "a10d8294-2774-4d23-88b1-9b36fef151d5",
					created_at: new Date(),
					updated_at: new Date(),
					retailer_id: "Sephora",
					review_rating: 3,
					verified_buyer: false,
					up_votes: 8,
					down_votes: 2,
					review_text:
						"I have very dry hands and cuticles in general. I purchased this because it smelled of mint and eucalyptus which I enjoyed. However, it is far from hand healing. It is very greasy and just sits on the skin. Feels like a grease coat on top of skin. Theres no absorption.",
					review_headline: "Do not recomment",
					reviewer_name: "imjsutme",
					review_date: new Date(),
					review_date_string: "24 Dec 2019",
				},
			],
		},
	];

	return dummyData;

	function getSku(slug: string) {
		const string = decodeURIComponent(slug);

		const uSkuPattern = /u:\[([\d,]+)\]/;
		const sSkuPattern = /s:\[([\d,]+)\]/;

		const uSkuMatch = string.match(uSkuPattern);
		const u_sku = uSkuMatch
			? uSkuMatch[1].split(",").map((sku) => ({ sku, retailer: "Ulta" }))
			: [];

		const sSkuMatch = string.match(sSkuPattern);
		const s_sku = sSkuMatch
			? sSkuMatch[1]
					.split(",")
					.map((sku) => ({ sku, retailer: "Sephora" }))
			: [];

		return [...u_sku, ...s_sku];
	}

	async function checkExisting(
		products: {
			product_id: string;
			page_link: string | null;
			retailer: string;
		}[]
	) {
		let existingData: {
			productData: AllProducts | null;
			reviewsData: Review[];
		}[] = [];
		for (const { product_id, retailer } of products) {
			const expirationThreshold = 365; // days
			const today = new Date();
			const expiration = new Date(
				today.getTime() - expirationThreshold * 24 * 60 * 60 * 1000
			);

			if (retailer === "Ulta") {
				const productData = await prisma.ultaProduct.findUnique({
					where: {
						updated_at: { gt: expiration },
						product_id: product_id,
					},
				});

				const reviewData = await prisma.ultaReview.findMany({
					where: {
						updated_at: { gt: expiration },
						product_id: product_id,
					},
					orderBy: {
						up_votes: "desc",
					},
				});

				existingData.push({
					productData: productData,
					reviewsData: reviewData,
				});
			} else if (retailer === "Sephora") {
				const productData = await prisma.sephoraProduct.findUnique({
					where: {
						updated_at: { gt: expiration },
						product_id: product_id,
					},
				});

				const reviewData = await prisma.sephoraReview.findMany({
					where: {
						updated_at: { gt: expiration },
						product_id: product_id,
					},
					orderBy: {
						up_votes: "desc",
					},
				});

				existingData.push({
					productData: productData,
					reviewsData: reviewData,
				});
			}
		}

		const validData = existingData.filter((item) => {
			return item.productData !== null && item.reviewsData?.length > 0;
		});
		const invalidIndices = existingData
			.map((item, index) =>
				item.productData === null || item.reviewsData.length === 0
					? index
					: null
			)
			.filter((index) => index !== null);

		return { validData, invalidIndices };
	}

	async function getProductDetails(
		skuArray: { sku: string; retailer: string }[]
	) {
		const result: {
			product_id: string;
			page_link: string | null;
			retailer: string;
		}[] = [];

		for (const { sku, retailer } of skuArray) {
			let productData;
			if (retailer === "Ulta") {
				productData = await prisma.ultaProduct.findFirst({
					where: { sku_id: sku },
					select: { product_id: true, page_link: true },
				});
			} else if (retailer === "Sephora") {
				productData = await prisma.sephoraProduct.findFirst({
					where: { sku_id: sku },
					select: { product_id: true, page_link: true },
				});
			}
			if (productData) {
				result.push({
					product_id: productData.product_id,
					page_link: productData.page_link || null,
					retailer: retailer,
				});
			}
		}

		return result;
	}

	async function fetchData(
		products: {
			product_id: string;
			page_link: string | null;
			retailer: string;
		}[]
	) {
		const promises = products.map(async (p) => {
			if (
				p.retailer === "Ulta" &&
				p.page_link !== null &&
				p.product_id !== null
			) {
				return getUltaReviews(p.page_link, p.product_id, true);
			} else if (
				p.retailer === "Sephora" &&
				p.page_link !== null &&
				p.product_id !== null
			) {
				return getSephoraReviews(
					`https://www.${p.page_link}`,
					p.product_id,
					true
				);
			}
		});
		const data = await Promise.all(promises);
		return data;
	}

	// const skuArray = getSku(slug);
	// const productInfo = await getProductDetails(skuArray);

	// if (productInfo.length === 0) {
	// 	throw new Error("One or both pages not found.");
	// }

	// const { validData, invalidIndices } = await checkExisting(productInfo);

	// if (validData.length === productInfo.length) {
	// 	const end = new Date().getTime();
	// 	// console.log(`Execution time: ${(end - start) / 1000} seconds`);
	// 	return validData;
	// }

	// const scrapedData = await fetchData(
	// 	invalidIndices.map((index) => productInfo[index])
	// );
	// const filteredData = scrapedData.filter((data) => data !== undefined);

	// if (filteredData) {
	// 	await updateData(filteredData);
	// }

	// let data: {
	// 	productData: AllProducts | null;
	// 	reviewsData: Review[] | null;
	// }[] = [];

	// for (const p of productInfo) {
	// 	if (p.retailer === "Ulta") {
	// 		const pData = await prisma.ultaProduct.findUnique({
	// 			where: { product_id: p.product_id },
	// 		});
	// 		const rData = await prisma.ultaReview.findMany({
	// 			where: { product_id: p.product_id },
	// 		});
	// 		data.push({ productData: pData, reviewsData: rData });
	// 	} else if (p.retailer === "Sephora") {
	// 		const pData = await prisma.sephoraProduct.findUnique({
	// 			where: { product_id: p.product_id },
	// 		});
	// 		const rData = await prisma.sephoraReview.findMany({
	// 			where: { product_id: p.product_id },
	// 		});
	// 		data.push({ productData: pData, reviewsData: rData });
	// 	}
	// }

	// const end = new Date().getTime();
	// // console.log(`Execution time: ${(end - start) / 1000} seconds`);

	// return data;
}
