import { querySchema } from "@/app/libs/types";
import { NextResponse } from "next/server";
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

	const { query } = result.data;
	const retData = await combinedRetailerQuery(query);

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
