import { Button } from "@/components/ui/button";
import { productSeeds } from "@/lib/seeding/seedingFuncs";
import { randomUserName } from "@/lib/utils";
import { PrismaClient } from "@prisma/client";
import { randomInt } from "crypto";
import dayjs from "dayjs";
import { generate } from "random-words";
import React from "react";
import { getAllSephoraProducts } from "../../actions/getAllSephoraProducts";
import elements from "@/app/libs/JSON/elemets.json";
import { AllProducts, AllProductsSelectors, Review } from "../../libs/types";
import { getAllUltaProducts } from "../../actions/getAllUltaProducts";
import { getAllUltaBrands } from "../../actions/getAllUltaBrands";
import { getAllSephoraBrands } from "../../actions/getAllSephoraBrands";
import { withPgTrgm } from "prisma-extension-pg-trgm";
import Link from "next/link";
import { getUltaReviews } from "@/app/actions/getUltaReviews";
import { getSephoraReviews } from "@/app/actions/getSephoraReviews";

const prisma = new PrismaClient();
// const prisma = new PrismaClient().$extends(withPgTrgm());

export default async function Page() {
	async function handleSubmit() {
		"use server";

		function getSku(slug: string) {
			const string = decodeURIComponent(slug);

			const uSkuPattern = /u:\[([\d,]+)\]/;
			const sSkuPattern = /s:\[([\d,]+)\]/;

			const uSkuMatch = string.match(uSkuPattern);
			const u_sku = uSkuMatch
				? uSkuMatch[1]
						.split(",")
						.map((sku) => ({ sku, retailer: "Ulta" }))
				: [];

			const sSkuMatch = string.match(sSkuPattern);
			const s_sku = sSkuMatch
				? sSkuMatch[1]
						.split(",")
						.map((sku) => ({ sku, retailer: "Sephora" }))
				: [];

			return [...u_sku, ...s_sku];
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
					return getUltaReviews(p.page_link, p.product_id);
				} else if (
					p.retailer === "Sephora" &&
					p.page_link !== null &&
					p.product_id !== null
				) {
					return getSephoraReviews(p.page_link, p.product_id);
				}
			});
			const data = await Promise.all(promises);
			return data;
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
				const expirationThreshold = 7; // days
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
					});

					existingData.push({
						productData: productData,
						reviewsData: reviewData,
					});
				}
			}

			const validData = existingData.filter((item) => {
				return (
					item.productData !== null && item.reviewsData?.length > 0
				);
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

		const slug = "u:[2614776],s:[2641884]";

		// const productInfo = await getProductDetails(skuArray);

		const url =
			"https://www.ulta.com/p/water-drench-hyaluronic-cloud-makeup-removing-gel-cleanser-pimprod2024512?sku=2579756";
		const id = "4f65289a-b720-4c56-883b-3b0ed83a3aa7";
		console.log("getting data");
		// const data = await getSephoraReviews(url, id, true);
		// const data = await getUltaReviews(url, id, true);
		// console.log(data);

		console.log("done");

		const testUrl = "https://www.sephora.com/product/mario-badescu-witch-hazel-lavender-toner-P462379?skuId=2387967&icid2=products"

		const specificProduct = await prisma.sharedProduct.findFirst({
			where: {
				OR: [
					{ ulta_page_link: { contains: testUrl } },
					{ sephora_page_link: { contains: testUrl } },
				],
			},
		});

		console.log(specificProduct)

		const newReviews = [
			{
				review_id: "4100a94b-0d43-4892-8520-2255837cee6f",
				product_id: "4f65289a-b720-4c56-883b-3b0ed83a3aa7",
				retailer_id: "Sephora",
				review_headline: "Smooth and light on the lips, stays hydrated",
				review_text:
					"This lipstick was very bold and felt light on my lips. I have the velvet 999. I do like the color and feel of it however I would prefer a cooler tone red than a warmer tone. I love the fine detail on the actual lipstick, shows that it is a quality, high-end lipstick. The color lasted well, I’d say about 12 hours. Appeared as a lip stain at the end of the day which I like. After removing the lipstick my lips still felt hydrated and not dried out. I would recommend this lipstick.",
				review_rating: 5,
				review_date_string: "1 Mar 2024",
				reviewer_name: "Jenquag",
				verified_buyer: false,
				up_votes: 69,
				down_votes: 22,
			},
			{
				review_id: "bf793da4-02e6-4815-b2d9-c61cf6a5596c",
				product_id: "4f65289a-b720-4c56-883b-3b0ed83a3aa7",
				retailer_id: "Sephora",
				review_headline: "Good texture",
				review_text:
					"Texture is very good. The Color in my picture is 772, to me this color is a bit too vibrant, and I think I won’t use it on a daily basis. It works great with light makeup, though.",
				review_rating: 4,
				review_date_string: "23 Mar 2024",
				reviewer_name: "Wen0218",
				verified_buyer: false,
				up_votes: 4,
				down_votes: 0,
			},
			{
				review_id: "04f3625f-a7b5-400d-b497-f6e6864e56bf",
				product_id: "4f65289a-b720-4c56-883b-3b0ed83a3aa7",
				retailer_id: "Sephora",
				review_headline: null,
				review_text:
					"Love this lipstick! Love the color and the texture. It’s long lasting and comfortable to wear. Highly recommended.",
				review_rating: 5,
				review_date_string: "15 Feb 2024",
				reviewer_name: "Wen0218",
				verified_buyer: true,
				up_votes: 4,
				down_votes: 0,
			},
			{
				review_id: "da8a87fa-efec-4069-8db4-61b39432e521",
				product_id: "4f65289a-b720-4c56-883b-3b0ed83a3aa7",
				retailer_id: "Sephora",
				review_headline: "Very disappointing - like a lip balm",
				review_text:
					"I am very disappointed in this formula although not surprised as I have never been a huge fan of Dior lipsticks so not sure why I thought this would be different.  It is very hard to find a warm light nude from Dior so when I saw this shade I thought it would be perfect for me which it is in the tube.  You have to go over and over to get any type of pigment, it is more or less like a lip balm and has the same amount of longevity of a lip balm too.  I used a Dior lip liner and after about 5-6 swipes of this lipstick my lips looked ok but about an hour later every trace of the lipstick was gone (no did not eat or drink anything) but lipliner was still there (Dior liners are amazing).  The packaging is nice and sturdy but unfortunately the product was a miss for me so going back....especially at that price!",
				review_rating: 2,
				review_date_string: "22 d ago",
				reviewer_name: "mizeet",
				verified_buyer: true,
				up_votes: 3,
				down_votes: 0,
			},
			{
				review_id: "da8a87fa-efec-4069-8fge4-61b39432e521",
				product_id: "4f65289a-b720-4c56-883b-3b0ed83a3aa7",
				retailer_id: "Sephora",
				review_headline: "Very disappointing - like a lip balm",
				review_text: "Test new review",
				review_rating: 2,
				review_date_string: "22 d ago",
				reviewer_name: "mizeet",
				verified_buyer: true,
				up_votes: 10,
				down_votes: 0,
			},
		];

		const existingReviews = [
			{
				review_id: "4100a94b-0d43-4892-8520-2255837cee6f",
				product_id: "4f65289a-b720-4c56-883b-3b0ed83a3aa7",
				retailer_id: "Sephora",
				review_headline: "Smooth and light on the lips, stays hydrated",
				review_text:
					"This lipstick was very bold and felt light on my lips. I have the velvet 999. I do like the color and feel of it however I would prefer a cooler tone red than a warmer tone. I love the fine detail on the actual lipstick, shows that it is a quality, high-end lipstick. The color lasted well, I’d say about 12 hours. Appeared as a lip stain at the end of the day which I like. After removing the lipstick my lips still felt hydrated and not dried out. I would recommend this lipstick.",
				review_rating: 4,
				review_date_string: "1 Mar 2024",
				reviewer_name: "Jenquag",
				verified_buyer: false,
				up_votes: 9,
				down_votes: 0,
			},
			{
				review_id: "bf793da4-02e6-4815-b2d9-c61cf6a5596c",
				product_id: "4f65289a-b720-4c56-883b-3b0ed83a3aa7",
				retailer_id: "Sephora",
				review_headline: "Good texture",
				review_text:
					"Texture is very good. The Color in my picture is 772, to me this color is a bit too vibrant, and I think I won’t use it on a daily basis. It works great with light makeup, though.",
				review_rating: 4,
				review_date_string: "23 Mar 2024",
				reviewer_name: "Wen0218",
				verified_buyer: false,
				up_votes: 4,
				down_votes: 0,
			},
			{
				review_id: "04f3625f-a7b5-400d-b497-f6e6864e56bf",
				product_id: "4f65289a-b720-4c56-883b-3b0ed83a3aa7",
				retailer_id: "Sephora",
				review_headline: null,
				review_text:
					"Love this lipstick! Love the color and the texture. It’s long lasting and comfortable to wear. Highly recommended.",
				review_rating: 5,
				review_date_string: "15 Feb 2024",
				reviewer_name: "Wen0218",
				verified_buyer: true,
				up_votes: 4,
				down_votes: 0,
			},
			{
				review_id: "da8a87fa-efec-4069-8db4-61b39432e521",
				product_id: "4f65289a-b720-4c56-883b-3b0ed83a3aa7",
				retailer_id: "Sephora",
				review_headline: "Very disappointing - like a lip balm",
				review_text:
					"I am very disappointed in this formula although not surprised as I have never been a huge fan of Dior lipsticks so not sure why I thought this would be different.  It is very hard to find a warm light nude from Dior so when I saw this shade I thought it would be perfect for me which it is in the tube.  You have to go over and over to get any type of pigment, it is more or less like a lip balm and has the same amount of longevity of a lip balm too.  I used a Dior lip liner and after about 5-6 swipes of this lipstick my lips looked ok but about an hour later every trace of the lipstick was gone (no did not eat or drink anything) but lipliner was still there (Dior liners are amazing).  The packaging is nice and sturdy but unfortunately the product was a miss for me so going back....especially at that price!",
				review_rating: 2,
				review_date_string: "22 d ago",
				reviewer_name: "mizeet",
				verified_buyer: true,
				up_votes: 10,
				down_votes: 0,
			},
		];

		const revToUpdate = [];
		const revToAdd = [];
		const matchedReviewIds: string[] = [];

		for (const review1 of newReviews) {
			for (const review2 of existingReviews) {
				// Check if the specified fields match
				if (
					review1.review_text === review2.review_text &&
					!matchedReviewIds.includes(review1.review_id)
				) {
					revToUpdate.push(review1);
					matchedReviewIds.push(review1.review_id);

					break; // Break inner loop as soon as a match is found
				} else {
					revToAdd.push(review2);
				}
			}
		}

		const reviewsNotInExisting = newReviews.filter(
			(newReview) =>
				!existingReviews.some(
					(existingReview) =>
						existingReview.review_text === newReview.review_text
				)
		);

		const updatedReviews = existingReviews.map((existingReview) => {
			const matchingNewReview = newReviews.find(
				(newReview) =>
					newReview.review_text === existingReview.review_text
			);
			if (matchingNewReview) {
				return {
					...existingReview,
					review_rating: matchingNewReview.review_rating,
					up_votes: matchingNewReview.up_votes,
					down_votes: matchingNewReview.down_votes,
				};
			} else {
				return existingReview;
			}
		});

		// console.log("Add:", revToAdd);
	}

	const ref = "/compare/u:[2614776],s:[2641884]";

	return (
		<>
			<div className="space-y-8">
				<Link href={ref}>
					<Button type="button">Test Compare</Button>
				</Link>
				<form action={handleSubmit}>
					<Button type="submit">Scrape All Products</Button>
				</form>
			</div>
		</>
	);
}
