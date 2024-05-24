import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const requestUrl = new URL(request.url)

	// return NextResponse.redirect(`${requestUrl.origin}`);
	return NextResponse.next()
}

export const config = {
	matcher: "/",
};
