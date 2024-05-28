import { AllProducts, Review } from "@/app/libs/types";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function POST(req: NextRequest) {
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

	async function getProductDetails(
		skuArray: { sku: string; retailer: string }[]
	) {
		const result: {
			product_id: string;
			page_link: string | null;
			retailer: string;
		}[] = [];

		for (const { sku, retailer } of skuArray) {
			let productData;

			if (retailer === "Ulta") {
				productData = await prisma.ultaProduct.findFirst({
					where: { sku_id: sku },
					select: { product_id: true, page_link: true },
				});
			} else if (retailer === "Sephora") {
				productData = await prisma.sephoraProduct.findFirst({
					where: { sku_id: sku },
					select: { product_id: true, page_link: true },
				});
			}
			if (productData) {
				result.push({
					product_id: productData.product_id,
					page_link: productData.page_link || null,
					retailer: retailer,
				});
			}
		}

		return result;
	}

	const slug = await req.json();
	console.log(slug);

	const skuArray = getSku(slug);
	const productInfo = await getProductDetails(skuArray);

	// if (productInfo.length === 0) {
	// 	throw new Error("One or both pages not found.");
	// }

	let data: {
		productData: AllProducts | null;
		reviewsData: Review[] | null;
	}[] = [];

	for (const p of productInfo) {
		if (p.retailer === "Ulta") {
			const pData = await prisma.ultaProduct.findUnique({
				where: { product_id: p.product_id },
			});
			const rData = await prisma.ultaReview.findMany({
				where: { product_id: p.product_id },
			});
			data.push({ productData: pData, reviewsData: rData });
		} else if (p.retailer === "Sephora") {
			const pData = await prisma.sephoraProduct.findUnique({
				where: { product_id: p.product_id },
			});
			const rData = await prisma.sephoraReview.findMany({
				where: { product_id: p.product_id },
			});
			data.push({ productData: pData, reviewsData: rData });
		}
	}

	return NextResponse.json({ data });
}



			// const res = await fetch("/api/compare", {
			// 	method: "POST",
			// 	body: JSON.stringify(sku),
			// 	headers: {
			// 		"Content-Type": "application/json",
			// 	},
			// });

			// if (res.ok) {
			// 	const resData = await res.json();
			// 	setReviewData(resData.data);
			// }

			// const data = await compareProducts(sku);
			// setLoading(false);
			// if (data) {
			// }