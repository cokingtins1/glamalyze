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

		// console.log("unique results", uniqueResults);
		// console.log("unique results length", uniqueResults.length);

		// console.log("productData:", allProducts);
		// console.log("Length:", allProducts.length);

		// console.log(
		// 	"Filtered Products",
		// 	allProducts.map((item) => item.product_name)
		// );

		const data = [
			{
				product_id: "74c8ec35-2447-4e70-ac8b-9b59f96cfd59",
				product_name: null,
				product_image_url: ["URL ERROR"],
				retailer_id: "Sephora123",
				brand_id: "c74ce9ff-4c59-4c3a-bc56-db87c423e914",
				brand_name: null,
				product_price: [],
				sku_id: null,
				avg_rating: 0,
				total_reviews: 0,
				page_link: null,
			},
			{
				product_id: "183583f7-9dd7-4ada-81ce-d3f0a784f6f1",
				product_name: "Private Blend Eau de Parfum Discovery Set",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2748531-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2748531-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "cd72e299-88d4-489d-afa2-d747557d6942",
				brand_name: "TOM FORD",
				product_price: [105],
				sku_id: "2748531",
				avg_rating: 71.666,
				total_reviews: 12,
				page_link:
					"/product/tom-ford-private-blend-discovery-set-P510021?skuId=2748531&icid2=products grid:p510021:product",
			},
			{
				product_id: "388dd8cf-0651-45d7-bdaf-3eac4a2763e7",
				product_name: "Eye Color Quad Eyeshadow Palette",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2335743-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2335743-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "1604f50d-b084-49fe-a860-069c9a997659",
				brand_name: "TOM FORD",
				product_price: [90],
				sku_id: "2335743",
				avg_rating: 87.254,
				total_reviews: 2100,
				page_link:
					"/product/eye-color-quad-P422568?skuId=2335743&icid2=products grid:p422568:product",
			},
			{
				product_id: "fb58f789-d70c-4918-ad59-55591e6f94da",
				product_name: "Lost Cherry Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2101293-main-zoom.jpg?pb=allure-best-2021-badge&imwidth=250",
					"https://www.sephora.com/productimages/sku/s2101293-main-zoom.jpg?pb=allure-best-2021-badge&imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "c1e16be4-af65-42b7-a345-166635cda741",
				brand_name: "TOM FORD",
				product_price: [80, 615],
				sku_id: "2101293",
				avg_rating: 84.196,
				total_reviews: 1500,
				page_link:
					"/product/lost-cherry-P436489?skuId=2101293&icid2=products grid:p436489:product",
			},
			{
				product_id: "f27e9eda-cf86-47f3-be20-aabf4b79baaa",
				product_name: "Mini Private Blend Discovery Set",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2697837-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2697837-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "90de8948-e23c-42fd-913c-032695e6a716",
				brand_name: "TOM FORD",
				product_price: [58],
				sku_id: "2697837",
				avg_rating: 48.696,
				total_reviews: 23,
				page_link:
					"/product/mini-private-blend-discovery-set-P508902?skuId=2697837&icid2=products grid:p508902:product",
			},
			{
				product_id: "0c7f0087-760f-4795-80d5-cd6bc5f895d7",
				product_name: "Lip Color Lipstick",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s1917319-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s1917319-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "9efba84f-0e00-4777-a46f-5fcc162ff13f",
				brand_name: "TOM FORD",
				product_price: [59],
				sku_id: "1917319",
				avg_rating: 91.488,
				total_reviews: 860,
				page_link:
					"/product/lip-color-P416057?skuId=1917319&icid2=products grid:p416057:product",
			},
			{
				product_id: "ae0e0450-195f-4bc8-a1ce-fce75a4a6d0f",
				product_name: "Ultra Shine Lip Color",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2756203-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2756203-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "134d7668-e1fe-441d-9a39-cafef3d2c1a9",
				brand_name: "TOM FORD",
				product_price: [59],
				sku_id: "2756203",
				avg_rating: 92.356,
				total_reviews: 573,
				page_link:
					"/product/ultra-shine-lip-color-P429018?skuId=2756203&icid2=products grid:p429018:product",
			},
			{
				product_id: "ac306c7d-eae6-4ff4-bd7a-37ffa8809469",
				product_name: "Mini Soleil Blanc Shimmering Body Oil",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2327278-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2327278-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "30559c77-c1cb-44be-9352-216efd815f39",
				brand_name: "TOM FORD",
				product_price: [40],
				sku_id: "2327278",
				avg_rating: 88.578,
				total_reviews: 1300,
				page_link:
					"/product/tom-ford-soleil-blanc-mini-shimmering-body-oil-P456175?skuId=2327278&icid2=products grid:p456175:product",
			},
			{
				product_id: "001e946e-3348-4ef8-9367-7575b0c1ef55",
				product_name: "Soleil Liquid Lip Blush Lip Balm",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2756187-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2756187-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "b8acaf9e-61b2-4b28-94a1-a679f2e67ec2",
				brand_name: "TOM FORD",
				product_price: [65],
				sku_id: "2756187",
				avg_rating: 92.978,
				total_reviews: 131,
				page_link:
					"/product/tom-ford-soleil-liquid-lip-blush-P511230?skuId=2756187&icid2=products grid:p511230:product",
			},
			{
				product_id: "824f554a-019c-4bcb-aa99-bd881bb199be",
				product_name: "Shade And Illuminate Cream Contour Duo",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2602829-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2602829-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "2a27436a-f1c2-4381-bf19-8b1b2cdc9ecd",
				brand_name: "TOM FORD",
				product_price: [90],
				sku_id: "2602829",
				avg_rating: 89.904,
				total_reviews: 1100,
				page_link:
					"/product/shade-illuminate-P422574?skuId=2602829&icid2=products grid:p422574:product",
			},
			{
				product_id: "503bc43b-f5de-450f-a201-f0845a634233",
				product_name: "Tobacco Vanille Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s1449289-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s1449289-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "36bd2d9f-e7c2-4b28-bbc2-4bc46e283637",
				brand_name: "TOM FORD",
				product_price: [70, 445],
				sku_id: "1449289",
				avg_rating: 85.966,
				total_reviews: 1300,
				page_link:
					"/product/tobacco-vanille-P393151?skuId=1449289&icid2=products grid:p393151:product",
			},
			{
				product_id: "857cf009-900c-4a8c-92c9-4731cd0d1cb7",
				product_name: "Soleil Blanc Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s1808088-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s1808088-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "ea57f46a-d94c-44d3-b5db-de28be7d22bc",
				brand_name: "TOM FORD",
				product_price: [70, 445],
				sku_id: "1808088",
				avg_rating: 82.538,
				total_reviews: 867,
				page_link:
					"/product/soleil-blanc-P406526?skuId=1808088&icid2=products grid:p406526:product",
			},
			{
				product_id: "faa25474-7e65-45e4-9fd3-a3cba9ca60ef",
				product_name: "Eye Color Quad Crème Eyeshadow Palette",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2756245-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2756245-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "1682a3dd-78ea-4eae-a948-39cdc7707e00",
				brand_name: "TOM FORD",
				product_price: [90],
				sku_id: "2756245",
				avg_rating: 87.994,
				total_reviews: 578,
				page_link:
					"/product/tom-ford-eye-color-creme-eyeshadow-quad-P481356?skuId=2756245&icid2=products grid:p481356:product",
			},
			{
				product_id: "7e4a7a3d-8323-4caf-94ec-456880627375",
				product_name: "Gloss Luxe Lip Gloss",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2259695-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2259695-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "bff2d366-8da8-495b-b9f8-5f60ef05cb28",
				brand_name: "TOM FORD",
				product_price: [59],
				sku_id: "2259695",
				avg_rating: 93.042,
				total_reviews: 983,
				page_link:
					"/product/gloss-luxe-lip-gloss-P449372?skuId=2259695&icid2=products grid:p449372:product",
			},
			{
				product_id: "ccf49ac0-f143-4d88-be4b-8ab675630088",
				product_name: "Liquid Lip Luxe Matte",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2694065-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2694065-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "d211c15c-2cb3-4cdd-a914-54a351d7dd50",
				brand_name: "TOM FORD",
				product_price: [59],
				sku_id: "2694065",
				avg_rating: 93.572,
				total_reviews: 672,
				page_link:
					"/product/tom-ford-liquid-lip-luxe-matte-P505704?skuId=2694065&icid2=products grid:p505704:product",
			},
			{
				product_id: "f2ad3d91-08db-4224-ae4a-e927d0a3fbac",
				product_name: "Soleil Sunlit Rose Lip Balm",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2503381-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2503381-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "0c59e5bf-c6ff-4eb4-ad20-49d75eb14b64",
				brand_name: "TOM FORD",
				product_price: [45, 59],
				sku_id: "2503381",
				avg_rating: 82.996,
				total_reviews: 454,
				page_link:
					"/product/tom-ford-soleil-sunlit-rose-lip-balm-P509462?skuId=2503381&icid2=products grid:p509462:product",
			},
			{
				product_id: "beea434e-954c-4642-a857-fc26d3ec1121",
				product_name: "Fucking Fabulous Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2056208-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2056208-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "ab11dcd4-93d0-4f08-b8a8-213d17031502",
				brand_name: "TOM FORD",
				product_price: [80, 615],
				sku_id: "2056208",
				avg_rating: 80.166,
				total_reviews: 1200,
				page_link:
					"/product/fucking-fabulous-P429291?skuId=2056208&icid2=products grid:p429291:product",
			},
			{
				product_id: "3bd4a4c8-8fea-4b9c-b04c-d43bab17748d",
				product_name: "Soleil Neige Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2251205-main-zoom.jpg?pb=allure-best-2020&imwidth=250",
					"https://www.sephora.com/productimages/sku/s2251205-main-zoom.jpg?pb=allure-best-2020&imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "b6035127-8be3-41bb-84f1-bafcbe839db4",
				brand_name: "TOM FORD",
				product_price: [70, 445],
				sku_id: "2251205",
				avg_rating: 91.934,
				total_reviews: 920,
				page_link:
					"/product/soleil-neige-eau-de-parfum-P450194?skuId=2251205&icid2=products grid:p450194:product",
			},
			{
				product_id: "f11d4601-d4bc-437f-91e4-77c616dd49ed",
				product_name: "Traceless Soft Matte Concealer",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2647220-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2647220-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "452d2ab7-b309-4666-9c6d-bae61ec119b5",
				brand_name: "TOM FORD",
				product_price: [60],
				sku_id: "2647220",
				avg_rating: 90.846,
				total_reviews: 579,
				page_link:
					"/product/tom-ford-traceless-soft-matte-concealer-P505387?skuId=2647220&icid2=products grid:p505387:product",
			},
			{
				product_id: "884dac88-f462-42d8-ab67-c29298285b3a",
				product_name: "Soleil Eye Color Quad Eyeshadow Palette",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2756237-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2756237-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "49c0871f-65e4-4e3b-a1c0-dbc372c46d28",
				brand_name: "TOM FORD",
				product_price: [90],
				sku_id: "2756237",
				avg_rating: 100,
				total_reviews: 1,
				page_link:
					"/product/tom-ford-soleil-summer-collection-eye-quad-palette-P511219?skuId=2756237&icid2=products grid:p511219:product",
			},
			{
				product_id: "c9fa3579-2b86-4099-8178-438839f1ed91",
				product_name:
					"Lost Cherry Eau de Parfum Fragrance Travel Spray",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2369387-main-zoom.jpg?pb=allure-best-2021-badge&imwidth=250",
					"https://www.sephora.com/productimages/sku/s2369387-main-zoom.jpg?pb=allure-best-2021-badge&imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "c795fcc0-34ab-45c4-b8ac-38e816c30a9d",
				brand_name: "TOM FORD",
				product_price: [80],
				sku_id: "2369387",
				avg_rating: 84.162,
				total_reviews: 1500,
				page_link:
					"/product/tom-ford-lost-cherry-travel-spray-P464308?skuId=2369387&icid2=products grid:p464308:product",
			},
			{
				product_id: "fedbfcad-848a-476b-a5e9-b39945634c27",
				product_name: "Soleil De Feu Spark Lip Balm",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2662773-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2662773-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "f98bf403-373b-46b2-97be-9ec966f51dfc",
				brand_name: "TOM FORD",
				product_price: [60],
				sku_id: "2662773",
				avg_rating: 59.09,
				total_reviews: 44,
				page_link:
					"/product/tom-ford-soleil-de-feu-spark-lip-balm-P506269?skuId=2662773&icid2=products grid:p506269:product",
			},
			{
				product_id: "9bcec2aa-b7f6-4bfd-b6de-661ac3cf1a0c",
				product_name: "Vanille Fatale Eau de Parfum",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2748523-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2748523-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "e34c5858-64a2-45eb-a00b-1d0809382e21",
				brand_name: "TOM FORD",
				product_price: [250, 395],
				sku_id: "2748523",
				avg_rating: 84.176,
				total_reviews: 589,
				page_link:
					"/product/tom-ford-vanille-fatale-P509859?skuId=2748523&icid2=products grid:p509859:product",
			},
			{
				product_id: "fa9ebc24-8335-4197-8ba5-1e634590953e",
				product_name: "Traceless Soft Matte Foundation",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2367290-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2367290-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "d3a88ccd-954d-45df-b992-8da8f8843c86",
				brand_name: "TOM FORD",
				product_price: [45, 90],
				sku_id: "2367290",
				avg_rating: 86.858,
				total_reviews: 1300,
				page_link:
					"/product/tom-ford-traceless-soft-matte-foundation-P459506?skuId=2367290&icid2=products grid:p459506:product",
			},
			{
				product_id: "7be62f62-42de-42d2-a15b-8e98cc8422d7",
				product_name: "Shade and Illuminate Highlighting Duo",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2602860-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2602860-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "89463c3f-15d3-442d-8de5-dc3eeea10900",
				brand_name: "TOM FORD",
				product_price: [90],
				sku_id: "2602860",
				avg_rating: 89.926,
				total_reviews: 540,
				page_link:
					"/product/skin-illuminating-powder-duo-P422552?skuId=2602860&icid2=products grid:p422552:product",
			},
			{
				product_id: "f5071f31-d8d6-434b-8ae6-8e944c5e0b10",
				product_name: "Bitter Peach Eau De Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2369338-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2369338-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "330116cb-a5b2-485e-977d-3aec8ed0dbed",
				brand_name: "TOM FORD",
				product_price: [80, 395],
				sku_id: "2369338",
				avg_rating: 80.868,
				total_reviews: 991,
				page_link:
					"/product/tom-ford-bitter-peach-eau-de-parfum-P464304?skuId=2369338&icid2=products grid:p464304:product",
			},
			{
				product_id: "6a441878-f54b-46b8-bf98-03cda3dfa62e",
				product_name: "Soleil Blanc Shimmering Body Oil",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s1808112-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s1808112-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "676ab159-d91e-40d2-9f46-9c8cc5058b39",
				brand_name: "TOM FORD",
				product_price: [40, 110],
				sku_id: "1808112",
				avg_rating: 88.578,
				total_reviews: 1300,
				page_link:
					"/product/soleil-blanc-shimmering-body-oil-P406527?skuId=1808112&icid2=products grid:p406527:product",
			},
			{
				product_id: "b85cbf98-6b9e-4bed-bd3c-8ed0986630ab",
				product_name: "Soleil Lip Blush",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2573418-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2573418-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "cbd3f0f5-b5a2-4779-a8e6-0314531aa69e",
				brand_name: "TOM FORD",
				product_price: [59],
				sku_id: "2573418",
				avg_rating: 73.636,
				total_reviews: 22,
				page_link:
					"/product/tom-ford-soleil-lip-blush-P483702?skuId=2573418&icid2=products grid:p483702:product",
			},
			{
				product_id: "0775fba9-0287-4e8d-834b-3d08ad515501",
				product_name: "Electric Cherry Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2640092-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2640092-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "4b9a50ed-0667-45ee-b207-2ef906d864f3",
				brand_name: "TOM FORD",
				product_price: [250, 395],
				sku_id: "2640092",
				avg_rating: 89.64,
				total_reviews: 668,
				page_link:
					"/product/electric-cherry-P504167?skuId=2640092&icid2=products grid:p504167:product",
			},
			{
				product_id: "283fc710-6c34-4ffe-9073-6c899820c451",
				product_name: "Mini Soleil Clutch-Size Lip Balms",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2756211-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2756211-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "a47fcce2-3b60-433f-9a26-32dcdbb49d6b",
				brand_name: "TOM FORD",
				product_price: [45],
				sku_id: "2756211",
				avg_rating: 100,
				total_reviews: 2,
				page_link:
					"/product/tom-ford-mini-soleil-neige-lip-blush-P511215?skuId=2756211&icid2=products grid:p511215:product",
			},
			{
				product_id: "316cea5f-98aa-4486-89dc-e38b68a02deb",
				product_name: "Neroli Portofino Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s1449149-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s1449149-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "1a49603e-b5f7-4128-a287-319b3330c010",
				brand_name: "TOM FORD",
				product_price: [195, 295],
				sku_id: "1449149",
				avg_rating: 68.59,
				total_reviews: 298,
				page_link:
					"/product/neroli-portofino-P378133?skuId=1449149&icid2=products grid:p378133:product",
			},
			{
				product_id: "fb3d8875-d54c-4b20-a880-7b93c1493daa",
				product_name: "Oud Wood Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s1565902-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s1565902-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "c373a75b-6cbb-47ed-89f4-162252403c0b",
				brand_name: "TOM FORD",
				product_price: [70, 445],
				sku_id: "1565902",
				avg_rating: 88.574,
				total_reviews: 1100,
				page_link:
					"/product/oud-wood-P393167?skuId=1565902&icid2=products grid:p393167:product",
			},
			{
				product_id: "5f602bac-ae8e-4b60-b236-acd0a29422e5",
				product_name: "Soleil Glow Highlighter",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2756179-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2756179-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "7844f4f0-c59b-41f3-b42a-2e2f30448902",
				brand_name: "TOM FORD",
				product_price: [95],
				sku_id: "2756179",
				avg_rating: 0,
				total_reviews: 0,
				page_link:
					"/product/tom-ford-glow-highlighter-soleil-summer-collection-P511145?skuId=2756179&icid2=products grid:p511145:product",
			},
			{
				product_id: "5b6f9970-05c7-4ca3-99fe-62c03df99f53",
				product_name: "Shade & Illuminate Blush Duo",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2475002-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2475002-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "73134e88-fd2c-4961-9fe0-b61703d50eb6",
				brand_name: "TOM FORD",
				product_price: [95],
				sku_id: "2475002",
				avg_rating: 91.95,
				total_reviews: 641,
				page_link:
					"/product/tom-ford-shade-illuminate-blush-duo-P476744?skuId=2475002&icid2=products grid:p476744:product",
			},
			{
				product_id: "9ddebb7e-4efb-42c1-88dd-3ec3f4dbb7e3",
				product_name: "Soleil Balm Frost Lip Balm",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2393932-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2393932-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "2f6540ef-60b2-4f7b-bef1-0809d320c1e5",
				brand_name: "TOM FORD",
				product_price: [58],
				sku_id: "2393932",
				avg_rating: 74.028,
				total_reviews: 211,
				page_link:
					"/product/tom-ford-soleil-lip-balm-P464313?skuId=2393932&icid2=products grid:p464313:product",
			},
			{
				product_id: "01b9da9a-7801-4579-a4d6-b2bfc26face1",
				product_name: "Santal Blush Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2594158-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2594158-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "1126eb16-df3d-419c-ad7b-07bb7d61ba7b",
				brand_name: "TOM FORD",
				product_price: [195, 295],
				sku_id: "2594158",
				avg_rating: 87.594,
				total_reviews: 748,
				page_link:
					"/product/santal-blush-P393159?skuId=2594158&icid2=products grid:p393159:product",
			},
			{
				product_id: "2bb99c0d-33a5-4ebd-8f68-161e93762491",
				product_name: "Lip Color Matte Lipstick",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2358513-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2358513-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "7b4e20e7-c9e5-4cd6-aeb8-da5a28725309",
				brand_name: "TOM FORD",
				product_price: [58, 59],
				sku_id: "2358513",
				avg_rating: 91.764,
				total_reviews: 1100,
				page_link:
					"/product/lip-color-matte-lipstick-P416222?skuId=2358513&icid2=products grid:p416222:product",
			},
			{
				product_id: "3ccbbe3a-1fd1-4117-a404-a68f0cf540cc",
				product_name: "Eau de Soleil Blanc Eau de Toilette Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2038933-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2038933-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "75658093-fe4d-42ff-afa5-ab0ba346f709",
				brand_name: "TOM FORD",
				product_price: [50, 235],
				sku_id: "2038933",
				avg_rating: 83.344,
				total_reviews: 628,
				page_link:
					"/product/eau-de-soleil-blanc-P428452?skuId=2038933&icid2=products grid:p428452:product",
			},
			{
				product_id: "4f3ff159-8061-41ef-bc75-f23d790a192b",
				product_name: "Bitter Peach Lip Color Matte Lipstick",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2554046-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2554046-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "1e99c00b-e32b-4a58-ac5d-67efffc56a50",
				brand_name: "TOM FORD",
				product_price: [58],
				sku_id: "2554046",
				avg_rating: 91.538,
				total_reviews: 26,
				page_link:
					"/product/tom-ford-bitter-peach-lip-color-matte-lipstick-P481174?skuId=2554046&icid2=products grid:p481174:product",
			},
			{
				product_id: "05fe1b14-9ff8-48ba-80c1-1653ecb826ef",
				product_name: "Soleil Glow Bronzer",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2219582-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2219582-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "f803d4f0-f233-490a-a438-d546dd6f5fb7",
				brand_name: "TOM FORD",
				product_price: [70],
				sku_id: "2219582",
				avg_rating: 90.566,
				total_reviews: 53,
				page_link:
					"/product/soleil-glow-bronzer-P443930?skuId=2219582&icid2=products grid:p443930:product",
			},
			{
				product_id: "97ad7a24-2b20-4025-b040-9a38e29998e8",
				product_name: "Soleil Neige Shimmering Body Oil",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2284958-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2284958-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "12076410-cda7-4437-88c9-8ceedb73986e",
				brand_name: "TOM FORD",
				product_price: [40, 110],
				sku_id: "2284958",
				avg_rating: 87,
				total_reviews: 40,
				page_link:
					"/product/soleil-neige-shimmering-body-oil-P450195?skuId=2284958&icid2=products grid:p450195:product",
			},
			{
				product_id: "f54e2484-8c07-4295-8061-d5de0d561621",
				product_name: "Cherry Smoke Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2640118-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2640118-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "2875ac26-42e8-4c2f-8fc5-0c855b019155",
				brand_name: "TOM FORD",
				product_price: [250, 395],
				sku_id: "2640118",
				avg_rating: 88.796,
				total_reviews: 648,
				page_link:
					"/product/cherry-smoke-P504169?skuId=2640118&icid2=products grid:p504169:product",
			},
			{
				product_id: "64e81990-d388-429f-97e2-314ffc63add9",
				product_name: "Rose Prick Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2318756-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2318756-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "0e50594a-7f5b-4900-a437-4acebd03fa4e",
				brand_name: "TOM FORD",
				product_price: [80, 615],
				sku_id: "2318756",
				avg_rating: 84.048,
				total_reviews: 988,
				page_link:
					"/product/tom-ford-rose-prick-eau-de-parfum-P455598?skuId=2318756&icid2=products grid:p455598:product",
			},
			{
				product_id: "ee110514-40c8-4fe8-a2da-efa2d9d0326c",
				product_name: "Black Orchid Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s1007723-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s1007723-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "36628b55-768c-4a0b-b97d-0868e99c2fcd",
				brand_name: "TOM FORD",
				product_price: [50, 235],
				sku_id: "1007723",
				avg_rating: 84.388,
				total_reviews: 1900,
				page_link:
					"/product/black-orchid-P183301?skuId=1007723&icid2=products grid:p183301:product",
			},
			{
				product_id: "d484de86-9f9a-4eb7-bc48-06d9e2c3ece1",
				product_name: "Ombré Leather Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2101319-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2101319-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "21d39555-3a83-48c3-990f-e660199b3ffb",
				brand_name: "TOM FORD",
				product_price: [50, 235],
				sku_id: "2101319",
				avg_rating: 84.55,
				total_reviews: 1500,
				page_link:
					"/product/ombre-leather-P433663?skuId=2101319&icid2=products grid:p433663:product",
			},
			{
				product_id: "afe9e000-470d-40ec-9e80-a772f043d094",
				product_name:
					"Eau de Soleil Blanc Eau de Toilette Fragrance Travel Spray",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2175644-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2175644-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "1fff2830-270f-4e98-91e8-53118ef23b3f",
				brand_name: "TOM FORD",
				product_price: [50],
				sku_id: "2175644",
				avg_rating: 82.596,
				total_reviews: 701,
				page_link:
					"/product/eau-de-soleil-blanc-travel-spray-10ml-P446023?skuId=2175644&icid2=products grid:p446023:product",
			},
			{
				product_id: "1887dc12-c864-4529-9d0a-99c302d3cf3d",
				product_name: "Traceless Soft Matte Primer",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2554079-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2554079-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "0162104b-569e-4181-ac49-9e88db646da4",
				brand_name: "TOM FORD",
				product_price: [90],
				sku_id: "2554079",
				avg_rating: 85.93,
				total_reviews: 479,
				page_link:
					"/product/tom-ford-traceless-soft-matte-primer-P481747?skuId=2554079&icid2=products grid:p481747:product",
			},
			{
				product_id: "ef18a9bf-dcbd-4b41-8cd9-6878b3a808b4",
				product_name: "Soleil Trilogy Set",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2714855-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2714855-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "1479f8d3-c1c6-43a1-a5cb-594efe8ea07b",
				brand_name: "TOM FORD",
				product_price: [200],
				sku_id: "2714855",
				avg_rating: 0,
				total_reviews: 0,
				page_link:
					"/product/tom-ford-soleil-trilogy-set-P509131?skuId=2714855&icid2=products grid:p509131:product",
			},
			{
				product_id: "57b62bb8-cd0f-4573-8135-2da9c2cb5909",
				product_name:
					"Soleil Blanc Eau de Parfum Fragrance Travel Spray",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2101335-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2101335-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "f108905c-5c22-4467-9caa-d4137fd8f68b",
				brand_name: "TOM FORD",
				product_price: [70],
				sku_id: "2101335",
				avg_rating: 82.538,
				total_reviews: 867,
				page_link:
					"/product/soleil-blanc-atomizer-P433669?skuId=2101335&icid2=products grid:p433669:product",
			},
			{
				product_id: "d9ee00db-29cc-48e7-9b1b-4e2a65279e04",
				product_name:
					"Tobacco Vanille Eau de Parfum Fragrance Travel Spray",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2101368-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2101368-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "b19285f7-64be-4a95-a6c4-0db386a8ac54",
				brand_name: "TOM FORD",
				product_price: [70],
				sku_id: "2101368",
				avg_rating: 85.966,
				total_reviews: 1300,
				page_link:
					"/product/tobacco-vanille-atomizer-P433672?skuId=2101368&icid2=products grid:p433672:product",
			},
			{
				product_id: "9a5bb702-b4e7-4589-b29d-3458262a2e58",
				product_name: "Soleil De Feu Eye Color Quad",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2662807-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2662807-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "55aa45ac-aa0e-42d8-a8f9-ffadb50b153a",
				brand_name: "TOM FORD",
				product_price: [90],
				sku_id: "2662807",
				avg_rating: 88.888,
				total_reviews: 9,
				page_link:
					"/product/tom-ford-soleil-de-feu-eye-color-quad-P506277?skuId=2662807&icid2=products grid:p506277:product",
			},
			{
				product_id: "3c900950-025f-442b-9591-3502a41f3342",
				product_name: "Mandarino Di Amalfi Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s1647791-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s1647791-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "dc3c5e74-85c1-4b2c-9a10-6fb0479a059a",
				brand_name: "TOM FORD",
				product_price: [295],
				sku_id: "1647791",
				avg_rating: 79.112,
				total_reviews: 45,
				page_link:
					"/product/mandarino-di-amalfi-P392229?skuId=1647791&icid2=products grid:p392229:product",
			},
			{
				product_id: "53a59af6-6f1b-4044-8513-c97b645ec107",
				product_name: "Cafe Rose Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2692184-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2692184-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "d7338913-11c5-4d72-a489-a19dd027dd3a",
				brand_name: "TOM FORD",
				product_price: [115, 235],
				sku_id: "2692184",
				avg_rating: 82.938,
				total_reviews: 572,
				page_link:
					"/product/cafe-rose-P393157?skuId=2692184&icid2=products grid:p393157:product",
			},
			{
				product_id: "07ec0c9b-980c-44a6-95f6-1d58956555c1",
				product_name: "Soleil de Feu Glow Highlighter",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2662765-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2662765-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "37f2c3fa-a53e-4120-9a45-d59ae5164ac1",
				brand_name: "TOM FORD",
				product_price: [95],
				sku_id: "2662765",
				avg_rating: 75,
				total_reviews: 4,
				page_link:
					"/product/tom-ford-soleil-de-feu-glow-highlighter-P506287?skuId=2662765&icid2=products grid:p506287:product",
			},
			{
				product_id: "f29eb18c-ba9f-4974-b101-5cc747b76bfb",
				product_name: "Jasmin Rouge Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s1449115-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s1449115-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "5e63e622-f1bf-4deb-ab1e-81a4e3d6dd2f",
				brand_name: "TOM FORD",
				product_price: [295, 425],
				sku_id: "1449115",
				avg_rating: 90.566,
				total_reviews: 53,
				page_link:
					"/product/jasmin-rouge-P393141?skuId=1449115&icid2=products grid:p393141:product",
			},
			{
				product_id: "778a0f75-f4f5-4ac8-b898-eb833b3b28c5",
				product_name:
					"Love Collection Eye Color Quad Eyeshadow Palette",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2763423-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2763423-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "1965d444-b7c5-44c5-a1d3-ddf6108aaffd",
				brand_name: "TOM FORD",
				product_price: [95],
				sku_id: "2763423",
				avg_rating: 100,
				total_reviews: 2,
				page_link:
					"/product/tom-ford-love-collection-eye-color-quad-eyeshadow-palette-P509970?skuId=2763423&icid2=products grid:p509970:product",
			},
			{
				product_id: "27f5ba56-acad-48d7-b9c2-485f8c1b94ca",
				product_name:
					"Fucking Fabulous Eau de Parfum Fragrance Travel Spray",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2175727-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2175727-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "9b1f4122-3d44-410b-8432-8ba86b577853",
				brand_name: "TOM FORD",
				product_price: [80],
				sku_id: "2175727",
				avg_rating: 80.166,
				total_reviews: 1200,
				page_link:
					"/product/fucking-fabulous-travel-size-P448464?skuId=2175727&icid2=products grid:p448464:product",
			},
			{
				product_id: "67eaedff-9101-4ee0-9c2a-b556b30750d4",
				product_name: "Noir de Noir Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s1449214-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s1449214-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "a422fa93-793c-427e-a765-871e447d828a",
				brand_name: "TOM FORD",
				product_price: [295, 445],
				sku_id: "1449214",
				avg_rating: 92.608,
				total_reviews: 46,
				page_link:
					"/product/noir-de-noir-P393163?skuId=1449214&icid2=products grid:p393163:product",
			},
			{
				product_id: "5d9d8bde-392b-4f87-9a83-ca4cf2dbc5a8",
				product_name: "Ébène Fumé Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2474021-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2474021-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "747d5f6e-dd9e-48dd-9078-49e0361ba25b",
				brand_name: "TOM FORD",
				product_price: [70, 445],
				sku_id: "2474021",
				avg_rating: 84.944,
				total_reviews: 1100,
				page_link:
					"/product/tom-ford-ebene-fume-eau-de-parfum-P478734?skuId=2474021&icid2=products grid:p478734:product",
			},
			{
				product_id: "6cd4870b-2f9d-4fdf-8a42-a5edb45b8f84",
				product_name: "Eye Defining Pen Liquid Eyeliner Duo",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s1987635-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s1987635-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "6942e2dd-5b2f-45c1-b7d5-c56c80280257",
				brand_name: "TOM FORD",
				product_price: [62],
				sku_id: "1987635",
				avg_rating: 90.074,
				total_reviews: 1200,
				page_link:
					"/product/eye-defining-pen-liquid-eyeliner-duo-P422571?skuId=1987635&icid2=products grid:p422571:product",
			},
			{
				product_id: "d640d8c9-4c27-40b9-9585-21b22dd55634",
				product_name: "Eyebrow Laminator",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2611770-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2611770-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "ac3cbfc4-8c97-45e1-afe3-85b3a826c74d",
				brand_name: "TOM FORD",
				product_price: [55],
				sku_id: "2611770",
				avg_rating: 81.918,
				total_reviews: 459,
				page_link:
					"/product/eyebrow-laminator-P501516?skuId=2611770&icid2=products grid:p501516:product",
			},
			{
				product_id: "212562d9-7d2c-4485-bf75-b508d23f88ba",
				product_name: "Eye Color Quad - Cherry Collection",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2648541-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2648541-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "2b87ded6-4a4c-4199-94c9-4a34d483b942",
				brand_name: "TOM FORD",
				product_price: [90],
				sku_id: "2648541",
				avg_rating: 86.666,
				total_reviews: 6,
				page_link:
					"/product/tom-ford-eye-color-quad-P505393?skuId=2648541&icid2=products grid:p505393:product",
			},
			{
				product_id: "1186a4fd-7346-4015-8587-0e7db9fad6dc",
				product_name: "Brow Sculptor",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2024016-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2024016-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "6287be8d-b284-4acd-893f-f98063e15842",
				brand_name: "TOM FORD",
				product_price: [56],
				sku_id: "2024016",
				avg_rating: 91.802,
				total_reviews: 544,
				page_link:
					"/product/brow-sculptor-P428908?skuId=2024016&icid2=products grid:p428908:product",
			},
			{
				product_id: "842f3afe-cb7b-4f91-9b2e-14a37a76d1cf",
				product_name: "White Suede Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2318699-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2318699-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "d71c7a41-83f8-4709-8d1b-37af4cee3a97",
				brand_name: "TOM FORD",
				product_price: [70, 445],
				sku_id: "2318699",
				avg_rating: 88.276,
				total_reviews: 29,
				page_link:
					"/product/white-suede-P393137?skuId=2318699&icid2=products grid:p393137:product",
			},
			{
				product_id: "0bfd941b-7cb4-4423-8dde-36df162d363b",
				product_name: "Woods Trilogy Set",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2716595-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2716595-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "bee6323c-f82b-4c26-bff1-92691e0b5307",
				brand_name: "TOM FORD",
				product_price: [200],
				sku_id: "2716595",
				avg_rating: 80,
				total_reviews: 1,
				page_link:
					"/product/tom-ford-woods-trilogy-set-P509135?skuId=2716595&icid2=products grid:p509135:product",
			},
			{
				product_id: "e4e7c3a0-799f-4d11-9747-d2b00337cdd2",
				product_name:
					"Bitter Peach Eau de Parfum Fragrance Travel Spray",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2474047-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2474047-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "e9366299-e65a-4702-ab21-b80ec5723230",
				brand_name: "TOM FORD",
				product_price: [80],
				sku_id: "2474047",
				avg_rating: 80.868,
				total_reviews: 991,
				page_link:
					"/product/tom-ford-bitter-peach-eau-de-parfum-travel-spray-P477712?skuId=2474047&icid2=products grid:p477712:product",
			},
			{
				product_id: "9d5d7a99-098d-4dc7-a71f-5569c44b3817",
				product_name: "Myrrhe Mystere Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2729721-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2729721-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "a515e004-a5c5-4de4-a6c3-d5fe2db4da67",
				brand_name: "TOM FORD",
				product_price: [250, 395],
				sku_id: "2729721",
				avg_rating: 88.326,
				total_reviews: 663,
				page_link:
					"/product/myrrhe-mystere-P508230?skuId=2729721&icid2=products grid:p508230:product",
			},
			{
				product_id: "66f20b1c-0dad-4b6a-a466-f40fc2456142",
				product_name: "Soleil Brulant Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2408391-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2408391-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "e2e97e92-f56e-4e14-93b4-f898ac97f9c9",
				brand_name: "TOM FORD",
				product_price: [250, 615],
				sku_id: "2408391",
				avg_rating: 80.8,
				total_reviews: 450,
				page_link:
					"/product/tom-ford-soleil-brulant-P470554?skuId=2408391&icid2=products grid:p470554:product",
			},
			{
				product_id: "87de23a1-2c8e-47fb-97bb-ff57a03f1eae",
				product_name:
					"White Suede Eau de Parfum Fragrance Travel Spray",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2220143-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2220143-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "314887a3-0c50-435b-bb15-24550740376b",
				brand_name: "TOM FORD",
				product_price: [70],
				sku_id: "2220143",
				avg_rating: 75.556,
				total_reviews: 9,
				page_link:
					"/product/white-suede-travel-spray-P451871?skuId=2220143&icid2=products grid:p451871:product",
			},
			{
				product_id: "4e197f2e-9f13-4744-ae35-dce89e327a54",
				product_name: "Velvet Orchid Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s1632777-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s1632777-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "a232fdec-d085-4135-85b8-33b5040243fb",
				brand_name: "TOM FORD",
				product_price: [115, 235],
				sku_id: "1632777",
				avg_rating: 87.326,
				total_reviews: 344,
				page_link:
					"/product/velvet-orchid-P387250?skuId=1632777&icid2=products grid:p387250:product",
			},
			{
				product_id: "d0b03d22-460b-4813-970a-19b6f3b87854",
				product_name: "Ébène Fumé Eau de Parfum Fragrance Travel Spray",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2474039-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2474039-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "02ba3440-4f83-44e5-9856-2132f3e5b361",
				brand_name: "TOM FORD",
				product_price: [70],
				sku_id: "2474039",
				avg_rating: 96.924,
				total_reviews: 13,
				page_link:
					"/product/ebene-fume-eau-de-parfum-travel-spray-P502337?skuId=2474039&icid2=products grid:p502337:product",
			},
			{
				product_id: "76a65a34-844f-4f39-849d-0ab4d1019d89",
				product_name: "Ombré Leather Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2466472-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2466472-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "39f17c6b-7188-4f19-8211-cb48d1783374",
				brand_name: "TOM FORD",
				product_price: [65, 295],
				sku_id: "2466472",
				avg_rating: 86.636,
				total_reviews: 672,
				page_link:
					"/product/tom-ford-ombre-leather-parfum-P474863?skuId=2466472&icid2=products grid:p474863:product",
			},
			{
				product_id: "dd749d04-91d3-43ce-b8ce-4b1f66a3b69d",
				product_name: "Rose D'Amalfi Eau De Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2544856-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2544856-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "2322ada6-a9a3-4653-b995-d1673c317162",
				brand_name: "TOM FORD",
				product_price: [295],
				sku_id: "2544856",
				avg_rating: 82.898,
				total_reviews: 276,
				page_link:
					"/product/tom-ford-rose-d-amalfi-eau-de-parfum-P479655?skuId=2544856&icid2=products grid:p479655:product",
			},
			{
				product_id: "d0285b3c-591f-47bc-9664-6ad0b0e700a8",
				product_name: "Costa Azzurra Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2408292-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2408292-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "054085fb-db75-4f0a-b4fa-433846c6f2e6",
				brand_name: "TOM FORD",
				product_price: [155, 235],
				sku_id: "2408292",
				avg_rating: 90.186,
				total_reviews: 858,
				page_link:
					"/product/tom-ford-costa-azzurra-eau-de-parfum-3-4-oz-P467979?skuId=2408292&icid2=products grid:p467979:product",
			},
			{
				product_id: "74c450c6-7dd6-48e8-9dbd-1f999ffa659b",
				product_name: "Fougère d'Argent",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2101392-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2101392-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "4e63b9f6-8877-45dd-94bf-89a398fe752e",
				brand_name: "TOM FORD",
				product_price: [295],
				sku_id: "2101392",
				avg_rating: 95,
				total_reviews: 12,
				page_link:
					"/product/foug-re-d-argent-P433910?skuId=2101392&icid2=products grid:p433910:product",
			},
			{
				product_id: "fdbd6d96-1553-46bd-b0ca-77312cdff7f4",
				product_name: "Bois Marocain Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2594125-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2594125-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "e786051c-505d-435a-a65f-bb67ba08c22c",
				brand_name: "TOM FORD",
				product_price: [195, 295],
				sku_id: "2594125",
				avg_rating: 79.882,
				total_reviews: 512,
				page_link:
					"/product/bois-marocain-eau-de-parfum-P502494?skuId=2594125&icid2=products grid:p502494:product",
			},
			{
				product_id: "ac32220e-1f73-4625-afee-45f144393106",
				product_name: "Tubéreuse Nue Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2408318-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2408318-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "645d6663-497c-45f0-a4d5-8b5a6d0ab092",
				brand_name: "TOM FORD",
				product_price: [395],
				sku_id: "2408318",
				avg_rating: 80.14,
				total_reviews: 428,
				page_link:
					"/product/tom-ford-tubereuse-nue-P468710?skuId=2408318&icid2=products grid:p468710:product",
			},
			{
				product_id: "e1071fe9-72ed-4497-8bdf-673e4e9b0165",
				product_name: "Soleil de Feu Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2640134-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2640134-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "1d43a72e-ff3d-4c38-ae87-8abf5bcf1618",
				brand_name: "TOM FORD",
				product_price: [195, 295],
				sku_id: "2640134",
				avg_rating: 84.886,
				total_reviews: 655,
				page_link:
					"/product/soleil-de-feu-P505747?skuId=2640134&icid2=products grid:p505747:product",
			},
			{
				product_id: "6203ee55-354c-41b6-99aa-53fd30ca745a",
				product_name: "Extreme Mascara",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s1987478-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s1987478-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "72cf1ec2-151a-4eb8-981d-34f99a638ee4",
				brand_name: "TOM FORD",
				product_price: [50],
				sku_id: "1987478",
				avg_rating: 82.524,
				total_reviews: 420,
				page_link:
					"/product/extreme-mascara-P422546?skuId=1987478&icid2=products grid:p422546:product",
			},
			{
				product_id: "89a5b6e2-5dde-47e6-90ac-798a38a99935",
				product_name: "Noir Extreme Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s1706423-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s1706423-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "f3cb1ad3-12c1-4d2b-9d11-0aeb35734742",
				brand_name: "TOM FORD",
				product_price: [49, 235],
				sku_id: "1706423",
				avg_rating: 89.148,
				total_reviews: 446,
				page_link:
					"/product/noir-extreme-P395693?skuId=1706423&icid2=products grid:p395693:product",
			},
			{
				product_id: "1da48912-9268-4328-989a-a3ee3431914b",
				product_name:
					"Soleil Neige Eau De Parfum Fragrance Travel Spray",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2369809-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2369809-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "b476f15a-110d-4ac4-b695-fbb1c95908e8",
				brand_name: "TOM FORD",
				product_price: [70],
				sku_id: "2369809",
				avg_rating: 91.934,
				total_reviews: 920,
				page_link:
					"/product/tom-ford-soleil-neige-eau-de-parfum-travel-spray-P464305?skuId=2369809&icid2=products grid:p464305:product",
			},
			{
				product_id: "471378a9-eeb0-43f9-a582-60aaf5c500e2",
				product_name:
					"Black Orchid Eau de Parfum Fragrance Travel Spray",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2038917-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2038917-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "76e52d0a-c409-45f0-9713-b290f8058f82",
				brand_name: "TOM FORD",
				product_price: [50],
				sku_id: "2038917",
				avg_rating: 84.388,
				total_reviews: 1900,
				page_link:
					"/product/black-orchid-travel-spray-P430909?skuId=2038917&icid2=products grid:p430909:product",
			},
			{
				product_id: "65f38bd7-e96f-462e-a4f0-8fdb0071c60c",
				product_name: "Oud Minerale Eau de Parfum",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2741643-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2741643-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "9ab377f4-fe3d-497c-a322-edffd1de039e",
				brand_name: "TOM FORD",
				product_price: [155, 235],
				sku_id: "2741643",
				avg_rating: 82.822,
				total_reviews: 1900,
				page_link:
					"/product/tom-ford-oud-minerale-eau-de-parfum-P509793?skuId=2741643&icid2=products grid:p509793:product",
			},
			{
				product_id: "1ea9794a-0566-4852-b098-9bf96281212b",
				product_name: "Tuscan Leather Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s1449305-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s1449305-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "a696d775-ec93-4d86-b0c9-7dea1f456419",
				brand_name: "TOM FORD",
				product_price: [195, 445],
				sku_id: "1449305",
				avg_rating: 75.88,
				total_reviews: 597,
				page_link:
					"/product/tuscan-leather-P393153?skuId=1449305&icid2=products grid:p393153:product",
			},
			{
				product_id: "2415fbbe-b92c-41a3-98a0-7ca55640dc48",
				product_name: "Emotionproof Mascara",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2225506-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2225506-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "fc368ae5-3a89-4f31-a1fd-9989442cf7eb",
				brand_name: "TOM FORD",
				product_price: [50],
				sku_id: "2225506",
				avg_rating: 81.396,
				total_reviews: 129,
				page_link:
					"/product/emotionproof-mascara-P445433?skuId=2225506&icid2=products grid:p445433:product",
			},
			{
				product_id: "466e6232-507d-4051-8cc6-2ee9a7a373b2",
				product_name: "Fucking Fabulous Home Candle",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2144772-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2144772-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "720ea146-c4d9-44d6-9535-c66c8723e673",
				brand_name: "TOM FORD",
				product_price: [135],
				sku_id: "2144772",
				avg_rating: 60,
				total_reviews: 21,
				page_link:
					"/product/fucking-fabulous-candle-P438529?skuId=2144772&icid2=products grid:p438529:product",
			},
			{
				product_id: "fa46d179-8442-4f42-a483-464e69f3ca90",
				product_name: "Rose De Chine Eau De Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2544864-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2544864-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "4c9723ea-01b1-4b5e-b374-0486dbab3cf2",
				brand_name: "TOM FORD",
				product_price: [295],
				sku_id: "2544864",
				avg_rating: 87.126,
				total_reviews: 247,
				page_link:
					"/product/tom-ford-rose-de-chine-eau-de-parfum-P481398?skuId=2544864&icid2=products grid:p481398:product",
			},
			{
				product_id: "f24691ea-7cec-4da0-9a0e-faa5b75185a0",
				product_name: "Black Orchid Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2369288-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2369288-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "3c509a8b-c077-46c2-b5db-0eaf00cd3b07",
				brand_name: "TOM FORD",
				product_price: [195, 295],
				sku_id: "2369288",
				avg_rating: 85.564,
				total_reviews: 586,
				page_link:
					"/product/tom-ford-black-orchid-parfum-P460873?skuId=2369288&icid2=products grid:p460873:product",
			},
			{
				product_id: "2d7d315d-ba19-41b6-acd8-7f9fa46473e2",
				product_name: "Noir Extreme Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2594174-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2594174-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "2266d248-6fdb-455e-bc02-c18b9d93e223",
				brand_name: "TOM FORD",
				product_price: [195, 295],
				sku_id: "2594174",
				avg_rating: 92.014,
				total_reviews: 278,
				page_link:
					"/product/noir-extreme-parfum-P501520?skuId=2594174&icid2=products grid:p501520:product",
			},
			{
				product_id: "eb177201-53b6-4e5b-90d7-4dbd38812cac",
				product_name: "Costa Azzurra Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2541456-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2541456-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "e34a6879-1740-4900-9c5b-8e26bc71b763",
				brand_name: "TOM FORD",
				product_price: [295],
				sku_id: "2541456",
				avg_rating: 89.778,
				total_reviews: 135,
				page_link:
					"/product/tom-ford-costa-azzurra-parfum-P481351?skuId=2541456&icid2=products grid:p481351:product",
			},
			{
				product_id: "4aecdf99-93c0-41d1-a0ea-b5215e494e97",
				product_name:
					"Ombré Leather Eau de Parfum Fragrance Travel Spray",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2318814-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2318814-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "327d898d-8060-4df1-9bb3-c0e7ebcc7299",
				brand_name: "TOM FORD",
				product_price: [50],
				sku_id: "2318814",
				avg_rating: 84.55,
				total_reviews: 1500,
				page_link:
					"/product/tom-ford-ombre-leather-travel-spray-P459414?skuId=2318814&icid2=products grid:p459414:product",
			},
			{
				product_id: "f4b40c02-6d2f-482e-a24b-948e9daa2aba",
				product_name: "Tobacco Vanille Conditioning Beard Oil",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s1866789-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s1866789-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "372b827e-9144-4ad2-a475-73f6f1cb2d28",
				brand_name: "TOM FORD",
				product_price: [60],
				sku_id: "1866789",
				avg_rating: 91.334,
				total_reviews: 30,
				page_link:
					"/product/conditioning-beard-oil-P411714?skuId=1866789&icid2=products grid:p411714:product",
			},
			{
				product_id: "3ec22041-8f79-410e-804b-9ec5c428bfe1",
				product_name: "Ebene Fume Candle",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2623379-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2623379-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "50d5b918-7f7c-421c-a060-53a3ed3efd60",
				brand_name: "TOM FORD",
				product_price: [135],
				sku_id: "2623379",
				avg_rating: 100,
				total_reviews: 1,
				page_link:
					"/product/tom-ford-ebene-fume-candle-P502721?skuId=2623379&icid2=products grid:p502721:product",
			},
			{
				product_id: "dc3464e8-d994-40d3-9647-0ab3abdd06ff",
				product_name: "Rose Prick Eau de Parfum Fragrance Travel Spray",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2369312-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2369312-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "8fa906c6-d784-439d-bae4-5987e4b1e633",
				brand_name: "TOM FORD",
				product_price: [80],
				sku_id: "2369312",
				avg_rating: 84.048,
				total_reviews: 988,
				page_link:
					"/product/tom-ford-rose-prick-eau-de-parfum-travel-spray-P468419?skuId=2369312&icid2=products grid:p468419:product",
			},
			{
				product_id: "e934a487-a6f1-4099-9f60-8a7c654399b5",
				product_name: "Rose Prick Home Candle",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2439008-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2439008-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "eaa4590f-c48c-4f59-b6f6-49637193fead",
				brand_name: "TOM FORD",
				product_price: [135],
				sku_id: "2439008",
				avg_rating: 80,
				total_reviews: 3,
				page_link:
					"/product/tom-ford-rose-prick-candle-P468711?skuId=2439008&icid2=products grid:p468711:product",
			},
			{
				product_id: "2e165372-1389-4832-b436-f2d9a2e12785",
				product_name: "Beau de Jour Eau de Parfum Fragrance",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2318723-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2318723-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "d6fca8e1-7f9c-41ab-ada9-8a80f77c6fe3",
				brand_name: "TOM FORD",
				product_price: [155, 235],
				sku_id: "2318723",
				avg_rating: 83.216,
				total_reviews: 423,
				page_link:
					"/product/tom-ford-beau-de-jour-P454404?skuId=2318723&icid2=products grid:p454404:product",
			},
			{
				product_id: "2a13ccb4-c5a6-4021-bdc7-970f226cf7b0",
				product_name:
					"Ombré Leather Eau de Parfum Fragrance Gift Set With Travel Spray",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2716603-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2716603-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "ecdfeae2-98cf-4a83-a1de-332d5de39862",
				brand_name: "TOM FORD",
				product_price: [225],
				sku_id: "2716603",
				avg_rating: 77.142,
				total_reviews: 7,
				page_link:
					"/product/ombre-leather-edp-set-P507505?skuId=2716603&icid2=products grid:p507505:product",
			},
			{
				product_id: "a75bb705-04c6-4acd-88b1-07cb4ed0814c",
				product_name: "Bitter Peach Home Candle",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2541498-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2541498-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "8abd1c47-a4c9-44e0-9e0d-d48eca636cf7",
				brand_name: "TOM FORD",
				product_price: [135],
				sku_id: "2541498",
				avg_rating: 80,
				total_reviews: 1,
				page_link:
					"/product/tom-ford-bitter-peach-candle-P480194?skuId=2541498&icid2=products grid:p480194:product",
			},
			{
				product_id: "7b029439-af60-4f33-b759-2f957ee62140",
				product_name: "Oud Wood Eau de Parfum Fragrance Travel Spray",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2101350-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2101350-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "0001e581-74b2-46d5-8203-a6a08ac19706",
				brand_name: "TOM FORD",
				product_price: [70],
				sku_id: "2101350",
				avg_rating: 88.574,
				total_reviews: 1100,
				page_link:
					"/product/oud-wood-atomizer-P433671?skuId=2101350&icid2=products grid:p433671:product",
			},
			{
				product_id: "384f27ca-0516-4713-ae7d-7969becbc76c",
				product_name: "Ombré Leather Parfum Fragrance Travel Spray",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2466480-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2466480-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "b7e49334-9fe8-4ca0-aaea-77be57b38a15",
				brand_name: "TOM FORD",
				product_price: [65],
				sku_id: "2466480",
				avg_rating: 86.636,
				total_reviews: 672,
				page_link:
					"/product/tom-ford-ombre-leather-parfum-travel-spray-P474864?skuId=2466480&icid2=products grid:p474864:product",
			},
			{
				product_id: "743cff97-ecaa-4046-9b33-adf4b4b3af0a",
				product_name:
					"Noir Extreme Eau de Parfum Fragrance Travel Spray",
				product_image_url: [
					"https://www.sephora.com/productimages/sku/s2038982-main-zoom.jpg?imwidth=250",
					"https://www.sephora.com/productimages/sku/s2038982-main-zoom.jpg?imwidth=500",
				],
				retailer_id: "Sephora123",
				brand_id: "a25d9c11-7b11-4863-8c31-9ff64c72febb",
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

			console.dir(uniqueArray.length, { maxArrayLength: null });
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

	function getNumber(text: string | null): number | null {
		if (!text) return 0;

		const regex = /(\d{1,3}(,\d{3})*(\.\d+)?)/;
		const match = text.match(regex);

		if (!match) return 0;

		let numberString = match[0].replace(/[^\d.]/g, "");
		let numberValue: number;

		if (numberString.includes(".")) {
			numberValue = parseFloat(numberString);
		} else {
			numberValue = parseInt(numberString, 10);
		}

		if (text.toLowerCase().includes("k")) {
			numberValue *= 1000;
		}

		return numberValue;
	}

	// console.log(parseInt("Reviews 101"))

	return (
		<form action={handleSubmit}>
			<Button type="submit">Scrape All Products</Button>
		</form>
	);
}
