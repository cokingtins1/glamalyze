import { PrismaClient } from "@prisma/client";
import { withPgTrgm } from "prisma-extension-pg-trgm";
import { AllProducts } from "../types";

const prisma = new PrismaClient().$extends(withPgTrgm({ logQueries: false }));

export default async function Query(query: string) {
	let threshold = 0.9;

	let sharedResult = await prisma.sharedProduct.similarity({
		query: {
			ulta_product_name: {
				similarity: { text: query, order: "desc" },
				word_similarity: { text: query, threshold: { gt: threshold } },
			},
		},
	});

	while (sharedResult.length <= 3 || threshold <= 0.05) {
		threshold = threshold - 0.05;
		sharedResult = await prisma.sharedProduct.similarity({
			query: {
				ulta_product_name: {
					similarity: { text: query, order: "desc" },
					word_similarity: {
						text: query,
						threshold: { gt: threshold },
					},
				},
			},
		});
	}

	const mappedResults = sharedResult.map((result) => {
		const {
			ulta_product_name_similarity_score,
			ulta_product_name_word_similarity_score,
			...rest
		} = result;
		return rest;
	});

	const data = [
		{
			id: "c93296ce-3e93-175a-b124-ff92690ee59b",
			created_at: "2024-04-30T20:09:10.719Z",
			updated_at: "2024-04-30T20:09:10.719Z",
			similarity_score: 1,
			ulta_product_name: "Liquid Killawatt Fluid Freestyle Highlighter",
			sephora_product_name:
				"Liquid Killawatt Fluid Freestyle Highlighter",
			ulta_product_id: "6292681e-9389-433b-8872-49448729fa66",
			sephora_product_id: "bbabfdc3-67c8-4ae0-b9fa-a98521886c9b",
			brand_id: "6b951ac5-e113-4926-8997-8d0adb49034d",
			brand_name: "FENTY BEAUTY by Rihanna",
			sephora_avg_rating: 67.222,
			sephora_product_image_url: [
				"https://www.sephora.com/productimages/sku/s2484822-main-zoom.jpg?imwidth=250",
				"https://www.sephora.com/productimages/sku/s2484822-main-zoom.jpg?imwidth=500",
			],
			sephora_product_price: [32],
			sephora_sku_id: "2484822",
			sephora_total_reviews: 72,
			ulta_avg_rating: 3.6,
			ulta_product_image_url: [
				"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
			],
			ulta_product_price: [32],
			ulta_sku_id: "2592870",
			ulta_total_reviews: 39,
			sephora_page_link:
				"/product/fenty-beauty-rihanna-liquid-killawatt-fluid-freestyle-highlighter-P479634?skuId=2484822&icid2=products grid:p479634:product",
			ulta_page_link:
				"https://www.ulta.com/p/liquid-killawatt-fluid-freestyle-highlighter-pimprod2031433?sku=2592870",
		},
		{
			id: "78b8da31-c705-87f0-97b5-43629dccf2ec",
			created_at: "2024-04-30T20:09:10.719Z",
			updated_at: "2024-04-30T20:09:10.719Z",
			similarity_score: 0.75609756,
			ulta_product_name: "Liquid Killawatt Fluid Freestyle Highlighter",
			sephora_product_name: "Killawatt Freestyle Highlighter",
			ulta_product_id: "6292681e-9389-433b-8872-49448729fa66",
			sephora_product_id: "e546a244-d2e1-4544-81c2-c6edf6193231",
			brand_id: "6b951ac5-e113-4926-8997-8d0adb49034d",
			brand_name: "FENTY BEAUTY by Rihanna",
			sephora_avg_rating: 92.45,
			sephora_product_image_url: [
				"https://www.sephora.com/productimages/sku/s1925916-main-zoom.jpg?imwidth=250",
				"https://www.sephora.com/productimages/sku/s1925916-main-zoom.jpg?imwidth=500",
			],
			sephora_product_price: [40],
			sephora_sku_id: "1925916",
			sephora_total_reviews: 3700,
			ulta_avg_rating: 3.6,
			ulta_product_image_url: [
				"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
			],
			ulta_product_price: [32],
			ulta_sku_id: "2592870",
			ulta_total_reviews: 39,
			sephora_page_link:
				"/product/killawatt-freestyle-highlighter-P64879845?skuId=1925916&icid2=products grid:p64879845:product",
			ulta_page_link:
				"https://www.ulta.com/p/liquid-killawatt-fluid-freestyle-highlighter-pimprod2031433?sku=2592870",
		},
	];

	return mappedResults;
}
