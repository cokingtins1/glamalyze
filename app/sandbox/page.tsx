import { Button } from "@/components/ui/button";
import { productSeeds } from "@/lib/seeding/seedingFuncs";
import { randomUserName } from "@/lib/utils";
import { AllProducts, PrismaClient, Review } from "@prisma/client";
import { randomInt } from "crypto";
import dayjs from "dayjs";
import { generate } from "random-words";
import React from "react";
import { getAllSephoraProducts } from "../actions/getAllSephoraProducts";
import elements from "@/app/libs/JSON/elemets.json";
import { AllProductsSelectors } from "../libs/types";
import { getAllUltaProducts } from "../actions/getAllUltaProducts";

export default function Page() {
	async function handleSubmit() {
		"use server";

		const start = new Date().getTime();

		const url = "https://www.ulta.com/brand/chanel";
		// const allProducts = await getAllUltaProducts(url);

		const end = new Date().getTime();

		console.log(
			`Execution time in route.ts: ${(end - start) / 1000} seconds`
		);

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
				product_id: "5e9f6f5d-c4df-432f-ae66-f115c8d922f6",
				product_name: "LA CRÈME MAIN Nourish - Soften - Illuminate",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2621840?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "4d9f7694-519c-4c37-a6fa-5e34fd23ed6d",
				brand_name: "CHANEL",
				product_price: [62],
				sku_id: "2621840",
				avg_rating: 0,
				total_reviews: 0,
				page_link:
					"https://www.ulta.com/p/la-creme-main-nourish-soften-illuminate-pimprod2044649?sku=2621840",
			},
			{
				product_id: "769887bb-707e-450d-af2d-9db29560041b",
				product_name: "COCO MADEMOISELLE Eau de Parfum Spray",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2055113?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "c481dd18-a035-4faa-a823-2979bb8911fe",
				brand_name: "CHANEL",
				product_price: [138, 172],
				sku_id: "2055113",
				avg_rating: 4.4,
				total_reviews: 337,
				page_link:
					"https://www.ulta.com/p/coco-mademoiselle-eau-de-parfum-spray-pimprod2015831?sku=2055113",
			},
			{
				product_id: "c0f84193-3e8c-40ee-a2f6-7c41b70a45b0",
				product_name: "BLEU DE CHANEL Eau de Parfum Spray",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2286831?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "ef32a78d-4930-4757-b31d-399c905fccf7",
				brand_name: "CHANEL",
				product_price: [130, 190],
				sku_id: "2286831",
				avg_rating: 4.9,
				total_reviews: 108,
				page_link:
					"https://www.ulta.com/p/bleu-de-chanel-eau-de-parfum-spray-pimprod2015836?sku=2286831",
			},
			{
				product_id: "e22559ee-9e49-4ff3-aec6-9088a4239858",
				product_name: "CHANCE EAU TENDRE Eau de Parfum Spray",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2539926?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "6a6796c0-d610-4a95-9512-7c8ce231d686",
				brand_name: "CHANEL",
				product_price: [138, 172],
				sku_id: "2539926",
				avg_rating: 4.4,
				total_reviews: 257,
				page_link:
					"https://www.ulta.com/p/chance-eau-tendre-eau-de-parfum-spray-pimprod2015977?sku=2539926",
			},
			{
				product_id: "bcf9cc3b-391a-465a-9518-92f7f83ecf74",
				product_name:
					"LE ROUGE DUO ULTRA TENUE Ultrawear Liquid Lip Colour",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2532593?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "5a76cc6e-ce7d-4c11-b8e0-4e4f0d88051c",
				brand_name: "CHANEL",
				product_price: [48],
				sku_id: "2532593",
				avg_rating: 4.6,
				total_reviews: 103,
				page_link:
					"https://www.ulta.com/p/le-rouge-duo-ultra-tenue-ultrawear-liquid-lip-colour-pimprod2029989?sku=2532593",
			},
			{
				product_id: "2c007219-09ef-4766-8483-cdeb23b36e47",
				product_name: "CHANCE EAU TENDRE Eau de Toilette Spray",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2217136?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "5fb34ecd-996c-484f-87b9-88b3fc01f86d",
				brand_name: "CHANEL",
				product_price: [113, 145],
				sku_id: "2217136",
				avg_rating: 4.8,
				total_reviews: 117,
				page_link:
					"https://www.ulta.com/p/chance-eau-tendre-eau-de-toilette-spray-pimprod2015950?sku=2217136",
			},
			{
				product_id: "db1fb3ce-7ff0-467f-a5fc-3c04ffd56c8f",
				product_name: "CHANCE EAU FRAÎCHE Eau de Parfum Spray",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "23849b2f-511e-4626-b1d5-e9b2fca5e4dd",
				brand_name: "CHANEL",
				product_price: [138, 172],
				sku_id: "2613585",
				avg_rating: 4.6,
				total_reviews: 24,
				page_link:
					"https://www.ulta.com/p/chance-eau-fraiche-eau-de-parfum-spray-pimprod2040508?sku=2613585",
			},
			{
				product_id: "254f4c5e-dc5d-49a7-bb4f-489027c8c8be",
				product_name: "N°1 DE CHANEL Lip and Cheek Balm",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "73dc36ba-89cb-4084-8782-46ff6cbb8d07",
				brand_name: "CHANEL",
				product_price: [48],
				sku_id: "2589667",
				avg_rating: 4.4,
				total_reviews: 56,
				page_link:
					"https://www.ulta.com/p/n1-de-chanel-lip-cheek-balm-pimprod2029892?sku=2589667",
			},
			{
				product_id: "74e731a6-a082-4d4e-8412-4e807dd0ca26",
				product_name:
					"ULTRA LE TEINT Ultrawear All-Day Comfort Flawless Finish Foundation",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "ba74787b-245e-497b-8a2e-c797fff911ef",
				brand_name: "CHANEL",
				product_price: [65],
				sku_id: "2585223",
				avg_rating: 4.6,
				total_reviews: 135,
				page_link:
					"https://www.ulta.com/p/ultra-le-teint-ultrawear-all-day-comfort-flawless-finish-foundation-pimprod2030114?sku=2585223",
			},
			{
				product_id: "e9b91f41-abca-4ded-8ad4-586f5be1dd20",
				product_name: "COCO MADEMOISELLE Eau de Parfum Intense Spray",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "64fb33c1-8c46-48e3-9c4f-8f7b265d673a",
				brand_name: "CHANEL",
				product_price: [142, 177],
				sku_id: "2523367",
				avg_rating: 4.5,
				total_reviews: 136,
				page_link:
					"https://www.ulta.com/p/coco-mademoiselle-eau-de-parfum-intense-spray-pimprod2015973?sku=2523367",
			},
			{
				product_id: "ffb02d34-cfbb-4f05-9ed5-3891b7f932b3",
				product_name: "LES BEIGES Water-Fresh Tint",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "5a2386ec-0268-4aaa-9a67-b65ff1ed542b",
				brand_name: "CHANEL",
				product_price: [70],
				sku_id: "2574253",
				avg_rating: 4.3,
				total_reviews: 92,
				page_link:
					"https://www.ulta.com/p/les-beiges-water-fresh-tint-pimprod2030055?sku=2574253",
			},
			{
				product_id: "f636ae0b-d619-485f-a98a-b48f9863e8d2",
				product_name: "LES BEIGES Healthy Glow Bronzing Cream",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "7394ac5a-bdb5-41a7-9ca3-98f6f96c36ab",
				brand_name: "CHANEL",
				product_price: [60],
				sku_id: "2570348",
				avg_rating: 4.3,
				total_reviews: 101,
				page_link:
					"https://www.ulta.com/p/les-beiges-healthy-glow-bronzing-cream-pimprod2030015?sku=2570348",
			},
			{
				product_id: "03a63815-64b1-4d7f-9771-b90f54c3963d",
				product_name:
					"VITALUMIÈRE AQUA Ultra-Light Skin Perfecting Sunscreen Makeup Broad Spectrum SPF 15",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "bee23bd0-0243-4feb-95cb-fee2938bb4a7",
				brand_name: "CHANEL",
				product_price: [55],
				sku_id: "2528581",
				avg_rating: 4.5,
				total_reviews: 55,
				page_link:
					"https://www.ulta.com/p/vitalumiere-aqua-ultra-light-skin-perfecting-sunscreen-makeup-broad-spectrum-spf-15-pimprod2030103?sku=2528581",
			},
			{
				product_id: "866dda0b-cea3-4b90-bb0f-be5ca4cb0714",
				product_name:
					"POUDRE UNIVERSELLE LIBRE Natural Finish Loose Powder",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "2ecc9b18-11c3-4546-bf20-0c898ec0c3d9",
				brand_name: "CHANEL",
				product_price: [56],
				sku_id: "2570461",
				avg_rating: 4.7,
				total_reviews: 50,
				page_link:
					"https://www.ulta.com/p/poudre-universelle-libre-natural-finish-loose-powder-pimprod2030095?sku=2570461",
			},
			{
				product_id: "48d016e1-4873-456b-ad32-3cef2eacf4f1",
				product_name: "BLEU DE CHANEL Eau de Toilette Spray",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "4b03323e-fee0-41c0-96fb-3205ca640533",
				brand_name: "CHANEL",
				product_price: [110, 165],
				sku_id: "2227849",
				avg_rating: 4.8,
				total_reviews: 39,
				page_link:
					"https://www.ulta.com/p/bleu-de-chanel-eau-de-toilette-spray-pimprod2015947?sku=2227849",
			},
			{
				product_id: "44bdf397-5864-4cd1-a74f-7e70c29bfb8b",
				product_name: "N°5 Eau de Parfum Spray",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "fe14ccce-1c66-4ac0-a6ec-c96c169cd369",
				brand_name: "CHANEL",
				product_price: [108, 172],
				sku_id: "2269167",
				avg_rating: 4.2,
				total_reviews: 131,
				page_link:
					"https://www.ulta.com/p/n5-eau-de-parfum-spray-pimprod2015864?sku=2269167",
			},
			{
				product_id: "cbe27335-1268-47ee-9fb8-bd2465a82b85",
				product_name:
					"LES BEIGES Healthy Glow Foundation Hydration and Longwear",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "9b74663d-7446-4edf-aa15-3bb85b829d43",
				brand_name: "CHANEL",
				product_price: [65],
				sku_id: "2571508",
				avg_rating: 4.7,
				total_reviews: 97,
				page_link:
					"https://www.ulta.com/p/les-beiges-healthy-glow-foundation-hydration-longwear-pimprod2030080?sku=2571508",
			},
			{
				product_id: "752c9da8-ca6d-4c3c-9786-c62631b01d7d",
				product_name: "CHANCE EAU FRAÎCHE Eau de Toilette Spray",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "8ec99a27-a7f3-4bd6-975b-278a53628f6f",
				brand_name: "CHANEL",
				product_price: [113, 145],
				sku_id: "2305592",
				avg_rating: 4.6,
				total_reviews: 106,
				page_link:
					"https://www.ulta.com/p/chance-eau-fraiche-eau-de-toilette-spray-pimprod2015933?sku=2305592",
			},
			{
				product_id: "23d8b59e-8cb2-4ea2-b4f8-9b57d953668b",
				product_name: "BLEU DE CHANEL Parfum Spray",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "661ba911-06cd-420d-9031-42ccf0a7bfda",
				brand_name: "CHANEL",
				product_price: [160, 193],
				sku_id: "2527085",
				avg_rating: 4.7,
				total_reviews: 14,
				page_link:
					"https://www.ulta.com/p/bleu-de-chanel-parfum-spray-pimprod2015976?sku=2527085",
			},
			{
				product_id: "70ba5ceb-3b71-482a-8c47-53409790be6d",
				product_name: "CHANCE Eau de Parfum Spray",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "04bc9d40-1c20-4f31-9275-8f7c6a6614d2",
				brand_name: "CHANEL",
				product_price: [138, 172],
				sku_id: "2160984",
				avg_rating: 4.5,
				total_reviews: 62,
				page_link:
					"https://www.ulta.com/p/chance-eau-de-parfum-spray-pimprod2015939?sku=2160984",
			},
			{
				product_id: "0da220aa-869f-4ca3-bd52-a32258a630f8",
				product_name: "ROUGE COCO GLOSS Moisturizing Glossimer",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "c5d56cca-246f-4074-80bf-e5f565f4371c",
				brand_name: "CHANEL",
				product_price: [40],
				sku_id: "2528238",
				avg_rating: 4.6,
				total_reviews: 26,
				page_link:
					"https://www.ulta.com/p/rouge-coco-gloss-moisturizing-glossimer-pimprod2030107?sku=2528238",
			},
			{
				product_id: "92c181a6-d16b-418a-8fe3-ed0d786a7c88",
				product_name: "LES BEIGES Water-Fresh Complexion Touch",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "5ae74af2-b852-4b9e-80b8-7b7fde8a574c",
				brand_name: "CHANEL",
				product_price: [70],
				sku_id: "2595874",
				avg_rating: 4.4,
				total_reviews: 33,
				page_link:
					"https://www.ulta.com/p/les-beiges-water-fresh-complexion-touch-pimprod2037597?sku=2595874",
			},
			{
				product_id: "6b2f7ea7-43f8-483b-b7d9-955dde1a34be",
				product_name: "LE VOLUME DE CHANEL Mascara",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "4c6cb113-504e-452b-8897-8b0aae9f0c47",
				brand_name: "CHANEL",
				product_price: [40],
				sku_id: "2528359",
				avg_rating: 4.4,
				total_reviews: 99,
				page_link:
					"https://www.ulta.com/p/le-volume-de-chanel-mascara-pimprod2030035?sku=2528359",
			},
			{
				product_id: "2c0fa1db-5f1b-42a0-a385-b2d4e1c7cfe7",
				product_name: "N°1 DE CHANEL Revitalizing Foundation",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "6121c8d8-910c-4b0a-8c8b-a39eb3dcd770",
				brand_name: "CHANEL",
				product_price: [78],
				sku_id: "2605425",
				avg_rating: 4.4,
				total_reviews: 205,
				page_link:
					"https://www.ulta.com/p/n1-de-chanel-revitalizing-foundation-pimprod2029950?sku=2605425",
			},
			{
				product_id: "41b765ae-dafa-46a4-9b34-e0ad000c074c",
				product_name:
					"ROUGE COCO BAUME Hydrating Beautifying Tinted Lip Balm Buildable Colour",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "c1a4af2a-08cb-455b-9598-488c9884eb95",
				brand_name: "CHANEL",
				product_price: [45],
				sku_id: "2591840",
				avg_rating: 4.2,
				total_reviews: 27,
				page_link:
					"https://www.ulta.com/p/rouge-coco-baume-hydrating-beautifying-tinted-lip-balm-buildable-colour-pimprod2030616?sku=2591840",
			},
			{
				product_id: "bc432110-8998-455e-8ceb-4a650d80fb81",
				product_name: "STYLO YEUX WATERPROOF Long-Lasting Eyeliner",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "eaf11eda-8416-48b5-a1c5-2d76555c0190",
				brand_name: "CHANEL",
				product_price: [35],
				sku_id: "2583033",
				avg_rating: 4,
				total_reviews: 24,
				page_link:
					"https://www.ulta.com/p/stylo-yeux-waterproof-long-lasting-eyeliner-pimprod2030110?sku=2583033",
			},
			{
				product_id: "e9aa25ce-5ab1-40e9-ac4c-d95d3957d03f",
				product_name: "BAUME ESSENTIEL Multi-Use Glow Stick",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "3db95b22-1ec7-43d2-a2e5-9f106eba2c4f",
				brand_name: "CHANEL",
				product_price: [48],
				sku_id: "2568235",
				avg_rating: 4.4,
				total_reviews: 26,
				page_link:
					"https://www.ulta.com/p/baume-essentiel-multi-use-glow-stick-pimprod2029955?sku=2568235",
			},
			{
				product_id: "da8e7beb-5628-4e8a-b63a-7fd5356b6ebe",
				product_name:
					"ROUGE COCO FLASH Hydrating Vibrant Shine Lip Colour",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "15d0eb12-d320-4487-a2fb-dc34c9faeff3",
				brand_name: "CHANEL",
				product_price: [48],
				sku_id: "2542582",
				avg_rating: 4.4,
				total_reviews: 26,
				page_link:
					"https://www.ulta.com/p/rouge-coco-flash-hydrating-vibrant-shine-lip-colour-pimprod2030106?sku=2542582",
			},
			{
				product_id: "42a228f1-f922-40c7-a1dd-1223a8b448e7",
				product_name: "COCO MADEMOISELLE Hair Perfume",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2608168?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "9cff750b-78b3-4a01-a20f-c9cce07b493d",
				brand_name: "CHANEL",
				product_price: [80],
				sku_id: "2608168",
				avg_rating: 4.6,
				total_reviews: 10,
				page_link:
					"https://www.ulta.com/p/coco-mademoiselle-hair-perfume-pimprod2038275?sku=2608168",
			},
			{
				product_id: "148d1d81-bc2b-4873-aa38-d347dce4cc00",
				product_name:
					"COCO MADEMOISELLE L'EAU PRIVÉE Eau Pour la Nuit Spray",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2568059?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "c7afdf2b-e721-4070-97b5-9eb423026ae2",
				brand_name: "CHANEL",
				product_price: [113, 145],
				sku_id: "2568059",
				avg_rating: 4.3,
				total_reviews: 21,
				page_link:
					"https://www.ulta.com/p/coco-mademoiselle-leau-privee-eau-pour-la-nuit-spray-pimprod2020309?sku=2568059",
			},
			{
				product_id: "8e861f26-e21d-44df-95d6-094020387273",
				product_name: "ALLURE HOMME SPORT Eau de Toilette Spray",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2100392?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "26bdb93b-085f-4114-80bb-0cd5f204a6ba",
				brand_name: "CHANEL",
				product_price: [110, 130],
				sku_id: "2100392",
				avg_rating: 4.5,
				total_reviews: 15,
				page_link:
					"https://www.ulta.com/p/allure-homme-sport-eau-de-toilette-spray-pimprod2015930?sku=2100392",
			},
			{
				product_id: "0b6fc7ee-0ecb-4dd6-9d88-790f71eeb89c",
				product_name:
					"CHANCE EAU TENDRE Eau de Toilette Twist And Spray",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2512068?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "57bd2b8f-54bd-4e79-bea7-5ba94a368bcf",
				brand_name: "CHANEL",
				product_price: [120],
				sku_id: "2512068",
				avg_rating: 4.9,
				total_reviews: 22,
				page_link:
					"https://www.ulta.com/p/chance-eau-tendre-eau-de-toilette-twist-spray-pimprod2015974?sku=2512068",
			},
			{
				product_id: "c7f2b5a2-a60f-4848-b044-da9015b3368f",
				product_name:
					"LES BEIGES Healthy Glow Natural Eyeshadow Palette",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2620412?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "28a32303-0850-40f3-af8d-cba727e3376c",
				brand_name: "CHANEL",
				product_price: [72],
				sku_id: "2620412",
				avg_rating: 4.9,
				total_reviews: 8,
				page_link:
					"https://www.ulta.com/p/les-beiges-healthy-glow-natural-eyeshadow-palette-pimprod2039134?sku=2620412",
			},
			{
				product_id: "1651e657-d376-4a6c-a8a1-2d4da8cf09dc",
				product_name: "COCO MADEMOISELLE Eau de Parfum Twist and Spray",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2286826?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "6dff32b9-196e-4e71-b26d-66888ada50a6",
				brand_name: "CHANEL",
				product_price: [140],
				sku_id: "2286826",
				avg_rating: 4.3,
				total_reviews: 31,
				page_link:
					"https://www.ulta.com/p/coco-mademoiselle-eau-de-parfum-twist-spray-pimprod2015965?sku=2286826",
			},
			{
				product_id: "65bd168c-4e76-41ec-a428-0c22911484fe",
				product_name: "LES 4 OMBRES Multi-Effect Quadra Eyeshadow",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2528642?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "b0b10d4c-10fa-4623-ae79-f9079e5a0207",
				brand_name: "CHANEL",
				product_price: [68],
				sku_id: "2528642",
				avg_rating: 3.8,
				total_reviews: 17,
				page_link:
					"https://www.ulta.com/p/les-4-ombres-multi-effect-quadra-eyeshadow-pimprod2030017?sku=2528642",
			},
			{
				product_id: "ee1385b8-c45c-48b6-a237-2c8c87b8e729",
				product_name: "LE CORRECTEUR DE CHANEL Longwear Concealer",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2585123?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "3e3fe8e4-fcba-4fa9-9d0c-5dd2519c7460",
				brand_name: "CHANEL",
				product_price: [45],
				sku_id: "2585123",
				avg_rating: 3.5,
				total_reviews: 28,
				page_link:
					"https://www.ulta.com/p/le-correcteur-de-chanel-longwear-concealer-pimprod2030116?sku=2585123",
			},
			{
				product_id: "e7de7530-a803-4dce-b481-ba361d96f044",
				product_name: "LE CRAYON LÈVRES Longwear Lip Pencil",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2614613?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "1bc5b2c2-07eb-4d75-bd5c-2e52d7ca9fb4",
				brand_name: "CHANEL",
				product_price: [35],
				sku_id: "2614613",
				avg_rating: 3.5,
				total_reviews: 4,
				page_link:
					"https://www.ulta.com/p/le-crayon-levres-longwear-lip-pencil-pimprod2041626?sku=2614613",
			},
			{
				product_id: "464dd932-fdf8-4622-ad72-578b58794c3a",
				product_name: "LES BEIGES Water-Fresh Blush",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2595875?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "b697970c-82fc-40f2-8c2e-697b944c9d6b",
				brand_name: "CHANEL",
				product_price: [52],
				sku_id: "2595875",
				avg_rating: 4.6,
				total_reviews: 23,
				page_link:
					"https://www.ulta.com/p/les-beiges-water-fresh-blush-pimprod2037598?sku=2595875",
			},
			{
				product_id: "d9539a65-7b91-4eb3-bf78-85461095a605",
				product_name: "JOUES CONTRASTE Powder Blush",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2579895?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "6c3b00b6-055d-4bee-b55d-acabba98abe4",
				brand_name: "CHANEL",
				product_price: [52],
				sku_id: "2579895",
				avg_rating: 4.4,
				total_reviews: 29,
				page_link:
					"https://www.ulta.com/p/joues-contraste-powder-blush-pimprod2030016?sku=2579895",
			},
			{
				product_id: "f996fd77-15ec-4666-b3d6-43af7c5da994",
				product_name:
					"ULTRA LE TEINT Ultrawear All-Day Comfort Flawless Finish Compact Foundation",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2568238?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "8a7cef7d-3f11-4bae-ae9e-759bf8aace4a",
				brand_name: "CHANEL",
				product_price: [68],
				sku_id: "2568238",
				avg_rating: 4.4,
				total_reviews: 17,
				page_link:
					"https://www.ulta.com/p/ultra-le-teint-ultrawear-all-day-comfort-flawless-finish-compact-foundation-pimprod2030112?sku=2568238",
			},
			{
				product_id: "e4924909-bc7a-4f9a-99b0-23b598d56c4c",
				product_name: "COCO MADEMOISELLE The Body Oil",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "cb723b66-7513-4455-9726-b3917030cca6",
				brand_name: "CHANEL",
				product_price: [87],
				sku_id: "2601714",
				avg_rating: 4.7,
				total_reviews: 17,
				page_link:
					"https://www.ulta.com/p/coco-mademoiselle-body-oil-pimprod2036247?sku=2601714",
			},
			{
				product_id: "730b55b2-7441-444d-886c-4d5a6846c96e",
				product_name: "LES BEIGES Healthy Glow Powder",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "53cded0a-40c0-44e6-9d16-95864986ec15",
				brand_name: "CHANEL",
				product_price: [60],
				sku_id: "2614607",
				avg_rating: 4.7,
				total_reviews: 6,
				page_link:
					"https://www.ulta.com/p/les-beiges-healthy-glow-powder-pimprod2041625?sku=2614607",
			},
			{
				product_id: "71bc138b-3219-40e4-afe5-7258fc0e5904",
				product_name: "COCO MADEMOISELLE Eau de Toilette Spray",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "baf37755-56f9-4869-9a40-161b154b350f",
				brand_name: "CHANEL",
				product_price: [113, 145],
				sku_id: "2090724",
				avg_rating: 4.6,
				total_reviews: 31,
				page_link:
					"https://www.ulta.com/p/coco-mademoiselle-eau-de-toilette-spray-pimprod2015862?sku=2090724",
			},
			{
				product_id: "dec301ab-9b8d-4d6b-980e-7c43401cfcd3",
				product_name:
					"COCO MADEMOISELLE Eau de Parfum Intense Mini Twist and Spray",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "64dca5e0-0cec-4431-af2b-0e61b30227aa",
				brand_name: "CHANEL",
				product_price: [115],
				sku_id: "2568061",
				avg_rating: 4.6,
				total_reviews: 16,
				page_link:
					"https://www.ulta.com/p/coco-mademoiselle-eau-de-parfum-intense-mini-twist-spray-pimprod2020311?sku=2568061",
			},
			{
				product_id: "fa3bbb2f-5477-4f6b-9086-e28406f39ff5",
				product_name: "GABRIELLE CHANEL ESSENCE Eau de Parfum Spray",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2551549?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "2a66c671-2abd-48f8-b0ba-720f6395f741",
				brand_name: "CHANEL",
				product_price: [138, 172],
				sku_id: "2551549",
				avg_rating: 4.7,
				total_reviews: 41,
				page_link:
					"https://www.ulta.com/p/gabrielle-chanel-essence-eau-de-parfum-spray-pimprod2015978?sku=2551549",
			},
			{
				product_id: "61b0ba09-5a2b-44e9-9b88-70bfd590b664",
				product_name: "CHANCE Eau de Toilette Spray",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2078590?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "0f325234-83c3-4906-8dde-da5f47951f76",
				brand_name: "CHANEL",
				product_price: [113, 145],
				sku_id: "2078590",
				avg_rating: 4.3,
				total_reviews: 26,
				page_link:
					"https://www.ulta.com/p/chance-eau-de-toilette-spray-pimprod2015856?sku=2078590",
			},
			{
				product_id: "d04dd193-084e-441e-9ca8-50a0632607ad",
				product_name: "COCO Eau de Parfum Spray",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2310444?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "6a8f60b1-5f59-4c0c-9e3a-a0b5890da1e5",
				brand_name: "CHANEL",
				product_price: [108],
				sku_id: "2310444",
				avg_rating: 4.5,
				total_reviews: 33,
				page_link:
					"https://www.ulta.com/p/coco-eau-de-parfum-spray-pimprod2015849?sku=2310444",
			},
			{
				product_id: "2da6d96b-385d-4d32-b403-a75d5e189623",
				product_name:
					"ALLURE HOMME SPORT EAU EXTRÊME Eau de Parfum Spray",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2244802?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "d336c411-0540-4027-8379-3c7f3a093691",
				brand_name: "CHANEL",
				product_price: [157],
				sku_id: "2244802",
				avg_rating: 5,
				total_reviews: 5,
				page_link:
					"https://www.ulta.com/p/allure-homme-sport-eau-extreme-eau-de-parfum-spray-pimprod2015955?sku=2244802",
			},
			{
				product_id: "38c4903b-b9f6-4291-ba9b-2cac7efcddd8",
				product_name: "COCO MADEMOISELLE Moisturizing Body Lotion",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2068454?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "8b3efc1f-e830-4fdb-879d-b1e2cf3e9d31",
				brand_name: "CHANEL",
				product_price: [70],
				sku_id: "2068454",
				avg_rating: 4.8,
				total_reviews: 26,
				page_link:
					"https://www.ulta.com/p/coco-mademoiselle-moisturizing-body-lotion-pimprod2015916?sku=2068454",
			},
			{
				product_id: "2c709a07-dc26-4020-acdc-15af74684187",
				product_name: "LE LIFT CRÈME Smooths - Firms - Illuminates",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2560172?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "288c1aa7-372f-48e7-8053-b982a90688db",
				brand_name: "CHANEL",
				product_price: [170],
				sku_id: "2560172",
				avg_rating: 5,
				total_reviews: 4,
				page_link:
					"https://www.ulta.com/p/le-lift-creme-smooths-firms-illuminates-pimprod2029952?sku=2560172",
			},
			{
				product_id: "14e6e352-3602-45fa-b2f3-4e62bd857e6a",
				product_name: "ROUGE ALLURE VELVET Luminous Matte Lip Colour",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2605449?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "f57aa06c-212d-4c08-9399-8cd87c186d99",
				brand_name: "CHANEL",
				product_price: [48],
				sku_id: "2605449",
				avg_rating: 4.5,
				total_reviews: 10,
				page_link:
					"https://www.ulta.com/p/rouge-allure-velvet-luminous-matte-lip-colour-pimprod2030102?sku=2605449",
			},
			{
				product_id: "6d0b075d-bd1e-4833-b0a9-4f932db724bb",
				product_name: "N°5 Eau de Toilette Spray",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2093301?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "5cb5e7ab-8d26-4913-b082-6cd0ebd1e8e0",
				brand_name: "CHANEL",
				product_price: [113, 145],
				sku_id: "2093301",
				avg_rating: 4.5,
				total_reviews: 15,
				page_link:
					"https://www.ulta.com/p/n5-eau-de-toilette-spray-pimprod2015922?sku=2093301",
			},
			{
				product_id: "38d322ec-bf1b-40f7-adc6-bbd179e158cb",
				product_name: "N°1 DE CHANEL Revitalizing Serum",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2589598?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "d75e06d3-6c26-466f-9df0-f1f778e6274e",
				brand_name: "CHANEL",
				product_price: [125, 165],
				sku_id: "2589598",
				avg_rating: 4.1,
				total_reviews: 54,
				page_link:
					"https://www.ulta.com/p/n1-de-chanel-revitalizing-serum-pimprod2029891?sku=2589598",
			},
			{
				product_id: "c1262c49-3d17-4726-8a9e-4f3409f97f85",
				product_name: "GABRIELLE CHANEL Eau de Parfum Spray",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2516493?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "826b0d00-7e2a-4b9f-b0f4-be5ae862629a",
				brand_name: "CHANEL",
				product_price: [138, 172],
				sku_id: "2516493",
				avg_rating: 4,
				total_reviews: 26,
				page_link:
					"https://www.ulta.com/p/gabrielle-chanel-eau-de-parfum-spray-pimprod2015972?sku=2516493",
			},
			{
				product_id: "e3285af9-7b84-47ef-9c1e-bb48175baad9",
				product_name:
					"COCO MADEMOISELLE Eau de Parfum Twist and Spray Set",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2537531?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "08c7e80e-ff24-4473-b263-355a085aefc3",
				brand_name: "CHANEL",
				product_price: [219],
				sku_id: "2537531",
				avg_rating: 5,
				total_reviews: 4,
				page_link:
					"https://www.ulta.com/p/coco-mademoiselle-eau-de-parfum-twist-spray-set-pimprod2023521?sku=2537531",
			},
			{
				product_id: "605050f4-4353-4536-a023-7f502271b167",
				product_name:
					"LA MOUSSE Anti-Pollution Cleansing Cream-to-Foam",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2531903?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "7dde709c-964a-4472-811a-6c1c3f4b7558",
				brand_name: "CHANEL",
				product_price: [58],
				sku_id: "2531903",
				avg_rating: 4.4,
				total_reviews: 23,
				page_link:
					"https://www.ulta.com/p/la-mousse-anti-pollution-cleansing-cream-foam-pimprod2029954?sku=2531903",
			},
			{
				product_id: "2d349792-e34c-4bee-8869-c6c17c0bf6c4",
				product_name:
					"STYLO SOURCILS WATERPROOF Defining Longwear Eyebrow Pencil",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "6f3cf8ab-683e-4716-83ff-e41c13af1aa1",
				brand_name: "CHANEL",
				product_price: [42],
				sku_id: "2528567",
				avg_rating: 4.4,
				total_reviews: 11,
				page_link:
					"https://www.ulta.com/p/stylo-sourcils-waterproof-defining-longwear-eyebrow-pencil-pimprod2030109?sku=2528567",
			},
			{
				product_id: "2da31a89-9f11-4d6e-95a2-c5c0c62e2f11",
				product_name: "STYLO OMBRE ET CONTOUR Eyeshadow - Liner - Khôl",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "6eeb74ac-37c3-4eef-bcc7-c0808ec0a686",
				brand_name: "CHANEL",
				product_price: [38],
				sku_id: "2532574",
				avg_rating: 4.1,
				total_reviews: 13,
				page_link:
					"https://www.ulta.com/p/stylo-ombre-et-contour-eyeshadow-liner-khol-pimprod2030108?sku=2532574",
			},
			{
				product_id: "9182dc85-6809-4de7-9f4e-d12230c9fed3",
				product_name:
					"N°1 DE CHANEL SKIN ENHANCER Boosts Radiance - Evens - Perfects",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "f0d8a105-3edc-4075-a95c-a926c8bdee01",
				brand_name: "CHANEL",
				product_price: [65],
				sku_id: "2611609",
				avg_rating: 4.3,
				total_reviews: 13,
				page_link:
					"https://www.ulta.com/p/n1-de-chanel-skin-enhancer-boosts-radiance-evens-perfects-pimprod2040497?sku=2611609",
			},
			{
				product_id: "fed71639-1864-462c-bf7b-b784068b40fe",
				product_name: "ALLURE Eau de Toilette Spray",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "979b18b4-300d-4683-817c-db0ab10964d4",
				brand_name: "CHANEL",
				product_price: [113, 145],
				sku_id: "2016000",
				avg_rating: 4.7,
				total_reviews: 12,
				page_link:
					"https://www.ulta.com/p/allure-eau-de-toilette-spray-pimprod2015852?sku=2016000",
			},
			{
				product_id: "e36dbe53-2a58-4c8f-b9ca-8d0b443bd453",
				product_name:
					"DÉMAQUILLANT YEUX INTENSE Gentle Bi-Phase Eye Makeup Remover",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2607864?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "22483919-a88f-4601-8b73-ae1e7382e490",
				brand_name: "CHANEL",
				product_price: [40],
				sku_id: "2607864",
				avg_rating: 3.7,
				total_reviews: 6,
				page_link:
					"https://www.ulta.com/p/demaquillant-yeux-intense-gentle-bi-phase-eye-makeup-remover-pimprod2039952?sku=2607864",
			},
			{
				product_id: "5e950f4f-ae0d-4ea4-803f-1854c86a5bee",
				product_name: "LA BASE ILLUMINATRICE Glowing Makeup Primer",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2614632?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "11361542-54ec-4f66-80ab-d67333752eee",
				brand_name: "CHANEL",
				product_price: [54],
				sku_id: "2614632",
				avg_rating: 5,
				total_reviews: 1,
				page_link:
					"https://www.ulta.com/p/la-base-illuminatrice-glowing-makeup-primer-pimprod2041623?sku=2614632",
			},
			{
				product_id: "0ae1cf73-af36-41a8-8cb3-8970c0d0318a",
				product_name: "LA BASE MASCARA Volume and Care Lash Primer",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2614633?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "b04bb26a-124b-49df-97ae-0547b43e165a",
				brand_name: "CHANEL",
				product_price: [40],
				sku_id: "2614633",
				avg_rating: 5,
				total_reviews: 2,
				page_link:
					"https://www.ulta.com/p/la-base-mascara-volume-care-lash-primer-pimprod2041621?sku=2614633",
			},
			{
				product_id: "0d67da6c-0342-49ea-819d-d65bb1f534bd",
				product_name: "PLATINUM ÉGOÏSTE Eau de Toilette Spray",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2023655?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "138b2f0b-180b-41c9-a3a1-2807f80b837f",
				brand_name: "CHANEL",
				product_price: [130],
				sku_id: "2023655",
				avg_rating: 4.6,
				total_reviews: 7,
				page_link:
					"https://www.ulta.com/p/platinum-egoiste-eau-de-toilette-spray-pimprod2015910?sku=2023655",
			},
			{
				product_id: "f6e5bbe1-f766-4a1e-bff2-cf53e5fefdc9",
				product_name: "CHANCE EAU VIVE Eau de Toilette Spray",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2293050?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "16eff55c-ac38-43db-bcd6-415a9070050e",
				brand_name: "CHANEL",
				product_price: [145],
				sku_id: "2293050",
				avg_rating: 4.5,
				total_reviews: 13,
				page_link:
					"https://www.ulta.com/p/chance-eau-vive-eau-de-toilette-spray-pimprod2015967?sku=2293050",
			},
			{
				product_id: "23599ad9-5f6a-4d1c-b58a-31e59129b4b1",
				product_name:
					"HYDRA BEAUTY MICRO CRÈME Fortifying Replenishing Hydration",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2528711?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "f803f5ba-4d15-4126-bd0e-4798b94d50ff",
				brand_name: "CHANEL",
				product_price: [100],
				sku_id: "2528711",
				avg_rating: 4.4,
				total_reviews: 12,
				page_link:
					"https://www.ulta.com/p/hydra-beauty-micro-creme-fortifying-replenishing-hydration-pimprod2029965?sku=2528711",
			},
			{
				product_id: "e959d0e2-fd4a-4a09-b3ac-b186fffbb60e",
				product_name: "LE VOLUME DE CHANEL WATERPROOF Mascara",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2528390?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "b0d7fed5-6341-4e83-a7e3-6ae961412c94",
				brand_name: "CHANEL",
				product_price: [40],
				sku_id: "2528390",
				avg_rating: 3.9,
				total_reviews: 24,
				page_link:
					"https://www.ulta.com/p/le-volume-de-chanel-waterproof-mascara-pimprod2030037?sku=2528390",
			},
			{
				product_id: "ac53fac2-78d1-41f5-b165-d9fb893d0a81",
				product_name: "CHANCE Perfumed Hand Creams",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2620210?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "a41ef964-250f-42a4-8d61-2c645b77866a",
				brand_name: "CHANEL",
				product_price: [80],
				sku_id: "2620210",
				avg_rating: 5,
				total_reviews: 1,
				page_link:
					"https://www.ulta.com/p/chance-perfumed-hand-creams-pimprod2042848?sku=2620210",
			},
			{
				product_id: "2e3a7b01-4175-40f3-9c2c-3cf0811d8eb8",
				product_name: "N°5 L'EAU Eau de Toilette Spray",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2309093?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "7b44a91b-9d6d-49d1-adda-5b83621a51d2",
				brand_name: "CHANEL",
				product_price: [172],
				sku_id: "2309093",
				avg_rating: 4.1,
				total_reviews: 21,
				page_link:
					"https://www.ulta.com/p/n5-leau-eau-de-toilette-spray-pimprod2015925?sku=2309093",
			},
			{
				product_id: "0c57d984-8135-43eb-8843-abcede183144",
				product_name:
					"HYDRA BEAUTY CAMELLIA WATER CREAM Illuminating Hydrating Fluid",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2544825?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "88c2ba0b-caad-427d-93ee-05bd7a5786b8",
				brand_name: "CHANEL",
				product_price: [64],
				sku_id: "2544825",
				avg_rating: 4.5,
				total_reviews: 15,
				page_link:
					"https://www.ulta.com/p/hydra-beauty-camellia-water-cream-illuminating-hydrating-fluid-pimprod2029968?sku=2544825",
			},
			{
				product_id: "7ee9fdc8-33cc-4245-942e-2affd2b0f3b3",
				product_name: "ROUGE ALLURE Luminous Intense Lip Colour",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2607861?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "315f4fa3-5374-4f8b-831e-526c09e7efac",
				brand_name: "CHANEL",
				product_price: [48],
				sku_id: "2607861",
				avg_rating: 4.5,
				total_reviews: 8,
				page_link:
					"https://www.ulta.com/p/rouge-allure-luminous-intense-lip-colour-pimprod2030096?sku=2607861",
			},
			{
				product_id: "8aed5816-59b3-4011-8893-e05bb44dabf8",
				product_name: "LE LIFT CRÈME YEUX Smooths - Firms",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2560173?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "a3d9d244-1744-486d-9530-283211564f84",
				brand_name: "CHANEL",
				product_price: [110],
				sku_id: "2560173",
				avg_rating: 4.3,
				total_reviews: 11,
				page_link:
					"https://www.ulta.com/p/le-lift-creme-yeux-smooths-firms-pimprod2030003?sku=2560173",
			},
			{
				product_id: "a0cd2952-ad87-4ea7-8aa1-7000dbeb1ff6",
				product_name: "LES BEIGES Healthy Glow Lip Balm",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2531239?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "1bd7f1ef-c3b7-46d0-95fe-cd08e5e29e4a",
				brand_name: "CHANEL",
				product_price: [38],
				sku_id: "2531239",
				avg_rating: 4.3,
				total_reviews: 22,
				page_link:
					"https://www.ulta.com/p/les-beiges-healthy-glow-lip-balm-pimprod2030091?sku=2531239",
			},
			{
				product_id: "aff61c73-993f-4022-9565-79b67668baf0",
				product_name: "N°1 DE CHANEL Revitalizing Cream",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2589593?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "01a139a6-446c-456e-a1a4-d2b066a7fab2",
				brand_name: "CHANEL",
				product_price: [105, 120],
				sku_id: "2589593",
				avg_rating: 4.5,
				total_reviews: 30,
				page_link:
					"https://www.ulta.com/p/n1-de-chanel-revitalizing-cream-pimprod2029886?sku=2589593",
			},
			{
				product_id: "200127b6-d1dd-4925-8641-3424180c8f54",
				product_name: "L'HUILE CAMÉLIA Hydrating and Fortifying Oil",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2620418?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "4548c360-d911-4c06-8d09-14ab1d82f102",
				brand_name: "CHANEL",
				product_price: [32],
				sku_id: "2620418",
				avg_rating: 5,
				total_reviews: 1,
				page_link:
					"https://www.ulta.com/p/lhuile-camelia-hydrating-fortifying-oil-pimprod2043383?sku=2620418",
			},
			{
				product_id: "2274f425-0106-49df-aeef-c7f0d5d6a7b9",
				product_name:
					"ROUGE COCO BLOOM Hydrating Plumping Intense Shine Lip Colour",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2580147?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "caed6903-0d45-4eca-a748-fc4868c7da8a",
				brand_name: "CHANEL",
				product_price: [48],
				sku_id: "2580147",
				avg_rating: 4.1,
				total_reviews: 13,
				page_link:
					"https://www.ulta.com/p/rouge-coco-bloom-hydrating-plumping-intense-shine-lip-colour-pimprod2030105?sku=2580147",
			},
			{
				product_id: "fa6713e8-1694-4f49-8b10-a3f665b20e70",
				product_name: "COCO Eau de Toilette Spray",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "f51a9f26-e2dc-4b12-95c2-7bfe8ad27ab6",
				brand_name: "CHANEL",
				product_price: [113, 145],
				sku_id: "2012609",
				avg_rating: 4.4,
				total_reviews: 9,
				page_link:
					"https://www.ulta.com/p/coco-eau-de-toilette-spray-pimprod2015907?sku=2012609",
			},
			{
				product_id: "e232ac43-ef31-437e-895d-50a4f2d23f24",
				product_name: "COCO MADEMOISELLE Gentle Perfumed Soap",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "1bdf2f6f-4b1b-4c41-8395-dd5cbe6786be",
				brand_name: "CHANEL",
				product_price: [35],
				sku_id: "2617206",
				avg_rating: 0,
				total_reviews: 0,
				page_link:
					"https://www.ulta.com/p/coco-mademoiselle-gentle-perfumed-soap-pimprod2042025?sku=2617206",
			},
			{
				product_id: "efc6fa12-7440-47f3-b96a-ce38c17f27e9",
				product_name:
					"HYDRA BEAUTY MICRO SÉRUM Intense Replenishing Hydration",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "c2471cf5-d3ad-46cc-bc02-581029a42ef8",
				brand_name: "CHANEL",
				product_price: [110],
				sku_id: "2528709",
				avg_rating: 4.1,
				total_reviews: 19,
				page_link:
					"https://www.ulta.com/p/hydra-beauty-micro-serum-intense-replenishing-hydration-pimprod2029966?sku=2528709",
			},
			{
				product_id: "b4cd4cbe-41d3-4d37-bd51-7ff9cf5e8cc4",
				product_name: "N°1 DE CHANEL Revitalizing Eye Cream",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "8f7d77be-0790-44c2-9eeb-dc04d097e3f5",
				brand_name: "CHANEL",
				product_price: [80],
				sku_id: "2589594",
				avg_rating: 4.7,
				total_reviews: 20,
				page_link:
					"https://www.ulta.com/p/n1-de-chanel-revitalizing-eye-cream-pimprod2029888?sku=2589594",
			},
			{
				product_id: "2c3881a1-add5-438f-b6ae-3dd722e09416",
				product_name: "N°5 EAU PREMIÈRE Eau de Parfum Spray",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2273197?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "4c7a3c21-79de-475b-bcfc-76dc922c54a3",
				brand_name: "CHANEL",
				product_price: [172],
				sku_id: "2273197",
				avg_rating: 4.4,
				total_reviews: 16,
				page_link:
					"https://www.ulta.com/p/n5-eau-premiere-eau-de-parfum-spray-pimprod2015938?sku=2273197",
			},
			{
				product_id: "859cd94d-2190-4abb-b146-1cc75db99978",
				product_name:
					"UV ESSENTIEL Complete UV Protection Sunscreen Antioxidant Broad Spectrum SPF 50",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2611400?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "8b13e865-e7ac-43a1-9836-efe4dbb74fc5",
				brand_name: "CHANEL",
				product_price: [60],
				sku_id: "2611400",
				avg_rating: 5,
				total_reviews: 2,
				page_link:
					"https://www.ulta.com/p/uv-essentiel-complete-uv-protection-sunscreen-antioxidant-broad-spectrum-spf-50-pimprod2039894?sku=2611400",
			},
			{
				product_id: "9d84bce0-9a91-4b6b-8544-752a8038ca46",
				product_name: "BLEU DE CHANEL After Shave Lotion",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2570357?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "28c94f37-bfcc-4259-882b-b427a463fcd5",
				brand_name: "CHANEL",
				product_price: [75],
				sku_id: "2570357",
				avg_rating: 5,
				total_reviews: 3,
				page_link:
					"https://www.ulta.com/p/bleu-de-chanel-after-shave-lotion-pimprod2020315?sku=2570357",
			},
			{
				product_id: "35001d79-416e-4725-819d-ae2320df217a",
				product_name:
					"LES BEIGES Sheer Healthy Glow Highlighting Fluid",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2570350?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "31a68988-ad7e-4846-b935-3d3df3f51577",
				brand_name: "CHANEL",
				product_price: [54],
				sku_id: "2570350",
				avg_rating: 4.2,
				total_reviews: 15,
				page_link:
					"https://www.ulta.com/p/les-beiges-sheer-healthy-glow-highlighting-fluid-pimprod2030092?sku=2570350",
			},
			{
				product_id: "c378dcfd-10ee-44cf-9ff8-d69daae15498",
				product_name: "ALLURE HOMME Eau de Toilette Spray",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2024344?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "074332dd-6112-4671-b5f0-c991441b65b8",
				brand_name: "CHANEL",
				product_price: [130],
				sku_id: "2024344",
				avg_rating: 5,
				total_reviews: 5,
				page_link:
					"https://www.ulta.com/p/allure-homme-eau-de-toilette-spray-pimprod2015911?sku=2024344",
			},
			{
				product_id: "621adc01-8639-4f1a-8543-ac0bf3147bdd",
				product_name:
					"ROUGE COCO BAUME Hydrating Conditioning Lip Balm",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2528519?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "1f3d7b15-d687-4aa9-99f5-21340738327b",
				brand_name: "CHANEL",
				product_price: [45],
				sku_id: "2528519",
				avg_rating: 4.2,
				total_reviews: 11,
				page_link:
					"https://www.ulta.com/p/rouge-coco-baume-hydrating-conditioning-lip-balm-pimprod2030101?sku=2528519",
			},
			{
				product_id: "a1a160c6-0102-4dc8-8f86-fab807be76b3",
				product_name: "LE VERNIS Longwear Nail Colour",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2611597?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "10f0043f-7234-4346-b270-f3fce97edadd",
				brand_name: "CHANEL",
				product_price: [32],
				sku_id: "2611597",
				avg_rating: 3.1,
				total_reviews: 7,
				page_link:
					"https://www.ulta.com/p/le-vernis-longwear-nail-colour-pimprod2039949?sku=2611597",
			},
			{
				product_id: "31a19955-6228-452b-80c8-56272fc71e58",
				product_name: "N°1 DE CHANEL L'Eau Rouge",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2591418?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "5216240c-2e6d-49e7-a7d6-8f0ca48856a4",
				brand_name: "CHANEL",
				product_price: [130],
				sku_id: "2591418",
				avg_rating: 3.8,
				total_reviews: 44,
				page_link:
					"https://www.ulta.com/p/n1-de-chanel-leau-rouge-pimprod2029946?sku=2591418",
			},
			{
				product_id: "263eff6e-747f-4d90-b458-e7a8b99b7974",
				product_name: "N°5 The Body Oil",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "ed542c1c-df78-4e6d-8e6b-db49e8733454",
				brand_name: "CHANEL",
				product_price: [125],
				sku_id: "2617205",
				avg_rating: 3.7,
				total_reviews: 3,
				page_link:
					"https://www.ulta.com/p/n5-body-oil-pimprod2042026?sku=2617205",
			},
			{
				product_id: "821f3836-0f12-4365-859f-eea5c0629287",
				product_name:
					"LE CORRECTEUR DE CHANEL Longwear Colour Corrector",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "565689e3-2089-4fc0-bddd-c0a355f67265",
				brand_name: "CHANEL",
				product_price: [45],
				sku_id: "2585212",
				avg_rating: 4,
				total_reviews: 7,
				page_link:
					"https://www.ulta.com/p/le-correcteur-de-chanel-longwear-colour-corrector-pimprod2030115?sku=2585212",
			},
			{
				product_id: "91853330-514f-4e8c-9e29-148c7f58b465",
				product_name:
					"HYDRA BEAUTY MICRO CRÈME YEUX Illuminating Hydrating Eye Cream",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "4db8d46d-a1f7-449b-b920-0b0392e04d55",
				brand_name: "CHANEL",
				product_price: [70],
				sku_id: "2611399",
				avg_rating: 5,
				total_reviews: 2,
				page_link:
					"https://www.ulta.com/p/hydra-beauty-micro-creme-yeux-illuminating-hydrating-eye-cream-pimprod2039690?sku=2611399",
			},
			{
				product_id: "dc6394de-e347-4011-a2c7-44ec24e5864e",
				product_name: "N°1 DE CHANEL Revitalizing Rich Cream",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "d3a94777-5e69-480d-96bb-7e4bf1ed5a9b",
				brand_name: "CHANEL",
				product_price: [105, 120],
				sku_id: "2605435",
				avg_rating: 4.3,
				total_reviews: 6,
				page_link:
					"https://www.ulta.com/p/n1-de-chanel-revitalizing-rich-cream-pimprod2037763?sku=2605435",
			},
			{
				product_id: "f1418e55-75e1-4f6b-9afb-47a551f27c34",
				product_name:
					"ROUGE ALLURE L'EXTRAIT High-Intensity Colour Concentrated Radiance and Care Refillable",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "67e83c1c-8b23-4c48-a943-b8abc13c9a5f",
				brand_name: "CHANEL",
				product_price: [56],
				sku_id: "2595901",
				avg_rating: 5,
				total_reviews: 3,
				page_link:
					"https://www.ulta.com/p/rouge-allure-lextrait-high-intensity-colour-concentrated-radiance-care-refillable-pimprod2033974?sku=2595901",
			},
			{
				product_id: "c9cb4f2a-44f2-49bb-a252-693fb5488be4",
				product_name: "LE LIFT SÉRUM Smooths - Firms",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "7f2ad1ef-ce53-4cb2-8ce5-bf6531b10f9c",
				brand_name: "CHANEL",
				product_price: [180],
				sku_id: "2550606",
				avg_rating: 4.2,
				total_reviews: 10,
				page_link:
					"https://www.ulta.com/p/le-lift-serum-smooths-firms-pimprod2029988?sku=2550606",
			},
			{
				product_id: "e92e209c-2dbd-4e81-8500-0a70bf791283",
				product_name:
					"INIMITABLE INTENSE Mascara Multi-Dimensionnel Sophistiqué",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "a5b72d12-d2e2-4e84-a7b9-217ecd0962f3",
				brand_name: "CHANEL",
				product_price: [40],
				sku_id: "2528319",
				avg_rating: 3.6,
				total_reviews: 8,
				page_link:
					"https://www.ulta.com/p/inimitable-intense-mascara-multi-dimensionnel-sophistique-pimprod2029970?sku=2528319",
			},
			{
				product_id: "a6fa661d-a5b9-41d2-810f-337796d183a9",
				product_name: "LE TONIQUE Anti-Pollution Invigorating Toner",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "7303c045-0cb8-4651-abf1-7a6a6b3fe9a8",
				brand_name: "CHANEL",
				product_price: [52],
				sku_id: "2531905",
				avg_rating: 5,
				total_reviews: 4,
				page_link:
					"https://www.ulta.com/p/le-tonique-anti-pollution-invigorating-toner-pimprod2030002?sku=2531905",
			},
			{
				product_id: "0c594229-4620-4821-8692-293008eff79c",
				product_name: "LA BASE MATIFIANTE Perfecting Makeup Primer",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "c352e96b-dfdb-405c-a532-ee912930d6ba",
				brand_name: "CHANEL",
				product_price: [54],
				sku_id: "2614631",
				avg_rating: 0,
				total_reviews: 0,
				page_link:
					"https://www.ulta.com/p/la-base-matifiante-perfecting-makeup-primer-pimprod2041624?sku=2614631",
			},
			{
				product_id: "1d9ef1a4-64b6-4660-a338-39a782f3d0b0",
				product_name: "BLEU DE CHANEL Eau de Toilette Twist and Spray",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "d819d367-c1cb-448e-b5c3-db502efa6c78",
				brand_name: "CHANEL",
				product_price: [115],
				sku_id: "2249935",
				avg_rating: 5,
				total_reviews: 2,
				page_link:
					"https://www.ulta.com/p/bleu-de-chanel-eau-de-toilette-twist-spray-pimprod2015962?sku=2249935",
			},
			{
				product_id: "660238ea-98ae-42cb-9528-1d2b25593b7d",
				product_name: "OMBRE PREMIÈRE LAQUE Longwear Liquid Eyeshadow",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "746dfae4-2921-4bdd-ab64-c28a066998a6",
				brand_name: "CHANEL",
				product_price: [38],
				sku_id: "2564543",
				avg_rating: 3.9,
				total_reviews: 13,
				page_link:
					"https://www.ulta.com/p/ombre-premiere-laque-longwear-liquid-eyeshadow-pimprod2030093?sku=2564543",
			},
			{
				product_id: "dd5f2b5a-8c7c-4406-a7f7-8b7829a9d683",
				product_name: "COCO Eau de Parfum Refillable Spray",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "1ad06b25-57a4-4621-8ded-4c6817bd59e6",
				brand_name: "CHANEL",
				product_price: [131],
				sku_id: "2019069",
				avg_rating: 5,
				total_reviews: 8,
				page_link:
					"https://www.ulta.com/p/coco-eau-de-parfum-refillable-spray-pimprod2015850?sku=2019069",
			},
			{
				product_id: "e233b137-cf94-4641-af09-335aeb2d3a86",
				product_name: "N°1 DE CHANEL Serum-in-Mist",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "d58bd850-bb06-4e7f-88d6-279c0a9592a3",
				brand_name: "CHANEL",
				product_price: [100],
				sku_id: "2589595",
				avg_rating: 4.7,
				total_reviews: 19,
				page_link:
					"https://www.ulta.com/p/n1-de-chanel-serum-in-mist-pimprod2029939?sku=2589595",
			},
			{
				product_id: "c11735c4-c02a-4c37-8b5e-80f834692253",
				product_name:
					"GABRIELLE CHANEL ESSENCE Eau de Parfum Twist and Spray",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "c470f1f1-a76a-4836-9e0f-310d0a2c13d4",
				brand_name: "CHANEL",
				product_price: [140],
				sku_id: "2602267",
				avg_rating: 0,
				total_reviews: 0,
				page_link:
					"https://www.ulta.com/p/gabrielle-chanel-essence-eau-de-parfum-twist-spray-pimprod2034516?sku=2602267",
			},
			{
				product_id: "a3b9f910-29d3-4225-a9ea-162face11890",
				product_name: "HYDRA BEAUTY Nourishing Lip Care",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "6481207e-33ae-4813-91d9-db3554fa3985",
				brand_name: "CHANEL",
				product_price: [52],
				sku_id: "2565362",
				avg_rating: 4.5,
				total_reviews: 8,
				page_link:
					"https://www.ulta.com/p/hydra-beauty-nourishing-lip-care-pimprod2029967?sku=2565362",
			},
			{
				product_id: "0ee69606-4a74-4048-ad57-ed80d17131c7",
				product_name: "GABRIELLE CHANEL Parfum Spray",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "1f8ba6bc-cf94-4578-9d06-77dba8d19d9c",
				brand_name: "CHANEL",
				product_price: [370],
				sku_id: "2602278",
				avg_rating: 2.8,
				total_reviews: 5,
				page_link:
					"https://www.ulta.com/p/gabrielle-chanel-parfum-spray-pimprod2034548?sku=2602278",
			},
			{
				product_id: "2b8ee928-b2cb-4044-95bc-8e1aff0faa71",
				product_name:
					"LE LINER DE CHANEL Liquid Eyeliner High Precision Longwear",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "2e996b5d-41b6-4512-9e20-3bd13aee4801",
				brand_name: "CHANEL",
				product_price: [42],
				sku_id: "2564542",
				avg_rating: 4.3,
				total_reviews: 15,
				page_link:
					"https://www.ulta.com/p/le-liner-de-chanel-liquid-eyeliner-high-precision-longwear-pimprod2030099?sku=2564542",
			},
			{
				product_id: "46244f00-3278-46ca-baac-f5fbe5e73efa",
				product_name: "LA SOLUTION 10 DE CHANEL Sensitive Skin Cream",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "a88eb016-e552-44c4-a37b-811d7772f448",
				brand_name: "CHANEL",
				product_price: [115],
				sku_id: "2620417",
				avg_rating: 0,
				total_reviews: 0,
				page_link:
					"https://www.ulta.com/p/la-solution-10-de-chanel-sensitive-skin-cream-pimprod2043382?sku=2620417",
			},
			{
				product_id: "0cd6a539-247b-419e-974c-e5663d601ad0",
				product_name:
					"SIGNATURE DE CHANEL Intense Longwear Eyeliner Pen",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "25bc3fac-d67b-4f57-8bef-44516933e44f",
				brand_name: "CHANEL",
				product_price: [42],
				sku_id: "2561115",
				avg_rating: 4.4,
				total_reviews: 15,
				page_link:
					"https://www.ulta.com/p/signature-de-chanel-intense-longwear-eyeliner-pen-pimprod2030041?sku=2561115",
			},
			{
				product_id: "99320851-7cd8-4841-9be5-5e5737ff1997",
				product_name:
					"INIMITABLE WATERPROOF Volume - Length - Curl - Separation",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "82dc6039-98c3-4110-abfe-4b00541936a3",
				brand_name: "CHANEL",
				product_price: [40],
				sku_id: "2528320",
				avg_rating: 3.4,
				total_reviews: 11,
				page_link:
					"https://www.ulta.com/p/inimitable-waterproof-volume-length-curl-separation-pimprod2029971?sku=2528320",
			},
			{
				product_id: "e77b7579-0eff-4541-aee4-5467edbcb0e7",
				product_name: "N°1 DE CHANEL Revitaliing Mask",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "13b8c68e-2b6e-4d1e-9f39-0d874b726783",
				brand_name: "CHANEL",
				product_price: [85, 100],
				sku_id: "2611611",
				avg_rating: 5,
				total_reviews: 1,
				page_link:
					"https://www.ulta.com/p/n1-de-chanel-revitaliing-mask-pimprod2043254?sku=2611611",
			},
			{
				product_id: "ce3c8a08-cf67-48da-8721-ed9219aaca0c",
				product_name: "CHANCE EAU TENDRE Body Cream",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "f6ea623f-ad77-408f-b04e-b53ce7740d9d",
				brand_name: "CHANEL",
				product_price: [105],
				sku_id: "2605347",
				avg_rating: 3.5,
				total_reviews: 2,
				page_link:
					"https://www.ulta.com/p/chance-eau-tendre-body-cream-pimprod2036881?sku=2605347",
			},
			{
				product_id: "51a3303c-89c9-449f-89f9-ae0354fa80b9",
				product_name: "ALLURE HOMME SPORT After Shave Lotion",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "5744112f-26f8-49ce-8ee8-165b1e6f3fdf",
				brand_name: "CHANEL",
				product_price: [75],
				sku_id: "2579971",
				avg_rating: 5,
				total_reviews: 1,
				page_link:
					"https://www.ulta.com/p/allure-homme-sport-after-shave-lotion-pimprod2024454?sku=2579971",
			},
			{
				product_id: "16d44009-f731-4652-b494-18897f6f673d",
				product_name: "CHANCE Body Cream",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "10db17b1-4fc1-454b-a79c-b401626de975",
				brand_name: "CHANEL",
				product_price: [105],
				sku_id: "2608113",
				avg_rating: 3.7,
				total_reviews: 3,
				page_link:
					"https://www.ulta.com/p/chance-body-cream-pimprod2036933?sku=2608113",
			},
			{
				product_id: "ded73668-0859-4cd1-91ac-173f7a94c9fb",
				product_name: "N°5 Eau de Parfum Twist And Spray Set",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "6811f086-db62-4ab8-b681-5e51a733fd10",
				brand_name: "CHANEL",
				product_price: [219],
				sku_id: "2602559",
				avg_rating: 4.5,
				total_reviews: 2,
				page_link:
					"https://www.ulta.com/p/n5-eau-de-parfum-twist-spray-set-pimprod2035712?sku=2602559",
			},
			{
				product_id: "6f1c684e-afab-4065-a4ff-aa580898443d",
				product_name: "ALLURE HOMME SPORT Deodorant Stick",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "c7fbfc84-2045-4913-9014-b32038043216",
				brand_name: "CHANEL",
				product_price: [43],
				sku_id: "2114865",
				avg_rating: 3.5,
				total_reviews: 6,
				page_link:
					"https://www.ulta.com/p/allure-homme-sport-deodorant-stick-pimprod2015932?sku=2114865",
			},
			{
				product_id: "8e5df16d-414c-48c0-a268-9f17b384e816",
				product_name:
					"L'EAU DE MOUSSE Anti-Pollution Water-to-Foam Cleanser",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "dc1b44a1-3b20-45c1-82ca-20b0c1d4ad8a",
				brand_name: "CHANEL",
				product_price: [58],
				sku_id: "2585258",
				avg_rating: 4.4,
				total_reviews: 8,
				page_link:
					"https://www.ulta.com/p/leau-de-mousse-anti-pollution-water-foam-cleanser-pimprod2033949?sku=2585258",
			},
			{
				product_id: "cc629254-4e26-4a27-a4ee-ec929e2383a1",
				product_name: "NOIR ALLURE Mascara",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "2d103285-7526-4a84-ba2e-30679df5fdc5",
				brand_name: "CHANEL",
				product_price: [42],
				sku_id: "2600330",
				avg_rating: 3,
				total_reviews: 28,
				page_link:
					"https://www.ulta.com/p/noir-allure-mascara-pimprod2034537?sku=2600330",
			},
			{
				product_id: "1542cb8a-395c-41b7-b8a0-90d9de5f9c43",
				product_name: "BLEU DE CHANEL 3-in-1 Moisturizer",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "362f06c3-9206-4d46-aef9-4e99fd146134",
				brand_name: "CHANEL",
				product_price: [75],
				sku_id: "2610151",
				avg_rating: 3.7,
				total_reviews: 3,
				page_link:
					"https://www.ulta.com/p/bleu-de-chanel-3-in-1-moisturizer-pimprod2039550?sku=2610151",
			},
			{
				product_id: "fee23163-6dbe-46b6-a984-caa4248063bc",
				product_name: "BLEU DE CHANEL Eau de Parfum Twist and Spray",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "6bf0f9dc-43d6-41f4-8e16-5088f1430b5a",
				brand_name: "CHANEL",
				product_price: [142],
				sku_id: "2506373",
				avg_rating: 4.5,
				total_reviews: 6,
				page_link:
					"https://www.ulta.com/p/bleu-de-chanel-eau-de-parfum-twist-spray-pimprod2015975?sku=2506373",
			},
			{
				product_id: "63ed0fd0-621d-42eb-b2fa-8b580ccd05e7",
				product_name: "BLEU DE CHANEL Parfum Twist and Spray",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "61b5e88f-7be3-4783-8161-a8c9245543f7",
				brand_name: "CHANEL",
				product_price: [167],
				sku_id: "2585176",
				avg_rating: 0,
				total_reviews: 0,
				page_link:
					"https://www.ulta.com/p/bleu-de-chanel-parfum-twist-spray-pimprod2031963?sku=2585176",
			},
			{
				product_id: "ceafc9b7-c476-48f7-92d3-a5481b4a84be",
				product_name: "N°1 DE CHANEL Revitalizing Essence Lotion",
				product_image_url: [
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				],
				retailer_id: "Ulta123",
				brand_id: "713de28e-6301-4312-9c52-c88fc5fe6d7e",
				brand_name: "CHANEL",
				product_price: [125],
				sku_id: "2600331",
				avg_rating: 5,
				total_reviews: 4,
				page_link:
					"https://www.ulta.com/p/n1-de-chanel-revitalizing-essence-lotion-pimprod2035081?sku=2600331",
			},
			{
				product_id: "9a1e38e6-0c24-4971-91de-7d36b786b721",
				product_name: "INIMITABLE Volume - Length - Curl - Separation",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2528310?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "369bb90c-5030-4512-94f4-154d4c08bc76",
				brand_name: "CHANEL",
				product_price: [40],
				sku_id: "2528310",
				avg_rating: 3.1,
				total_reviews: 9,
				page_link:
					"https://www.ulta.com/p/inimitable-volume-length-curl-separation-pimprod2029969?sku=2528310",
			},
			{
				product_id: "bac7b51c-b2df-4f66-95f8-b8d6542b935c",
				product_name:
					"ALLURE HOMME SPORT Eau de Toilette After Shave Lotion Set",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2610068?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "7bbad9d6-a778-4667-9e1e-70d7b2cc88e9",
				brand_name: "CHANEL",
				product_price: [205],
				sku_id: "2610068",
				avg_rating: 0,
				total_reviews: 0,
				page_link:
					"https://www.ulta.com/p/allure-homme-sport-eau-de-toilette-after-shave-lotion-set-pimprod2039045?sku=2610068",
			},
			{
				product_id: "9380b874-11e9-4e89-964d-45c0ac7a9461",
				product_name:
					"ROUGE ALLURE L'EXTRAIT - REFILL High-Intensity Lip Colour Concentrated Radiance and Care",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2595918?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "80dbfbc3-b845-4126-a867-23347acd395b",
				brand_name: "CHANEL",
				product_price: [42],
				sku_id: "2595918",
				avg_rating: 0,
				total_reviews: 0,
				page_link:
					"https://www.ulta.com/p/rouge-allure-lextrait-refill-high-intensity-lip-colour-concentrated-radiance-care-pimprod2034158?sku=2595918",
			},
			{
				product_id: "6d34e99a-9239-4c69-8fdc-0dbcbd5fac24",
				product_name:
					"COCO MADEMOISELLE Eau de Parfum Intense Mini Twist and Spray Set",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2625211?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "22ea41af-d50d-4914-98b9-7d8ce7f269b0",
				brand_name: "CHANEL",
				product_price: [180],
				sku_id: "2625211",
				avg_rating: 0,
				total_reviews: 0,
				page_link:
					"https://www.ulta.com/p/coco-mademoiselle-eau-de-parfum-intense-mini-twist-spray-set-pimprod2044941?sku=2625211",
			},
			{
				product_id: "d476b6fc-b0a5-434c-878d-15dd61003c6f",
				product_name: "N°1 DE CHANEL Revitalizing Lotion",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2589596?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "4c3f2d49-5172-4500-aa43-b3e4629a12f5",
				brand_name: "CHANEL",
				product_price: [70],
				sku_id: "2589596",
				avg_rating: 3.8,
				total_reviews: 12,
				page_link:
					"https://www.ulta.com/p/n1-de-chanel-revitalizing-lotion-pimprod2029889?sku=2589596",
			},
			{
				product_id: "93360304-f8a1-407a-a4bf-a799698161e8",
				product_name: "N°1 DE CHANEL Revitalizing Body Serum-in-Mist",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2600332?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "0a11412b-4ae6-40da-ba4c-dc34478a9a22",
				brand_name: "CHANEL",
				product_price: [100],
				sku_id: "2600332",
				avg_rating: 0,
				total_reviews: 0,
				page_link:
					"https://www.ulta.com/p/n1-de-chanel-revitalizing-body-serum-in-mist-pimprod2035109?sku=2600332",
			},
			{
				product_id: "22c21fd5-4c80-420d-a740-4d0df87431f2",
				product_name: "LES BEIGES Healthy Glow Powder Refill",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2614649?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "84d606a0-4a91-4879-9602-170145948933",
				brand_name: "CHANEL",
				product_price: [45],
				sku_id: "2614649",
				avg_rating: 5,
				total_reviews: 1,
				page_link:
					"https://www.ulta.com/p/les-beiges-healthy-glow-powder-refill-pimprod2041628?sku=2614649",
			},
			{
				product_id: "cf7eba4d-f798-4a38-8f0e-92e3fc7a12e7",
				product_name: "LE RECOURBE CILS DE CHANEL Eyelash Curler",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2548855?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "29dc3bdf-a5de-4f97-8907-c09f99bef7b7",
				brand_name: "CHANEL",
				product_price: [30],
				sku_id: "2548855",
				avg_rating: 3.5,
				total_reviews: 16,
				page_link:
					"https://www.ulta.com/p/le-recourbe-cils-de-chanel-eyelash-curler-pimprod2029962?sku=2548855",
			},
			{
				product_id: "91b6c1db-785f-46b2-b9b3-b3e6e508306b",
				product_name: "BLEU DE CHANEL All-Over Spray",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2610149?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "58151e91-214f-47e3-a545-c47417f0468f",
				brand_name: "CHANEL",
				product_price: [100],
				sku_id: "2610149",
				avg_rating: 3,
				total_reviews: 1,
				page_link:
					"https://www.ulta.com/p/bleu-de-chanel-all-over-spray-pimprod2025544?sku=2610149",
			},
			{
				product_id: "34941b61-f9fa-4ec6-9c22-1506aff9e68c",
				product_name: "N°1 DE CHANEL Powder-to-Foam Cleanser",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2589591?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "8442ca86-d9f6-4176-be2d-abd24d84e51d",
				brand_name: "CHANEL",
				product_price: [60],
				sku_id: "2589591",
				avg_rating: 4,
				total_reviews: 16,
				page_link:
					"https://www.ulta.com/p/n1-de-chanel-powder-foam-cleanser-pimprod2029885?sku=2589591",
			},
			{
				product_id: "68543f6a-e718-442b-ae59-7ddf46eaede5",
				product_name: "CHANCE EAU FRAÎCHE Body Cream",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2607665?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "462f0fcd-5cb5-43a5-995a-e5ce181c1bc3",
				brand_name: "CHANEL",
				product_price: [105],
				sku_id: "2607665",
				avg_rating: 0,
				total_reviews: 0,
				page_link:
					"https://www.ulta.com/p/chance-eau-fraiche-body-cream-pimprod2036880?sku=2607665",
			},
			{
				product_id: "8f47bd89-a377-426f-b253-1caee5ce218e",
				product_name: "BLEU DE CHANEL 2-in-1 Cleansing Gel",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2610143?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "63bdc476-a446-47c2-9b15-05447df3a3a9",
				brand_name: "CHANEL",
				product_price: [75],
				sku_id: "2610143",
				avg_rating: 0,
				total_reviews: 0,
				page_link:
					"https://www.ulta.com/p/bleu-de-chanel-2-in-1-cleansing-gel-pimprod2039551?sku=2610143",
			},
			{
				product_id: "c965a73a-f82c-4a77-9d05-6352d010c4ba",
				product_name: "ALLURE HOMME SPORT All-Over Spray",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2607664?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "c26a55d0-029a-473a-a50f-dd1a8c6f67a2",
				brand_name: "CHANEL",
				product_price: [100],
				sku_id: "2607664",
				avg_rating: 0,
				total_reviews: 0,
				page_link:
					"https://www.ulta.com/p/allure-homme-sport-all-over-spray-pimprod2037672?sku=2607664",
			},
			{
				product_id: "a59ac763-f370-456b-89e9-a8ac993ef0d2",
				product_name:
					"CC CREAM Super Active Complete Correction Sunscreen Broad Spectrum SPF 50",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2532518?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "245f702a-b6a9-4ecd-9e26-e066208104a8",
				brand_name: "CHANEL",
				product_price: [70],
				sku_id: "2532518",
				avg_rating: 4.7,
				total_reviews: 23,
				page_link:
					"https://www.ulta.com/p/cc-cream-super-active-complete-correction-sunscreen-broad-spectrum-spf-50-pimprod2029960?sku=2532518",
			},
			{
				product_id: "bc7fe50a-eefd-4df3-a081-cecbf9c66198",
				product_name: "LA BASE MASCARA Volume And Care Lash Primer",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2532572?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "1217e4ed-b7b2-43b9-8d92-13e15a6e9fc4",
				brand_name: "CHANEL",
				product_price: [40],
				sku_id: "2532572",
				avg_rating: 3.8,
				total_reviews: 12,
				page_link:
					"https://www.ulta.com/p/la-base-mascara-volume-care-lash-primer-pimprod2029985?sku=2532572",
			},
			{
				product_id: "89b7b4ec-fea9-476a-810e-4514b1d30c2d",
				product_name: "LA BASE Protective And Smoothing",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2528619?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "2aa311f7-623f-46b7-811e-ebda7b1e7d73",
				brand_name: "CHANEL",
				product_price: [32],
				sku_id: "2528619",
				avg_rating: 5,
				total_reviews: 4,
				page_link:
					"https://www.ulta.com/p/la-base-protective-smoothing-pimprod2030006?sku=2528619",
			},
			{
				product_id: "f0a1ee9d-3e94-419b-a91b-a9ae8a180601",
				product_name: "LE CRAYON LÈVRES Longwear Lip Pencil",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2559110?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "bce3ff53-36d1-4b6d-81cc-99e5638d6e46",
				brand_name: "CHANEL",
				product_price: [35],
				sku_id: "2559110",
				avg_rating: 4.9,
				total_reviews: 13,
				page_link:
					"https://www.ulta.com/p/le-crayon-levres-longwear-lip-pencil-pimprod2030097?sku=2559110",
			},
			{
				product_id: "bc10b2d7-163f-408e-8382-fe38e0f6e548",
				product_name: "N°5 The Gold Body Oil",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2602266?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "76cf70fc-8345-4a18-832c-136ebde206d3",
				brand_name: "CHANEL",
				product_price: [100],
				sku_id: "2602266",
				avg_rating: 4.7,
				total_reviews: 3,
				page_link:
					"https://www.ulta.com/p/n5-gold-body-oil-pimprod2036214?sku=2602266",
			},
			{
				product_id: "b8ee0fe6-8fc7-449e-a447-e03cf258a238",
				product_name: "COCO MADEMOISELLE Pearly Body Gel",
				product_image_url: [
					"https://media.ulta.com/i/ulta/2602268?w=240&$ProductCardNeutralBGLight$&fmt=auto",
				],
				retailer_id: "Ulta123",
				brand_id: "5ce4c0a9-d98c-4eae-a6ec-7bc2ce8efd35",
				brand_name: "CHANEL",
				product_price: [100],
				sku_id: "2602268",
				avg_rating: 4.5,
				total_reviews: 4,
				page_link:
					"https://www.ulta.com/p/coco-mademoiselle-pearly-body-gel-pimprod2036215?sku=2602268",
			},
		];

		const sephoraData = [
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

			console.dir(data.map(item => item.product_name) ,{ maxArrayLength: null });
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


	const text = "4.4 out of 5 stars ; 8 reviews";

	// console.log(text.split(" "))

	return (
		<form action={handleSubmit}>
			<Button type="submit">Scrape All Products</Button>
		</form>
	);
}
