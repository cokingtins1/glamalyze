import { getUltaReviews } from "@/app/actions/getUltaReviews";
import { getSephoraReviews } from "@/app/actions/getSephoraReviews";
import { querySchema } from "@/app/libs/types";
import { NextResponse } from "next/server";
import Query from "@/app/libs/QueryFunctions/query";
import singleRetailerQuery from "@/app/libs/QueryFunctions/singleRetailerQuery";
import combinedRetailerQuery from "@/app/libs/QueryFunctions/combinedRetailerQuery";

export async function POST(req: Request) {
	const body = await req.json();

	const result = querySchema.safeParse(body);
	let zodErrors = {};
	if (!result.success) {
		result.error.issues.forEach((issue) => {
			zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
		});
	}

	if (result.success === false) {
		return NextResponse.json(
			Object.keys(zodErrors).length > 0
				? { errors: zodErrors }
				: { success: { data: "data..." } }
		);
	}

	// await new Promise((resolve) => setTimeout(resolve, 500));
	const { query, ulta, sephora, shared } = result.data;
	// console.log(result.data);
	// const retData = await singleRetailerQuery(query, ulta, sephora, shared);
	const retData = await combinedRetailerQuery(query);
	// console.log("retData:", retData);

	const ultaData = [
		{
			product_id: "e0880ff2-8806-4651-b0e8-bf0840e344bf",
			avg_rating: 4.8,
			percent_recommended: 98,
			product_name: "Industrial Strength Hand Healer",
			review_histogram: [338, 50, 10, 0, 2],
			sku_id: "2535964",
			total_reviews: 400,
			brand_name: "Jack Black",
			retailer_id: "Ulta",
			brand_id: "a56b7b5c-8bbe-4bf2-9912-8847e63db656",
			created_at: new Date("2024-04-30T18:42:53.896Z"),
			page_link:
				"https://www.ulta.com/p/industrial-strength-hand-healer-xlsImpprod18881055?sku=2535964",
			product_image_url: [
				"https://media.ulta.com/i/ulta/2535964?w=614&h=614&fmt=auto",
			],
			updated_at: new Date("2024-05-17T03:09:38.292Z"),
			product_price_range: [48],
			product_price: 48,
		},
		{
			product_id: "0c1dc8c2-f24f-4968-bc0a-c85addf5f7b9",
			avg_rating: 3.1,
			percent_recommended: null,
			product_name: "Foundation Pump",
			review_histogram: [],
			sku_id: "2519621",
			total_reviews: 94,
			brand_name: "NARS",
			retailer_id: "Ulta",
			brand_id: "3066a767-5409-47e3-a861-194cc1b272c7",
			created_at: "2024-04-30T18:52:01.418Z",
			page_link:
				"https://www.ulta.com/p/foundation-pump-xlsImpprod17041015?sku=2519621",
			product_image_url: [
				"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
			],
			updated_at: "2024-04-30T18:52:01.418Z",
			product_price_range: [6],
			product_price: null,
		},

		{
			product_id: "e8e8599f-133a-4531-9f27-ee573c804997",
			avg_rating: 4.7,
			percent_recommended: 91,
			product_name: "Natural #110 Black False Eyelashes Multipack",
			review_histogram: [27, 64, 66, 78, 15],
			sku_id: "2287444",
			total_reviews: 1564,
			brand_name: "Ardell",
			retailer_id: "Ulta",
			brand_id: "c1a7dc79-a00e-4890-ad23-0f47ec347a7f",
			created_at: "2024-04-30T18:52:01.418Z",
			page_link:
				"https://www.ulta.com/p/natural-110-black-false-eyelashes-multipack-xlsImpprod12441147?sku=2287444",
			product_image_url: [
				"https://media.ulta.com/i/ulta/2287444?w=240&$ProductCardNeutralBGLight$&fmt=auto",
			],
			updated_at: "2024-04-30T18:52:01.418Z",
			product_price_range: [12.99],
			product_price: 12.99,
		},
		{
			product_id: "e8e8599f-133a-4531-9f27-ee573c804997",
			avg_rating: 4.7,
			percent_recommended: 91,
			product_name: "Natural #110 Black False Eyelashes Multipack",
			review_histogram: [27, 64, 66, 78, 15],
			sku_id: "2287444",
			total_reviews: 1564,
			brand_name: "Ardell",
			retailer_id: "Ulta",
			brand_id: "c1a7dc79-a00e-4890-ad23-0f47ec347a7f",
			created_at: "2024-04-30T18:52:01.418Z",
			page_link:
				"https://www.ulta.com/p/natural-110-black-false-eyelashes-multipack-xlsImpprod12441147?sku=2287444",
			product_image_url: [
				"https://media.ulta.com/i/ulta/2287444?w=240&$ProductCardNeutralBGLight$&fmt=auto",
			],
			updated_at: "2024-04-30T18:52:01.418Z",
			product_price_range: [12.99],
			product_price: 12.99,
		},
	];

	const sephoraData = [
		{
			product_id: "a10d8294-2774-4d23-88b1-9b36fef151d5",
			avg_rating: 4.7,
			percent_recommended: null,
			product_name: "Industrial Strength Hand Healer",
			review_histogram: [77, 16, 4, 1, 1],
			sku_id: "1381581",
			total_reviews: 418,
			brand_name: "Jack Black",
			retailer_id: "Sephora",
			brand_id: "a56b7b5c-8bbe-4bf2-9912-8847e63db656",
			created_at: new Date("2024-04-30T20:09:10.719Z"),
			page_link:
				"https://www.sephora.com/product/industrial-strength-hand-healer-P12572?skuId=1381581&icid2=products grid:p12572:product",
			product_image_url: [
				"https://www.sephora.com/productimages/sku/s1381581-main-zoom.jpg?imwidth=250",
				"https://www.sephora.com/productimages/sku/s1381581-main-zoom.jpg?imwidth=500",
			],
			updated_at: new Date("2024-05-16T23:46:01.296Z"),
			product_price_range: [16, 48],
			product_price: 48,
		},

		{
			product_id: "b73ce31b-1bc0-4e10-9d2c-3c6f30ef0b15",
			avg_rating: 83.662,
			percent_recommended: null,
			product_name: "Skin Foundation Stick",
			review_histogram: [],
			sku_id: "1587435",
			total_reviews: 1200,
			brand_name: "Bobbi Brown",
			retailer_id: "Sephora",
			brand_id: "40cd2173-9d57-4250-8fd3-88d779cf60be",
			created_at: "2024-04-30T20:09:10.719Z",
			page_link:
				"https://www.sephora.com/product/foundation-stick-P270549?skuId=1587435&icid2=products grid:p270549:product",
			product_image_url: [
				"https://www.sephora.com/productimages/sku/s1587435-main-zoom.jpg?imwidth=250",
				"https://www.sephora.com/productimages/sku/s1587435-main-zoom.jpg?imwidth=500",
			],
			updated_at: "2024-05-02T00:11:53.345Z",
			product_price_range: [54],
			product_price: null,
		},

		{
			product_id: "911f2378-4084-4636-b7be-3f3aa2c77fd4",
			avg_rating: 86.334,
			percent_recommended: 95,
			product_name:
				"24-HR Brow Setter Clear Brow Gel with Lamination Effect",
			review_histogram: [25, 46, 75, 36, 69],
			sku_id: "1935774",
			total_reviews: 1900,
			brand_name: "Benefit Cosmetics",
			retailer_id: "Sephora",
			brand_id: "01eb6016-1579-4ba5-884a-6c04bfcab7b0",
			created_at: "2024-04-30T20:09:10.719Z",
			page_link:
				"sephora.com/product/24-hr-brow-setter-P409242?skuId=1935774&icid2=products grid:p409242:product",
			product_image_url: [
				"https://www.sephora.com/productimages/sku/s1935774-main-zoom.jpg?imwidth=250",
				"https://www.sephora.com/productimages/sku/s1935774-main-zoom.jpg?imwidth=500",
			],
			updated_at: "2024-05-02T00:11:53.345Z",
			product_price_range: [15, 26],
			product_price: 15,
		},
	];

	return NextResponse.json(
		Object.keys(zodErrors).length > 0
			? { errors: zodErrors }
			: {
					success: {
						data: retData,
					},
			  }
	);
}
