import { getUltaData } from "@/app/actions/getUltaData";
import { getSephoraData } from "@/app/actions/getSephoraData";
import { querySchema } from "@/app/libs/types";
import { NextResponse } from "next/server";
import { insertData } from "@/app/actions/prisma/insertData";
import Query from '@/app/libs/QueryFunctions/query';

export async function POST(req: Request) {
	const start = new Date().getTime();
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

	const end = new Date().getTime();
	// await Query(result.data.query)
	console.log(`Execution time in route.ts: ${(end - start) / 1000} seconds`);

	return NextResponse.json(
		Object.keys(zodErrors).length > 0
			? { errors: zodErrors }
			: { success: { data: "data..." } }
	);
}
