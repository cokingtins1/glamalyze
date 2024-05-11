import { getUltaReviews } from "@/app/actions/getUltaReviews";
import { getSephoraReviews } from "@/app/actions/getSephoraReviews";
import { querySchema } from "@/app/libs/types";
import { NextResponse } from "next/server";
import { insertData } from "@/app/actions/prisma/insertData";
import Query from "@/app/libs/QueryFunctions/query";

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

	const test = [
		{
			product_id: "0791509f-57a4-4c9f-8237-8143e02365b4",
			product_name: "My Dream Lipstick - Creamy Lip Color",
			retailer_id: "Ulta",
			brand_id: "6c5dbeb0-0e3f-46c2-9c50-b1d6ff52e99e",
			brand_name: "NATASHA DENONA",
			sku_id: "2606648",
			avg_rating: 4.8,
			total_reviews: 46,
			page_link:
				"https://www.ulta.com/p/my-dream-lipstick-creamy-lip-color-pimprod2037994?sku=2606648",
			product_price: [27],
			product_image_url: [
				"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
			],
			created_at: new Date(),
			updated_at: new Date(),
		},
		{
			product_id: "09720d19-d90f-46ab-97ca-9b041e364ed1",
			product_name: "Color Fetish Matte Lipstick",
			retailer_id: "Ulta",
			brand_id: "2b09e86f-92cc-41e3-9284-edcc3884bc34",
			brand_name: "Milani",
			sku_id: "2590645",
			avg_rating: 4.7,
			total_reviews: 728,
			page_link:
				"https://www.ulta.com/p/color-fetish-matte-lipstick-pimprod2025973?sku=2590645",
			product_price: [10.99],
			product_image_url: [
				"https://media.ulta.com/i/ulta/2590645?w=240&$ProductCardNeutralBGLight$&fmt=auto",
			],
			created_at: new Date(),
			updated_at: new Date(),
		},
		{
			product_id: "4df504ad-0adf-40d3-8399-927acb1352da",
			product_name: "Light Show Color Melt Foils",
			retailer_id: "Ulta",
			brand_id: "8ed2cec9-bbc5-4ab7-bbe5-eb11d8fb2f9a",
			brand_name: "Exa",
			sku_id: "2583283",
			avg_rating: 4,
			total_reviews: 1,
			page_link:
				"https://www.ulta.com/p/light-show-color-melt-foils-pimprod2027009?sku=2583283",
			product_price: [22],
			product_image_url: [
				"https://media.ulta.com/i/ulta/2583283?w=240&$ProductCardNeutralBGLight$&fmt=auto",
			],
			created_at: new Date(),
			updated_at: new Date(),
		},
	];

	// await new Promise((resolve) => setTimeout(resolve, 5000))

	const data = await Query(result.data.query);

	return NextResponse.json(
		Object.keys(zodErrors).length > 0
			? { errors: zodErrors }
			: { success: { data: data } }
	);
}
