import { Button } from "@/components/ui/button";

import React from "react";

import Link from "next/link";
import oneOffScrapeProduct from "@/app/libs/DashboardFunctions/oneOffScrapeProduct";
import oneOffScrapeReview from "@/app/libs/DashboardFunctions/oneOffScrapeReview";

export default async function Page() {
	async function handleSubmit() {
		"use server";
		const productId = "00403a7c-7ee7-4072-9a81-d688eb127c0f";
		const url =
			"https://www.ulta.com/p/hy-glam-powder-foundation-pimprod2044289?sku=2624364";

		await oneOffScrapeReview(url, productId, true, "Ulta");
	}

	const ref = "/compare/u:[2614776],s:[2641884]";

	return (
		<>
			<div className="space-y-8">
				{/* <Link href={ref}>
					<Button type="button">Test Compare</Button>
				</Link> */}
				<form action={handleSubmit}>
					<Button type="submit">Scrape All Products</Button>
				</form>
			</div>
		</>
	);
}
