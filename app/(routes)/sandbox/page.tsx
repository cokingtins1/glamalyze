import { Button } from "@/components/ui/button";
import { PrismaClient } from "@prisma/client";

import React from "react";

import Link from "next/link";

const prisma = new PrismaClient();
// const prisma = new PrismaClient().$extends(withPgTrgm());

export default async function Page() {
	async function handleSubmit() {

		"use server";

		const sku = [5]

		const res = await fetch("/api/retailerQuery", {


			method: "POST",
			body: JSON.stringify({
				// query: data.query,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		// if (res.ok) {
		// 	const responseData = await res.json();
		// 	if (!sheet) {
		// 		setData(responseData.success.data);
		// 		setCombinedProducts(responseData.success.data);
		// 	}
		// }

		
	}

	function getSku(slug: string) {
		const string = decodeURIComponent(slug);

		const uSkuPattern = /u:\[([\d,]+)\]/;
		const sSkuPattern = /s:\[([\d,]+)\]/;

		const uSkuMatch = string.match(uSkuPattern);
		const u_sku = uSkuMatch
			? uSkuMatch[1].split(",").map((sku) => ({ sku, retailer: "Ulta" }))
			: [];

		const sSkuMatch = string.match(sSkuPattern);
		const s_sku = sSkuMatch
			? sSkuMatch[1]
					.split(",")
					.map((sku) => ({ sku, retailer: "Sephora" }))
			: [];

		return [...u_sku, ...s_sku];
	}

	// console.log(getSku("u:[546215,435135]"))

	const ref = "/compare/u:[2614776],s:[2641884]";

	return (
		<>
			<div className="space-y-8">
				<Link href={ref}>
					<Button type="button">Test Compare</Button>
				</Link>
				<form action={handleSubmit}>
					<Button type="submit">Scrape All Products</Button>
				</form>
			</div>
		</>
	);
}
