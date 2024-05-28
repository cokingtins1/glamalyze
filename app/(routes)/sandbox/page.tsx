import { Button } from "@/components/ui/button";
import { PrismaClient } from "@prisma/client";

import React from "react";

import Link from "next/link";

const prisma = new PrismaClient();
// const prisma = new PrismaClient().$extends(withPgTrgm());

export default async function Page() {
	async function handleSubmit() {
		"use server";

		// const data = await prisma.sharedProduct.findMany({
		// 	where: { sephora_product_price: null },
		// });
		// console.log(data.length);

		// const sLinks = data.map((p) => ({
		// 	sharedId: [p.id],
		// 	id: ["", p.sephora_product_id],
		// 	page_link: ["", p.sephora_page_link],
		// 	name: [p.ulta_product_name, p.sephora_product_name],
		// 	total_reviews: [p.ulta_total_reviews, p.sephora_total_reviews],
		// }));

		const url =
			"https://www.sephora.com/product/lights-camera-lashes-tm-4-in-1-mascara-mini-P439932?skuId=2156420&icid2=products grid:p439932:product";
		console.log("getting data");
		// const data = await getSephoraReviews(url, "696969696", true);
		// const data = await getUltaReviews(url, "69", true);
		// console.log(data);

		
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
