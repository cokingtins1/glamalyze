import { PrismaClient } from "@prisma/client";
import { withPgTrgm } from "prisma-extension-pg-trgm";

const prisma = new PrismaClient().$extends(withPgTrgm({ logQueries: false }));

export default async function Query(query: string) {
	let threshold = 0.45;

	const data = [
		{
			product_id: "b2c50cac-8bb5-4a36-a2af-02f0f70d9980",
			product_name: "Rose Water Defining Styling Gel",
			retailer_id: "Ulta",
			brand_id: "98a4d886-fdae-4a93-b138-f3129f4bf269",
			brand_name: "tgin",
			sku_id: "2563402",
			avg_rating: 3.8,
			total_reviews: 37,
			page_link:
				"https://www.ulta.com/p/rose-water-defining-styling-gel-pimprod2016010?sku=2563402",
			product_price: [15.99],
			product_image_url: [
				"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
			],

			created_at: new Date(),
			updated_at: new Date(),
		},
		{
			product_id: "0a9643b3-61f1-462b-8297-6070b11c3bcb",
			product_name:
				"Weightless Shine Curl Defining Jelly with Glycolic Acid",
			retailer_id: "Ulta",
			brand_id: "73938365-868a-4f33-8e51-58ae4ae7fd1d",
			brand_name: "KRISTIN ESS HAIR",
			sku_id: "2579397",
			avg_rating: 4.1,
			total_reviews: 234,
			page_link:
				"https://www.ulta.com/p/weightless-shine-curl-defining-jelly-with-glycolic-acid-pimprod2023604?sku=2579397",
			product_price: [15],
			product_image_url: [
				"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
			],

			created_at: new Date(),
			updated_at: new Date(),
		},
		{
			product_id: "044c5ef7-dcc9-46ca-8425-4642ce5b3711",
			product_name: "Curl Refreshing Mist",
			retailer_id: "Ulta",
			brand_id: "a02f2297-e720-4094-bcdb-12534974267b",
			brand_name: "Redken",
			sku_id: "2622384",
			avg_rating: 4.4,
			total_reviews: 393,
			page_link:
				"https://www.ulta.com/p/curl-refreshing-mist-pimprod2044866?sku=2622384",
			product_price: [32],
			product_image_url: [
				"https://media.ulta.com/i/ulta/2622384?w=240&$ProductCardNeutralBGLight$&fmt=auto",
			],

			created_at: new Date(),
			updated_at: new Date(),
		},
		{
			product_id: "7e0953ac-2b55-479f-9e29-934bb17c939c",
			product_name: "High Definition Curls 3- Step Hair Set",
			retailer_id: "Sephora",
			brand_id: "e66c5749-dc23-43ca-8199-d58452401b8a",
			brand_name: "Curlsmith",
			sku_id: "2622108",
			avg_rating: 97.21,
			total_reviews: 43,
			page_link:
				"/product/high-definition-curls-3-step-hair-set-P502011?skuId=2622108&icid2=products grid:p502011:product",
			product_price: [68],
			product_image_url: [
				"https://www.sephora.com/productimages/sku/s2622108-main-zoom.jpg?imwidth=250",
				"https://www.sephora.com/productimages/sku/s2622108-main-zoom.jpg?imwidth=500",
			],

			created_at: new Date(),
			updated_at: new Date(),
		},
		{
			product_id: "e71f32fc-1644-49d5-83b5-2163bbc9d890",
			product_name: "Curls Detangler",
			retailer_id: "Ulta",
			brand_id: "279dc0be-0ced-4304-ad2e-ecd7ad044882",
			brand_name: "Sun Bum",
			sku_id: "2543321",
			avg_rating: 4.2,
			total_reviews: 28,
			page_link:
				"https://www.ulta.com/p/curls-detangler-pimprod2005717?sku=2543321",
			product_price: [16.99],
			product_image_url: [
				"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
			],

			created_at: new Date(),
			updated_at: new Date(),
		},
	];

	let ultaResult = await prisma.ultaProduct.similarity({
		query: {
			product_name: {
				similarity: { text: query, order: "desc" },
				word_similarity: { text: query, threshold: { gt: threshold } },
			},
		},
	});

	let sephoraResult = await prisma.sephoraProduct.similarity({
		query: {
			product_name: {
				similarity: { text: query, order: "desc" },
				word_similarity: { text: query, threshold: { gt: threshold } },
			},
		},
	});

	// while (result.length <= 3 || threshold <= 0.05) {
	// 	threshold = threshold - 0.05;
	// 	result = await prisma.allProducts.similarity({
	// 		query: {
	// 			product_name: {
	// 				similarity: { text: query, order: "desc" },
	// 				word_similarity: {
	// 					text: query,
	// 					threshold: { gt: threshold },
	// 				},
	// 			},
	// 		},
	// 	});
	// }



	// table of ulta product_names == sephora product_names

	console.log("threshold", threshold);
	console.log("results.length", result.length);

	const mappedResults = result.map((result) => {
		const {
			product_name_similarity_score,
			product_name_word_similarity_score,
			...rest
		} = result;
		return rest;
	});

	return mappedResults;
}
