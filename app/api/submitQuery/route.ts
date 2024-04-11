import { getScrapedData } from "@/app/actions/getScrapedData";
import { querySchema } from "@/app/libs/types";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const body: FormData = await req.json();

	const result = querySchema.safeParse(body);
	let zodErrors = {};
	if (!result.success) {
		result.error.issues.forEach((issue) => {
			zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
		});
	}

	console.log("body on server: ", body);

	// const { metaData, reviewsData } = await getScrapedData(body);

    await new Promise((resolve) => setTimeout(resolve, 3000))

	return NextResponse.json(
		Object.keys(zodErrors).length > 0
			? { errors: zodErrors }
			: { success: {data: "data..."} }
	);
}
