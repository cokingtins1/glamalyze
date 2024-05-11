import { getUltaReviews } from "@/app/actions/getUltaReviews";
import { getSephoraReviews } from "@/app/actions/getSephoraReviews";
import { querySchema } from "@/app/libs/types";
import { NextResponse } from "next/server";
import { detectionTest } from "@/app/actions/Detection/detectionTest";
import { insertData } from "@/app/actions/prisma/insertData";

export async function POST(req: Request) {
	const start = new Date().getTime();
	const body = await req.json();

	//could get sku from url without scraping...

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
	const [ultaData, sephoraData] = await Promise.all([
		getUltaReviews(result.data.ultaUrl),
		getSephoraReviews(result.data.sephoraUrl),
	]);

	const { metaData: ultaProduct, reviewsData: ultaReviews } = ultaData;
	const { metaData: sephoraProduct, reviewsData: sephoraReviews } =
		sephoraData;

	// console.log("product data and reviews:", sephoraProduct, sephoraReviews);

	if (ultaReviews.length > 0 && sephoraReviews.length > 0) {
		try {
			console.log("inserting data into db");
			const userId = "db716298-1f63-4e36-a446-dec6affe0052";
			const response = await insertData(
				ultaProduct,
				sephoraProduct,
				ultaReviews,
				sephoraReviews,
				userId
			);
			console.log("response:", response);
		} catch (error) {
			console.log(error);
		}
	}
	const end = new Date().getTime();
	console.log(`Execution time in route.ts: ${(end - start) / 1000} seconds`);

	return NextResponse.json(
		Object.keys(zodErrors).length > 0
			? { errors: zodErrors }
			: { success: { data: "data..." } }
	);
}
