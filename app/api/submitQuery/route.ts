import { getUltaData } from "@/app/actions/getUltaData";
import { getSephoraData } from "@/app/actions/getSephoraData";
import { querySchema } from "@/app/libs/types";
import { NextResponse } from "next/server";
import { detectionTest } from "@/app/actions/Detection/detectionTest";
import { insertData } from "@/app/actions/prisma/insertData";

export async function POST(req: Request) {
	const body = await req.json();

	const result = querySchema.safeParse(body);
	let zodErrors = {};
	if (!result.success) {
		result.error.issues.forEach((issue) => {
			zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
		});
	}

	// await detectionTest()

	const { metaData, reviewsData } = await getSephoraData(body.url);

	if (reviewsData.length > 0) {
		try {
			console.log("inserting data into db");
			const userId = "69957123-2318-464c-996a-1875984745ab"
			await insertData(metaData, reviewsData, userId);
		} catch (error) {
			console.log(error);
		}
	}

	return NextResponse.json(
		Object.keys(zodErrors).length > 0
			? { errors: zodErrors }
			: { success: { data: "data..." } }
	);
}
