import { Button } from "@/components/ui/button";
import { productSeeds } from "@/lib/seeding/seedingFuncs";
import { randomUserName } from "@/lib/utils";
import { AllProducts, PrismaClient, Review } from "@prisma/client";
import { randomInt } from "crypto";
import dayjs from "dayjs";
import { generate } from "random-words";
import React from "react";
import { getAllProducts } from "../actions/getAllProducts";
import elements from "@/app/libs/JSON/elemets.json";
import { AllProductsSelectors } from "../libs/types";

export default function Page() {
	async function handleSubmit() {
		"use server";

		const url = "https://www.sephora.com/brand/tom-ford";
		// const allProducts = await getAllProducts(url);

		// console.dir(allProducts, { maxArrayLength: null });

		// const uniqueSkuIds: { [key: string]: boolean } = {};
		// const uniqueResults = allProducts.filter((product) => {
		// 	if (product.sku_id !== null && product.sku_id !== undefined) {
		// 		if (!uniqueSkuIds[product.sku_id]) {
		// 			uniqueSkuIds[product.sku_id] = true;
		// 			return true;
		// 		}
		// 	}

		// 	return false;
		// });

		// console.dir(uniqueResults, { maxArrayLength: null });
		// console.dir("unique results length", uniqueResults.length);

		// console.log("productData:", allProducts);
		// console.log("Length:", allProducts.length);

		// console.log(
		// 	"Filtered Products",
		// 	allProducts.map((item) => item.product_name)
		// );

		const data = [
			{
				product_id: "38e0e64c-99b0-4d59-84ba-cfc77eb8150e",
				product_name: null,
				product_image_url: ["URL ERROR"],
				retailer_id: "Sephora123",
				brand_id: "77c7cd17-e92c-48c8-bc59-f2e17189880e",
				brand_name: null,
				product_price: [],
				sku_id: null,
				avg_rating: 0,
				total_reviews: 0,
				page_link: null,
			},
			{
				product_id: "6be428dc-15a9-40c0-b52c-6f27ac6424ed",
				product_name: "Private Blend Eau de Parfum Discovery Set",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2748531-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2748531-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "8729b6da-f06a-460e-9641-2dcc4359b50f",
				brand_name: "TOM FORD",
				product_price: [105],
				sku_id: "2748531",
				avg_rating: 71.666,
				total_reviews: 12,
				page_link:
					"/product/tom-ford-private-blend-discovery-set-P510021?skuId=2748531&icid2=products grid:p510021:product",
			},
			{
				product_id: "3e060014-2b56-410b-a4e5-05aade556e25",
				product_name: "Eye Color Quad Eyeshadow Palette",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2335743-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2335743-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "40047ebf-e5e1-458a-8770-af695396fc53",
				brand_name: "TOM FORD",
				product_price: [90],
				sku_id: "2335743",
				avg_rating: 87.254,
				total_reviews: 2100,
				page_link:
					"/product/eye-color-quad-P422568?skuId=2335743&icid2=products grid:p422568:product",
			},
			{
				product_id: "1746d1f4-23db-4c7d-a38e-106685c4c315",
				product_name: "Lost Cherry Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2101293-main-zoom.jpg?pb=allure-best-2021-badge&imwidth=250",
					"https://www.sephora.com/productimages/sku/s2101293-main-zoom.jpg?pb=allure-best-2021-badge&imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "f4ffa556-eedb-4740-a6bf-e420679ae9d9",
				brand_name: "TOM FORD",
				product_price: [80, 615],
				sku_id: "2101293",
				avg_rating: 84.196,
				total_reviews: 1500,
				page_link:
					"/product/lost-cherry-P436489?skuId=2101293&icid2=products grid:p436489:product",
			},
			{
				product_id: "f716315c-8d7c-4e57-9868-22dc6622b82f",
				product_name: "Mini Private Blend Discovery Set",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2697837-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2697837-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "7fcffd65-417c-4c9f-a9ab-e98cac80c009",
				brand_name: "TOM FORD",
				product_price: [58],
				sku_id: "2697837",
				avg_rating: 48.696,
				total_reviews: 23,
				page_link:
					"/product/mini-private-blend-discovery-set-P508902?skuId=2697837&icid2=products grid:p508902:product",
			},
			{
				product_id: "b34745a8-1b7b-47df-9b86-bd1fc3e68cd8",
				product_name: "Lip Color Lipstick",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s1917319-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s1917319-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "ef5d9eb7-82f6-48cb-b176-21c574f8e743",
				brand_name: "TOM FORD",
				product_price: [59],
				sku_id: "1917319",
				avg_rating: 91.488,
				total_reviews: 860,
				page_link:
					"/product/lip-color-P416057?skuId=1917319&icid2=products grid:p416057:product",
			},
			{
				product_id: "6ac1a573-12f0-4558-829d-7e59d2ad7405",
				product_name: "Ultra Shine Lip Color",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2756203-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2756203-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "f26aaae9-7097-4a3e-93df-391ea4f5bf16",
				brand_name: "TOM FORD",
				product_price: [59],
				sku_id: "2756203",
				avg_rating: 92.356,
				total_reviews: 573,
				page_link:
					"/product/ultra-shine-lip-color-P429018?skuId=2756203&icid2=products grid:p429018:product",
			},
			{
				product_id: "0a4e67b2-0ef1-40c1-8a67-923b4a309106",
				product_name: "Mini Soleil Blanc Shimmering Body Oil",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2327278-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2327278-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "bebf956d-9cf6-497d-8547-f7d345d42384",
				brand_name: "TOM FORD",
				product_price: [40],
				sku_id: "2327278",
				avg_rating: 88.578,
				total_reviews: 1300,
				page_link:
					"/product/tom-ford-soleil-blanc-mini-shimmering-body-oil-P456175?skuId=2327278&icid2=products grid:p456175:product",
			},
			{
				product_id: "955e5baf-c677-43f1-a320-3730118f1694",
				product_name: "Soleil Liquid Lip Blush Lip Balm",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2756187-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2756187-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "7573642e-6071-4299-bd41-0a1bda43fe80",
				brand_name: "TOM FORD",
				product_price: [65],
				sku_id: "2756187",
				avg_rating: 92.978,
				total_reviews: 131,
				page_link:
					"/product/tom-ford-soleil-liquid-lip-blush-P511230?skuId=2756187&icid2=products grid:p511230:product",
			},
			{
				product_id: "31232c84-2d9d-4206-a697-b92d5b7c317b",
				product_name: "Shade And Illuminate Cream Contour Duo",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2602829-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2602829-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "238ef748-d3bf-41a3-aae3-ffd06b481d8c",
				brand_name: "TOM FORD",
				product_price: [90],
				sku_id: "2602829",
				avg_rating: 89.904,
				total_reviews: 1100,
				page_link:
					"/product/shade-illuminate-P422574?skuId=2602829&icid2=products grid:p422574:product",
			},
			{
				product_id: "b4d13ad3-62e7-4e16-a285-536ddecf691e",
				product_name: "Tobacco Vanille Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s1449289-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s1449289-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "451588f4-b57a-4329-b831-d0e1833b8c15",
				brand_name: "TOM FORD",
				product_price: [70, 445],
				sku_id: "1449289",
				avg_rating: 85.966,
				total_reviews: 1300,
				page_link:
					"/product/tobacco-vanille-P393151?skuId=1449289&icid2=products grid:p393151:product",
			},
			{
				product_id: "658edc5b-f4ee-4369-a5e9-2232d5f776ea",
				product_name: "Soleil Blanc Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s1808088-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s1808088-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "9b8ee9f5-9c7a-462b-ad91-5cfdfbe2bd12",
				brand_name: "TOM FORD",
				product_price: [70, 445],
				sku_id: "1808088",
				avg_rating: 82.538,
				total_reviews: 867,
				page_link:
					"/product/soleil-blanc-P406526?skuId=1808088&icid2=products grid:p406526:product",
			},
			{
				product_id: "4e5ed18c-059e-43ce-8cad-7f2e31d3c734",
				product_name: "Eye Color Quad Crème Eyeshadow Palette",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2756245-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2756245-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "842ad0e2-aeff-46f3-8545-dab25feb13a4",
				brand_name: "TOM FORD",
				product_price: [90],
				sku_id: "2756245",
				avg_rating: 87.994,
				total_reviews: 578,
				page_link:
					"/product/tom-ford-eye-color-creme-eyeshadow-quad-P481356?skuId=2756245&icid2=products grid:p481356:product",
			},
			{
				product_id: "5082336d-e222-4fbd-a801-d74ba92598ef",
				product_name: "Gloss Luxe Lip Gloss",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2259695-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2259695-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "d1d8d1c5-876f-4ca1-b408-c8df22d04eca",
				brand_name: "TOM FORD",
				product_price: [59],
				sku_id: "2259695",
				avg_rating: 93.042,
				total_reviews: 983,
				page_link:
					"/product/gloss-luxe-lip-gloss-P449372?skuId=2259695&icid2=products grid:p449372:product",
			},
			{
				product_id: "629114ff-6a2a-4670-85f4-d2081d67a094",
				product_name: "Liquid Lip Luxe Matte",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2694065-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2694065-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "e18c85b3-6bc6-42d3-a8c9-93b543158069",
				brand_name: "TOM FORD",
				product_price: [59],
				sku_id: "2694065",
				avg_rating: 93.572,
				total_reviews: 672,
				page_link:
					"/product/tom-ford-liquid-lip-luxe-matte-P505704?skuId=2694065&icid2=products grid:p505704:product",
			},
			{
				product_id: "974e6629-6a15-4e0e-b87c-b041ea25d35e",
				product_name: "Soleil Sunlit Rose Lip Balm",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2503381-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2503381-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "21868dbe-b1ad-478b-92b1-1b75aa459764",
				brand_name: "TOM FORD",
				product_price: [45, 59],
				sku_id: "2503381",
				avg_rating: 82.996,
				total_reviews: 454,
				page_link:
					"/product/tom-ford-soleil-sunlit-rose-lip-balm-P509462?skuId=2503381&icid2=products grid:p509462:product",
			},
			{
				product_id: "aafc0a6c-caf7-4527-ba2b-2db6adf969c0",
				product_name: "Fucking Fabulous Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2056208-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2056208-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "b0f0619b-a9ca-473d-91f5-e57a67b5e107",
				brand_name: "TOM FORD",
				product_price: [80, 615],
				sku_id: "2056208",
				avg_rating: 80.166,
				total_reviews: 1200,
				page_link:
					"/product/fucking-fabulous-P429291?skuId=2056208&icid2=products grid:p429291:product",
			},
			{
				product_id: "85197334-4571-4872-9181-f3c7539bfe0f",
				product_name: "Soleil Neige Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2251205-main-zoom.jpg?pb=allure-best-2020&imwidth=250",
					"https://www.sephora.com/productimages/sku/s2251205-main-zoom.jpg?pb=allure-best-2020&imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "0e92e500-9129-49ae-b585-ea08231a93ff",
				brand_name: "TOM FORD",
				product_price: [70, 445],
				sku_id: "2251205",
				avg_rating: 91.934,
				total_reviews: 920,
				page_link:
					"/product/soleil-neige-eau-de-parfum-P450194?skuId=2251205&icid2=products grid:p450194:product",
			},
			{
				product_id: "7144c946-7c1a-4626-81ce-6c60caab7cba",
				product_name: "Traceless Soft Matte Concealer",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2647220-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2647220-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "027986c4-8706-4514-95fd-72ef07ab21e2",
				brand_name: "TOM FORD",
				product_price: [60],
				sku_id: "2647220",
				avg_rating: 90.846,
				total_reviews: 579,
				page_link:
					"/product/tom-ford-traceless-soft-matte-concealer-P505387?skuId=2647220&icid2=products grid:p505387:product",
			},
			{
				product_id: "ae55e67b-1104-41b7-b7d9-1df4d205fd04",
				product_name: "Soleil Eye Color Quad Eyeshadow Palette",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2756237-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2756237-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "4ae2f091-edf2-4294-a886-1c855fad7729",
				brand_name: "TOM FORD",
				product_price: [90],
				sku_id: "2756237",
				avg_rating: 100,
				total_reviews: 1,
				page_link:
					"/product/tom-ford-soleil-summer-collection-eye-quad-palette-P511219?skuId=2756237&icid2=products grid:p511219:product",
			},
			{
				product_id: "6d8d842c-d043-4452-9b9e-41a23f8bc43b",
				product_name:
					"Lost Cherry Eau de Parfum Fragrance Travel Spray",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2369387-main-zoom.jpg?pb=allure-best-2021-badge&imwidth=250",
					"https://www.sephora.com/productimages/sku/s2369387-main-zoom.jpg?pb=allure-best-2021-badge&imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "5b72f9f0-0a9a-4eae-b31d-0ab9bec4291f",
				brand_name: "TOM FORD",
				product_price: [80],
				sku_id: "2369387",
				avg_rating: 84.162,
				total_reviews: 1500,
				page_link:
					"/product/tom-ford-lost-cherry-travel-spray-P464308?skuId=2369387&icid2=products grid:p464308:product",
			},
			{
				product_id: "43fd5438-0a6f-4735-89b3-83deb0ff4676",
				product_name: "Soleil De Feu Spark Lip Balm",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2662773-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2662773-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "38bc8a0b-f5cc-467b-a859-3d5662ffff47",
				brand_name: "TOM FORD",
				product_price: [60],
				sku_id: "2662773",
				avg_rating: 59.09,
				total_reviews: 44,
				page_link:
					"/product/tom-ford-soleil-de-feu-spark-lip-balm-P506269?skuId=2662773&icid2=products grid:p506269:product",
			},
			{
				product_id: "514379ee-654d-4776-a677-500167af68f7",
				product_name: "Vanille Fatale Eau de Parfum",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2748523-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2748523-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "ed39c457-8936-4872-a0a8-5cd003c0038b",
				brand_name: "TOM FORD",
				product_price: [250, 395],
				sku_id: "2748523",
				avg_rating: 84.176,
				total_reviews: 589,
				page_link:
					"/product/tom-ford-vanille-fatale-P509859?skuId=2748523&icid2=products grid:p509859:product",
			},
			{
				product_id: "42d5183a-8eb3-4fc5-9eee-81686931d76d",
				product_name: "Traceless Soft Matte Foundation",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2367290-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2367290-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "b784039b-b7cc-4862-b4e7-eb8d217187b4",
				brand_name: "TOM FORD",
				product_price: [45, 90],
				sku_id: "2367290",
				avg_rating: 86.858,
				total_reviews: 1300,
				page_link:
					"/product/tom-ford-traceless-soft-matte-foundation-P459506?skuId=2367290&icid2=products grid:p459506:product",
			},
			{
				product_id: "c9b62c2d-d55c-40dd-b848-3a0b651f7952",
				product_name: "Shade and Illuminate Highlighting Duo",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2602860-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2602860-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "dc4fe9b1-940b-4244-b929-1f70d89ddcf3",
				brand_name: "TOM FORD",
				product_price: [90],
				sku_id: "2602860",
				avg_rating: 89.926,
				total_reviews: 540,
				page_link:
					"/product/skin-illuminating-powder-duo-P422552?skuId=2602860&icid2=products grid:p422552:product",
			},
			{
				product_id: "1843ff91-4e3c-4f2a-b2ad-c5913f0ec3bc",
				product_name: "Bitter Peach Eau De Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2369338-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2369338-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "a3264089-d5ca-45ac-b533-eded03565e26",
				brand_name: "TOM FORD",
				product_price: [80, 395],
				sku_id: "2369338",
				avg_rating: 80.868,
				total_reviews: 991,
				page_link:
					"/product/tom-ford-bitter-peach-eau-de-parfum-P464304?skuId=2369338&icid2=products grid:p464304:product",
			},
			{
				product_id: "16c33d78-be12-4d67-859a-fefad3209b62",
				product_name: "Soleil Blanc Shimmering Body Oil",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s1808112-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s1808112-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "b8e7a77c-f340-43bd-be52-5c68a590446f",
				brand_name: "TOM FORD",
				product_price: [40, 110],
				sku_id: "1808112",
				avg_rating: 88.578,
				total_reviews: 1300,
				page_link:
					"/product/soleil-blanc-shimmering-body-oil-P406527?skuId=1808112&icid2=products grid:p406527:product",
			},
			{
				product_id: "bca6c9ce-a4d2-4e0e-86a9-993d986bfdd3",
				product_name: "Soleil Lip Blush",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2573418-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2573418-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "317ad0d1-2553-40bc-aa45-cb44a2aa48fc",
				brand_name: "TOM FORD",
				product_price: [59],
				sku_id: "2573418",
				avg_rating: 73.636,
				total_reviews: 22,
				page_link:
					"/product/tom-ford-soleil-lip-blush-P483702?skuId=2573418&icid2=products grid:p483702:product",
			},
			{
				product_id: "4bc5b0dc-1b89-4c8d-a7c9-494e980540e8",
				product_name: "Electric Cherry Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2640092-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2640092-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "136f27b9-75dc-4a84-8d32-b1688855d09b",
				brand_name: "TOM FORD",
				product_price: [250, 395],
				sku_id: "2640092",
				avg_rating: 89.64,
				total_reviews: 668,
				page_link:
					"/product/electric-cherry-P504167?skuId=2640092&icid2=products grid:p504167:product",
			},
			{
				product_id: "f7936b1f-2b6b-46a1-84d0-26d19f237181",
				product_name: "Mini Soleil Clutch-Size Lip Balms",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2756211-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2756211-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "1d98e539-7318-4a31-a49a-81adaccbacc5",
				brand_name: "TOM FORD",
				product_price: [45],
				sku_id: "2756211",
				avg_rating: 100,
				total_reviews: 2,
				page_link:
					"/product/tom-ford-mini-soleil-neige-lip-blush-P511215?skuId=2756211&icid2=products grid:p511215:product",
			},
			{
				product_id: "9b3220df-2ef6-4e2f-b736-5e1475670d98",
				product_name: "Neroli Portofino Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s1449149-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s1449149-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "28814dd2-c926-4e85-8e3b-dd4fb52e0d81",
				brand_name: "TOM FORD",
				product_price: [195, 295],
				sku_id: "1449149",
				avg_rating: 68.59,
				total_reviews: 298,
				page_link:
					"/product/neroli-portofino-P378133?skuId=1449149&icid2=products grid:p378133:product",
			},
			{
				product_id: "04bff9b6-4e04-4816-84be-61368392fe54",
				product_name: "Oud Wood Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s1565902-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s1565902-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "53ee6754-afee-479f-af0d-dd1bc1045b51",
				brand_name: "TOM FORD",
				product_price: [70, 445],
				sku_id: "1565902",
				avg_rating: 88.574,
				total_reviews: 1100,
				page_link:
					"/product/oud-wood-P393167?skuId=1565902&icid2=products grid:p393167:product",
			},
			{
				product_id: "ce5d1287-06dc-48f6-970d-c9e662864717",
				product_name: "Soleil Glow Highlighter",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2756179-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2756179-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "a2d1a195-b512-4667-8805-fcee2c1d2f06",
				brand_name: "TOM FORD",
				product_price: [95],
				sku_id: "2756179",
				avg_rating: 0,
				total_reviews: 0,
				page_link:
					"/product/tom-ford-glow-highlighter-soleil-summer-collection-P511145?skuId=2756179&icid2=products grid:p511145:product",
			},
			{
				product_id: "60518c99-2c20-43ca-ba97-7c1fc2ddeab1",
				product_name: "Shade & Illuminate Blush Duo",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2475002-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2475002-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "b98f455d-2a5a-4889-a5ad-3fff223ff845",
				brand_name: "TOM FORD",
				product_price: [95],
				sku_id: "2475002",
				avg_rating: 91.95,
				total_reviews: 641,
				page_link:
					"/product/tom-ford-shade-illuminate-blush-duo-P476744?skuId=2475002&icid2=products grid:p476744:product",
			},
			{
				product_id: "973b8fbe-3e4b-4b56-9b63-d2bd4eaeb349",
				product_name: "Soleil Balm Frost Lip Balm",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2393932-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2393932-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "b184b396-3c7e-4816-96f8-30aae6d21dac",
				brand_name: "TOM FORD",
				product_price: [58],
				sku_id: "2393932",
				avg_rating: 74.028,
				total_reviews: 211,
				page_link:
					"/product/tom-ford-soleil-lip-balm-P464313?skuId=2393932&icid2=products grid:p464313:product",
			},
			{
				product_id: "3b523dae-f954-4ef0-ac56-32cdc2c892f7",
				product_name: "Santal Blush Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2594158-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2594158-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "5dd3469e-073d-4794-b347-e7de89713d37",
				brand_name: "TOM FORD",
				product_price: [195, 295],
				sku_id: "2594158",
				avg_rating: 87.594,
				total_reviews: 748,
				page_link:
					"/product/santal-blush-P393159?skuId=2594158&icid2=products grid:p393159:product",
			},
			{
				product_id: "ff22aa4f-893b-4b13-8df6-739717c03b56",
				product_name: "Lip Color Matte Lipstick",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2358513-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2358513-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "3d3a4abd-a69c-4044-a365-19d578b757ab",
				brand_name: "TOM FORD",
				product_price: [58, 59],
				sku_id: "2358513",
				avg_rating: 91.764,
				total_reviews: 1100,
				page_link:
					"/product/lip-color-matte-lipstick-P416222?skuId=2358513&icid2=products grid:p416222:product",
			},
			{
				product_id: "73ce6b09-1236-47dc-8d66-4cdaefa214c5",
				product_name: "Eau de Soleil Blanc Eau de Toilette Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2038933-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2038933-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "01c23019-8ed5-4bd3-98ba-72fc9a822f6e",
				brand_name: "TOM FORD",
				product_price: [50, 235],
				sku_id: "2038933",
				avg_rating: 83.344,
				total_reviews: 628,
				page_link:
					"/product/eau-de-soleil-blanc-P428452?skuId=2038933&icid2=products grid:p428452:product",
			},
			{
				product_id: "f495f9f1-bd19-475d-9143-a3015adffbb0",
				product_name: "Bitter Peach Lip Color Matte Lipstick",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2554046-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2554046-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "4303c488-9563-4c82-9579-0cc9471d5852",
				brand_name: "TOM FORD",
				product_price: [58],
				sku_id: "2554046",
				avg_rating: 91.538,
				total_reviews: 26,
				page_link:
					"/product/tom-ford-bitter-peach-lip-color-matte-lipstick-P481174?skuId=2554046&icid2=products grid:p481174:product",
			},
			{
				product_id: "0a3e8f26-c7be-4ac4-ae97-d98cef92f000",
				product_name: "Soleil Glow Bronzer",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2219582-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2219582-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "6784a334-7e05-4bd5-a38c-3db0b5f8a032",
				brand_name: "TOM FORD",
				product_price: [70],
				sku_id: "2219582",
				avg_rating: 90.566,
				total_reviews: 53,
				page_link:
					"/product/soleil-glow-bronzer-P443930?skuId=2219582&icid2=products grid:p443930:product",
			},
			{
				product_id: "8aa486ef-3ef9-4b59-945b-468e0bd59ce7",
				product_name: "Soleil Neige Shimmering Body Oil",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2284958-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2284958-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "69688aad-9a7a-4f5a-a37f-8fa0a597324b",
				brand_name: "TOM FORD",
				product_price: [40, 110],
				sku_id: "2284958",
				avg_rating: 87,
				total_reviews: 40,
				page_link:
					"/product/soleil-neige-shimmering-body-oil-P450195?skuId=2284958&icid2=products grid:p450195:product",
			},
			{
				product_id: "d40f0564-fe4a-43a2-95a4-f0bc0435e1c9",
				product_name: "Cherry Smoke Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2640118-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2640118-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "ac4952bf-c6c2-4c4f-bd06-a94146f30320",
				brand_name: "TOM FORD",
				product_price: [250, 395],
				sku_id: "2640118",
				avg_rating: 88.796,
				total_reviews: 648,
				page_link:
					"/product/cherry-smoke-P504169?skuId=2640118&icid2=products grid:p504169:product",
			},
			{
				product_id: "ce559d14-2a56-40aa-b411-694daf8bfc8b",
				product_name: "Rose Prick Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2318756-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2318756-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "0f100951-3040-4a4d-9c6c-456caffbb5bb",
				brand_name: "TOM FORD",
				product_price: [80, 615],
				sku_id: "2318756",
				avg_rating: 84.048,
				total_reviews: 988,
				page_link:
					"/product/tom-ford-rose-prick-eau-de-parfum-P455598?skuId=2318756&icid2=products grid:p455598:product",
			},
			{
				product_id: "2cc92d12-a9d2-43e0-b04e-a705e777a135",
				product_name: "Black Orchid Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s1007723-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s1007723-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "acfbdcee-c96b-4de8-8e41-b7908a575ced",
				brand_name: "TOM FORD",
				product_price: [50, 235],
				sku_id: "1007723",
				avg_rating: 84.388,
				total_reviews: 1900,
				page_link:
					"/product/black-orchid-P183301?skuId=1007723&icid2=products grid:p183301:product",
			},
			{
				product_id: "c14f89aa-186f-450a-aa1c-32be652b4c12",
				product_name: "Ombré Leather Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2101319-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2101319-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "5d765aa8-a257-4c57-b2cc-d4c40ebdde38",
				brand_name: "TOM FORD",
				product_price: [50, 235],
				sku_id: "2101319",
				avg_rating: 84.55,
				total_reviews: 1500,
				page_link:
					"/product/ombre-leather-P433663?skuId=2101319&icid2=products grid:p433663:product",
			},
			{
				product_id: "1942c5dc-18bc-4bd3-b7e4-546f927d8a35",
				product_name:
					"Eau de Soleil Blanc Eau de Toilette Fragrance Travel Spray",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2175644-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2175644-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "15559c4c-9b06-4e26-9e98-78fe12631aa9",
				brand_name: "TOM FORD",
				product_price: [50],
				sku_id: "2175644",
				avg_rating: 82.596,
				total_reviews: 701,
				page_link:
					"/product/eau-de-soleil-blanc-travel-spray-10ml-P446023?skuId=2175644&icid2=products grid:p446023:product",
			},
			{
				product_id: "ebab5c93-a318-48a9-8f37-fe87413d849d",
				product_name: "Traceless Soft Matte Primer",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2554079-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2554079-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "60b6b2ef-95c5-4d01-b392-afba66247edc",
				brand_name: "TOM FORD",
				product_price: [90],
				sku_id: "2554079",
				avg_rating: 85.93,
				total_reviews: 479,
				page_link:
					"/product/tom-ford-traceless-soft-matte-primer-P481747?skuId=2554079&icid2=products grid:p481747:product",
			},
			{
				product_id: "7fb5f4d2-c4ce-4a3e-8bb6-08c1c5333457",
				product_name: "Soleil Trilogy Set",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2714855-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2714855-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "6dad4c4c-29ac-47e7-b157-bfff5847ab49",
				brand_name: "TOM FORD",
				product_price: [200],
				sku_id: "2714855",
				avg_rating: 0,
				total_reviews: 0,
				page_link:
					"/product/tom-ford-soleil-trilogy-set-P509131?skuId=2714855&icid2=products grid:p509131:product",
			},
			{
				product_id: "faa80111-6df8-4fec-82f5-eea97195ebdd",
				product_name:
					"Soleil Blanc Eau de Parfum Fragrance Travel Spray",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2101335-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2101335-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "9373352c-19bc-4d0a-92ac-300b3c4b0b2f",
				brand_name: "TOM FORD",
				product_price: [70],
				sku_id: "2101335",
				avg_rating: 82.538,
				total_reviews: 867,
				page_link:
					"/product/soleil-blanc-atomizer-P433669?skuId=2101335&icid2=products grid:p433669:product",
			},
			{
				product_id: "2b2120bf-5e2e-4946-bc5b-740220fe11d3",
				product_name:
					"Tobacco Vanille Eau de Parfum Fragrance Travel Spray",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2101368-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2101368-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "cd7ce2d7-a3ea-442d-a14a-01a4a5ee4d27",
				brand_name: "TOM FORD",
				product_price: [70],
				sku_id: "2101368",
				avg_rating: 85.966,
				total_reviews: 1300,
				page_link:
					"/product/tobacco-vanille-atomizer-P433672?skuId=2101368&icid2=products grid:p433672:product",
			},
			{
				product_id: "71a212d8-7db4-4814-b9f8-e373b76e4ed2",
				product_name: "Soleil De Feu Eye Color Quad",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2662807-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2662807-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "5ea910c4-0109-431d-a799-64acb5343d47",
				brand_name: "TOM FORD",
				product_price: [90],
				sku_id: "2662807",
				avg_rating: 88.888,
				total_reviews: 9,
				page_link:
					"/product/tom-ford-soleil-de-feu-eye-color-quad-P506277?skuId=2662807&icid2=products grid:p506277:product",
			},
			{
				product_id: "04f2ac87-d274-4864-940b-3ca1b2d0f99c",
				product_name: "Mandarino Di Amalfi Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s1647791-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s1647791-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "fdcf3b90-6726-475e-a043-82cd93bc0a1b",
				brand_name: "TOM FORD",
				product_price: [295],
				sku_id: "1647791",
				avg_rating: 79.112,
				total_reviews: 45,
				page_link:
					"/product/mandarino-di-amalfi-P392229?skuId=1647791&icid2=products grid:p392229:product",
			},
			{
				product_id: "8f34f7a6-a9a7-4fd2-85f3-bc23f738e323",
				product_name: "Cafe Rose Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2692184-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2692184-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "4858748d-81da-48db-bf3f-34a23934afb4",
				brand_name: "TOM FORD",
				product_price: [115, 235],
				sku_id: "2692184",
				avg_rating: 82.938,
				total_reviews: 572,
				page_link:
					"/product/cafe-rose-P393157?skuId=2692184&icid2=products grid:p393157:product",
			},
			{
				product_id: "f9e0d5ac-e47e-4a33-97ee-a951ff91f957",
				product_name: "Soleil de Feu Glow Highlighter",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2662765-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2662765-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "e36366f1-09aa-4f10-b8c0-0654a6f0033d",
				brand_name: "TOM FORD",
				product_price: [95],
				sku_id: "2662765",
				avg_rating: 75,
				total_reviews: 4,
				page_link:
					"/product/tom-ford-soleil-de-feu-glow-highlighter-P506287?skuId=2662765&icid2=products grid:p506287:product",
			},
			{
				product_id: "baacc7f0-f08f-4426-9b89-67c22311eb2d",
				product_name: "Jasmin Rouge Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s1449115-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s1449115-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "a4f1d516-679a-4b3d-a8d7-9d392d686399",
				brand_name: "TOM FORD",
				product_price: [295, 425],
				sku_id: "1449115",
				avg_rating: 90.566,
				total_reviews: 53,
				page_link:
					"/product/jasmin-rouge-P393141?skuId=1449115&icid2=products grid:p393141:product",
			},
			{
				product_id: "ad2c5868-a0d3-4399-804e-3ff248eb51bc",
				product_name:
					"Love Collection Eye Color Quad Eyeshadow Palette",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2763423-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2763423-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "9d1bbff9-e562-41cc-a3c0-c31a0ac56cde",
				brand_name: "TOM FORD",
				product_price: [95],
				sku_id: "2763423",
				avg_rating: 100,
				total_reviews: 2,
				page_link:
					"/product/tom-ford-love-collection-eye-color-quad-eyeshadow-palette-P509970?skuId=2763423&icid2=products grid:p509970:product",
			},
			{
				product_id: "5460988e-848c-469c-ac4c-bb7e6b5ebc2a",
				product_name:
					"Fucking Fabulous Eau de Parfum Fragrance Travel Spray",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2175727-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2175727-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "2f383e11-7179-41e3-9c35-87d7e2d48bd0",
				brand_name: "TOM FORD",
				product_price: [80],
				sku_id: "2175727",
				avg_rating: 80.166,
				total_reviews: 1200,
				page_link:
					"/product/fucking-fabulous-travel-size-P448464?skuId=2175727&icid2=products grid:p448464:product",
			},
			{
				product_id: "2d43c50b-e6e6-4b09-a555-ec57d74bac22",
				product_name: "Noir de Noir Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s1449214-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s1449214-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "d4a31fa9-3335-4768-bf82-5808afec1127",
				brand_name: "TOM FORD",
				product_price: [295, 445],
				sku_id: "1449214",
				avg_rating: 92.608,
				total_reviews: 46,
				page_link:
					"/product/noir-de-noir-P393163?skuId=1449214&icid2=products grid:p393163:product",
			},
			{
				product_id: "c3cdb8c1-b15c-4e53-b14c-261de9ed9271",
				product_name: "Ébène Fumé Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2474021-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2474021-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "32bff4a2-0a9d-427d-a8ad-6e60094d286c",
				brand_name: "TOM FORD",
				product_price: [70, 445],
				sku_id: "2474021",
				avg_rating: 84.944,
				total_reviews: 1100,
				page_link:
					"/product/tom-ford-ebene-fume-eau-de-parfum-P478734?skuId=2474021&icid2=products grid:p478734:product",
			},
			{
				product_id: "f21c6640-a776-4e2c-ad50-4b847c617247",
				product_name: "Eye Defining Pen Liquid Eyeliner Duo",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s1987635-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s1987635-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "2e790639-207a-4033-86b7-9dad61038542",
				brand_name: "TOM FORD",
				product_price: [62],
				sku_id: "1987635",
				avg_rating: 90.074,
				total_reviews: 1200,
				page_link:
					"/product/eye-defining-pen-liquid-eyeliner-duo-P422571?skuId=1987635&icid2=products grid:p422571:product",
			},
			{
				product_id: "cd837ffe-48d2-4653-baba-1e6a125c5b86",
				product_name: "Eyebrow Laminator",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2611770-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2611770-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "4f3d1605-dfa3-4082-a125-cabda44a96e2",
				brand_name: "TOM FORD",
				product_price: [55],
				sku_id: "2611770",
				avg_rating: 81.918,
				total_reviews: 459,
				page_link:
					"/product/eyebrow-laminator-P501516?skuId=2611770&icid2=products grid:p501516:product",
			},
			{
				product_id: "05c22ac9-f7b1-45e9-bcd7-abd86dbeb1f2",
				product_name: "Eye Color Quad - Cherry Collection",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2648541-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2648541-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "adaf03d0-5b99-4603-9763-2a77b031aadb",
				brand_name: "TOM FORD",
				product_price: [90],
				sku_id: "2648541",
				avg_rating: 86.666,
				total_reviews: 6,
				page_link:
					"/product/tom-ford-eye-color-quad-P505393?skuId=2648541&icid2=products grid:p505393:product",
			},
			{
				product_id: "a0274ff3-7ec3-4074-9853-220884cf9430",
				product_name: "Brow Sculptor",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2024016-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2024016-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "6dc21307-0b68-4f15-853a-d87e81fbe53d",
				brand_name: "TOM FORD",
				product_price: [56],
				sku_id: "2024016",
				avg_rating: 91.802,
				total_reviews: 544,
				page_link:
					"/product/brow-sculptor-P428908?skuId=2024016&icid2=products grid:p428908:product",
			},
			{
				product_id: "e2c8ec53-e190-4682-a1f4-f226cc49a8af",
				product_name: "White Suede Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2318699-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2318699-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "faa6aa8e-94b7-49dc-b5c4-760a951e9bbe",
				brand_name: "TOM FORD",
				product_price: [70, 445],
				sku_id: "2318699",
				avg_rating: 88.276,
				total_reviews: 29,
				page_link:
					"/product/white-suede-P393137?skuId=2318699&icid2=products grid:p393137:product",
			},
			{
				product_id: "f0d957c7-d801-4ace-8dd5-eae8a6bcc302",
				product_name: "Woods Trilogy Set",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2716595-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2716595-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "efce1e55-5da5-4f54-9e46-e610ebe3213d",
				brand_name: "TOM FORD",
				product_price: [200],
				sku_id: "2716595",
				avg_rating: 80,
				total_reviews: 1,
				page_link:
					"/product/tom-ford-woods-trilogy-set-P509135?skuId=2716595&icid2=products grid:p509135:product",
			},
			{
				product_id: "dc61dd45-c158-4c30-b796-539e80764ec9",
				product_name:
					"Bitter Peach Eau de Parfum Fragrance Travel Spray",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2474047-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2474047-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "8bb74756-fa4d-42ef-9e24-f051f524d304",
				brand_name: "TOM FORD",
				product_price: [80],
				sku_id: "2474047",
				avg_rating: 80.868,
				total_reviews: 991,
				page_link:
					"/product/tom-ford-bitter-peach-eau-de-parfum-travel-spray-P477712?skuId=2474047&icid2=products grid:p477712:product",
			},
			{
				product_id: "93447993-cfeb-4c28-9da3-47659dc43d2f",
				product_name: "Myrrhe Mystere Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2729721-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2729721-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "6c878e7a-83c8-4b50-beb0-2c7e9f02d8c6",
				brand_name: "TOM FORD",
				product_price: [250, 395],
				sku_id: "2729721",
				avg_rating: 88.326,
				total_reviews: 663,
				page_link:
					"/product/myrrhe-mystere-P508230?skuId=2729721&icid2=products grid:p508230:product",
			},
			{
				product_id: "50f8d5fc-903b-4fcd-9ca1-5eb5093beeca",
				product_name: "Soleil Brulant Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2408391-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2408391-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "c6572205-bdab-4e65-9c48-a879b4fb7694",
				brand_name: "TOM FORD",
				product_price: [250, 615],
				sku_id: "2408391",
				avg_rating: 80.8,
				total_reviews: 450,
				page_link:
					"/product/tom-ford-soleil-brulant-P470554?skuId=2408391&icid2=products grid:p470554:product",
			},
			{
				product_id: "af7360cd-0c80-443e-8063-7765b5de1fd3",
				product_name:
					"White Suede Eau de Parfum Fragrance Travel Spray",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2220143-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2220143-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "8c8c5b0c-f2eb-4cc4-9dc8-04228823e0fe",
				brand_name: "TOM FORD",
				product_price: [70],
				sku_id: "2220143",
				avg_rating: 75.556,
				total_reviews: 9,
				page_link:
					"/product/white-suede-travel-spray-P451871?skuId=2220143&icid2=products grid:p451871:product",
			},
			{
				product_id: "de9729c4-ade6-4561-a1aa-2cfa06040bb3",
				product_name: "Velvet Orchid Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s1632777-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s1632777-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "3fd9b9c0-60e0-465d-813a-4dc387e7db46",
				brand_name: "TOM FORD",
				product_price: [115, 235],
				sku_id: "1632777",
				avg_rating: 87.326,
				total_reviews: 344,
				page_link:
					"/product/velvet-orchid-P387250?skuId=1632777&icid2=products grid:p387250:product",
			},
			{
				product_id: "13f51b13-685e-4ec2-8e8e-2c847bbef568",
				product_name: "Ébène Fumé Eau de Parfum Fragrance Travel Spray",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2474039-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2474039-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "010ffcde-c78b-4d5c-8c4a-5ddff185eb6c",
				brand_name: "TOM FORD",
				product_price: [70],
				sku_id: "2474039",
				avg_rating: 96.924,
				total_reviews: 13,
				page_link:
					"/product/ebene-fume-eau-de-parfum-travel-spray-P502337?skuId=2474039&icid2=products grid:p502337:product",
			},
			{
				product_id: "7521722e-6688-4992-a3de-f0a26a2f2dad",
				product_name: "Ombré Leather Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2466472-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2466472-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "745438a9-9cb8-4444-bf65-95fc47a7ab26",
				brand_name: "TOM FORD",
				product_price: [65, 295],
				sku_id: "2466472",
				avg_rating: 86.636,
				total_reviews: 672,
				page_link:
					"/product/tom-ford-ombre-leather-parfum-P474863?skuId=2466472&icid2=products grid:p474863:product",
			},
			{
				product_id: "8231e9bc-1c97-4574-82ae-0de15f15a7f5",
				product_name: "Rose D'Amalfi Eau De Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2544856-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2544856-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "4a5ab97e-a04c-4a58-b29b-20a5b4deb122",
				brand_name: "TOM FORD",
				product_price: [295],
				sku_id: "2544856",
				avg_rating: 82.898,
				total_reviews: 276,
				page_link:
					"/product/tom-ford-rose-d-amalfi-eau-de-parfum-P479655?skuId=2544856&icid2=products grid:p479655:product",
			},
			{
				product_id: "3dcf83b1-0363-40db-86f0-a9cfc9184aad",
				product_name: "Costa Azzurra Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2408292-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2408292-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "9894e7ee-242b-4ebf-8718-25c30f4e4620",
				brand_name: "TOM FORD",
				product_price: [155, 235],
				sku_id: "2408292",
				avg_rating: 90.186,
				total_reviews: 858,
				page_link:
					"/product/tom-ford-costa-azzurra-eau-de-parfum-3-4-oz-P467979?skuId=2408292&icid2=products grid:p467979:product",
			},
			{
				product_id: "7c13b9f5-abc5-410c-bba9-85593e067384",
				product_name: "Fougère d'Argent",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2101392-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2101392-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "1d4b04b3-514b-495e-991d-cd1911eed196",
				brand_name: "TOM FORD",
				product_price: [295],
				sku_id: "2101392",
				avg_rating: 95,
				total_reviews: 12,
				page_link:
					"/product/foug-re-d-argent-P433910?skuId=2101392&icid2=products grid:p433910:product",
			},
			{
				product_id: "d77ac2b0-7f20-45b7-bce3-ed7870ceea19",
				product_name: "Bois Marocain Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2594125-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2594125-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "f7337cab-b5ec-4007-bded-37adb5d3719f",
				brand_name: "TOM FORD",
				product_price: [195, 295],
				sku_id: "2594125",
				avg_rating: 79.882,
				total_reviews: 512,
				page_link:
					"/product/bois-marocain-eau-de-parfum-P502494?skuId=2594125&icid2=products grid:p502494:product",
			},
			{
				product_id: "0a9bfbf0-5355-42a8-a4d6-a2df5c2f56d1",
				product_name: "Tubéreuse Nue Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2408318-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2408318-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "6f1b731e-0439-40cc-b3f5-79e82924f7d3",
				brand_name: "TOM FORD",
				product_price: [395],
				sku_id: "2408318",
				avg_rating: 80.14,
				total_reviews: 428,
				page_link:
					"/product/tom-ford-tubereuse-nue-P468710?skuId=2408318&icid2=products grid:p468710:product",
			},
			{
				product_id: "9fe30d5f-0018-428e-8b57-5b5eb86a4157",
				product_name: "Soleil de Feu Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2640134-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2640134-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "5a53c11f-d3dd-4478-aa5b-beaf381371e8",
				brand_name: "TOM FORD",
				product_price: [195, 295],
				sku_id: "2640134",
				avg_rating: 84.886,
				total_reviews: 655,
				page_link:
					"/product/soleil-de-feu-P505747?skuId=2640134&icid2=products grid:p505747:product",
			},
			{
				product_id: "00ad06d7-5432-499c-bc07-02ad4e751f56",
				product_name: "Extreme Mascara",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s1987478-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s1987478-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "9cf110c8-f6ed-4239-a735-364549662d67",
				brand_name: "TOM FORD",
				product_price: [50],
				sku_id: "1987478",
				avg_rating: 82.524,
				total_reviews: 420,
				page_link:
					"/product/extreme-mascara-P422546?skuId=1987478&icid2=products grid:p422546:product",
			},
			{
				product_id: "a513d536-24c4-4c59-887f-b682bbb19f02",
				product_name: "Noir Extreme Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s1706423-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s1706423-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "106e0463-07a6-4fae-af26-3c93e581f46f",
				brand_name: "TOM FORD",
				product_price: [49, 235],
				sku_id: "1706423",
				avg_rating: 89.148,
				total_reviews: 446,
				page_link:
					"/product/noir-extreme-P395693?skuId=1706423&icid2=products grid:p395693:product",
			},
			{
				product_id: "6bb6133c-e79e-4891-9b3f-821b88c9ae71",
				product_name:
					"Soleil Neige Eau De Parfum Fragrance Travel Spray",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2369809-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2369809-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "0301b5f0-bc53-4af7-9633-80cfb77b74fc",
				brand_name: "TOM FORD",
				product_price: [70],
				sku_id: "2369809",
				avg_rating: 91.934,
				total_reviews: 920,
				page_link:
					"/product/tom-ford-soleil-neige-eau-de-parfum-travel-spray-P464305?skuId=2369809&icid2=products grid:p464305:product",
			},
			{
				product_id: "da872834-62c3-421a-9043-d767c733e690",
				product_name:
					"Black Orchid Eau de Parfum Fragrance Travel Spray",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2038917-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2038917-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "ddfa3daf-3e8f-4db6-977f-658a79ff98a6",
				brand_name: "TOM FORD",
				product_price: [50],
				sku_id: "2038917",
				avg_rating: 84.388,
				total_reviews: 1900,
				page_link:
					"/product/black-orchid-travel-spray-P430909?skuId=2038917&icid2=products grid:p430909:product",
			},
			{
				product_id: "c5c89f72-08b0-401b-afcf-f47f8da17c2b",
				product_name: "Oud Minerale Eau de Parfum",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2741643-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2741643-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "4ace3cde-4ea5-4ce7-ada1-223b43a3bd89",
				brand_name: "TOM FORD",
				product_price: [155, 235],
				sku_id: "2741643",
				avg_rating: 82.822,
				total_reviews: 1900,
				page_link:
					"/product/tom-ford-oud-minerale-eau-de-parfum-P509793?skuId=2741643&icid2=products grid:p509793:product",
			},
			{
				product_id: "04f2c886-c9c4-4fc6-8c6c-c5039a0b66cd",
				product_name: "Tuscan Leather Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s1449305-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s1449305-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "f8fbd1f0-7a19-45f3-b06d-e1401c4d2ed0",
				brand_name: "TOM FORD",
				product_price: [195, 445],
				sku_id: "1449305",
				avg_rating: 75.88,
				total_reviews: 597,
				page_link:
					"/product/tuscan-leather-P393153?skuId=1449305&icid2=products grid:p393153:product",
			},
			{
				product_id: "aae56427-d18b-4b1c-bc5a-dd63874a74af",
				product_name: "Emotionproof Mascara",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2225506-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2225506-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "e9fc4cbf-7181-413a-91db-186d2aefc5f3",
				brand_name: "TOM FORD",
				product_price: [50],
				sku_id: "2225506",
				avg_rating: 81.396,
				total_reviews: 129,
				page_link:
					"/product/emotionproof-mascara-P445433?skuId=2225506&icid2=products grid:p445433:product",
			},
			{
				product_id: "951ae5b6-6f8f-421c-add6-41c48425baf9",
				product_name: "Fucking Fabulous Home Candle",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2144772-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2144772-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "91781049-75b6-4d43-ac9f-642b2a15c339",
				brand_name: "TOM FORD",
				product_price: [135],
				sku_id: "2144772",
				avg_rating: 60,
				total_reviews: 21,
				page_link:
					"/product/fucking-fabulous-candle-P438529?skuId=2144772&icid2=products grid:p438529:product",
			},
			{
				product_id: "74d41aec-82bc-4e7d-9f5b-d5bdbd0ea700",
				product_name: "Rose De Chine Eau De Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2544864-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2544864-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "12b68054-00d8-4a50-be0f-16a47c5342d0",
				brand_name: "TOM FORD",
				product_price: [295],
				sku_id: "2544864",
				avg_rating: 87.126,
				total_reviews: 247,
				page_link:
					"/product/tom-ford-rose-de-chine-eau-de-parfum-P481398?skuId=2544864&icid2=products grid:p481398:product",
			},
			{
				product_id: "8e9a0d26-21d0-4574-83de-5f7837b988ad",
				product_name: "Black Orchid Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2369288-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2369288-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "c9a3f646-6085-4ded-9786-8392be487f6b",
				brand_name: "TOM FORD",
				product_price: [195, 295],
				sku_id: "2369288",
				avg_rating: 85.564,
				total_reviews: 586,
				page_link:
					"/product/tom-ford-black-orchid-parfum-P460873?skuId=2369288&icid2=products grid:p460873:product",
			},
			{
				product_id: "965f5b82-f4f4-488e-bfea-c523423941c3",
				product_name: "Noir Extreme Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2594174-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2594174-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "3d92b288-600e-47a7-92df-7fa233168535",
				brand_name: "TOM FORD",
				product_price: [195, 295],
				sku_id: "2594174",
				avg_rating: 92.014,
				total_reviews: 278,
				page_link:
					"/product/noir-extreme-parfum-P501520?skuId=2594174&icid2=products grid:p501520:product",
			},
			{
				product_id: "ee66e4ce-2edd-49cc-b736-e46032a72855",
				product_name: "Costa Azzurra Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2541456-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2541456-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "b1bca72b-706a-401b-bc81-757f81a18766",
				brand_name: "TOM FORD",
				product_price: [295],
				sku_id: "2541456",
				avg_rating: 89.778,
				total_reviews: 135,
				page_link:
					"/product/tom-ford-costa-azzurra-parfum-P481351?skuId=2541456&icid2=products grid:p481351:product",
			},
			{
				product_id: "e5ed4819-821d-4019-beff-8b8b4a833a23",
				product_name:
					"Ombré Leather Eau de Parfum Fragrance Travel Spray",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2318814-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2318814-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "0469daa0-61d3-47a5-a4b3-168e53d0088d",
				brand_name: "TOM FORD",
				product_price: [50],
				sku_id: "2318814",
				avg_rating: 84.55,
				total_reviews: 1500,
				page_link:
					"/product/tom-ford-ombre-leather-travel-spray-P459414?skuId=2318814&icid2=products grid:p459414:product",
			},
			{
				product_id: "094a32a8-77b6-44c2-8ee7-5de7d868df2f",
				product_name: "Tobacco Vanille Conditioning Beard Oil",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s1866789-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s1866789-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "28ab131e-df27-40a7-9d2b-234b998929c2",
				brand_name: "TOM FORD",
				product_price: [60],
				sku_id: "1866789",
				avg_rating: 91.334,
				total_reviews: 30,
				page_link:
					"/product/conditioning-beard-oil-P411714?skuId=1866789&icid2=products grid:p411714:product",
			},
			{
				product_id: "c9177cb4-0d7c-4015-8a20-840cc233a967",
				product_name: "Ebene Fume Candle",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2623379-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2623379-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "73cd9494-f0a4-44b5-be4f-22e4b2e2c12b",
				brand_name: "TOM FORD",
				product_price: [135],
				sku_id: "2623379",
				avg_rating: 100,
				total_reviews: 1,
				page_link:
					"/product/tom-ford-ebene-fume-candle-P502721?skuId=2623379&icid2=products grid:p502721:product",
			},
			{
				product_id: "63c2d9aa-4a84-4ff4-a2b7-92a622f6ecbd",
				product_name: "Rose Prick Eau de Parfum Fragrance Travel Spray",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2369312-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2369312-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "9a3f40e8-311f-48f8-8d03-61bf86a41e86",
				brand_name: "TOM FORD",
				product_price: [80],
				sku_id: "2369312",
				avg_rating: 84.048,
				total_reviews: 988,
				page_link:
					"/product/tom-ford-rose-prick-eau-de-parfum-travel-spray-P468419?skuId=2369312&icid2=products grid:p468419:product",
			},
			{
				product_id: "1ede387e-c48e-45f9-82b0-979d3835026b",
				product_name: "Rose Prick Home Candle",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2439008-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2439008-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "3c56a9ab-1770-4ae6-9948-d3e5c47d33f0",
				brand_name: "TOM FORD",
				product_price: [135],
				sku_id: "2439008",
				avg_rating: 80,
				total_reviews: 3,
				page_link:
					"/product/tom-ford-rose-prick-candle-P468711?skuId=2439008&icid2=products grid:p468711:product",
			},
			{
				product_id: "c20ddb0a-0dce-4153-9153-10658f63df23",
				product_name: "Beau de Jour Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2318723-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2318723-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "c81ce904-a1d0-4dee-92a8-20c77067975c",
				brand_name: "TOM FORD",
				product_price: [155, 235],
				sku_id: "2318723",
				avg_rating: 83.216,
				total_reviews: 423,
				page_link:
					"/product/tom-ford-beau-de-jour-P454404?skuId=2318723&icid2=products grid:p454404:product",
			},
			{
				product_id: "793bbfba-416c-4ca0-b810-54624b601487",
				product_name:
					"Ombré Leather Eau de Parfum Fragrance Gift Set With Travel Spray",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2716603-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2716603-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "76d48e2e-3e7f-4d8f-9242-ddaa7299a6eb",
				brand_name: "TOM FORD",
				product_price: [225],
				sku_id: "2716603",
				avg_rating: 77.142,
				total_reviews: 7,
				page_link:
					"/product/ombre-leather-edp-set-P507505?skuId=2716603&icid2=products grid:p507505:product",
			},
			{
				product_id: "728db009-6812-4d92-8ddc-c76d55077344",
				product_name: "Bitter Peach Home Candle",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2541498-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2541498-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "51169848-2c74-4e13-a871-b6a460f89484",
				brand_name: "TOM FORD",
				product_price: [135],
				sku_id: "2541498",
				avg_rating: 80,
				total_reviews: 1,
				page_link:
					"/product/tom-ford-bitter-peach-candle-P480194?skuId=2541498&icid2=products grid:p480194:product",
			},
			{
				product_id: "ef363c12-9b34-41ba-8397-bcd64341c234",
				product_name: "Oud Wood Eau de Parfum Fragrance Travel Spray",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2101350-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2101350-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "ea18c9c9-79ff-4173-985e-bd837f28ea2b",
				brand_name: "TOM FORD",
				product_price: [70],
				sku_id: "2101350",
				avg_rating: 88.574,
				total_reviews: 1100,
				page_link:
					"/product/oud-wood-atomizer-P433671?skuId=2101350&icid2=products grid:p433671:product",
			},
			{
				product_id: "49b34302-d51e-4a9a-bacf-fe7ab21f156a",
				product_name: "Ombré Leather Parfum Fragrance Travel Spray",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2466480-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2466480-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "cbf96984-d88e-44dc-9838-5549a2a449bf",
				brand_name: "TOM FORD",
				product_price: [65],
				sku_id: "2466480",
				avg_rating: 86.636,
				total_reviews: 672,
				page_link:
					"/product/tom-ford-ombre-leather-parfum-travel-spray-P474864?skuId=2466480&icid2=products grid:p474864:product",
			},
			{
				product_id: "7d16c1b6-e160-4219-8448-af0e1e8a0933",
				product_name:
					"Noir Extreme Eau de Parfum Fragrance Travel Spray",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2038982-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2038982-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "b2acbd8e-74cd-46fc-941d-78c5bdecfd27",
				brand_name: "TOM FORD",
				product_price: [49],
				sku_id: "2038982",
				avg_rating: 85.714,
				total_reviews: 7,
				page_link:
					"/product/noir-extreme-travel-spray-P430912?skuId=2038982&icid2=products grid:p430912:product",
			},
		];
		function log(data: AllProducts[]) {
			const productNames = data.map((item) => item.product_name);
			const uniqueArray = productNames.filter((value, index, self) => {
				return self.indexOf(value) === index;
			});

			console.dir(productNames.length, { maxArrayLength: null });
		}

		log(data);
		// console.log(data.length);
		// const newData = data
		// 	.map((item) => {
		// 		return { ...item, brand_id: brandId };
		// 	})
		// 	.filter((item) => item.sku_id !== null);
		// console.log(newData)
		// console.log(
		// 	data.map((item, index) => `${index}: ${item.product_name}`)
		// );
		// console.log(data);
		// console.log(
		// 	newData
		// 		.sort((a, b) => {
		// 			const nameA = a.product_name.toUpperCase();
		// 			const nameB = b.product_name.toUpperCase();
		// 			if (nameA < nameB) {
		// 				return -1;
		// 			}
		// 			if (nameA > nameB) {
		// 				return 1;
		// 			}
		// 			return 0;
		// 		})
		// 		.map((item) => item.product_name)
		// );

		const search = "Woods Trilogy Set";
		// console.log(data.some((item) => item.product_name === search));
	}

	return (
		<form action={handleSubmit}>
			<Button type="submit">Scrape All Products</Button>
		</form>
	);
}
