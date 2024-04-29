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
import { getAllUltaBrands } from "../actions/getAllUltaBrands";
import { getAllSephoraBrands } from "../actions/getAllSephoraBrands";

export default function Page() {
	async function handleSubmit() {
		"use server";

		const start = new Date().getTime();

		const url = "https://www.ulta.com/brand/chanel";
		// const allProducts = await getAllSephoraBrands();

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

		const allSephoraBrands = [
			{
				brand_id: "11e59c38-ddb9-4dc7-869e-89df155087b0",
				brand_name: "AAVRANI",
				brand_page_link: "/brand/aavrani",
			},
			{
				brand_id: "cf007fcb-5eb0-4245-a8d1-01dc23c00219",
				brand_name: "ABBOTT",
				brand_page_link: "/brand/abbott",
			},
			{
				brand_id: "264c0078-8d67-4f9f-ba38-d836e4a2576b",
				brand_name: "Act+Acre",
				brand_page_link: "/brand/act-acre",
			},
			{
				brand_id: "cd9795b3-7f1d-4328-b64e-e9db6f94f7dc",
				brand_name: "adwoa beauty",
				brand_page_link: "/brand/adwoa-beauty",
			},
			{
				brand_id: "027297d0-b415-43d6-8d39-e418eddc843a",
				brand_name: "AERIN",
				brand_page_link: "/brand/aerin-perfume",
			},
			{
				brand_id: "e3f4e284-a932-4f18-a4e9-1efb30faaf08",
				brand_name: "Algenist",
				brand_page_link: "/brand/algenist",
			},
			{
				brand_id: "40352226-4da9-4344-9d57-fe43d4fb5f3d",
				brand_name: "ALO",
				brand_page_link: "/brand/alo",
			},
			{
				brand_id: "7fa3e505-11ea-46a6-94ae-bc9063fddb57",
				brand_name: "Alpyn Beauty",
				brand_page_link: "/brand/alpyn-beauty",
			},
			{
				brand_id: "e84ec3f9-f7ae-4d70-8379-6dd0d2babcc6",
				brand_name: "ALTERNA Haircare",
				brand_page_link: "/brand/alterna",
			},
			{
				brand_id: "2561f7ca-022b-4305-8324-6a3ea36882c9",
				brand_name: "Ami Colé",
				brand_page_link: "/brand/ami-cole",
			},
			{
				brand_id: "f108fdde-7084-40a6-a365-ee162e2babe0",
				brand_name: "amika",
				brand_page_link: "/brand/amika",
			},
			{
				brand_id: "acf42bf3-6015-4751-9250-f52164338cf1",
				brand_name: "Anastasia Beverly Hills",
				brand_page_link: "/brand/anastasia-beverly-hills",
			},
			{
				brand_id: "e26bc72e-3413-42ce-a00d-3c5ff458760e",
				brand_name: "Aquis",
				brand_page_link: "/brand/aquis",
			},
			{
				brand_id: "fd4a1aee-6719-44f0-a537-7aecda559741",
				brand_name: "Armani Beauty",
				brand_page_link: "/brand/giorgio-armani-beauty",
			},
			{
				brand_id: "6c6502df-9678-45e7-885b-d5b545f77f21",
				brand_name: "Artist Couture",
				brand_page_link: "/brand/artist-couture",
			},
			{
				brand_id: "ab8fbbd2-c832-4697-baf4-be66df7d5ea5",
				brand_name: "Augustinus Bader",
				brand_page_link: "/brand/augustinus-bader",
			},
			{
				brand_id: "f4f23c10-3fe4-4bc0-acfa-3e8f4f167bea",
				brand_name: "Azzaro",
				brand_page_link: "/brand/azzaro",
			},
			{
				brand_id: "16a22107-68ed-45c6-981a-4f656973700a",
				brand_name: "BaBylissPRO",
				brand_page_link: "/brand/babylisspro",
			},
			{
				brand_id: "0ce43757-7d7f-4bc7-a64d-aa19ea007a6d",
				brand_name: "bareMinerals",
				brand_page_link: "/brand/bareminerals",
			},
			{
				brand_id: "7ebacda3-85e8-4138-b0d8-300e411a0236",
				brand_name: "BASMA",
				brand_page_link: "/brand/basma",
			},
			{
				brand_id: "302ade0e-ab9a-480a-9662-7685e8613436",
				brand_name: "BeautyBio",
				brand_page_link: "/brand/beautybio",
			},
			{
				brand_id: "6218a8a4-c869-4ee1-b089-a7c2394de06d",
				brand_name: "Beautyblender",
				brand_page_link: "/brand/beautyblender",
			},
			{
				brand_id: "e0954a8f-5a8c-41ce-b195-fb8d1611315e",
				brand_name: "belif",
				brand_page_link: "/brand/belif",
			},
			{
				brand_id: "b7e6c6bb-b1ed-4e21-b303-d320e25f697b",
				brand_name: "Benefit Cosmetics",
				brand_page_link: "/brand/benefit-cosmetics",
			},
			{
				brand_id: "5e9fa539-a630-484d-8e9b-edb672a449bb",
				brand_name: "Bio Ionic",
				brand_page_link: "/brand/bio-ionic",
			},
			{
				brand_id: "ebe88821-e8e7-4c40-9920-98aa9d6940f6",
				brand_name: "Biossance",
				brand_page_link: "/brand/biossance",
			},
			{
				brand_id: "9a277fc5-72b1-49df-8151-42a28f67d556",
				brand_name: "Blinc",
				brand_page_link: "/brand/blinc",
			},
			{
				brand_id: "8bc69561-f9ef-46a3-9d72-1807cb00dbdf",
				brand_name: "Bobbi Brown",
				brand_page_link: "/brand/bobbi-brown",
			},
			{
				brand_id: "1bde7255-083b-4e35-8f96-b261e8160a9b",
				brand_name: "BondiBoost",
				brand_page_link: "/brand/bondi-boost",
			},
			{
				brand_id: "6d3731ce-652d-4797-81c7-904b8c09dfb7",
				brand_name: "Boy Smells",
				brand_page_link: "/brand/boysmells",
			},
			{
				brand_id: "2650949a-6998-48c1-9e83-07febc3d3a8e",
				brand_name: "BREAD BEAUTY SUPPLY",
				brand_page_link: "/brand/bread-beauty-supply",
			},
			{
				brand_id: "94850d43-7ac2-4fc3-bcd7-0ce8562062e8",
				brand_name: "Briogeo",
				brand_page_link: "/brand/briogeo",
			},
			{
				brand_id: "4c6a36de-23c5-43b8-881b-1c2b50005a6e",
				brand_name: "Brown Girl Jane",
				brand_page_link: "/brand/brown-girl-jane",
			},
			{
				brand_id: "bd061887-8a87-4e31-9d23-4a7a87976b23",
				brand_name: "Bumble and bumble",
				brand_page_link: "/brand/bumble-bumble",
			},
			{
				brand_id: "76c15fb5-93ae-43c1-8021-d6fbee534b7e",
				brand_name: "BURBERRY",
				brand_page_link: "/brand/burberry",
			},
			{
				brand_id: "cb14a7b7-a31f-422c-b902-883d0f9c467a",
				brand_name: "Buxom",
				brand_page_link: "/brand/buxom",
			},
			{
				brand_id: "6e8b2324-73b2-4f0b-8085-356bebae2d92",
				brand_name: "By Rosie Jane",
				brand_page_link: "/brand/by-rosie-jane",
			},
			{
				brand_id: "a3e0c5b1-6bff-4e69-9493-068e871fd4cd",
				brand_name: "caliray",
				brand_page_link: "/brand/caliray",
			},
			{
				brand_id: "60815bc3-15f3-4307-85f4-6fa11e295ca6",
				brand_name: "CANOPY",
				brand_page_link: "/brand/canopy",
			},
			{
				brand_id: "016d512c-a976-4fcf-8503-af88c40e9a7c",
				brand_name: "Carolina Herrera",
				brand_page_link: "/brand/carolina-herrera",
			},
			{
				brand_id: "f5c094e9-4012-40f4-b36b-6964ec1e1fdb",
				brand_name: "Caudalie",
				brand_page_link: "/brand/caudalie",
			},
			{
				brand_id: "279fe0d8-cab5-4b23-8427-e5a38263c364",
				brand_name: "CAY SKIN",
				brand_page_link: "/brand/cay-skin",
			},
			{
				brand_id: "52049489-2906-4cbb-83d7-644648eaaf32",
				brand_name: "Ceremonia",
				brand_page_link: "/brand/ceremonia",
			},
			{
				brand_id: "6ff41695-069a-4bcf-a65b-da8019313701",
				brand_name: "CHANEL",
				brand_page_link: "/brand/chanel",
			},
			{
				brand_id: "a71d98ff-bfb4-4d69-a026-3666bdae2480",
				brand_name: "Charlotte Tilbury",
				brand_page_link: "/brand/charlotte-tilbury",
			},
			{
				brand_id: "4e6ae479-eccb-4f5b-9795-e9779e4f7f6a",
				brand_name: "Chloé",
				brand_page_link: "/brand/chloe",
			},
			{
				brand_id: "02cf9a36-2a98-44b6-b239-3342021a0f90",
				brand_name: "Ciaté London",
				brand_page_link: "/brand/ciate",
			},
			{
				brand_id: "14232484-8974-4611-990a-5ed01d049d16",
				brand_name: "ciele",
				brand_page_link: "/brand/ciele",
			},
			{
				brand_id: "a8dd8b8c-4079-4f8e-beab-0edb34190f00",
				brand_name: "Cinema Secrets",
				brand_page_link: "/brand/cinema-secrets",
			},
			{
				brand_id: "4ee89547-5932-4bd1-a92b-e3695286bee7",
				brand_name: "Clarins",
				brand_page_link: "/brand/clarins",
			},
			{
				brand_id: "40133e4c-a504-4f4d-bb8b-67fa3db244bf",
				brand_name: "CLEAN RESERVE",
				brand_page_link: "/brand/clean-reserve",
			},
			{
				brand_id: "a08624c2-8056-43d3-a029-4a2062e93690",
				brand_name: "CLINIQUE",
				brand_page_link: "/brand/clinique",
			},
			{
				brand_id: "ddbc3898-8fde-4dfe-afb1-eed826db10da",
				brand_name: "COLOR WOW",
				brand_page_link: "/brand/color-wow",
			},
			{
				brand_id: "b6c71a54-c6a2-48dc-b764-a6ecd2c07036",
				brand_name: "Commodity",
				brand_page_link: "/brand/commodity",
			},
			{
				brand_id: "855c63f3-481c-4d2b-9ef1-f107dd57ada0",
				brand_name: "Community Sixty-Six",
				brand_page_link: "/brand/community-sixty-six",
			},
			{
				brand_id: "24a70961-fb33-4d50-a3ef-c6e53f696c1b",
				brand_name: "COOLA",
				brand_page_link: "/brand/coola-suncare",
			},
			{
				brand_id: "79987d71-7fa1-4d61-9e67-8ee3c5f51a05",
				brand_name: "Crown Affair",
				brand_page_link: "/brand/crown-affair",
			},
			{
				brand_id: "5dc0c110-7225-42a6-8487-a4fc867cbac6",
				brand_name: "Curlsmith",
				brand_page_link: "/brand/curlsmith",
			},
			{
				brand_id: "22819731-65c3-421c-8088-8fc5ec80fce3",
				brand_name: "dae",
				brand_page_link: "/brand/dae",
			},
			{
				brand_id: "f5765141-c7b5-45d9-a369-7244547a6786",
				brand_name: "DAMDAM",
				brand_page_link: "/brand/dam-dam",
			},
			{
				brand_id: "a9fa62f4-9bd5-439a-9cc6-91cf17d1bf61",
				brand_name: "Danessa Myricks Beauty",
				brand_page_link: "/brand/danessa-myricks-beauty",
			},
			{
				brand_id: "c519492e-224b-4d7e-8d49-c809fc9310d3",
				brand_name: "Deborah Lippmann",
				brand_page_link: "/brand/deborah-lippmann",
			},
			{
				brand_id: "00fc528b-dd36-4474-8c8c-8741aeabd4cc",
				brand_name: "DedCool",
				brand_page_link: "/brand/dedcool",
			},
			{
				brand_id: "d3e99123-f579-487e-87d9-b8f34b514b81",
				brand_name: "DEREK LAM 10 CROSBY",
				brand_page_link: "/brand/derek-lam-10-crosby",
			},
			{
				brand_id: "05de1514-f793-4ea4-90c1-f7436e87f910",
				brand_name: "DERMAFLASH",
				brand_page_link: "/brand/dermaflash",
			},
			{
				brand_id: "8d7cdb2e-a9b0-4141-9a5a-9f0676a63743",
				brand_name: "Dermalogica",
				brand_page_link: "/brand/dermalogica",
			},
			{
				brand_id: "f763c9c5-7c9c-4235-b1b9-698873950d99",
				brand_name: "Dieux",
				brand_page_link: "/brand/dieux",
			},
			{
				brand_id: "c047279a-352c-4bd8-933d-3d11ed0d84e5",
				brand_name: "Dior",
				brand_page_link: "/brand/dior",
			},
			{
				brand_id: "5df5360e-fd57-4ccc-bc7b-f47f35b9139e",
				brand_name: "Dolce&Gabbana",
				brand_page_link: "/brand/dolce-gabbana",
			},
			{
				brand_id: "c36f3ee0-8229-48a2-866f-df4fe4ebbf28",
				brand_name: "DOMINIQUE COSMETICS",
				brand_page_link: "/brand/dominique-cosmetics",
			},
			{
				brand_id: "86c78cb8-cff5-4a9f-ab3b-0534af984504",
				brand_name: "Donna Karan",
				brand_page_link: "/brand/donna-karan",
			},
			{
				brand_id: "a938569e-c4af-4bfc-970b-cf68cc767909",
				brand_name: "Dr. Barbara Sturm",
				brand_page_link: "/brand/dr-barbara-sturm",
			},
			{
				brand_id: "a3d7114a-2cba-4dd0-8db0-f22f0b4805d8",
				brand_name: "Dr. Brandt Skincare",
				brand_page_link: "/brand/dr-brandt-skincare",
			},
			{
				brand_id: "7adee243-8893-4011-8ae1-e16539ed7f91",
				brand_name: "Dr. Dennis Gross Skincare",
				brand_page_link: "/brand/dr-dennis-gross-skincare",
			},
			{
				brand_id: "c632f53c-debb-4a36-a66b-62efd5c6b58a",
				brand_name: "Dr. Idriss",
				brand_page_link: "/brand/dr-idriss",
			},
			{
				brand_id: "1d49b0c0-abeb-4eee-b0c6-a447667aeb94",
				brand_name: "Dr. Jart+",
				brand_page_link: "/brand/dr-jart",
			},
			{
				brand_id: "7ef3686c-41ed-43f0-bec1-c5b9aa24d7f6",
				brand_name: "Drunk Elephant",
				brand_page_link: "/brand/drunk-elephant",
			},
			{
				brand_id: "3840b28c-60f2-4e7b-b103-d553a5945cb2",
				brand_name: "Drybar",
				brand_page_link: "/brand/drybar",
			},
			{
				brand_id: "a1ed728c-5c7e-4657-8b0e-e6683988b40e",
				brand_name: "DUO",
				brand_page_link: "/brand/duo",
			},
			{
				brand_id: "025cfe0f-ab92-46cd-a09a-e3cb093845da",
				brand_name: "Dyson",
				brand_page_link: "/brand/dyson",
			},
			{
				brand_id: "b3faead8-31ef-4804-9281-5c25169d305b",
				brand_name: "EADEM",
				brand_page_link: "/brand/eadem",
			},
			{
				brand_id: "91fea944-b84a-49a0-9612-a0eb2385b2e2",
				brand_name: "Eight & Bob",
				brand_page_link: "/brand/eight-bob",
			},
			{
				brand_id: "4a70053f-6b97-41bf-8ab2-c7ed1b38ed4e",
				brand_name: "Elemis",
				brand_page_link: "/brand/elemis",
			},
			{
				brand_id: "36a7f4db-2908-4f45-99f2-920a224b26a1",
				brand_name: "Ellis Brooklyn",
				brand_page_link: "/brand/ellis-brooklyn",
			},
			{
				brand_id: "b48daa1e-309c-4784-b34f-dfd5171040a4",
				brand_name: "Estée Lauder",
				brand_page_link: "/brand/estee-lauder",
			},
			{
				brand_id: "c03a0203-9923-4d75-83f4-ea2bd77779b5",
				brand_name: "Fable & Mane",
				brand_page_link: "/brand/fable-mane",
			},
			{
				brand_id: "ce587bc7-87b0-42f6-99db-3f574c00b28d",
				brand_name: "FaceGym",
				brand_page_link: "/brand/facegym",
			},
			{
				brand_id: "08fa0293-3eee-4f19-868b-3402b54323b0",
				brand_name: "Farmacy",
				brand_page_link: "/brand/farmacy",
			},
			{
				brand_id: "14d87024-ea89-41a4-afc4-a984991c6b3a",
				brand_name: "Fashion Fair",
				brand_page_link: "/brand/fashion-fair",
			},
			{
				brand_id: "a8bf95a6-c32d-484d-8d60-5dbc471d48ee",
				brand_name: "Fenty Beauty by Rihanna",
				brand_page_link: "/brand/fenty-beauty-rihanna",
			},
			{
				brand_id: "bb235a52-1ba2-4269-bf3a-5a7a40d11dde",
				brand_name: "Fenty Skin",
				brand_page_link: "/brand/fenty-skin-rihanna",
			},
			{
				brand_id: "46fd5bc7-7828-4f9b-b0e0-bb82919688a5",
				brand_name: "First Aid Beauty",
				brand_page_link: "/brand/first-aid-beauty",
			},
			{
				brand_id: "798dd815-3a7f-4191-8de1-28cdf241d634",
				brand_name: "Flora + Bast",
				brand_page_link: "/brand/flora-bast",
			},
			{
				brand_id: "27cb5501-71ec-46a2-a9b4-b6236b050638",
				brand_name: "FOREO",
				brand_page_link: "/brand/foreo",
			},
			{
				brand_id: "7ae7815b-a5fa-4354-b7a1-70c96754b1e8",
				brand_name: "FORVR Mood",
				brand_page_link: "/brand/forvr-mood",
			},
			{
				brand_id: "a998227e-bedf-4264-9627-96e4966a2e98",
				brand_name: "Freck Beauty",
				brand_page_link: "/brand/freck-beauty",
			},
			{
				brand_id: "d0c5f972-bc03-4b52-a7b8-4bce04bfb2ec",
				brand_name: "fresh",
				brand_page_link: "/brand/fresh",
			},
			{
				brand_id: "7a51a0ea-4698-4240-8d55-67a45ee32a11",
				brand_name: "Function of Beauty PRO",
				brand_page_link: "/brand/function-of-beauty-pro",
			},
			{
				brand_id: "1ab59d81-e339-475f-a552-46f5a00f994b",
				brand_name: "ghd",
				brand_page_link: "/brand/ghd",
			},
			{
				brand_id: "bdee2bc1-3697-4142-a607-ee63f6aa5846",
				brand_name: "Gisou",
				brand_page_link: "/brand/gisou",
			},
			{
				brand_id: "a6fef8ad-d8ed-487f-874f-b0285e376d96",
				brand_name: "Givenchy",
				brand_page_link: "/brand/givenchy",
			},
			{
				brand_id: "64b5f961-c7d4-4401-9e36-a2a4e76473d4",
				brand_name: "Glamnetic",
				brand_page_link: "/brand/glamnetic",
			},
			{
				brand_id: "18b27d0d-cb6d-4415-98b5-6c434a9e7653",
				brand_name: "GLO Science",
				brand_page_link: "/brand/glo-science",
			},
			{
				brand_id: "61add336-dc13-4f37-835e-e1060711e860",
				brand_name: "Glossier",
				brand_page_link: "/brand/glossier",
			},
			{
				brand_id: "48c5bbd7-9e0c-43aa-8570-034a17b0d59b",
				brand_name: "Glow Recipe",
				brand_page_link: "/brand/glow-recipe",
			},
			{
				brand_id: "2456313c-2656-41ad-a793-230caeb77754",
				brand_name: "goop",
				brand_page_link: "/brand/goop",
			},
			{
				brand_id: "233ce8b5-2306-4428-9da2-f85efd9323ef",
				brand_name: "Grace Eleyae",
				brand_page_link: "/brand/grace-eleyae",
			},
			{
				brand_id: "86add9d6-f492-484e-b186-23793d4b2005",
				brand_name: "Grande Cosmetics",
				brand_page_link: "/brand/grande-cosmetics",
			},
			{
				brand_id: "09e6e7f6-ea1a-4a07-a24b-4ac848391ad1",
				brand_name: "Gucci",
				brand_page_link: "/brand/gucci",
			},
			{
				brand_id: "9c1502d3-63b7-4c1a-9c47-ad61bd968ee1",
				brand_name: "GUERLAIN",
				brand_page_link: "/brand/guerlain",
			},
			{
				brand_id: "c30cc8ea-e171-4bbc-866a-12cfa5f40798",
				brand_name: "GXVE BY GWEN STEFANI",
				brand_page_link: "/brand/gxve-by-gwen-stefani",
			},
			{
				brand_id: "9039d7d9-c7ad-47d6-be72-32999ed11c62",
				brand_name: "HABIT",
				brand_page_link: "/brand/habit",
			},
			{
				brand_id: "393c8f7f-1f17-4e64-920a-700a598058b0",
				brand_name: "Hanni",
				brand_page_link: "/brand/hanni",
			},
			{
				brand_id: "cb30c69b-fecf-41f8-b45e-bcd9a888be99",
				brand_name: "HAUS LABS BY LADY GAGA",
				brand_page_link: "/brand/haus-labs-by-lady-gaga",
			},
			{
				brand_id: "d01a7dcb-44eb-4847-8ae0-a959665d48d4",
				brand_name: "Hello Sunday",
				brand_page_link: "/brand/hello-sunday",
			},
			{
				brand_id: "b51fba14-b5af-4a4c-b7e7-3eaf248d28ea",
				brand_name: "Henry Rose",
				brand_page_link: "/brand/henry-rose",
			},
			{
				brand_id: "9c7a1429-957e-45bf-ae50-00ed7316b59a",
				brand_name: "Herbivore",
				brand_page_link: "/brand/herbivore-botanicals",
			},
			{
				brand_id: "4ce93406-4f39-4a67-8b1d-fd7618577961",
				brand_name: "HERMÈS",
				brand_page_link: "/brand/hermes",
			},
			{
				brand_id: "805cef9a-2f43-44a4-abf0-2d4313f97e6f",
				brand_name: "HigherDOSE",
				brand_page_link: "/brand/higherdose",
			},
			{
				brand_id: "b1f60d96-b831-4f62-b5ca-fb7e01055d21",
				brand_name: "Hourglass",
				brand_page_link: "/brand/hourglass",
			},
			{
				brand_id: "8fdcb29c-be2f-438f-8939-277374e88b74",
				brand_name: "House of Lashes",
				brand_page_link: "/brand/house-lashes",
			},
			{
				brand_id: "8e24e301-56a6-4957-9094-ef75a4b0e8f9",
				brand_name: "HUDA BEAUTY",
				brand_page_link: "/brand/huda-beauty",
			},
			{
				brand_id: "43b88bc3-bdc2-4e7a-9eae-1f65809e3db3",
				brand_name: "Hyper Skin",
				brand_page_link: "/brand/hyper-skin",
			},
			{
				brand_id: "af7331d6-96b7-4b5d-b08a-44a377fc25cd",
				brand_name: "Iconic London",
				brand_page_link: "/brand/iconic-london",
			},
			{
				brand_id: "250f9dae-7bed-4745-b59d-c3a41be1a17a",
				brand_name: "IGK",
				brand_page_link: "/brand/igk",
			},
			{
				brand_id: "2482ac6c-9315-40b7-bc61-2ee93bf8f9f3",
				brand_name: "ILIA",
				brand_page_link: "/brand/ilia",
			},
			{
				brand_id: "16d0e356-b2f5-4186-a7c7-e03971c2b8a5",
				brand_name: "iluminage",
				brand_page_link: "/brand/iluminage",
			},
			{
				brand_id: "53585545-b8d2-4545-a08c-ce1c1cab3251",
				brand_name: "INC.redible",
				brand_page_link: "/brand/incredible",
			},
			{
				brand_id: "827b224f-9150-4e27-9517-b99513ee9966",
				brand_name: "Indie Lee",
				brand_page_link: "/brand/indie-lee",
			},
			{
				brand_id: "6ac72d8f-f9bb-4a95-baf4-b50ad885e652",
				brand_name: "The INKEY List",
				brand_page_link: "/brand/the-inkey-list",
			},
			{
				brand_id: "9151c14e-2040-41c8-b2a2-5835d6588ade",
				brand_name: "iNNBEAUTY PROJECT",
				brand_page_link: "/brand/innbeauty-project",
			},
			{
				brand_id: "241421ae-3c84-4898-b121-9e72eeecafe4",
				brand_name: "innisfree",
				brand_page_link: "/brand/innisfree",
			},
			{
				brand_id: "74e83f18-c954-4744-830e-377fee97e8c1",
				brand_name: "Iris&Romeo",
				brand_page_link: "/brand/iris-romeo",
			},
			{
				brand_id: "3954e08a-2942-4500-b235-7f018d461e7e",
				brand_name: "Isle of Paradise",
				brand_page_link: "/brand/isle-paradise",
			},
			{
				brand_id: "8b0e136e-6773-480e-a053-724bb41b3e36",
				brand_name: "IT Cosmetics",
				brand_page_link: "/brand/it-cosmetics",
			},
			{
				brand_id: "f7e27168-35c4-4840-acab-25b2f965ce5c",
				brand_name: "Jack Black",
				brand_page_link: "/brand/jack-black",
			},
			{
				brand_id: "5e5d60a8-1d57-44ac-90c8-b310ef36345f",
				brand_name: "Jean Paul Gaultier",
				brand_page_link: "/brand/jean-paul-gaultier",
			},
			{
				brand_id: "7535d333-92fc-4bdc-95a9-8feb3e2703e0",
				brand_name: "Jillian Dempsey",
				brand_page_link: "/brand/jillian-dempsey",
			},
			{
				brand_id: "b6dc3710-22c4-4ad9-bd1b-7945b5cf2bee",
				brand_name: "JIMMY CHOO",
				brand_page_link: "/brand/jimmy-choo",
			},
			{
				brand_id: "3132239c-4d72-4031-ac54-d017175ced01",
				brand_name: "JLo Beauty",
				brand_page_link: "/brand/jlo-beauty",
			},
			{
				brand_id: "f50ddb5a-881b-4157-853b-1ae0dd8d5c65",
				brand_name: "Jo Malone London",
				brand_page_link: "/brand/jo-malone-london",
			},
			{
				brand_id: "c0904ba3-ad37-4dfe-9390-a6b35a632246",
				brand_name: "Josie Maran",
				brand_page_link: "/brand/josie-maran",
			},
			{
				brand_id: "365accb0-69d6-49e6-96cf-42a8a784acdd",
				brand_name: "Jouer Cosmetics",
				brand_page_link: "/brand/jouer-cosmetics",
			},
			{
				brand_id: "84233dfd-6e5f-4f65-b800-8267531753a3",
				brand_name: "Juicy Couture",
				brand_page_link: "/brand/juicy-couture",
			},
			{
				brand_id: "bcd65900-c102-4887-ade4-d2025ff8d108",
				brand_name: "Juliette Has a Gun",
				brand_page_link: "/brand/juliette-has-a-gun",
			},
			{
				brand_id: "3a02408e-5721-40e7-bab2-934f6721789d",
				brand_name: "JVN",
				brand_page_link: "/brand/jvn",
			},
			{
				brand_id: "1b01d35d-46ee-4794-83dd-3777bf31bc99",
				brand_name: "K18 Biomimetic Hairscience",
				brand_page_link: "/brand/k18-hair",
			},
			{
				brand_id: "c0178c82-6b85-49ba-8cae-8a8712592023",
				brand_name: "Kaja",
				brand_page_link: "/brand/kaja",
			},
			{
				brand_id: "686f43ee-d166-439d-8d6e-78de2698420e",
				brand_name: "Kate McLeod",
				brand_page_link: "/brand/kate-mcleod",
			},
			{
				brand_id: "dea5dbbf-ef7e-4f95-94b4-cfaa166f2416",
				brand_name: "Kate Somerville",
				brand_page_link: "/brand/kate-somerville",
			},
			{
				brand_id: "ecf92f90-ca10-4d4e-822b-2154e72f9f21",
				brand_name: "KAYALI",
				brand_page_link: "/brand/kayali-by-huda",
			},
			{
				brand_id: "0e1eba38-1bd7-448d-a910-b8189f1257df",
				brand_name: "Kérastase",
				brand_page_link: "/brand/kerastase",
			},
			{
				brand_id: "65009dc4-7ce9-4752-a269-a2982ea4f91b",
				brand_name: "Kiehl's Since 1851",
				brand_page_link: "/brand/kiehls",
			},
			{
				brand_id: "66757769-0e46-4d68-af2b-b312b7c728b0",
				brand_name: "KILIAN Paris",
				brand_page_link: "/brand/kilian",
			},
			{
				brand_id: "1266e223-d96a-4abd-a9e3-8e0de570c20a",
				brand_name: "KORA Organics",
				brand_page_link: "/brand/kora-organics",
			},
			{
				brand_id: "fc2c8e33-496b-4ce3-9560-85a7071b1dff",
				brand_name: "KORRES",
				brand_page_link: "/brand/korres",
			},
			{
				brand_id: "564cb572-da7a-4cdd-9c47-1c02087c7c12",
				brand_name: "Kosas",
				brand_page_link: "/brand/kosas",
			},
			{
				brand_id: "75fbfe23-a10b-4ee3-afc5-754cd72d5c08",
				brand_name: "Kulfi",
				brand_page_link: "/brand/kulfi",
			},
			{
				brand_id: "afef6564-bd6b-4722-8991-2d4a8501870e",
				brand_name: "KVD Beauty",
				brand_page_link: "/brand/kvd-vegan-beauty",
			},
			{
				brand_id: "99d6ce09-803f-4726-8f0e-94ea945f204a",
				brand_name: "L'Occitane",
				brand_page_link: "/brand/l-occitane",
			},
			{
				brand_id: "90527ac4-01eb-4ae9-9af7-f8b883eb2336",
				brand_name: "L'Oréal Professionnel",
				brand_page_link: "/brand/l-oreal-professionnel",
			},
			{
				brand_id: "22ff8ddf-4102-4bac-82f6-5bc30e12c226",
				brand_name: "L'Oréal Professionnel Steampod",
				brand_page_link: "/brand/l-oreal-professionnel-steampod",
			},
			{
				brand_id: "1a94c3ee-90a9-4422-94cc-84e98fdb4684",
				brand_name: "La Mer",
				brand_page_link: "/brand/la-mer",
			},
			{
				brand_id: "92580074-d5c8-439f-835d-2b3534c17387",
				brand_name: "Lancôme",
				brand_page_link: "/brand/lancome",
			},
			{
				brand_id: "04cbc2c0-f9e7-4e03-bf4d-f8a70877f390",
				brand_name: "LANEIGE",
				brand_page_link: "/brand/laneige",
			},
			{
				brand_id: "8a98677d-14a1-4676-812b-21808ad65a4c",
				brand_name: "Laura Mercier",
				brand_page_link: "/brand/laura-mercier",
			},
			{
				brand_id: "65f124f0-6f38-49d3-9909-c952219cc674",
				brand_name: "LAWLESS",
				brand_page_link: "/brand/lawless",
			},
			{
				brand_id: "796555b9-abf8-454c-b0f3-614d89ec45e7",
				brand_name: "Lilly Lashes",
				brand_page_link: "/brand/lilly-lashes",
			},
			{
				brand_id: "a61289f2-77be-437c-bec6-1c3dd2396f12",
				brand_name: "Lion Pose",
				brand_page_link: "/brand/lion-pose",
			},
			{
				brand_id: "5b86f9df-2969-4ec5-b821-235b22c095e5",
				brand_name: "Living Proof",
				brand_page_link: "/brand/living-proof",
			},
			{
				brand_id: "5aefbded-cee2-44ee-81b8-70b637f73f17",
				brand_name: "LoveShackFancy",
				brand_page_link: "/brand/loveshackfancy",
			},
			{
				brand_id: "d4454246-c8d7-4b16-b060-a4cdb2064f4c",
				brand_name: "Luna Daily",
				brand_page_link: "/brand/luna-daily",
			},
			{
				brand_id: "e65682f5-103d-4530-b196-763374cb5c8b",
				brand_name: "LYS Beauty",
				brand_page_link: "/brand/lys-beauty",
			},
			{
				brand_id: "8add26f4-3e34-467d-8321-fc326115017b",
				brand_name: "MACRENE actives",
				brand_page_link: "/brand/macrene-actives",
			},
			{
				brand_id: "a432faad-9de4-4e6a-ab5b-23728a729707",
				brand_name: "Maison Louis Marie",
				brand_page_link: "/brand/maison-louis-marie",
			},
			{
				brand_id: "aa664d2a-29ac-4a71-bd7b-284170e1fdcc",
				brand_name: "Maison Margiela",
				brand_page_link: "/brand/maison-margiela",
			},
			{
				brand_id: "c31136cd-9f0d-4ee5-bf9a-4ef86c288a61",
				brand_name: "MAKE UP FOR EVER",
				brand_page_link: "/brand/make-up-for-ever",
			},
			{
				brand_id: "ba1c9632-25c4-47de-9750-fbbf49adc818",
				brand_name: "The Maker",
				brand_page_link: "/brand/the-maker",
			},
			{
				brand_id: "edfd04e4-fc27-41f0-af10-4718a6e21fbc",
				brand_name: "MAKEUP BY MARIO",
				brand_page_link: "/brand/makeup-by-mario",
			},
			{
				brand_id: "75c77470-40d7-4a2d-a704-79fc4e43d519",
				brand_name: "Mane",
				brand_page_link: "/brand/mane",
			},
			{
				brand_id: "f094acfa-1715-4a2e-ba32-4bb667de8fc2",
				brand_name: "Mango People",
				brand_page_link: "/brand/mango-people",
			},
			{
				brand_id: "55e56447-f87a-4cd7-9c09-a8173cae68bd",
				brand_name: "MARA",
				brand_page_link: "/brand/mara",
			},
			{
				brand_id: "46a2493d-cc3b-4fda-92fc-97c8822ef2f9",
				brand_name: "Marc Jacobs Fragrances",
				brand_page_link: "/brand/marc-jacobs-fragrances",
			},
			{
				brand_id: "306c8eb0-c246-4e5b-978f-6a760e172dcc",
				brand_name: "Mario Badescu",
				brand_page_link: "/brand/mario-badescu",
			},
			{
				brand_id: "69574edf-e107-438d-ab81-35e8c0715ccf",
				brand_name: "MATTER OF FACT",
				brand_page_link: "/brand/matter-of-fact",
			},
			{
				brand_id: "bed51468-4834-4b5d-b3e7-a106c2988293",
				brand_name: "maude",
				brand_page_link: "/brand/maude",
			},
			{
				brand_id: "5d2fdcce-2be5-4dc4-bdc7-c9e2bbd0238f",
				brand_name: "Melanin Haircare",
				brand_page_link: "/brand/melanin-haircare",
			},
			{
				brand_id: "3f8fce35-b32c-4217-bace-d173617986ef",
				brand_name: "Melt Cosmetics",
				brand_page_link: "/brand/melt-cosmetics",
			},
			{
				brand_id: "a0d7eedc-dbb0-41e4-b074-2f9db6d38728",
				brand_name: "MERIT",
				brand_page_link: "/brand/merit",
			},
			{
				brand_id: "cd81e533-5f7d-488a-b5c6-e29acb01e05b",
				brand_name: "Milk Makeup",
				brand_page_link: "/brand/milk-makeup",
			},
			{
				brand_id: "90399b07-1503-4206-b56e-d901299d3bb0",
				brand_name: "Mizani",
				brand_page_link: "/brand/mizani",
			},
			{
				brand_id: "86001cd4-bea0-471c-bec8-90bcd8bf357d",
				brand_name: "Montblanc",
				brand_page_link: "/brand/montblanc",
			},
			{
				brand_id: "5574eb5c-d027-47ac-8a99-2ecbd227b4ec",
				brand_name: "Moon Juice",
				brand_page_link: "/brand/moon-juice",
			},
			{
				brand_id: "150a3254-c871-4c29-86fe-621a09a35925",
				brand_name: "Moroccanoil",
				brand_page_link: "/brand/moroccanoil",
			},
			{
				brand_id: "a7fc79d2-bbf3-4595-b94f-dd2befee29ae",
				brand_name: "Mount Lai",
				brand_page_link: "/brand/mount-lai",
			},
			{
				brand_id: "4be719dc-0ee7-4436-9fa5-b199550be345",
				brand_name: "Mugler",
				brand_page_link: "/brand/mugler",
			},
			{
				brand_id: "411352da-8fff-4d95-8c1f-aab6ab6ebbfe",
				brand_name: "Murad",
				brand_page_link: "/brand/murad",
			},
			{
				brand_id: "c5c6364d-1596-468f-b042-201ae6b29e6c",
				brand_name: "NAILS INC.",
				brand_page_link: "/brand/nails-inc",
			},
			{
				brand_id: "735819a6-8a14-45eb-8241-22ba1d850a87",
				brand_name: "NARS",
				brand_page_link: "/brand/nars",
			},
			{
				brand_id: "305874d8-49b6-4022-a274-b00edc261c56",
				brand_name: "Natasha Denona",
				brand_page_link: "/brand/natasha-denona",
			},
			{
				brand_id: "6958b9d7-bcab-464b-8a7e-32b87168fbb5",
				brand_name: "Naturally Serious",
				brand_page_link: "/brand/naturally-serious",
			},
			{
				brand_id: "414d759c-e5e3-4112-8b56-4451b90e645f",
				brand_name: "Nécessaire",
				brand_page_link: "/brand/necessaire",
			},
			{
				brand_id: "513e7098-5489-483c-b24e-9501de9a04f8",
				brand_name: "NEST New York",
				brand_page_link: "/brand/nest",
			},
			{
				brand_id: "a2ec968e-fd09-4441-a3c6-a2d9a3869f28",
				brand_name: "Nette",
				brand_page_link: "/brand/nette",
			},
			{
				brand_id: "524dcfb3-a618-43fb-9f32-0b506b13c78b",
				brand_name: "NUDESTIX",
				brand_page_link: "/brand/nudestix",
			},
			{
				brand_id: "8d3d13f8-7373-4184-a88f-93b259901ce3",
				brand_name: "The Nue Co.",
				brand_page_link: "/brand/the-nue-co",
			},
			{
				brand_id: "3a19346b-011d-444f-bb6a-38c3856525a8",
				brand_name: "NuFACE",
				brand_page_link: "/brand/nuface",
			},
			{
				brand_id: "e67742b1-08a5-4e49-8d5d-af0705625b8e",
				brand_name: "Nutrafol",
				brand_page_link: "/brand/nutrafol",
			},
			{
				brand_id: "bd602fa9-6297-4940-8a6f-fc94d877d903",
				brand_name: "Olaplex",
				brand_page_link: "/brand/olaplex",
			},
			{
				brand_id: "be4b94f0-841f-4a60-bd97-402f8fc39431",
				brand_name: "OLEHENRIKSEN",
				brand_page_link: "/brand/ole-henriksen",
			},
			{
				brand_id: "61ce0c12-4ea4-4f42-aec1-6fe93a006ded",
				brand_name: "ONE/SIZE by Patrick Starrr",
				brand_page_link: "/brand/one-size-by-patrick-starrr",
			},
			{
				brand_id: "6fa47605-9f3d-4b0e-83c9-952815bba6f9",
				brand_name: "The Ordinary",
				brand_page_link: "/brand/the-ordinary",
			},
			{
				brand_id: "6bd6b835-c8f0-47fb-9828-0a7e1bc70e74",
				brand_name: "Oribe",
				brand_page_link: "/brand/oribe",
			},
			{
				brand_id: "db775cdd-65fa-48e9-881f-550cccb251fd",
				brand_name: "The Original MakeUp Eraser",
				brand_page_link: "/brand/makeup-eraser",
			},
			{
				brand_id: "3babc906-cb69-46ea-911a-53e33b7c7da5",
				brand_name: "Origins",
				brand_page_link: "/brand/origins",
			},
			{
				brand_id: "e1f6c7fd-00b7-42bb-b7bf-22237d0b9cc5",
				brand_name: "OTHERLAND",
				brand_page_link: "/brand/otherland",
			},
			{
				brand_id: "786b1424-4b03-4f8d-a00a-9d0bc602039d",
				brand_name: "OUAI",
				brand_page_link: "/brand/ouai-haircare",
			},
			{
				brand_id: "525ebd7f-3b20-427c-863f-2460f5e7ef7f",
				brand_name: "OUI the People",
				brand_page_link: "/brand/oui-the-people",
			},
			{
				brand_id: "e55112e5-9f53-4521-868f-a4e773034c4d",
				brand_name: "The Outset",
				brand_page_link: "/the-outset",
			},
			{
				brand_id: "5fafa163-3d98-440b-ae3f-199541757995",
				brand_name: "Overose",
				brand_page_link: "/brand/overose",
			},
			{
				brand_id: "5dc9e243-0e2a-4c94-a187-fb5820e621f3",
				brand_name: "PAT McGRATH LABS",
				brand_page_link: "/brand/pat-mcgrath-labs",
			},
			{
				brand_id: "70e2d12c-65c8-4883-93c3-d51c5598bf8e",
				brand_name: "PATRICK TA",
				brand_page_link: "/brand/patrick-ta",
			},
			{
				brand_id: "ec38f741-68ea-429f-9e58-4a6e345901cb",
				brand_name: "PATTERN by Tracee Ellis Ross",
				brand_page_link: "/brand/pattern-beauty-by-tracee-ellis-ross",
			},
			{
				brand_id: "caa53d67-87b4-4a3a-83f4-3962d1f604c7",
				brand_name: "Paula's Choice",
				brand_page_link: "/brand/paulas-choice",
			},
			{
				brand_id: "419f08b2-97ac-48e3-959f-5208ed5545aa",
				brand_name: "Peace Out",
				brand_page_link: "/brand/peace-out",
			},
			{
				brand_id: "85ac575c-49fc-4e77-8ca1-3c722a43535a",
				brand_name: "Peter Thomas Roth",
				brand_page_link: "/brand/peter-thomas-roth",
			},
			{
				brand_id: "f4c1567e-e0e8-4fb7-9af3-648b25a66a77",
				brand_name: "PHLUR",
				brand_page_link: "/brand/phlur",
			},
			{
				brand_id: "a851482c-ae3b-4d19-b128-c071e08497fc",
				brand_name: "PMD",
				brand_page_link: "/brand/pmd",
			},
			{
				brand_id: "136b23a0-f93a-4581-8523-c897d19a5a0c",
				brand_name: "Prada",
				brand_page_link: "/brand/prada",
			},
			{
				brand_id: "14f59552-3b5f-472c-83d3-4ea9a67fb6aa",
				brand_name: "Prada Beauty",
				brand_page_link: "/brand/prada-beauty",
			},
			{
				brand_id: "3a5cdf99-f540-4bc6-beb0-51427f174279",
				brand_name: "Prima",
				brand_page_link: "/brand/prima",
			},
			{
				brand_id: "63f09330-c004-4b5b-8f55-b07545dcb269",
				brand_name: "Pureology",
				brand_page_link: "/brand/pureology",
			},
			{
				brand_id: "19e58b8f-8cdf-4f52-aef7-a592a56164c0",
				brand_name: "Rabanne",
				brand_page_link: "/brand/paco-rabanne",
			},
			{
				brand_id: "fd9cdeb8-081d-40d6-8083-796e9f3491a3",
				brand_name: "Rahua",
				brand_page_link: "/brand/rahua",
			},
			{
				brand_id: "20726b75-5f03-41c0-93a8-9274a065a93d",
				brand_name: "Ralph Lauren",
				brand_page_link: "/brand/ralph-lauren",
			},
			{
				brand_id: "21e1f704-f475-4ee5-8345-8a629678f41a",
				brand_name: "RANAVAT",
				brand_page_link: "/brand/ranavat",
			},
			{
				brand_id: "6a0e623b-249b-418a-8bc3-9002b075528e",
				brand_name: "Rare Beauty by Selena Gomez",
				brand_page_link: "/brand/rare-beauty-by-selena-gomez",
			},
			{
				brand_id: "722b8b15-9124-4d44-8c71-794aa53051a8",
				brand_name: "REFY",
				brand_page_link: "/brand/refy-beauty",
			},
			{
				brand_id: "53eedc31-dc9b-446e-b4d5-04ae6a557f91",
				brand_name: "REN Clean Skincare",
				brand_page_link: "/brand/ren",
			},
			{
				brand_id: "2256cd57-ade6-4bf6-8868-a578d08cff6e",
				brand_name: "Reverie",
				brand_page_link: "/brand/reverie",
			},
			{
				brand_id: "a0d76366-c05d-45be-88a7-37e689afa75b",
				brand_name: "RIES",
				brand_page_link: "/brand/ries",
			},
			{
				brand_id: "af96c07a-ee23-4e6c-95f5-900825909675",
				brand_name: "The Rootist",
				brand_page_link: "/brand/the-rootist",
			},
			{
				brand_id: "6b8af57e-b7bc-47c6-92c8-3dcf5a3883b0",
				brand_name: "ROSE INC",
				brand_page_link: "/brand/rose-inc",
			},
			{
				brand_id: "5e993201-40b4-4728-acbd-14a4ada9c25a",
				brand_name: "ROSE Ingleton MD",
				brand_page_link: "/brand/rose-ingleton-md",
			},
			{
				brand_id: "87fa178a-5761-422f-919f-ff6c00036f8c",
				brand_name: "Rosebud Perfume Co.",
				brand_page_link: "/brand/rosebud-perfume-co",
			},
			{
				brand_id: "e2b03fec-8b21-4a5c-9a03-df95d7465278",
				brand_name: "Rossano Ferretti Parma",
				brand_page_link: "/brand/rossano-ferretti-parma",
			},
			{
				brand_id: "fe130325-411e-46c1-a3f0-c8c7c731456a",
				brand_name: "Saie",
				brand_page_link: "/brand/saie",
			},
			{
				brand_id: "677fc73e-b33d-41a0-b89f-713d8b95b588",
				brand_name: "Saint Jane",
				brand_page_link: "/brand/saint-jane-beauty",
			},
			{
				brand_id: "dfa8d1d9-6d7f-4245-bd39-ed5df6f1a8a7",
				brand_name: "Salt & Stone",
				brand_page_link: "/brand/salt-stone",
			},
			{
				brand_id: "c5dea9e9-2db6-4778-b46f-9b4e0d807b89",
				brand_name: "SEPHORA COLLECTION",
				brand_page_link: "/brand/sephora-collection",
			},
			{
				brand_id: "89fc38d7-14e1-41dc-8a86-203b257cdae5",
				brand_name: "Sephora Favorites",
				brand_page_link: "/brand/sephora-favorites",
			},
			{
				brand_id: "1dde0c38-1fae-432a-b5a9-0b0e5c896a52",
				brand_name: "Shani Darden Skin Care",
				brand_page_link: "/brand/shani-darden",
			},
			{
				brand_id: "ba94a185-5941-474b-b0be-72fb5681420e",
				brand_name: "Shark Beauty",
				brand_page_link: "/brand/shark-beauty",
			},
			{
				brand_id: "40a00474-863e-41e9-83d6-6032906588a4",
				brand_name: "SHAZ & KIKS",
				brand_page_link: "/brand/shaz-kiks",
			},
			{
				brand_id: "e667e69c-ac10-407e-91ef-74c560f071d1",
				brand_name: "Shiseido",
				brand_page_link: "/brand/shiseido",
			},
			{
				brand_id: "897a2175-a073-4604-824c-7d82e71b51d3",
				brand_name: "shu uemura",
				brand_page_link: "/brand/shu-uemura",
			},
			{
				brand_id: "193aff90-4cc8-4544-b333-bedaccfe76d6",
				brand_name: "SIMIHAZE BEAUTY",
				brand_page_link: "/brand/simihaze",
			},
			{
				brand_id: "a3d8382b-5d12-4ac8-8c8a-fd329f599905",
				brand_name: "SK-II",
				brand_page_link: "/brand/sk-ii",
			},
			{
				brand_id: "24981484-28b0-487c-ac88-1d9d62b6cb37",
				brand_name: "Skin Laundry",
				brand_page_link: "/brand/skin-laundry",
			},
			{
				brand_id: "2fb0b54e-8251-4378-8cb8-47a8cf9c0457",
				brand_name: "Skinfix",
				brand_page_link: "/brand/skinfix",
			},
			{
				brand_id: "0b600cac-17ca-45b7-9ef4-bbfa2db15400",
				brand_name: "Skylar",
				brand_page_link: "/brand/skylar",
			},
			{
				brand_id: "81bedcef-07d5-43ff-a101-81ca62522d21",
				brand_name: "Slip",
				brand_page_link: "/brand/slip",
			},
			{
				brand_id: "a0514346-09d3-46df-a5c7-d56883a61c45",
				brand_name: "Smashbox",
				brand_page_link: "/brand/smashbox",
			},
			{
				brand_id: "f368133d-68d6-4d85-ab13-72cfffd03de0",
				brand_name: "Smile Makers",
				brand_page_link: "/brand/smile-makers",
			},
			{
				brand_id: "9e7a9b48-36b0-409b-bdf1-c3576e52845a",
				brand_name: "Soft Services",
				brand_page_link: "/brand/soft-services",
			},
			{
				brand_id: "107ce7d8-06d6-4464-87fe-9691f934a4e5",
				brand_name: "Sol de Janeiro",
				brand_page_link: "/brand/sol-de-janeiro",
			},
			{
				brand_id: "c9d5a644-a8d0-4fcd-a873-b6546b8b8549",
				brand_name: "Soleil Toujours",
				brand_page_link: "/brand/soleil-toujours",
			},
			{
				brand_id: "70189257-4bf5-4d44-89a0-a3c610635e11",
				brand_name: "Sourse",
				brand_page_link: "/brand/sourse",
			},
			{
				brand_id: "08d11fc5-7662-4226-a1e7-7b22227a0a5e",
				brand_name: "St. Tropez",
				brand_page_link: "/brand/st-tropez-tanning-essentials",
			},
			{
				brand_id: "b939881c-6731-4247-b6db-e269fdccb6bb",
				brand_name: "stila",
				brand_page_link: "/brand/stila",
			},
			{
				brand_id: "db1c0f3f-1e51-4cc8-b05e-d739a6261115",
				brand_name: "Stripes",
				brand_page_link: "/brand/stripes",
			},
			{
				brand_id: "c666919c-2a58-4444-b061-6e90cf04e34d",
				brand_name: "StriVectin",
				brand_page_link: "/brand/strivectin",
			},
			{
				brand_id: "1d9d43f5-9203-49d9-b0cd-9930cbb6a907",
				brand_name: "Sulwhasoo",
				brand_page_link: "/brand/sulwhasoo",
			},
			{
				brand_id: "1fd42ce6-2ab0-4ea6-b9f5-2b0fa5b095bc",
				brand_name: "Summer Fridays",
				brand_page_link: "/brand/summer-fridays",
			},
			{
				brand_id: "7ba09a7f-f412-4aab-aa63-d12234f24469",
				brand_name: "SUNDAY II SUNDAY",
				brand_page_link: "/brand/sunday-ii-sunday",
			},
			{
				brand_id: "c94e439c-9321-4b1e-a732-d6c74eda15ef",
				brand_name: "Sunday Riley",
				brand_page_link: "/brand/sunday-riley",
			},
			{
				brand_id: "39a9288e-7697-461f-89ba-2a881229feac",
				brand_name: "Supergoop!",
				brand_page_link: "/brand/supergoop",
			},
			{
				brand_id: "160a4ea7-34ab-4a4f-8fbd-fe4daf8e6cab",
				brand_name: "superzero",
				brand_page_link: "/brand/superzero",
			},
			{
				brand_id: "eedd3a8a-a88d-47db-8c80-db82da4b4f8b",
				brand_name: "Susteau",
				brand_page_link: "/brand/susteau",
			},
			{
				brand_id: "f926e813-a2ed-4d10-b480-ba19322ecf80",
				brand_name: "T3",
				brand_page_link: "/brand/t3",
			},
			{
				brand_id: "a024f9d2-545e-493c-876f-4d58e68092c1",
				brand_name: "Tabu",
				brand_page_link: "/brand/tabu",
			},
			{
				brand_id: "5278a194-b3d1-4ab6-bcaf-2e9c3c7e84a9",
				brand_name: "TAN-LUXE",
				brand_page_link: "/brand/tan-luxe",
			},
			{
				brand_id: "abaa804f-22c3-4add-9ee5-665f7593acfd",
				brand_name: "tarte",
				brand_page_link: "/brand/tarte",
			},
			{
				brand_id: "5ee5daa2-79d2-4014-906d-baab05cf9cb3",
				brand_name: "Tata Harper",
				brand_page_link: "/brand/tata-harper",
			},
			{
				brand_id: "cabf24cd-b900-4ef7-b864-0f4aa68044c4",
				brand_name: "Tatcha",
				brand_page_link: "/brand/tatcha",
			},
			{
				brand_id: "a83d7511-c7ff-4211-b47b-1b0f25deb7b8",
				brand_name: "TOM FORD",
				brand_page_link: "/brand/tom-ford",
			},
			{
				brand_id: "747111d9-80a3-4468-a5de-95c0519533ea",
				brand_name: "Too Faced",
				brand_page_link: "/brand/too-faced",
			},
			{
				brand_id: "e08bb920-f884-46fe-9ca1-7247783f4780",
				brand_name: "Topicals",
				brand_page_link: "/brand/topicals",
			},
			{
				brand_id: "af9b4573-225b-41a9-b4bf-d0fc98886697",
				brand_name: "Touchland",
				brand_page_link: "/brand/touchland",
			},
			{
				brand_id: "96939c5f-5e48-49d6-8d95-255406b07f0b",
				brand_name: "Tower 28 Beauty",
				brand_page_link: "/brand/tower-28",
			},
			{
				brand_id: "43f0c5ee-5ce7-430d-91c4-d315cd164bf8",
				brand_name: "TULA Skincare",
				brand_page_link: "/brand/tula-skincare",
			},
			{
				brand_id: "f703cf6e-73d8-44b5-ac3c-a66b25889b74",
				brand_name: "TWEEZERMAN",
				brand_page_link: "/brand/tweezerman",
			},
			{
				brand_id: "68af0a28-2bab-45c4-a4dc-cae6afafd846",
				brand_name: "Urban Decay",
				brand_page_link: "/brand/urban-decay",
			},
			{
				brand_id: "2f6e9fad-219c-4efe-90cd-e2d8b2da89c2",
				brand_name: "Valentino",
				brand_page_link: "/brand/valentino",
			},
			{
				brand_id: "37d75c9d-c9cf-4db5-a758-c23fe9eeae48",
				brand_name: "Vegamour",
				brand_page_link: "/brand/vegamour",
			},
			{
				brand_id: "305747d7-ec6e-4757-80db-d2843ab073e3",
				brand_name: "Velour Lashes",
				brand_page_link: "/brand/velour-lashes",
			},
			{
				brand_id: "3d97aa42-7e0c-4523-8dc0-b0fb08ec48e2",
				brand_name: "Verb",
				brand_page_link: "/brand/verb-hair-care",
			},
			{
				brand_id: "d5ab2464-184a-4b7c-8003-ad3e837e65a1",
				brand_name: "Versace",
				brand_page_link: "/brand/versace",
			},
			{
				brand_id: "4aad6c83-1e4c-435f-9fa8-65120e1660f7",
				brand_name: "Viktor&Rolf",
				brand_page_link: "/brand/viktor-rolf",
			},
			{
				brand_id: "3994372e-9297-45ec-8c01-13f4a25c2121",
				brand_name: "Violet Voss",
				brand_page_link: "/brand/violet-voss",
			},
			{
				brand_id: "b8c62452-64cc-46d8-a85f-e87fdebe3d5e",
				brand_name: "Viori",
				brand_page_link: "/brand/viori",
			},
			{
				brand_id: "35d5eda9-d61c-4309-a905-e323a48283a0",
				brand_name: "Virtue",
				brand_page_link: "/brand/virtue",
			},
			{
				brand_id: "77810804-a8a8-4b13-b017-dfc4bd1a80f5",
				brand_name: "Viseart",
				brand_page_link: "/brand/viseart",
			},
			{
				brand_id: "6982dd26-751c-4588-98ce-5a4f6ddbbbd7",
				brand_name: "Voluspa",
				brand_page_link: "/brand/voluspa",
			},
			{
				brand_id: "911bf3fc-c113-400c-9f86-c9b75bfb57ed",
				brand_name: "Wander Beauty",
				brand_page_link: "/brand/wander-beauty",
			},
			{
				brand_id: "1c2edb7b-a7a3-4800-a812-5dc1ec721274",
				brand_name: "Westman Atelier",
				brand_page_link: "/brand/westman-atelier",
			},
			{
				brand_id: "c4ad7371-b887-4209-b9c2-efcd6197e5c9",
				brand_name: "Wishful",
				brand_page_link: "/brand/wishful-by-huda",
			},
			{
				brand_id: "00a99d38-9235-4672-a0a0-06afbad1905e",
				brand_name: "World of Chris Collins",
				brand_page_link: "/brand/chris-collins",
			},
			{
				brand_id: "c067c98e-b18f-4a33-8c2e-0c534ce50bfd",
				brand_name: "Youth To The People",
				brand_page_link: "/brand/youth-to-the-people",
			},
			{
				brand_id: "9a37ecae-9473-4e87-8551-1ce03369a241",
				brand_name: "Yves Saint Laurent",
				brand_page_link: "/brand/yves-saint-laurent",
			},
			{
				brand_id: "41f9409f-81f1-420b-aef6-dfb1c9d97442",
				brand_name: "19-69",
				brand_page_link: "/brand/19-69",
			},
			{
				brand_id: "2db760b5-d701-47d1-8544-2cf3e11ff843",
				brand_name: "5 SENS",
				brand_page_link: "/brand/5-sens",
			},
			{
				brand_id: "fb742489-b7f4-48a6-ac24-621b77ca723c",
				brand_name: "54 Thrones",
				brand_page_link: "/brand/54-thrones",
			},
			{
				brand_id: "b6cd2aed-0b75-4c24-be20-24484ec0ca38",
				brand_name: "The 7 Virtues",
				brand_page_link: "/brand/7-virtues",
			},
		];

		const allUltaBrands = [
			{
				brand_id: "0d52ac78-072f-4105-b320-e71215dc81ff",
				brand_name: "about-face",
				brand_page_link: "https://www.ulta.com/brand/about-face",
			},
			{
				brand_id: "a28265e1-4577-44a8-b0d7-fb40beda804e",
				brand_name: "ACURE",
				brand_page_link: "https://www.ulta.com/brand/acure",
			},
			{
				brand_id: "c8efdb74-6558-4e17-a3fd-03576078b7d1",
				brand_name: "af94",
				brand_page_link: "https://www.ulta.com/brand/af94",
			},
			{
				brand_id: "1b8d9fa3-e7c0-4bbd-8a31-122e7c2c2f77",
				brand_name: "AG Care",
				brand_page_link: "https://www.ulta.com/brand/ag-care",
			},
			{
				brand_id: "da63cfbe-8b85-44ef-9cf9-4f5896492352",
				brand_name: "Ahava",
				brand_page_link: "https://www.ulta.com/brand/ahava",
			},
			{
				brand_id: "dc9380de-182e-453d-8674-1401192bcb07",
				brand_name: "Alterna",
				brand_page_link: "https://www.ulta.com/brand/alterna",
			},
			{
				brand_id: "9355a7ec-a34d-4171-8286-fdbe41343c14",
				brand_name: "American Crew",
				brand_page_link: "https://www.ulta.com/brand/american-crew",
			},
			{
				brand_id: "db88c2df-ac8e-449a-86a8-2691b70f5568",
				brand_name: "AmLactin",
				brand_page_link: "https://www.ulta.com/brand/amlactin",
			},
			{
				brand_id: "67037db1-a134-41cc-a61b-f3613eff9e48",
				brand_name: "Anastasia Beverly Hills",
				brand_page_link:
					"https://www.ulta.com/brand/anastasia-beverly-hills",
			},
			{
				brand_id: "a454cb91-af9c-4732-898d-440095623b5d",
				brand_name: "Andalou Naturals",
				brand_page_link: "https://www.ulta.com/brand/andalou-naturals",
			},
			{
				brand_id: "511b6145-aee0-4cd5-8791-2a3d5df2dfa2",
				brand_name: "Andrew Fitzsimons",
				brand_page_link: "https://www.ulta.com/brand/andrew-fitzsimons",
			},
			{
				brand_id: "2dd377a9-ce13-487d-a7b1-e6cfa9b1b930",
				brand_name: "Aquage",
				brand_page_link: "https://www.ulta.com/brand/aquage",
			},
			{
				brand_id: "c9cd5c0b-9449-4ab2-833f-a58c80bfb1b9",
				brand_name: "Aquaphor",
				brand_page_link: "https://www.ulta.com/brand/aquaphor",
			},
			{
				brand_id: "29cb7524-4095-4025-9a30-66735f8046b4",
				brand_name: "Aquis",
				brand_page_link: "https://www.ulta.com/brand/aquis",
			},
			{
				brand_id: "302cddc6-75c8-4769-a7f5-7898a4ac0b5c",
				brand_name: "Arctic Fox",
				brand_page_link: "https://www.ulta.com/brand/arctic-fox",
			},
			{
				brand_id: "c1a7dc79-a00e-4890-ad23-0f47ec347a7f",
				brand_name: "Ardell",
				brand_page_link: "https://www.ulta.com/brand/ardell",
			},
			{
				brand_id: "c0099e47-0f1f-47a1-8cfe-c2b591d738b2",
				brand_name: "Ariana Grande",
				brand_page_link: "https://www.ulta.com/brand/ariana-grande",
			},
			{
				brand_id: "64e465f7-8a09-48ae-b75f-130936e7c783",
				brand_name: "ARMANI",
				brand_page_link: "https://www.ulta.com/brand/armani",
			},
			{
				brand_id: "e26c6e29-1784-4a79-8be5-0770b4840629",
				brand_name: "Australian Gold",
				brand_page_link: "https://www.ulta.com/brand/australian-gold",
			},
			{
				brand_id: "382b2c27-e437-4fcc-b318-1dfed06943c3",
				brand_name: "Aveeno",
				brand_page_link: "https://www.ulta.com/brand/aveeno",
			},
			{
				brand_id: "0c1db790-c072-49d5-a36f-a68e10934b7f",
				brand_name: "Avène",
				brand_page_link: "https://www.ulta.com/brand/avene",
			},
			{
				brand_id: "192e0e29-3002-463e-8336-780846648154",
				brand_name: "Azzaro",
				brand_page_link: "https://www.ulta.com/brand/azzaro",
			},
			{
				brand_id: "eee44850-87b6-4c3b-9612-14736cf367a8",
				brand_name: "b.tan",
				brand_page_link: "https://www.ulta.com/brand/btan",
			},
			{
				brand_id: "6ff03175-ab58-42d1-b7b1-ceb608614d20",
				brand_name: "Baby Foot",
				brand_page_link: "https://www.ulta.com/brand/baby-foot",
			},
			{
				brand_id: "671dca83-f6b7-4ff0-bdd1-e7da609ecf6b",
				brand_name: "BaBylissPRO",
				brand_page_link: "https://www.ulta.com/brand/babylisspro",
			},
			{
				brand_id: "60e2b3dc-b220-4468-aa9b-8de56fe61f5b",
				brand_name: "Bali Body",
				brand_page_link: "https://www.ulta.com/brand/bali-body",
			},
			{
				brand_id: "0a1186dd-8f06-416b-914f-e4772ee43e2b",
				brand_name: "Banila Co",
				brand_page_link: "https://www.ulta.com/brand/banila-co",
			},
			{
				brand_id: "fec09a4e-1e67-4079-bf65-383996281177",
				brand_name: "bareMinerals",
				brand_page_link: "https://www.ulta.com/brand/bareminerals",
			},
			{
				brand_id: "50b58250-c11b-4bd8-b067-e3a371223504",
				brand_name: "Batiste",
				brand_page_link: "https://www.ulta.com/brand/batiste",
			},
			{
				brand_id: "0e2d1fb8-beae-4f60-addb-9c71c6626cc5",
				brand_name: "Beachwaver Co.",
				brand_page_link: "https://www.ulta.com/brand/beachwaver-co",
			},
			{
				brand_id: "77045a4f-f60f-4eac-a1a3-9e17c1c4c676",
				brand_name: "Beast",
				brand_page_link: "https://www.ulta.com/brand/beast",
			},
			{
				brand_id: "b9ec988d-aafa-47e2-a63a-b84d8074e1b6",
				brand_name: "Beauty Bakerie",
				brand_page_link: "https://www.ulta.com/brand/beauty-bakerie",
			},
			{
				brand_id: "dee83676-e930-418c-8bbd-b4432544913d",
				brand_name: "Beauty Finds by ULTA Beauty",
				brand_page_link:
					"https://www.ulta.com/brand/beauty-finds-by-ulta-beauty",
			},
			{
				brand_id: "5008f160-fef4-4cde-8ab3-01592613cb2c",
				brand_name: "BeautyBio",
				brand_page_link: "https://www.ulta.com/brand/beautybio",
			},
			{
				brand_id: "62a0cd8b-04fd-4d50-bf42-331b3b1e4490",
				brand_name: "beautyblender",
				brand_page_link: "https://www.ulta.com/brand/beautyblender",
			},
			{
				brand_id: "bd8f4cc5-61f6-451a-8cdc-b7563da67cda",
				brand_name: "Beautycounter",
				brand_page_link: "https://www.ulta.com/brand/beautycounter",
			},
			{
				brand_id: "098e4402-0e41-4488-952f-3cfe4cf3d68f",
				brand_name: "BeautyStat Cosmetics",
				brand_page_link:
					"https://www.ulta.com/brand/beautystat-cosmetics",
			},
			{
				brand_id: "4b8eef9b-52e4-4f96-a513-89f139bc8ec6",
				brand_name: "Bed Head",
				brand_page_link: "https://www.ulta.com/brand/bed-head",
			},
			{
				brand_id: "37edb8bb-2cc2-4636-8412-580d93f1a7fd",
				brand_name: "Beekman 1802",
				brand_page_link: "https://www.ulta.com/brand/beekman-1802",
			},
			{
				brand_id: "f35ef7e5-20ad-4763-b640-d339a14cbe18",
				brand_name: "belif",
				brand_page_link: "https://www.ulta.com/brand/belif",
			},
			{
				brand_id: "82f4563d-6145-4183-a9cb-fea7eca9214f",
				brand_name: "Benefit Cosmetics",
				brand_page_link: "https://www.ulta.com/brand/benefit-cosmetics",
			},
			{
				brand_id: "7febe5c8-4c67-460a-b6d2-135d2b7251e5",
				brand_name: "Better Not Younger",
				brand_page_link:
					"https://www.ulta.com/brand/better-not-younger",
			},
			{
				brand_id: "883fe46f-f69d-4c67-b57e-b5aee072f809",
				brand_name: "BETTER WORLD FRAGRANCE HOUSE",
				brand_page_link:
					"https://www.ulta.com/brand/better-world-fragrance-house",
			},
			{
				brand_id: "14c22681-2fd4-473f-b728-4c3d1813c245",
				brand_name: "BEVEL",
				brand_page_link: "https://www.ulta.com/brand/bevel",
			},
			{
				brand_id: "9ddbf850-b7d8-4878-a287-557997880714",
				brand_name: "billie",
				brand_page_link: "https://www.ulta.com/brand/billie",
			},
			{
				brand_id: "dc439cca-e274-43c6-9013-bf3f90b2387b",
				brand_name: "Billie Eilish",
				brand_page_link: "https://www.ulta.com/brand/billie-eilish",
			},
			{
				brand_id: "b5d73ba9-7860-483d-9c93-9313b53b854f",
				brand_name: "Billy Jealousy",
				brand_page_link: "https://www.ulta.com/brand/billy-jealousy",
			},
			{
				brand_id: "ef4c4b30-70be-4e36-8491-265d32c607e5",
				brand_name: "Bio Ionic",
				brand_page_link: "https://www.ulta.com/brand/bio-ionic",
			},
			{
				brand_id: "7d585ecf-5f6d-4bf2-b3e1-2b03abc1f3e6",
				brand_name: "Bio-Oil",
				brand_page_link: "https://www.ulta.com/brand/bio-oil",
			},
			{
				brand_id: "3b48a3ad-6fd6-4aa9-acec-3125b90efbfe",
				brand_name: "Biolage",
				brand_page_link: "https://www.ulta.com/brand/biolage",
			},
			{
				brand_id: "b5199292-3671-49fd-939f-c2e1cef480ed",
				brand_name: "Bioré",
				brand_page_link: "https://www.ulta.com/brand/biore",
			},
			{
				brand_id: "d9f96012-678b-4ee6-a988-382f442c8355",
				brand_name: "Biosilk",
				brand_page_link: "https://www.ulta.com/brand/biosilk",
			},
			{
				brand_id: "9edc96ad-1e9e-4c14-870a-f004b71bd8e2",
				brand_name: "Black Girl Sunscreen",
				brand_page_link:
					"https://www.ulta.com/brand/black-girl-sunscreen",
			},
			{
				brand_id: "e68f1b13-a3ec-4d78-a310-8aa0fef6d107",
				brand_name: "Blind Barber",
				brand_page_link: "https://www.ulta.com/brand/blind-barber",
			},
			{
				brand_id: "8eb623f2-7096-4c56-beba-71b48b52ad0a",
				brand_name: "Bliss",
				brand_page_link: "https://www.ulta.com/brand/bliss",
			},
			{
				brand_id: "9ead5fbe-10c7-4181-a5ca-95bf79e2439d",
				brand_name: "BLK/OPL",
				brand_page_link: "https://www.ulta.com/brand/blkopl",
			},
			{
				brand_id: "2a61b772-2ff2-45d7-aeb9-3ef173f5e8c5",
				brand_name: "BLONDME",
				brand_page_link: "https://www.ulta.com/brand/blondme",
			},
			{
				brand_id: "9e1851b6-acee-45cb-af19-39fe023de7f3",
				brand_name: "BLOSSOM",
				brand_page_link: "https://www.ulta.com/brand/blossom",
			},
			{
				brand_id: "a322e847-2a16-4166-87d7-f1488a7921a7",
				brand_name: "BLUE LIZARD AUSTRALIAN SUNSCREEN",
				brand_page_link:
					"https://www.ulta.com/brand/blue-lizard-australian-sunscreen",
			},
			{
				brand_id: "3ae721f1-ffef-45ce-8365-57e8375b1301",
				brand_name: "BLUME",
				brand_page_link: "https://www.ulta.com/brand/blume",
			},
			{
				brand_id: "d646c2ec-f7d4-47a7-8083-763575cadea7",
				brand_name: "BOBBI BROWN",
				brand_page_link: "https://www.ulta.com/brand/bobbi-brown",
			},
			{
				brand_id: "e8d8f0e6-2bd1-4223-8971-7dd621a3c5d7",
				brand_name: "BOKA",
				brand_page_link: "https://www.ulta.com/brand/boka",
			},
			{
				brand_id: "89faf3da-ebd9-45b7-a79b-0067ce7c3d04",
				brand_name: "Bondi Boost",
				brand_page_link: "https://www.ulta.com/brand/bondi-boost",
			},
			{
				brand_id: "e6ce069c-6b91-4e79-b677-a1437717821e",
				brand_name: "Bondi Sands",
				brand_page_link: "https://www.ulta.com/brand/bondi-sands",
			},
			{
				brand_id: "676c85b4-6f27-42ed-aea6-a0a24f88a382",
				brand_name: "boscia",
				brand_page_link: "https://www.ulta.com/brand/boscia",
			},
			{
				brand_id: "003683c1-542d-45fe-a6ee-ad85a88f1a84",
				brand_name: "BosleyMD",
				brand_page_link: "https://www.ulta.com/brand/bosleymd",
			},
			{
				brand_id: "3de304d3-99d6-49cb-832e-132a597a32f0",
				brand_name: "Braun",
				brand_page_link: "https://www.ulta.com/brand/braun",
			},
			{
				brand_id: "65457516-f85e-41c2-b88d-042eb176e447",
				brand_name: "BREAD BEAUTY SUPPLY",
				brand_page_link:
					"https://www.ulta.com/brand/bread-beauty-supply",
			},
			{
				brand_id: "9f19731a-1eb9-4fca-a690-1aa4929d4126",
				brand_name: "BREEZE BALM",
				brand_page_link: "https://www.ulta.com/brand/breeze-balm",
			},
			{
				brand_id: "a964a063-75d8-4a75-853c-7c5a21934388",
				brand_name: "Briogeo",
				brand_page_link: "https://www.ulta.com/brand/briogeo",
			},
			{
				brand_id: "2c79beda-fdb7-4bba-9053-8b59bb5498fe",
				brand_name: "Bubble",
				brand_page_link: "https://www.ulta.com/brand/bubble",
			},
			{
				brand_id: "015f5cbc-92c3-4346-8cf2-ddaea6bf2172",
				brand_name: "Bumble and bumble",
				brand_page_link: "https://www.ulta.com/brand/bumble-bumble",
			},
			{
				brand_id: "b5433b49-52cb-4250-a26e-665d3c225698",
				brand_name: "Burberry",
				brand_page_link: "https://www.ulta.com/brand/burberry",
			},
			{
				brand_id: "5a9ddca5-0c98-4cd9-b879-90c3d589b98f",
				brand_name: "Burt's Bees",
				brand_page_link: "https://www.ulta.com/brand/burts-bees",
			},
			{
				brand_id: "7a8e66aa-9ce5-40ed-b5a7-c35348f900bb",
				brand_name: "Bushbalm",
				brand_page_link: "https://www.ulta.com/brand/bushbalm",
			},
			{
				brand_id: "4bee1b67-dfee-45c7-acaa-d9f23ad1c988",
				brand_name: "Buttah Skin",
				brand_page_link: "https://www.ulta.com/brand/buttah-skin",
			},
			{
				brand_id: "8aa2dae4-b159-491e-9e9b-b1075b90ffc6",
				brand_name: "Buxom",
				brand_page_link: "https://www.ulta.com/brand/buxom",
			},
			{
				brand_id: "2b6eb208-67e2-4b8e-a74c-5358cebd27fd",
				brand_name: "BYOMA",
				brand_page_link: "https://www.ulta.com/brand/byoma",
			},
			{
				brand_id: "6d6c3f4c-1fc0-4c76-ac18-0037e94982c7",
				brand_name: "Caboodles",
				brand_page_link: "https://www.ulta.com/brand/caboodles",
			},
			{
				brand_id: "ca39adc0-fb30-45f4-be23-e2755acb471b",
				brand_name: "Calvin Klein",
				brand_page_link: "https://www.ulta.com/brand/calvin-klein",
			},
			{
				brand_id: "4b052d20-f459-4b25-8ad6-71f5f0feaa5b",
				brand_name: "Camille Rose",
				brand_page_link: "https://www.ulta.com/brand/camille-rose",
			},
			{
				brand_id: "616209e0-1272-463f-9ec1-adf78152cd62",
				brand_name: "Candier",
				brand_page_link: "https://www.ulta.com/brand/candier",
			},
			{
				brand_id: "3a0fa4ac-352c-4f61-9061-9a9322d6f23b",
				brand_name: "Capelli New York",
				brand_page_link: "https://www.ulta.com/brand/capelli-new-york",
			},
			{
				brand_id: "b0a25a23-25e3-4d18-801a-0564ac0826f9",
				brand_name: "Carbon Theory.",
				brand_page_link: "https://www.ulta.com/brand/carbon-theory",
			},
			{
				brand_id: "298068eb-87a9-4834-a35a-00797abf9c02",
				brand_name: "Carol's Daughter",
				brand_page_link: "https://www.ulta.com/brand/carols-daughter",
			},
			{
				brand_id: "15ff4c51-9d71-4686-8e90-894840726965",
				brand_name: "Carolina Herrera",
				brand_page_link: "https://www.ulta.com/brand/carolina-herrera",
			},
			{
				brand_id: "d0d942ab-3883-47bb-96ff-74925f956dd3",
				brand_name: "Céla",
				brand_page_link: "https://www.ulta.com/brand/cela",
			},
			{
				brand_id: "4552b51f-09b8-4136-8b80-c51ce0d94c15",
				brand_name: "CeraVe",
				brand_page_link: "https://www.ulta.com/brand/cerave",
			},
			{
				brand_id: "bb4862f4-6404-44c2-9191-3cdb6a0d50a9",
				brand_name: "Cetaphil",
				brand_page_link: "https://www.ulta.com/brand/cetaphil",
			},
			{
				brand_id: "fdc63af9-1c77-43a5-9c6b-715d7eb1a04c",
				brand_name: "CHANEL",
				brand_page_link: "https://www.ulta.com/brand/chanel",
			},
			{
				brand_id: "909d4b44-6b79-47c2-bde2-11c6f0f2f6c7",
				brand_name: "Charlotte Tilbury",
				brand_page_link: "https://www.ulta.com/brand/charlotte-tilbury",
			},
			{
				brand_id: "3bdf41c8-2744-49b1-bfbc-79c8f1609ad1",
				brand_name: "Chi",
				brand_page_link: "https://www.ulta.com/brand/chi",
			},
			{
				brand_id: "1f920b3f-0cb5-4bdc-9c79-f893aaac68b1",
				brand_name: "China Glaze",
				brand_page_link: "https://www.ulta.com/brand/china-glaze",
			},
			{
				brand_id: "92ce175b-f499-44db-8656-9698f7767ccc",
				brand_name: "Chloé",
				brand_page_link: "https://www.ulta.com/brand/chloe",
			},
			{
				brand_id: "fe8c6652-6894-48c9-9e97-5ffd9db15ba3",
				brand_name: "Clairol",
				brand_page_link: "https://www.ulta.com/brand/clairol",
			},
			{
				brand_id: "2cfb2be1-8ced-4631-80b1-ce8631453b44",
				brand_name: "Clarins",
				brand_page_link: "https://www.ulta.com/brand/clarins",
			},
			{
				brand_id: "cedb1efa-aeb3-4651-bfb3-70f10dcf6ef7",
				brand_name: "Clean",
				brand_page_link: "https://www.ulta.com/brand/clean",
			},
			{
				brand_id: "85db35d7-cd15-4738-9a91-0a45e0fac0ec",
				brand_name: "Clinique",
				brand_page_link: "https://www.ulta.com/brand/clinique",
			},
			{
				brand_id: "06857830-b460-423a-af18-4b743674f4dd",
				brand_name: "CND",
				brand_page_link: "https://www.ulta.com/brand/cnd",
			},
			{
				brand_id: "6abc0090-5324-4843-95af-87bcec9c5a8e",
				brand_name: "Coach",
				brand_page_link: "https://www.ulta.com/brand/coach",
			},
			{
				brand_id: "518683cf-12cb-46ed-9c0c-af52b186f4fc",
				brand_name: "Coco & Eve",
				brand_page_link: "https://www.ulta.com/brand/coco-eve",
			},
			{
				brand_id: "5ebcdf94-a9d8-4a22-a387-3740b5c8af61",
				brand_name: "cocokind",
				brand_page_link: "https://www.ulta.com/brand/cocokind",
			},
			{
				brand_id: "ccdd5ac8-60a0-49a8-a951-ec98722d5433",
				brand_name: "Color Wow",
				brand_page_link: "https://www.ulta.com/brand/color-wow",
			},
			{
				brand_id: "de3d749e-6f2a-4f25-8e4c-5460bb000419",
				brand_name: "ColourPop",
				brand_page_link: "https://www.ulta.com/brand/colourpop",
			},
			{
				brand_id: "98d47eb8-43de-4be3-a951-bb6709041ec6",
				brand_name: "Conair",
				brand_page_link: "https://www.ulta.com/brand/conair",
			},
			{
				brand_id: "6034461f-f70b-41c1-97cb-e3dc4c57b3e6",
				brand_name: "COOLA",
				brand_page_link: "https://www.ulta.com/brand/coola",
			},
			{
				brand_id: "9bb4398e-8b4c-4d98-bdf5-4125f866a5a7",
				brand_name: "COSRX",
				brand_page_link: "https://www.ulta.com/brand/cosrx",
			},
			{
				brand_id: "acc76792-999f-4536-9724-cc216d849a5d",
				brand_name: "CoTz",
				brand_page_link: "https://www.ulta.com/brand/cotz",
			},
			{
				brand_id: "07cb23a7-3fff-4eab-84ae-24028c4760c3",
				brand_name: "CoverGirl",
				brand_page_link: "https://www.ulta.com/brand/covergirl",
			},
			{
				brand_id: "9cab3b28-e11a-4e5a-8bc4-0669423d0541",
				brand_name: "Crave",
				brand_page_link: "https://www.ulta.com/brand/crave",
			},
			{
				brand_id: "87246be3-75d7-41b4-9ff3-4256b00fee48",
				brand_name: "Crepe Erase",
				brand_page_link: "https://www.ulta.com/brand/crepe-erase",
			},
			{
				brand_id: "f1871b13-cd78-4ea7-b649-5e1bc8de35ed",
				brand_name: "Cricket",
				brand_page_link: "https://www.ulta.com/brand/cricket",
			},
			{
				brand_id: "cb3cdec9-3635-49ff-b732-7d5d98a09896",
				brand_name: "CROC",
				brand_page_link: "https://www.ulta.com/brand/croc",
			},
			{
				brand_id: "5f68f5b2-a896-475c-b0d6-d213d845bb66",
				brand_name: "CurlMix",
				brand_page_link: "https://www.ulta.com/brand/curlmix",
			},
			{
				brand_id: "51048bae-6fd9-4ae2-b107-53e1ebeff9cc",
				brand_name: "CURLS",
				brand_page_link: "https://www.ulta.com/brand/curls",
			},
			{
				brand_id: "5a89d717-e219-45a3-af94-300a67f0b48c",
				brand_name: "Curlsmith",
				brand_page_link: "https://www.ulta.com/brand/curlsmith",
			},
			{
				brand_id: "1645bcaf-44ac-46c6-ac48-55fb3e2d109c",
				brand_name: "Da Bomb",
				brand_page_link: "https://www.ulta.com/brand/da-bomb",
			},
			{
				brand_id: "d350ba32-8b87-4c63-9223-ae97e93231a9",
				brand_name: "Daily Concepts",
				brand_page_link: "https://www.ulta.com/brand/daily-concepts",
			},
			{
				brand_id: "b086fa76-bb61-4449-bde5-8058532544e4",
				brand_name: "Dashing Diva",
				brand_page_link: "https://www.ulta.com/brand/dashing-diva",
			},
			{
				brand_id: "13711154-5ca9-4b79-a8ca-8988373db7c2",
				brand_name: "Denman",
				brand_page_link: "https://www.ulta.com/brand/denman",
			},
			{
				brand_id: "a8114658-145a-4c4f-95d1-bc7d5842ca14",
				brand_name: "DERMA E",
				brand_page_link: "https://www.ulta.com/brand/derma-e",
			},
			{
				brand_id: "5a47a052-1051-428c-8f35-a71ae2c13527",
				brand_name: "Dermablend",
				brand_page_link: "https://www.ulta.com/brand/dermablend",
			},
			{
				brand_id: "995315fd-62c4-4327-91df-12f8387724ef",
				brand_name: "DERMAFLASH",
				brand_page_link: "https://www.ulta.com/brand/dermaflash",
			},
			{
				brand_id: "0a5dad77-a9b8-490b-8628-74862164c824",
				brand_name: "Dermalogica",
				brand_page_link: "https://www.ulta.com/brand/dermalogica",
			},
			{
				brand_id: "4aabb517-54a0-4e0a-b59e-43d2655cbe9d",
				brand_name: "Design Essentials",
				brand_page_link: "https://www.ulta.com/brand/design-essentials",
			},
			{
				brand_id: "9e3ae2e3-a1bf-4089-a2c7-b32e98d59aa9",
				brand_name: "DevaCurl",
				brand_page_link: "https://www.ulta.com/brand/devacurl",
			},
			{
				brand_id: "7fdd3a8b-df46-43a1-976d-956d8ccbbb20",
				brand_name: "DHC",
				brand_page_link: "https://www.ulta.com/brand/dhc",
			},
			{
				brand_id: "8db7c671-858f-4a88-9bfe-513b5bb730a0",
				brand_name: "Diane",
				brand_page_link: "https://www.ulta.com/brand/diane",
			},
			{
				brand_id: "05e69433-c5b3-41f9-ae42-f3cbd2f40660",
				brand_name: "Differin",
				brand_page_link: "https://www.ulta.com/brand/differin",
			},
			{
				brand_id: "c9238dfa-e034-422f-8df5-a996d0827dfc",
				brand_name: "DIME",
				brand_page_link: "https://www.ulta.com/brand/dime",
			},
			{
				brand_id: "97be69b4-79ba-451a-b646-2e690ecca8e8",
				brand_name: "Dionis",
				brand_page_link: "https://www.ulta.com/brand/dionis",
			},
			{
				brand_id: "e10dc721-9e08-48e9-a9da-54d0989b1d8f",
				brand_name: "Dior",
				brand_page_link: "https://www.ulta.com/brand/dior",
			},
			{
				brand_id: "a6410005-3a44-4aba-ac9c-ff00b24f32b8",
				brand_name: "Divi",
				brand_page_link: "https://www.ulta.com/brand/divi",
			},
			{
				brand_id: "b3bb688c-c8c6-4567-9f19-f4cc6eaa0372",
				brand_name: "DKNY",
				brand_page_link: "https://www.ulta.com/brand/dkny",
			},
			{
				brand_id: "55a7294a-2bb0-4f9b-ae98-a8bf56657c62",
				brand_name: "Dolce Glow",
				brand_page_link: "https://www.ulta.com/brand/dolce-glow",
			},
			{
				brand_id: "41cc16fc-5724-473d-989a-74f952577716",
				brand_name: "Dolce&Gabbana",
				brand_page_link: "https://www.ulta.com/brand/dolce-gabbana",
			},
			{
				brand_id: "5756f24e-2b5c-4fcf-b978-9a2c9e380db3",
				brand_name: "Donna Karan",
				brand_page_link: "https://www.ulta.com/brand/donna-karan",
			},
			{
				brand_id: "5d6be9d0-565b-427e-b795-9bbd7d05e76f",
				brand_name: "DONNA'S RECIPE",
				brand_page_link: "https://www.ulta.com/brand/donnas-recipe",
			},
			{
				brand_id: "b35ac0af-b3ea-4073-b9fd-7d738907d645",
				brand_name: "dpHUE",
				brand_page_link: "https://www.ulta.com/brand/dphue",
			},
			{
				brand_id: "96c8711c-64b3-4449-86dd-18d78eace857",
				brand_name: "Dr Teal's",
				brand_page_link: "https://www.ulta.com/brand/dr-teals",
			},
			{
				brand_id: "4e23ab02-fbea-446c-85eb-771175239c88",
				brand_name: "Dr. Brandt",
				brand_page_link: "https://www.ulta.com/brand/dr-brandt",
			},
			{
				brand_id: "0ba84b69-5511-48fc-bc4e-9d84aecdde6d",
				brand_name: "Dr. PAWPAW",
				brand_page_link: "https://www.ulta.com/brand/dr-pawpaw",
			},
			{
				brand_id: "445e7658-ef19-416f-93fa-7b9733c739b5",
				brand_name: "Drunk Elephant",
				brand_page_link: "https://www.ulta.com/brand/drunk-elephant",
			},
			{
				brand_id: "e7535318-8bc8-4007-bbb3-b94c3c0c34be",
				brand_name: "Drybar",
				brand_page_link: "https://www.ulta.com/brand/drybar",
			},
			{
				brand_id: "d473be0d-6d1a-4d65-b99b-e677daa74053",
				brand_name: "Duke Cannon Supply Co",
				brand_page_link:
					"https://www.ulta.com/brand/duke-cannon-supply-co",
			},
			{
				brand_id: "bf507a04-b156-4dbb-9e50-bea953f10feb",
				brand_name: "DUNE SUNCARE",
				brand_page_link: "https://www.ulta.com/brand/dune-suncare",
			},
			{
				brand_id: "5826e917-32ba-463d-85b1-93f70c874817",
				brand_name: "Dyson",
				brand_page_link: "https://www.ulta.com/brand/dyson",
			},
			{
				brand_id: "c0eeeb3a-db41-4c98-9c0b-3e1595e038a2",
				brand_name: "e.l.f. Cosmetics",
				brand_page_link: "https://www.ulta.com/brand/elf-cosmetics",
			},
			{
				brand_id: "4491c288-daa6-4501-aa16-9f1065c57d1c",
				brand_name: "Each & Every",
				brand_page_link: "https://www.ulta.com/brand/each-every",
			},
			{
				brand_id: "4b73052a-f09d-4da2-8beb-df69b3f7bc41",
				brand_name: "Earth Harbor",
				brand_page_link: "https://www.ulta.com/brand/earth-harbor",
			},
			{
				brand_id: "1ae12a33-e647-4478-8439-e34ccd0f9d08",
				brand_name: "Earth Therapeutics",
				brand_page_link:
					"https://www.ulta.com/brand/earth-therapeutics",
			},
			{
				brand_id: "4e3663ad-e3e8-4e39-9f18-e82d5e180df6",
				brand_name: "Eau de Juice",
				brand_page_link: "https://www.ulta.com/brand/eau-de-juice",
			},
			{
				brand_id: "d374117a-a947-45f6-902c-919e1f6a0c7c",
				brand_name: "Eco Style",
				brand_page_link: "https://www.ulta.com/brand/eco-style",
			},
			{
				brand_id: "645c70f5-9f94-43c3-8395-44e8852fb97d",
				brand_name: "EcoTools",
				brand_page_link: "https://www.ulta.com/brand/ecotools",
			},
			{
				brand_id: "dbec7354-121c-4402-b240-a63395b57eb7",
				brand_name: "Eczema Honey",
				brand_page_link: "https://www.ulta.com/brand/eczema-honey",
			},
			{
				brand_id: "8190479d-3941-4a8a-a805-da2626fac963",
				brand_name: "ELEMIS",
				brand_page_link: "https://www.ulta.com/brand/elemis",
			},
			{
				brand_id: "ea5890f0-8fbc-499a-b207-d18bb7497e33",
				brand_name: "EleVen by Venus Williams",
				brand_page_link:
					"https://www.ulta.com/brand/eleven-by-venus-williams",
			},
			{
				brand_id: "7f9210f2-6189-435f-b713-8e4699df7ffe",
				brand_name: "Elizabeth Arden",
				brand_page_link: "https://www.ulta.com/brand/elizabeth-arden",
			},
			{
				brand_id: "f4daaf5e-cd18-4008-9429-b897c4a7831b",
				brand_name: "Ellis Brooklyn",
				brand_page_link: "https://www.ulta.com/brand/ellis-brooklyn",
			},
			{
				brand_id: "aa3da9f0-648e-454b-aae9-a6fbaac43ae9",
				brand_name: "Eos",
				brand_page_link: "https://www.ulta.com/brand/eos",
			},
			{
				brand_id: "cc31ebed-0072-4dd7-854c-3e324fb9c4f2",
				brand_name: "Erborian",
				brand_page_link: "https://www.ulta.com/brand/erborian",
			},
			{
				brand_id: "d060232c-77ee-4a18-8a15-6d61f337b38b",
				brand_name: "Ere Perez",
				brand_page_link: "https://www.ulta.com/brand/ere-perez",
			},
			{
				brand_id: "2ca3c0ae-c33c-4e5f-8a4a-4c63eed94f52",
				brand_name: "Escada",
				brand_page_link: "https://www.ulta.com/brand/escada",
			},
			{
				brand_id: "dbbd6166-ac45-4b00-a3f2-026007431e53",
				brand_name: "Essence",
				brand_page_link: "https://www.ulta.com/brand/essence",
			},
			{
				brand_id: "fb21f79d-fc11-48ed-bbb8-55b8d72d1c3d",
				brand_name: "Essie",
				brand_page_link: "https://www.ulta.com/brand/essie",
			},
			{
				brand_id: "9477aec7-241e-468c-8328-05ef1e9f2e06",
				brand_name: "Estée Lauder",
				brand_page_link: "https://www.ulta.com/brand/estee-lauder",
			},
			{
				brand_id: "f362c3ea-01b9-4de8-9746-d3ef03f2740e",
				brand_name: "Eva Nyc",
				brand_page_link: "https://www.ulta.com/brand/eva-nyc",
			},
			{
				brand_id: "1ea36dff-0b83-4076-b7ad-31e1aa6806f7",
				brand_name: "Everpro",
				brand_page_link: "https://www.ulta.com/brand/everpro",
			},
			{
				brand_id: "018fe828-f239-4d8b-9a06-7ddf0b1ded36",
				brand_name: "Every Man Jack",
				brand_page_link: "https://www.ulta.com/brand/every-man-jack",
			},
			{
				brand_id: "e9ea9eaf-33f1-41d2-bf76-7816cb379d6f",
				brand_name: "Evian Mineral Spray",
				brand_page_link:
					"https://www.ulta.com/brand/evian-mineral-spray",
			},
			{
				brand_id: "8ed2cec9-bbc5-4ab7-bbe5-eb11d8fb2f9a",
				brand_name: "Exa",
				brand_page_link: "https://www.ulta.com/brand/exa",
			},
			{
				brand_id: "4836687c-a9db-4b3b-bd73-dd6192e0ab7a",
				brand_name: "Exuviance",
				brand_page_link: "https://www.ulta.com/brand/exuviance",
			},
			{
				brand_id: "47e07445-1b46-4cac-aba0-e6f086e177e6",
				brand_name: "Eyeko",
				brand_page_link: "https://www.ulta.com/brand/eyeko",
			},
			{
				brand_id: "cbe08dc0-a22e-458b-989a-fe934864be7d",
				brand_name: "Eylure",
				brand_page_link: "https://www.ulta.com/brand/eylure",
			},
			{
				brand_id: "6d354930-947e-439f-a766-d343eb2e47af",
				brand_name: "Fairy Tales",
				brand_page_link: "https://www.ulta.com/brand/fairy-tales",
			},
			{
				brand_id: "e514246c-7487-4ae3-abb2-6e795a679b29",
				brand_name: "FEKKAI",
				brand_page_link: "https://www.ulta.com/brand/fekkai",
			},
			{
				brand_id: "60a4bb37-6901-4c84-a1b8-cc08a20537c6",
				brand_name: "FENTY BEAUTY by Rihanna",
				brand_page_link:
					"https://www.ulta.com/brand/fenty-beauty-by-rihanna",
			},
			{
				brand_id: "15c2c37d-0c34-4cb9-9362-e25369e4efe0",
				brand_name: "First Aid Beauty",
				brand_page_link: "https://www.ulta.com/brand/first-aid-beauty",
			},
			{
				brand_id: "0865a784-b45f-49a0-a760-55bfdf29cdda",
				brand_name: "Flawless by Finishing Touch",
				brand_page_link:
					"https://www.ulta.com/brand/flawless-by-finishing-touch",
			},
			{
				brand_id: "4ffe257f-0a13-4826-bdd3-1e7b7d127946",
				brand_name: "Flora & Noor",
				brand_page_link: "https://www.ulta.com/brand/flora-noor",
			},
			{
				brand_id: "c6302d32-1208-4726-87eb-ffb426b07ea7",
				brand_name: "florence by mills",
				brand_page_link: "https://www.ulta.com/brand/florence-by-mills",
			},
			{
				brand_id: "b0072705-82ec-4a78-93fc-651c3f19c398",
				brand_name: "FLOWER Beauty",
				brand_page_link: "https://www.ulta.com/brand/flower-beauty",
			},
			{
				brand_id: "794bfa1f-4e52-4170-b5d6-45dcaa02ca61",
				brand_name: "Flowery",
				brand_page_link: "https://www.ulta.com/brand/flowery",
			},
			{
				brand_id: "3bde200d-b5a5-47d3-9373-968122071f65",
				brand_name: "FOREO",
				brand_page_link: "https://www.ulta.com/brand/foreo",
			},
			{
				brand_id: "b509321d-2d0a-4b73-b08d-e71f06aaa615",
				brand_name: "Foria",
				brand_page_link: "https://www.ulta.com/brand/foria",
			},
			{
				brand_id: "18cafc62-bda3-45b4-846f-bcc7df4e2bd2",
				brand_name: "Fourth Ray Beauty",
				brand_page_link: "https://www.ulta.com/brand/fourth-ray-beauty",
			},
			{
				brand_id: "4ff92c6d-548d-4d19-9bfe-f7bb344e17ad",
				brand_name: "frank body",
				brand_page_link: "https://www.ulta.com/brand/frank-body",
			},
			{
				brand_id: "5d0d4c0c-4df5-4f43-bc41-73c91e46bc03",
				brand_name: "Freeman",
				brand_page_link: "https://www.ulta.com/brand/freeman",
			},
			{
				brand_id: "d4d32413-2aac-44bc-aacb-4735bf0276e2",
				brand_name: "fresh",
				brand_page_link: "https://www.ulta.com/brand/fresh",
			},
			{
				brand_id: "7b7a43be-dc01-42b3-bffc-c3bde287a1a5",
				brand_name: "Fromm",
				brand_page_link: "https://www.ulta.com/brand/fromm",
			},
			{
				brand_id: "ca88f5c6-d152-44dd-980f-6f896b82d3f5",
				brand_name: "Fur",
				brand_page_link: "https://www.ulta.com/brand/fur",
			},
			{
				brand_id: "d2138c37-bd70-4342-baf0-98cb71baacbe",
				brand_name: "Ga.Ma Italy Professional",
				brand_page_link:
					"https://www.ulta.com/brand/gama-italy-professional",
			},
			{
				brand_id: "e719f5b8-c357-40ba-94a4-4c17ee25341f",
				brand_name: "Garnier",
				brand_page_link: "https://www.ulta.com/brand/garnier",
			},
			{
				brand_id: "85c5037f-4981-4c5b-a4db-24973476fff7",
				brand_name: "Ghd",
				brand_page_link: "https://www.ulta.com/brand/ghd",
			},
			{
				brand_id: "ea2b2db5-4dfa-4623-bb6d-e044616945eb",
				brand_name: "Gigi",
				brand_page_link: "https://www.ulta.com/brand/gigi",
			},
			{
				brand_id: "3fa73670-897f-4ca2-8d82-09636fd0f6b2",
				brand_name: "Gillette",
				brand_page_link: "https://www.ulta.com/brand/gillette",
			},
			{
				brand_id: "e2c7c508-574b-43de-a295-25e708fea3aa",
				brand_name: "GIMME beauty",
				brand_page_link: "https://www.ulta.com/brand/gimme-beauty",
			},
			{
				brand_id: "e9d2185e-70fe-4e9c-bf08-9033bba19446",
				brand_name: "Givenchy",
				brand_page_link: "https://www.ulta.com/brand/givenchy",
			},
			{
				brand_id: "abfdfa18-8145-4720-ac19-60252b8780ee",
				brand_name: "GLAMGLOW",
				brand_page_link: "https://www.ulta.com/brand/glamglow",
			},
			{
				brand_id: "f3516422-2498-472d-ac8b-7c006ef5a551",
				brand_name: "Glamnetic",
				brand_page_link: "https://www.ulta.com/brand/glamnetic",
			},
			{
				brand_id: "cd288e58-46f7-4278-8553-87d2682a8562",
				brand_name: "GOLDE",
				brand_page_link: "https://www.ulta.com/brand/golde",
			},
			{
				brand_id: "ad2b2eb9-da10-4b66-8d21-31e30c9dc796",
				brand_name: "Goli Nutrition",
				brand_page_link: "https://www.ulta.com/brand/goli-nutrition",
			},
			{
				brand_id: "72967773-bb48-4601-89c5-77ec399746c3",
				brand_name: "Good Dye Young",
				brand_page_link: "https://www.ulta.com/brand/good-dye-young",
			},
			{
				brand_id: "2f5261a0-2e4c-41d5-9f65-4bc7d57db1a8",
				brand_name: "good light",
				brand_page_link: "https://www.ulta.com/brand/good-light",
			},
			{
				brand_id: "3f5b97ca-b09a-4d22-906f-7c5d8b2cb365",
				brand_name: "Good Molecules",
				brand_page_link: "https://www.ulta.com/brand/good-molecules",
			},
			{
				brand_id: "903c4ff4-7441-4990-8fe6-a028662537df",
				brand_name: "Got 2b",
				brand_page_link: "https://www.ulta.com/brand/got-2b",
			},
			{
				brand_id: "17a2d4d6-c3ff-4e0e-8810-0028d80e2e04",
				brand_name: "Grace Eleyae",
				brand_page_link: "https://www.ulta.com/brand/grace-eleyae",
			},
			{
				brand_id: "27f86232-5464-4edc-b07e-30d683fc17ee",
				brand_name: "Grande Cosmetics",
				brand_page_link: "https://www.ulta.com/brand/grande-cosmetics",
			},
			{
				brand_id: "dd508dbb-488a-4ab1-b0d5-2fadc96dfaa4",
				brand_name: "Groovi Beauty",
				brand_page_link: "https://www.ulta.com/brand/groovi-beauty",
			},
			{
				brand_id: "c7f8928c-b1aa-47f7-9038-2c7217351ff9",
				brand_name: "Grow Gorgeous",
				brand_page_link: "https://www.ulta.com/brand/grow-gorgeous",
			},
			{
				brand_id: "a4bc31d5-16b3-436d-b1bc-517e688822cd",
				brand_name: "Gucci",
				brand_page_link: "https://www.ulta.com/brand/gucci",
			},
			{
				brand_id: "634f0b7a-f620-43fa-9bb9-2965f7a70ad7",
				brand_name: "Guerlain",
				brand_page_link: "https://www.ulta.com/brand/guerlain",
			},
			{
				brand_id: "abc7917d-bd0c-4185-ba08-c221abb30665",
				brand_name: "HAIRtamin",
				brand_page_link: "https://www.ulta.com/brand/hairtamin",
			},
			{
				brand_id: "ca85a275-8bce-494f-a47c-435597353bdd",
				brand_name: "HALF MAGIC",
				brand_page_link: "https://www.ulta.com/brand/half-magic",
			},
			{
				brand_id: "2773733c-aebf-4794-b60f-f478a112ef5f",
				brand_name: "HALLY",
				brand_page_link: "https://www.ulta.com/brand/hally",
			},
			{
				brand_id: "56dd82f7-ada4-4283-a82c-159bbfd5b26b",
				brand_name: "HAN Skincare Cosmetics",
				brand_page_link:
					"https://www.ulta.com/brand/han-skincare-cosmetics",
			},
			{
				brand_id: "079f2607-20e8-4629-9532-70354ca6705f",
				brand_name: "hanahana beauty",
				brand_page_link: "https://www.ulta.com/brand/hanahana-beauty",
			},
			{
				brand_id: "be03899e-d8cc-4b85-b49b-7849fa955638",
				brand_name: "Hanskin",
				brand_page_link: "https://www.ulta.com/brand/hanskin",
			},
			{
				brand_id: "844c1c59-211c-48e5-aeef-0cfaab704121",
				brand_name: "Hask",
				brand_page_link: "https://www.ulta.com/brand/hask",
			},
			{
				brand_id: "f66828e6-8e77-4c3b-b8ec-1e065452c95f",
				brand_name: "Hempz",
				brand_page_link: "https://www.ulta.com/brand/hempz",
			},
			{
				brand_id: "87e98ec1-66bd-40ea-98a7-e876ba53961c",
				brand_name: "Heritage Store",
				brand_page_link: "https://www.ulta.com/brand/heritage-store",
			},
			{
				brand_id: "c112e13d-2427-4bf7-963f-9a1d5b8e6256",
				brand_name: "Hero Cosmetics",
				brand_page_link: "https://www.ulta.com/brand/hero-cosmetics",
			},
			{
				brand_id: "ab873e36-4abc-4fc6-bb53-d714f86c5a13",
				brand_name: "Hey Honey",
				brand_page_link: "https://www.ulta.com/brand/hey-honey",
			},
			{
				brand_id: "8f04ff55-be22-4298-9150-515bd7a0b8b1",
				brand_name: "HipDot",
				brand_page_link: "https://www.ulta.com/brand/hipdot",
			},
			{
				brand_id: "7f523f24-e8e9-47d2-ac28-1c67f0a3d80e",
				brand_name: "Hollywood Fashion Secrets",
				brand_page_link:
					"https://www.ulta.com/brand/hollywood-fashion-secrets",
			},
			{
				brand_id: "36b22437-abb2-4d00-ab8e-4fe9cddb0b0b",
				brand_name: "Homebody",
				brand_page_link: "https://www.ulta.com/brand/homebody",
			},
			{
				brand_id: "0ee7c13c-0eb0-4043-ad7e-ba0f95f57ec4",
				brand_name: "HomeWorx",
				brand_page_link: "https://www.ulta.com/brand/homeworx",
			},
			{
				brand_id: "34b246cb-4da1-48bf-857c-ca4d48b223c9",
				brand_name: "Honest Beauty",
				brand_page_link: "https://www.ulta.com/brand/honest-beauty",
			},
			{
				brand_id: "b927b7d4-328d-48d2-9181-420ba8525991",
				brand_name: "Hot Tools",
				brand_page_link: "https://www.ulta.com/brand/hot-tools",
			},
			{
				brand_id: "0dcf8cfd-44d2-423d-aa45-b1461968cbfb",
				brand_name: "HOURGLASS",
				brand_page_link: "https://www.ulta.com/brand/hourglass",
			},
			{
				brand_id: "3a5090eb-0dc7-4755-a971-d9015cc529aa",
				brand_name: "House of Lashes",
				brand_page_link: "https://www.ulta.com/brand/house-of-lashes",
			},
			{
				brand_id: "5ff35e0a-0e9f-4d4c-99f8-1ba275757531",
				brand_name: "Hustle Butter",
				brand_page_link: "https://www.ulta.com/brand/hustle-butter",
			},
			{
				brand_id: "05445f04-5097-4c9d-8d3d-2c36d98b8bfe",
				brand_name: "Hynt Beauty",
				brand_page_link: "https://www.ulta.com/brand/hynt-beauty",
			},
			{
				brand_id: "d633a79b-21a8-4766-8c82-7fa3cbf989ed",
				brand_name: "I Dew Care",
				brand_page_link: "https://www.ulta.com/brand/i-dew-care",
			},
			{
				brand_id: "948940cf-9c57-42e2-ba79-053a81f1e9cc",
				brand_name: "ICONIC LONDON",
				brand_page_link: "https://www.ulta.com/brand/iconic-london",
			},
			{
				brand_id: "e9f57e50-dbfc-4c53-9ff0-e4c73fe4d929",
				brand_name: "iDesign",
				brand_page_link: "https://www.ulta.com/brand/idesign",
			},
			{
				brand_id: "4431267b-d57b-42d3-9e1d-ef06a82f768e",
				brand_name: "IGK",
				brand_page_link: "https://www.ulta.com/brand/igk",
			},
			{
				brand_id: "c72047da-afa2-4bf0-8caf-a1d83fe2d1de",
				brand_name: "iHome",
				brand_page_link: "https://www.ulta.com/brand/ihome",
			},
			{
				brand_id: "7bf58bc8-8003-4747-b9c8-2c02e3de1b73",
				brand_name: "Impressions Vanity",
				brand_page_link:
					"https://www.ulta.com/brand/impressions-vanity",
			},
			{
				brand_id: "faae80a6-fcb3-4fdb-ae32-032644157e1c",
				brand_name: "Indeed Labs",
				brand_page_link: "https://www.ulta.com/brand/indeed-labs",
			},
			{
				brand_id: "b9c6afdf-e2cf-48ea-b785-47c78d5d5113",
				brand_name: "INDIE LEE",
				brand_page_link: "https://www.ulta.com/brand/indie-lee",
			},
			{
				brand_id: "d1c1b35a-79ed-45f3-af6a-907c14edccff",
				brand_name: "Innersense Organic Beauty",
				brand_page_link:
					"https://www.ulta.com/brand/innersense-organic-beauty",
			},
			{
				brand_id: "36a1cb8c-1c1f-4ada-a43f-bc78c362351a",
				brand_name: "INSERT NAME HERE",
				brand_page_link: "https://www.ulta.com/brand/insert-name-here",
			},
			{
				brand_id: "d0a0359d-1e78-4bff-8613-390f9d3925a7",
				brand_name: "Invisibobble",
				brand_page_link: "https://www.ulta.com/brand/invisibobble",
			},
			{
				brand_id: "551a2eff-1df8-4755-822b-6c616573e8f8",
				brand_name: "IT Brushes For ULTA",
				brand_page_link: "https://www.ulta.com/brand/it-brushes-ulta",
			},
			{
				brand_id: "5b7794b1-7dcb-409e-8288-adcec218bc58",
				brand_name: "IT Cosmetics",
				brand_page_link: "https://www.ulta.com/brand/it-cosmetics",
			},
			{
				brand_id: "01d8049c-89c4-4ae1-870d-200888b02070",
				brand_name: "It's A 10",
				brand_page_link: "https://www.ulta.com/brand/its-a-10",
			},
			{
				brand_id: "b3e8f6fa-4995-4fed-8052-a9c0029e8636",
				brand_name: "J.Cat Beauty",
				brand_page_link: "https://www.ulta.com/brand/jcat-beauty",
			},
			{
				brand_id: "d1c2662d-096e-48d3-b213-ca7f47b94efb",
				brand_name: "Jack Black",
				brand_page_link: "https://www.ulta.com/brand/jack-black",
			},
			{
				brand_id: "3bde9507-cc89-4266-a9de-0d1eb4ed3185",
				brand_name: "jane iredale",
				brand_page_link: "https://www.ulta.com/brand/jane-iredale",
			},
			{
				brand_id: "d8d45369-34dc-4bd9-8b43-d168c5c75ff9",
				brand_name: "Jean Paul Gaultier",
				brand_page_link:
					"https://www.ulta.com/brand/jean-paul-gaultier",
			},
			{
				brand_id: "58e4545e-018a-4da9-bc6e-98ddaffcb334",
				brand_name: "Jimmy Choo",
				brand_page_link: "https://www.ulta.com/brand/jimmy-choo",
			},
			{
				brand_id: "3cfa709b-1f01-46c7-8756-f254b6a88942",
				brand_name: "John Varvatos",
				brand_page_link: "https://www.ulta.com/brand/john-varvatos",
			},
			{
				brand_id: "c4f98209-7122-4c92-b021-f38f720683c5",
				brand_name: "Joico",
				brand_page_link: "https://www.ulta.com/brand/joico",
			},
			{
				brand_id: "0736e934-ca78-4390-9f6f-772a6ca92be3",
				brand_name: "Juice Beauty",
				brand_page_link: "https://www.ulta.com/brand/juice-beauty",
			},
			{
				brand_id: "5e9e2943-27f1-4897-8f65-ff7fc5da3208",
				brand_name: "Juicy Couture",
				brand_page_link: "https://www.ulta.com/brand/juicy-couture",
			},
			{
				brand_id: "3ab2142f-3e27-4110-90ce-0c028fcb9c86",
				brand_name: "Juvia's Place",
				brand_page_link: "https://www.ulta.com/brand/juvias-place",
			},
			{
				brand_id: "9c392bef-aeb2-4497-860c-6a180d87ca26",
				brand_name: "kaia naturals",
				brand_page_link: "https://www.ulta.com/brand/kaia-naturals",
			},
			{
				brand_id: "fc074cad-b9e1-4dac-ab86-92df98e4b4ae",
				brand_name: "Kate Somerville",
				brand_page_link: "https://www.ulta.com/brand/kate-somerville",
			},
			{
				brand_id: "cd7f5aea-83ce-4da4-aa30-92862ea0017c",
				brand_name: "Kate Spade New York",
				brand_page_link:
					"https://www.ulta.com/brand/kate-spade-new-york",
			},
			{
				brand_id: "39438f8b-2056-4e43-9301-e09ce9648cd9",
				brand_name: "Kenneth Cole New York",
				brand_page_link:
					"https://www.ulta.com/brand/kenneth-cole-new-york",
			},
			{
				brand_id: "374f2247-12e8-4a22-8b82-5e9b436d7e79",
				brand_name: "Kenra Professional",
				brand_page_link:
					"https://www.ulta.com/brand/kenra-professional",
			},
			{
				brand_id: "ab587a68-b01d-4849-9a67-c5290e82b8a1",
				brand_name: "Keracolor",
				brand_page_link: "https://www.ulta.com/brand/keracolor",
			},
			{
				brand_id: "bdc8cd54-566c-41c0-90da-1c81479f4e48",
				brand_name: "Keranique",
				brand_page_link: "https://www.ulta.com/brand/keranique",
			},
			{
				brand_id: "b2a538f6-6e3f-4285-b5e9-0a0372858892",
				brand_name: "Keratin Complex",
				brand_page_link: "https://www.ulta.com/brand/keratin-complex",
			},
			{
				brand_id: "4cbe1f63-8ca7-4225-a1d8-dfcd163a11da",
				brand_name: "Kiehl's Since 1851",
				brand_page_link: "https://www.ulta.com/brand/kiehls-since-1851",
			},
			{
				brand_id: "20ca4895-366e-4335-b035-1cf88a8ab0aa",
				brand_name: "KIKO Milano",
				brand_page_link: "https://www.ulta.com/brand/kiko-milano",
			},
			{
				brand_id: "b9251ce7-f61d-424f-b244-6da43e781a47",
				brand_name: "Kinship",
				brand_page_link: "https://www.ulta.com/brand/kinship",
			},
			{
				brand_id: "e278c474-4eac-4c58-8300-b79da24eb1f8",
				brand_name: "Kiss",
				brand_page_link: "https://www.ulta.com/brand/kiss",
			},
			{
				brand_id: "3b9900d2-77eb-415b-8756-ccf9684dc484",
				brand_name: "Kitsch",
				brand_page_link: "https://www.ulta.com/brand/kitsch",
			},
			{
				brand_id: "c1f46cf9-864a-4b35-8732-1fc07c6c34b3",
				brand_name: "Klairs",
				brand_page_link: "https://www.ulta.com/brand/klairs",
			},
			{
				brand_id: "f454c033-daed-48e8-ae6c-c0ca4a298ef6",
				brand_name: "Klorane",
				brand_page_link: "https://www.ulta.com/brand/klorane",
			},
			{
				brand_id: "93383cdd-58f1-413d-b777-d2d80f19ad0b",
				brand_name: "Kopari Beauty",
				brand_page_link: "https://www.ulta.com/brand/kopari-beauty",
			},
			{
				brand_id: "d2dd3867-a37c-4f71-b23b-6a6a75e80c2d",
				brand_name: "KORRES",
				brand_page_link: "https://www.ulta.com/brand/korres",
			},
			{
				brand_id: "db507432-0d75-46a2-913f-3275263131a9",
				brand_name: "Kreyòl Essence",
				brand_page_link: "https://www.ulta.com/brand/kreyol-essence",
			},
			{
				brand_id: "73938365-868a-4f33-8e51-58ae4ae7fd1d",
				brand_name: "KRISTIN ESS HAIR",
				brand_page_link: "https://www.ulta.com/brand/kristin-ess-hair",
			},
			{
				brand_id: "03bea069-c45f-42ac-867e-9b85aabe0ec2",
				brand_name: "KVD Beauty",
				brand_page_link: "https://www.ulta.com/brand/kvd-beauty",
			},
			{
				brand_id: "09fc9f89-0dbf-46b7-8dcc-10911d22ef5d",
				brand_name: "KYLIE COSMETICS",
				brand_page_link: "https://www.ulta.com/brand/kylie-cosmetics",
			},
			{
				brand_id: "3575c4e6-8940-4fca-a982-39d1bc0eeee6",
				brand_name: "KYLIE JENNER FRAGRANCES",
				brand_page_link:
					"https://www.ulta.com/brand/kylie-jenner-fragrances",
			},
			{
				brand_id: "0ae9d6ed-c2bf-4ef1-969a-9b964b8d98ba",
				brand_name: "KYLIE SKIN",
				brand_page_link: "https://www.ulta.com/brand/kylie-skin",
			},
			{
				brand_id: "0121b47d-90ee-44ab-bb39-02b770d28188",
				brand_name: "L.A. Girl",
				brand_page_link: "https://www.ulta.com/brand/la-girl",
			},
			{
				brand_id: "96ca897f-23c6-4a3e-a773-e1522b092cc9",
				brand_name: "L'ange",
				brand_page_link: "https://www.ulta.com/brand/lange",
			},
			{
				brand_id: "96fc7b82-0f28-437c-853b-995b16d69a22",
				brand_name: "L'anza",
				brand_page_link: "https://www.ulta.com/brand/lanza",
			},
			{
				brand_id: "82e6e133-e246-493a-86e2-cb88be68949f",
				brand_name: "L'Occitane",
				brand_page_link: "https://www.ulta.com/brand/loccitane",
			},
			{
				brand_id: "45c47f97-3d69-4920-b3ad-a35ae624ad16",
				brand_name: "L'Oréal",
				brand_page_link: "https://www.ulta.com/brand/loreal",
			},
			{
				brand_id: "4b302444-bb14-44a2-b338-18117e9ec760",
				brand_name: "La Roche-Posay",
				brand_page_link: "https://www.ulta.com/brand/la-roche-posay",
			},
			{
				brand_id: "718b15bd-0d72-4415-a825-dc0eacaa6ab5",
				brand_name: "Lake & Skye",
				brand_page_link: "https://www.ulta.com/brand/lake-skye",
			},
			{
				brand_id: "7b81b716-2999-4b6c-a08d-c83901fb515b",
				brand_name: "LAMIK Beauty",
				brand_page_link: "https://www.ulta.com/brand/lamik-beauty",
			},
			{
				brand_id: "2cdbd26f-5ec6-4ef9-8522-9ed870900c6e",
				brand_name: "Lancôme",
				brand_page_link: "https://www.ulta.com/brand/lancome",
			},
			{
				brand_id: "fd3c5c5b-69be-4e59-89c8-c3f14376928d",
				brand_name: "Lanolips",
				brand_page_link: "https://www.ulta.com/brand/lanolips",
			},
			{
				brand_id: "8a1117be-4f38-4175-b506-1e96380dfa98",
				brand_name: "Laura Mercier",
				brand_page_link: "https://www.ulta.com/brand/laura-mercier",
			},
			{
				brand_id: "b835c76c-3d0e-494b-aba9-dd56d5dfc69f",
				brand_name: "LAVANILA",
				brand_page_link: "https://www.ulta.com/brand/lavanila",
			},
			{
				brand_id: "576b487c-d95b-402c-b4b8-245cf3ad2460",
				brand_name: "Le Mini Macaron",
				brand_page_link: "https://www.ulta.com/brand/le-mini-macaron",
			},
			{
				brand_id: "a9317b3d-c702-4c3a-bf71-6baf73e81c03",
				brand_name: "LE MONDE GOURMAND",
				brand_page_link: "https://www.ulta.com/brand/le-monde-gourmand",
			},
			{
				brand_id: "e973dd36-a88b-4cfa-a5c0-8aa99904410e",
				brand_name: "Lemme",
				brand_page_link: "https://www.ulta.com/brand/lemme",
			},
			{
				brand_id: "ccbb68cf-d85b-4cc2-a6b6-da8a89a59930",
				brand_name: "Lilly Lashes",
				brand_page_link: "https://www.ulta.com/brand/lilly-lashes",
			},
			{
				brand_id: "48e90f7c-0045-438a-8074-dfb3aa490201",
				brand_name: "Lime Crime",
				brand_page_link: "https://www.ulta.com/brand/lime-crime",
			},
			{
				brand_id: "1c84ad27-96d6-4549-a3f1-9b56ce06d61f",
				brand_name: "Lip Smacker",
				brand_page_link: "https://www.ulta.com/brand/lip-smacker",
			},
			{
				brand_id: "f3971bb8-14a9-4467-85b6-c460e9f6cf86",
				brand_name: "LIQUID I.V.",
				brand_page_link: "https://www.ulta.com/brand/liquid-iv",
			},
			{
				brand_id: "4daee50c-544f-4b48-b1a3-3730005735dd",
				brand_name: "Live Tinted",
				brand_page_link: "https://www.ulta.com/brand/live-tinted",
			},
			{
				brand_id: "c04798f1-bcb7-40b1-9786-c721e70942dd",
				brand_name: "Living Proof",
				brand_page_link: "https://www.ulta.com/brand/living-proof",
			},
			{
				brand_id: "4f99ffc9-458f-4c8d-ad8d-fdcf226c519d",
				brand_name: "Locks & Mane",
				brand_page_link: "https://www.ulta.com/brand/locks-mane",
			},
			{
				brand_id: "ad9bb8ad-8f87-4e4a-8b9b-0ba3498fbacb",
				brand_name: "LolaVie",
				brand_page_link: "https://www.ulta.com/brand/lolavie",
			},
			{
				brand_id: "818adb56-1886-4a98-b2ec-7d4dba8ee127",
				brand_name: "Londontown",
				brand_page_link: "https://www.ulta.com/brand/londontown",
			},
			{
				brand_id: "b24b5edb-5eb4-4711-9dc2-a1d7580a1d8e",
				brand_name: "LOOPS",
				brand_page_link: "https://www.ulta.com/brand/loops",
			},
			{
				brand_id: "7c31f3a9-a7c4-4cc4-90fe-c64ff4f7aeb1",
				brand_name: "LORAC",
				brand_page_link: "https://www.ulta.com/brand/lorac",
			},
			{
				brand_id: "d589f2a7-762b-4a72-82d6-07e1b1612f6c",
				brand_name: "Lottie London",
				brand_page_link: "https://www.ulta.com/brand/lottie-london",
			},
			{
				brand_id: "77363686-81a8-4fb5-b668-12a408caf3e8",
				brand_name: "Love Wellness",
				brand_page_link: "https://www.ulta.com/brand/love-wellness",
			},
			{
				brand_id: "63689d85-efbe-477d-ad0d-223d53bfc873",
				brand_name: "Loving Tan",
				brand_page_link: "https://www.ulta.com/brand/loving-tan",
			},
			{
				brand_id: "b36bce28-8a6a-484a-909a-5e6d45f7291b",
				brand_name: "LUSH",
				brand_page_link: "https://www.ulta.com/brand/lush",
			},
			{
				brand_id: "89616813-ddd0-42f3-b5be-d277f917a527",
				brand_name: "LUV SCRUB",
				brand_page_link: "https://www.ulta.com/brand/luv-scrub",
			},
			{
				brand_id: "fe6000a1-3c9f-486e-a9b6-7c6b355d14f6",
				brand_name: "MAC",
				brand_page_link: "https://www.ulta.com/brand/mac",
			},
			{
				brand_id: "ce5c3bd4-8153-4b73-8041-05d0c12be0ae",
				brand_name: "Mad Hippie",
				brand_page_link: "https://www.ulta.com/brand/mad-hippie",
			},
			{
				brand_id: "cfbd3c4c-aa2d-4620-ba15-d47615bfbb87",
				brand_name: "Made By Dentists",
				brand_page_link: "https://www.ulta.com/brand/made-by-dentists",
			},
			{
				brand_id: "61ef9525-f749-4683-a83d-028ec25aaaa3",
				brand_name: "Madison Reed",
				brand_page_link: "https://www.ulta.com/brand/madison-reed",
			},
			{
				brand_id: "54251b4d-108c-4b07-b802-96869323e67c",
				brand_name: "MAËLYS Cosmetics",
				brand_page_link: "https://www.ulta.com/brand/maelys-cosmetics",
			},
			{
				brand_id: "ba3208d1-7315-4f03-85cf-5242bbdad7a6",
				brand_name: "Makeup Revolution",
				brand_page_link: "https://www.ulta.com/brand/makeup-revolution",
			},
			{
				brand_id: "4815ed52-9dbd-4fc2-bf2f-4e0083c6bef1",
				brand_name: "Manic Panic",
				brand_page_link: "https://www.ulta.com/brand/manic-panic",
			},
			{
				brand_id: "aed507b5-89e1-459f-b954-ec0f2d6aea56",
				brand_name: "MANNA KADAR BEAUTY",
				brand_page_link:
					"https://www.ulta.com/brand/manna-kadar-beauty",
			},
			{
				brand_id: "b7c8067b-17c0-40b7-a7ac-7131382afc4a",
				brand_name: "Marc Jacobs",
				brand_page_link: "https://www.ulta.com/brand/marc-jacobs",
			},
			{
				brand_id: "8efa8dbf-a31e-41f6-a774-05e8a8426bdf",
				brand_name: "Mario Badescu",
				brand_page_link: "https://www.ulta.com/brand/mario-badescu",
			},
			{
				brand_id: "7f48b2cf-04f0-4816-8cbf-14f63c0d1219",
				brand_name: "MASON MAN",
				brand_page_link: "https://www.ulta.com/brand/mason-man",
			},
			{
				brand_id: "ce48a75d-1c9f-4912-a611-3a8c8f36ac38",
				brand_name: "Matrix",
				brand_page_link: "https://www.ulta.com/brand/matrix",
			},
			{
				brand_id: "768dbec4-4296-4f0b-98a9-36ec29eea7da",
				brand_name: "Maui Babe",
				brand_page_link: "https://www.ulta.com/brand/maui-babe",
			},
			{
				brand_id: "53a2f0d6-2028-4f05-8472-9987b2ac09b3",
				brand_name: "Maui Moisture",
				brand_page_link: "https://www.ulta.com/brand/maui-moisture",
			},
			{
				brand_id: "fab09526-c88c-4f73-8374-8f1145945519",
				brand_name: "Maybelline",
				brand_page_link: "https://www.ulta.com/brand/maybelline",
			},
			{
				brand_id: "fafb979f-4683-49a4-a089-04558218acae",
				brand_name: "megababe",
				brand_page_link: "https://www.ulta.com/brand/megababe",
			},
			{
				brand_id: "ac2f502f-754f-4ef9-acac-427881fe25e9",
				brand_name: "Melanin Haircare",
				brand_page_link: "https://www.ulta.com/brand/melanin-haircare",
			},
			{
				brand_id: "2afa67b6-6a23-4c8f-b104-37bf76111a59",
				brand_name: "mented cosmetics",
				brand_page_link: "https://www.ulta.com/brand/mented-cosmetics",
			},
			{
				brand_id: "68fe469d-788e-450c-bb8b-3c4b7296af29",
				brand_name: "Michael Kors",
				brand_page_link: "https://www.ulta.com/brand/michael-kors",
			},
			{
				brand_id: "994e2734-ffb1-4a9a-8a2b-075998b875dd",
				brand_name: "Michael Todd Beauty",
				brand_page_link:
					"https://www.ulta.com/brand/michael-todd-beauty",
			},
			{
				brand_id: "5c494416-3a02-4547-a901-7b5d4c95b52e",
				brand_name: "Mielle",
				brand_page_link: "https://www.ulta.com/brand/mielle",
			},
			{
				brand_id: "2b09e86f-92cc-41e3-9284-edcc3884bc34",
				brand_name: "Milani",
				brand_page_link: "https://www.ulta.com/brand/milani",
			},
			{
				brand_id: "af8e2a47-1b40-4394-8f1f-146c8c218e6c",
				brand_name: "Milk + Honey",
				brand_page_link: "https://www.ulta.com/brand/milk-honey",
			},
			{
				brand_id: "9eab9aaf-3f69-4821-a8ae-69e2368d0321",
				brand_name: "Mixed Chicks",
				brand_page_link: "https://www.ulta.com/brand/mixed-chicks",
			},
			{
				brand_id: "390bc522-b86b-4e3b-85ab-1cf3f574fdc1",
				brand_name: "MONDAY Haircare",
				brand_page_link: "https://www.ulta.com/brand/monday-haircare",
			},
			{
				brand_id: "16f4eff3-9b7c-416c-922d-0be944897c11",
				brand_name: "Montblanc",
				brand_page_link: "https://www.ulta.com/brand/montblanc",
			},
			{
				brand_id: "78ed5444-db6c-492c-8dc0-73342cd2f5ff",
				brand_name: "Moon",
				brand_page_link: "https://www.ulta.com/brand/moon",
			},
			{
				brand_id: "2f473d79-9813-426b-8427-7bfe53c11224",
				brand_name: "Moon Juice",
				brand_page_link: "https://www.ulta.com/brand/moon-juice",
			},
			{
				brand_id: "f1456334-3af6-4f1b-8f41-9aee46edc078",
				brand_name: "Morphe",
				brand_page_link: "https://www.ulta.com/brand/morphe",
			},
			{
				brand_id: "37fdb672-6c04-421d-8e39-2a2992d3b194",
				brand_name: "Morphe 2",
				brand_page_link: "https://www.ulta.com/brand/morphe-2",
			},
			{
				brand_id: "cc5d4713-7f78-4cbc-b2f3-66c773d0af19",
				brand_name: "Moschino",
				brand_page_link: "https://www.ulta.com/brand/moschino",
			},
			{
				brand_id: "d84e48af-466f-4085-8c6f-800da0695c2d",
				brand_name: "MUGLER",
				brand_page_link: "https://www.ulta.com/brand/mugler",
			},
			{
				brand_id: "767c61d8-9075-405f-a1b8-a47462b8bb24",
				brand_name: "Murad",
				brand_page_link: "https://www.ulta.com/brand/murad",
			},
			{
				brand_id: "22291c06-1444-4b66-9b35-6d861d0b0303",
				brand_name: "My Clarins",
				brand_page_link: "https://www.ulta.com/brand/my-clarins",
			},
			{
				brand_id: "8f9ae5d0-bc09-4266-b21b-ed7007c3cdc5",
				brand_name: "NABLA",
				brand_page_link: "https://www.ulta.com/brand/nabla",
			},
			{
				brand_id: "1f03f5bf-307d-4c0e-a8d7-82df70046729",
				brand_name: "Nads Natural",
				brand_page_link: "https://www.ulta.com/brand/nads-natural",
			},
			{
				brand_id: "2e4fbc36-92eb-4427-98a2-932d5e48f134",
				brand_name: "Nail Tek",
				brand_page_link: "https://www.ulta.com/brand/nail-tek",
			},
			{
				brand_id: "32a365dd-4444-4338-b3b1-6bb0a764427a",
				brand_name: "Nailtopia",
				brand_page_link: "https://www.ulta.com/brand/nailtopia",
			},
			{
				brand_id: "28b95e0d-cf55-4fb4-b996-39862edbf350",
				brand_name: "Nair",
				brand_page_link: "https://www.ulta.com/brand/nair",
			},
			{
				brand_id: "73b3b63e-4aa7-45a8-81d7-c26e62f2ebdd",
				brand_name: "NARS",
				brand_page_link: "https://www.ulta.com/brand/nars",
			},
			{
				brand_id: "6c5dbeb0-0e3f-46c2-9c50-b1d6ff52e99e",
				brand_name: "NATASHA DENONA",
				brand_page_link: "https://www.ulta.com/brand/natasha-denona",
			},
			{
				brand_id: "d6266521-c1e1-46c1-bb88-2ba0d09eddb2",
				brand_name: "Naturalicious",
				brand_page_link: "https://www.ulta.com/brand/naturalicious",
			},
			{
				brand_id: "5cbfb4bc-aa6f-423d-83ed-37aac1fe2a4f",
				brand_name: "NatureLab. Tokyo",
				brand_page_link: "https://www.ulta.com/brand/naturelab-tokyo",
			},
			{
				brand_id: "94d5b0e7-56a1-496b-a295-7cfbca945bfc",
				brand_name: "Nemat",
				brand_page_link: "https://www.ulta.com/brand/nemat",
			},
			{
				brand_id: "8b6e3d7d-3bec-4803-b3ef-740470850e93",
				brand_name: "NEST New York",
				brand_page_link: "https://www.ulta.com/brand/nest-new-york",
			},
			{
				brand_id: "bc69600c-c1d7-4a88-94e7-4d999d60042d",
				brand_name: "Neutrogena",
				brand_page_link: "https://www.ulta.com/brand/neutrogena",
			},
			{
				brand_id: "a877bf1e-cdad-4298-8dba-cbe461ea3cee",
				brand_name: "Nexxus",
				brand_page_link: "https://www.ulta.com/brand/nexxus",
			},
			{
				brand_id: "14cc4b01-cda7-48ba-b37a-4e7c060f527d",
				brand_name: "Nick Stenson Beauty",
				brand_page_link:
					"https://www.ulta.com/brand/nick-stenson-beauty",
			},
			{
				brand_id: "e58cb16e-e163-4126-a4c0-1006d85fbe7c",
				brand_name: "Nioxin",
				brand_page_link: "https://www.ulta.com/brand/nioxin",
			},
			{
				brand_id: "cd796d0c-8224-429c-9f1a-5f82d6cb7251",
				brand_name: "Nivea",
				brand_page_link: "https://www.ulta.com/brand/nivea",
			},
			{
				brand_id: "2b56b1dc-8d39-437d-a65a-e92ca9b535f7",
				brand_name: "No7",
				brand_page_link: "https://www.ulta.com/brand/no7",
			},
			{
				brand_id: "110af3fd-9717-4aa7-a6b9-022928afae87",
				brand_name: "Not Your Mother's",
				brand_page_link: "https://www.ulta.com/brand/not-your-mothers",
			},
			{
				brand_id: "c27ff7ff-e00c-43bf-a14c-144104ec870f",
				brand_name: "NUDESTIX",
				brand_page_link: "https://www.ulta.com/brand/nudestix",
			},
			{
				brand_id: "4d044ba5-8ca1-4f4f-a50f-3dca8f2d22ea",
				brand_name: "NuFACE",
				brand_page_link: "https://www.ulta.com/brand/nuface",
			},
			{
				brand_id: "1de758a5-8b86-4d06-bf32-84f069d42fcd",
				brand_name: "NYX Professional Makeup",
				brand_page_link:
					"https://www.ulta.com/brand/nyx-professional-makeup",
			},
			{
				brand_id: "75db3385-1153-42f4-a073-5b9b6b428468",
				brand_name: "Odele",
				brand_page_link: "https://www.ulta.com/brand/odele",
			},
			{
				brand_id: "fe608d00-ccd3-49d0-9658-91df8eb6d071",
				brand_name: "Ofra Cosmetics",
				brand_page_link: "https://www.ulta.com/brand/ofra-cosmetics",
			},
			{
				brand_id: "c5824608-b269-443c-9a1e-0974cd2a6673",
				brand_name: "OGX",
				brand_page_link: "https://www.ulta.com/brand/ogx",
			},
			{
				brand_id: "69f69d5e-531c-428a-a954-23f95f8a0714",
				brand_name: "Oh K!",
				brand_page_link: "https://www.ulta.com/brand/oh-k",
			},
			{
				brand_id: "38224e09-b2e2-492a-a393-adffcb56dba4",
				brand_name: "OLAPLEX",
				brand_page_link: "https://www.ulta.com/brand/olaplex",
			},
			{
				brand_id: "56b9b6de-b49c-48ea-a0c8-20807b60361c",
				brand_name: "Olay",
				brand_page_link: "https://www.ulta.com/brand/olay",
			},
			{
				brand_id: "fbde56ec-cb4a-4d89-94ab-c215f8c4ccbd",
				brand_name: "OLEHENRIKSEN",
				brand_page_link: "https://www.ulta.com/brand/olehenriksen",
			},
			{
				brand_id: "d91b6e0f-c405-4575-aec1-aec5154efe2f",
				brand_name: "Olivia Garden",
				brand_page_link: "https://www.ulta.com/brand/olivia-garden",
			},
			{
				brand_id: "82592905-31c5-4ce1-83d8-e0f1f68e3036",
				brand_name: "OLLY",
				brand_page_link: "https://www.ulta.com/brand/olly",
			},
			{
				brand_id: "23f4c567-8581-4009-ade7-08476aa479de",
				brand_name: "One Love Organics",
				brand_page_link: "https://www.ulta.com/brand/one-love-organics",
			},
			{
				brand_id: "82bce784-d468-4e08-9d5f-d3f1a6da6632",
				brand_name: "OPI",
				brand_page_link: "https://www.ulta.com/brand/opi",
			},
			{
				brand_id: "29dc15f3-9c2a-4704-91be-614a1d096e21",
				brand_name: "ORA",
				brand_page_link: "https://www.ulta.com/brand/ora",
			},
			{
				brand_id: "eef6032b-5056-40e0-80ec-2f15e42b4588",
				brand_name: "Oral-B",
				brand_page_link: "https://www.ulta.com/brand/oral-b",
			},
			{
				brand_id: "ba25f8a7-1de8-44c6-8846-313903798fa9",
				brand_name: "Origins",
				brand_page_link: "https://www.ulta.com/brand/origins",
			},
			{
				brand_id: "706fbcf4-8ca8-4d43-ab36-c37cce7a7395",
				brand_name: "Orly",
				brand_page_link: "https://www.ulta.com/brand/orly",
			},
			{
				brand_id: "fee31d3c-b4ef-4fc5-9a48-8084c6ffd4db",
				brand_name: "OSEA",
				brand_page_link: "https://www.ulta.com/brand/osea",
			},
			{
				brand_id: "58c99576-ee48-4045-ba9b-1b589591e848",
				brand_name: "OUAI",
				brand_page_link: "https://www.ulta.com/brand/ouai",
			},
			{
				brand_id: "fa62d3cf-37b3-4a75-887e-ec3d7b73e3c1",
				brand_name: "Ouidad",
				brand_page_link: "https://www.ulta.com/brand/ouidad",
			},
			{
				brand_id: "f0ca6494-c911-4a14-8f19-71dfaa19c517",
				brand_name: "Pacifica",
				brand_page_link: "https://www.ulta.com/brand/pacifica",
			},
			{
				brand_id: "0e64bc4c-ae00-4bc3-88b8-ea4dffae8fa7",
				brand_name: "PanOxyl",
				brand_page_link: "https://www.ulta.com/brand/panoxyl",
			},
			{
				brand_id: "e1b2c0e8-c780-4e5c-b534-9da3a2e0ecfe",
				brand_name: "PAT McGRATH LABS",
				brand_page_link: "https://www.ulta.com/brand/pat-mcgrath-labs",
			},
			{
				brand_id: "91e08587-581b-4531-b60b-fbd7e355f49b",
				brand_name: "Patchology",
				brand_page_link: "https://www.ulta.com/brand/patchology",
			},
			{
				brand_id: "fb5fdc16-7467-450b-ad90-f59b2cf04278",
				brand_name: "Patisserie Beauty",
				brand_page_link: "https://www.ulta.com/brand/patisserie-beauty",
			},
			{
				brand_id: "205a70ac-e94d-42e5-a229-cb14fd8bb5bf",
				brand_name: "PATTERN",
				brand_page_link: "https://www.ulta.com/brand/pattern",
			},
			{
				brand_id: "d2287ea9-192b-4185-9b19-eebb3e0c10a0",
				brand_name: "Paul Mitchell",
				brand_page_link: "https://www.ulta.com/brand/paul-mitchell",
			},
			{
				brand_id: "cea43866-67ba-4f15-bd03-678a765d301e",
				brand_name: "Peace Out",
				brand_page_link: "https://www.ulta.com/brand/peace-out",
			},
			{
				brand_id: "25d1e22f-d269-485a-ae79-826e074b5c76",
				brand_name: "PEACH & LILY",
				brand_page_link: "https://www.ulta.com/brand/peach-lily",
			},
			{
				brand_id: "d0d470d2-fb30-4dbc-b806-5ee44cf10cc6",
				brand_name: "Peach Slices",
				brand_page_link: "https://www.ulta.com/brand/peach-slices",
			},
			{
				brand_id: "80a063ea-e2ba-4c65-b885-26ec983e3103",
				brand_name: "Perricone MD",
				brand_page_link: "https://www.ulta.com/brand/perricone-md",
			},
			{
				brand_id: "11d7fcb0-df15-4e79-95d6-141e6dc8fa43",
				brand_name: "Persona",
				brand_page_link: "https://www.ulta.com/brand/persona",
			},
			{
				brand_id: "ba6565f0-3f0b-47d7-aa0c-f68bd8de5e3c",
				brand_name: "Peter Thomas Roth",
				brand_page_link: "https://www.ulta.com/brand/peter-thomas-roth",
			},
			{
				brand_id: "eddc8cd5-9480-44cd-9b12-fa793a4da9aa",
				brand_name: "Petite n Pretty",
				brand_page_link: "https://www.ulta.com/brand/petite-n-pretty",
			},
			{
				brand_id: "ca17a8b5-0ada-4320-800a-575734343760",
				brand_name: "Philosophy",
				brand_page_link: "https://www.ulta.com/brand/philosophy",
			},
			{
				brand_id: "1844d69c-7879-496b-9afc-276d524dc2b2",
				brand_name: "Physicians Formula",
				brand_page_link:
					"https://www.ulta.com/brand/physicians-formula",
			},
			{
				brand_id: "20e9d4eb-7ae1-42a0-89e3-a9a5912cc29f",
				brand_name: "Pinrose",
				brand_page_link: "https://www.ulta.com/brand/pinrose",
			},
			{
				brand_id: "1a0b68c6-1215-4e53-9300-35f683b5ae83",
				brand_name: "Pipette",
				brand_page_link: "https://www.ulta.com/brand/pipette",
			},
			{
				brand_id: "98262f3d-0242-438b-9687-85aaeb0f9bba",
				brand_name: "Pirette",
				brand_page_link: "https://www.ulta.com/brand/pirette",
			},
			{
				brand_id: "4d221987-378c-4484-a028-6cdde28dfc58",
				brand_name: "Pixi",
				brand_page_link: "https://www.ulta.com/brand/pixi",
			},
			{
				brand_id: "50416aae-e224-4268-af88-870bf10cc835",
				brand_name: "PMD",
				brand_page_link: "https://www.ulta.com/brand/pmd",
			},
			{
				brand_id: "db825942-4473-4401-8ae3-51db5179921c",
				brand_name: "Polder",
				brand_page_link: "https://www.ulta.com/brand/polder",
			},
			{
				brand_id: "1f7a6ded-eda6-4cdb-8293-f972734b216c",
				brand_name: "Polite Society",
				brand_page_link: "https://www.ulta.com/brand/polite-society",
			},
			{
				brand_id: "c84342af-951f-4700-a259-19f40f51d63a",
				brand_name: "Poo~Pourri",
				brand_page_link: "https://www.ulta.com/brand/poopourri",
			},
			{
				brand_id: "bbddd959-cd50-4b5e-85b8-44c318a1b7f9",
				brand_name: "Poppy & Pout",
				brand_page_link: "https://www.ulta.com/brand/poppy-pout",
			},
			{
				brand_id: "5626dcbb-739a-4b3f-8d3c-eacecea1037f",
				brand_name: "POUND CAKE",
				brand_page_link: "https://www.ulta.com/brand/pound-cake",
			},
			{
				brand_id: "da5e5a59-f057-4d6b-a49a-46e2c7a65204",
				brand_name: "Prada",
				brand_page_link: "https://www.ulta.com/brand/prada",
			},
			{
				brand_id: "5163a38a-e640-4a53-8d3c-79d1c3a436c5",
				brand_name: "Pravana",
				brand_page_link: "https://www.ulta.com/brand/pravana",
			},
			{
				brand_id: "914eff57-3eaf-4b94-a1c7-661168f596f4",
				brand_name: "Proactiv",
				brand_page_link: "https://www.ulta.com/brand/proactiv",
			},
			{
				brand_id: "d4872561-848c-4636-95f8-8cefda6d8e2b",
				brand_name: "PROVENCE Beauty",
				brand_page_link: "https://www.ulta.com/brand/provence-beauty",
			},
			{
				brand_id: "bcc6eea5-5989-40e4-99f9-2c9a206b323e",
				brand_name: "PÜR",
				brand_page_link: "https://www.ulta.com/brand/pur",
			},
			{
				brand_id: "ebb8ac9b-453c-48bf-9762-d31e5a80942f",
				brand_name: "Pura",
				brand_page_link: "https://www.ulta.com/brand/pura",
			},
			{
				brand_id: "8defa450-9af6-419a-8d11-d447be75009e",
				brand_name: "Pura d'or",
				brand_page_link: "https://www.ulta.com/brand/pura-dor",
			},
			{
				brand_id: "b07cff7f-05d1-4ba9-97d4-2f4891829d17",
				brand_name: "Pureology",
				brand_page_link: "https://www.ulta.com/brand/pureology",
			},
			{
				brand_id: "9c5290d8-f0ed-435c-aca6-f43f25883465",
				brand_name: "PYT Beauty",
				brand_page_link: "https://www.ulta.com/brand/pyt-beauty",
			},
			{
				brand_id: "a61330b1-189e-45e3-bfd2-d6010633c599",
				brand_name: "Qhemet Biologics",
				brand_page_link: "https://www.ulta.com/brand/qhemet-biologics",
			},
			{
				brand_id: "7311387d-7bdb-496f-873c-7c0636ee7a47",
				brand_name: "r.e.m. beauty",
				brand_page_link: "https://www.ulta.com/brand/rem-beauty",
			},
			{
				brand_id: "cf071d46-e40a-4262-8121-2cbcc3650717",
				brand_name: "Rabanne",
				brand_page_link: "https://www.ulta.com/brand/rabanne",
			},
			{
				brand_id: "f325834a-b1ac-4329-8fa1-ed8a0b8a41b3",
				brand_name: "Ralph Lauren",
				brand_page_link: "https://www.ulta.com/brand/ralph-lauren",
			},
			{
				brand_id: "e7a0e554-80f7-4699-b752-de99b47389e7",
				brand_name: "Rapidlash",
				brand_page_link: "https://www.ulta.com/brand/rapidlash",
			},
			{
				brand_id: "71030365-b427-426c-bfbb-8287cc61c231",
				brand_name: "Real Techniques",
				brand_page_link: "https://www.ulta.com/brand/real-techniques",
			},
			{
				brand_id: "624aa76c-868e-4ea5-8d32-bb3ae1a60e8c",
				brand_name: "Red Carpet Manicure",
				brand_page_link:
					"https://www.ulta.com/brand/red-carpet-manicure",
			},
			{
				brand_id: "a02f2297-e720-4094-bcdb-12534974267b",
				brand_name: "Redken",
				brand_page_link: "https://www.ulta.com/brand/redken",
			},
			{
				brand_id: "2ebc6e7c-64ae-4246-9ac6-2b00d9def913",
				brand_name: "Remington",
				brand_page_link: "https://www.ulta.com/brand/remington",
			},
			{
				brand_id: "5fd78070-2427-4ad6-9f77-ad8427d319f5",
				brand_name: "Revlon",
				brand_page_link: "https://www.ulta.com/brand/revlon",
			},
			{
				brand_id: "db904f46-f975-411e-8387-7ef097015f86",
				brand_name: "RITUALS",
				brand_page_link: "https://www.ulta.com/brand/rituals",
			},
			{
				brand_id: "2bdac256-74d2-4b5b-b374-9e6797d327a9",
				brand_name: "Rituel de Fille",
				brand_page_link: "https://www.ulta.com/brand/rituel-de-fille",
			},
			{
				brand_id: "909abcc7-02b0-4c72-9847-e8b8d8f36d91",
				brand_name: "Rizos Curls",
				brand_page_link: "https://www.ulta.com/brand/rizos-curls",
			},
			{
				brand_id: "3660874d-ddb0-4beb-ac4f-353f2bbc6c67",
				brand_name: "RoC",
				brand_page_link: "https://www.ulta.com/brand/roc",
			},
			{
				brand_id: "eee4cd63-22fe-4b3f-af98-2a28b5889f41",
				brand_name: "Rosebud Perfume Co.",
				brand_page_link:
					"https://www.ulta.com/brand/rosebud-perfume-co",
			},
			{
				brand_id: "0175a8bf-13a2-42de-9ea1-899c4265962a",
				brand_name: "ROSEN",
				brand_page_link: "https://www.ulta.com/brand/rosen",
			},
			{
				brand_id: "ba10a296-9ba8-4cd4-accc-43f05d88a0e4",
				brand_name: "Rusk",
				brand_page_link: "https://www.ulta.com/brand/rusk",
			},
			{
				brand_id: "332b5212-6b03-4f27-b867-c3e77b6a9822",
				brand_name: "SABON",
				brand_page_link: "https://www.ulta.com/brand/sabon",
			},
			{
				brand_id: "3fffc5fa-3376-403c-a620-c1073d76f322",
				brand_name: "Sacheu",
				brand_page_link: "https://www.ulta.com/brand/sacheu",
			},
			{
				brand_id: "07f4b8bf-4610-416a-9430-9e2b7e92f44f",
				brand_name: "Sally Hansen",
				brand_page_link: "https://www.ulta.com/brand/sally-hansen",
			},
			{
				brand_id: "de3ca52b-759d-4984-9c99-e1b13a3d6334",
				brand_name: "Schick",
				brand_page_link: "https://www.ulta.com/brand/schick",
			},
			{
				brand_id: "5cef4d6e-9973-4d56-8333-d363274d3806",
				brand_name: "SCRATCH",
				brand_page_link: "https://www.ulta.com/brand/scratch",
			},
			{
				brand_id: "0029c3cd-8e44-4243-a2b7-3d70d098e081",
				brand_name: "Scünci",
				brand_page_link: "https://www.ulta.com/brand/scunci",
			},
			{
				brand_id: "3face78f-9c80-4e72-9acc-b237ce9cb498",
				brand_name: "Sebastian",
				brand_page_link: "https://www.ulta.com/brand/sebastian",
			},
			{
				brand_id: "70ec81b2-fc85-4335-8247-aa19f6383a99",
				brand_name: "Seche",
				brand_page_link: "https://www.ulta.com/brand/seche",
			},
			{
				brand_id: "096849f9-92d5-451f-ba96-d658624cf91e",
				brand_name: "SEEN",
				brand_page_link: "https://www.ulta.com/brand/seen",
			},
			{
				brand_id: "d26b4eac-b33c-488b-8bca-809644f2d481",
				brand_name: "SeroVital",
				brand_page_link: "https://www.ulta.com/brand/serovital",
			},
			{
				brand_id: "29daac80-795d-41e5-9816-91e49175da11",
				brand_name: "Sexy Hair",
				brand_page_link: "https://www.ulta.com/brand/sexy-hair",
			},
			{
				brand_id: "fbd61b55-40a6-43c8-a675-de73670d78ad",
				brand_name: "Shark Beauty",
				brand_page_link: "https://www.ulta.com/brand/shark-beauty",
			},
			{
				brand_id: "e56fbef4-078a-44c1-aedc-02531decabc1",
				brand_name: "SheaMoisture",
				brand_page_link: "https://www.ulta.com/brand/sheamoisture",
			},
			{
				brand_id: "45283a56-cca6-4477-9262-097b9720b9a4",
				brand_name: "Shimmer Lights",
				brand_page_link: "https://www.ulta.com/brand/shimmer-lights",
			},
			{
				brand_id: "a20829b0-2f31-4ac1-a40a-1bc82f43de0f",
				brand_name: "Shiseido",
				brand_page_link: "https://www.ulta.com/brand/shiseido",
			},
			{
				brand_id: "97a74185-b6cc-4fd6-943c-68b67eaf2f57",
				brand_name: "Silk'n",
				brand_page_link: "https://www.ulta.com/brand/silkn",
			},
			{
				brand_id: "33679946-a7e2-49ff-9b28-645f6c86af0e",
				brand_name: "sk*p",
				brand_page_link: "https://www.ulta.com/brand/skp",
			},
			{
				brand_id: "5ccff292-5fa1-4440-bf9e-9f63b706d0f3",
				brand_name: "Skin Gym",
				brand_page_link: "https://www.ulta.com/brand/skin-gym",
			},
			{
				brand_id: "776bebf6-6ebb-479e-9d36-b680ec22433d",
				brand_name: "Skinfood",
				brand_page_link: "https://www.ulta.com/brand/skinfood",
			},
			{
				brand_id: "897e871b-6ca6-4dc9-b13e-36d9ce44a451",
				brand_name: "Skinnydip",
				brand_page_link: "https://www.ulta.com/brand/skinnydip",
			},
			{
				brand_id: "14b6c856-2188-4e92-9bf0-d1b7881ec9d6",
				brand_name: "Slip",
				brand_page_link: "https://www.ulta.com/brand/slip",
			},
			{
				brand_id: "7a231f78-d3dd-48da-a1fc-564ac01ea138",
				brand_name: "Smashbox",
				brand_page_link: "https://www.ulta.com/brand/smashbox",
			},
			{
				brand_id: "befd7c63-f1fe-4747-b6e0-ea968a7daaf4",
				brand_name: "Smile Makers",
				brand_page_link: "https://www.ulta.com/brand/smile-makers",
			},
			{
				brand_id: "91d6cce5-3096-4cda-b83b-62430a3c8893",
				brand_name: "Snif",
				brand_page_link: "https://www.ulta.com/brand/snif",
			},
			{
				brand_id: "b559174d-0349-4835-93a7-f968ac2d9dfa",
				brand_name: "Soap & Glory",
				brand_page_link: "https://www.ulta.com/brand/soap-glory",
			},
			{
				brand_id: "49665565-9862-4b71-8d3a-a2dcd19543b1",
				brand_name: "SoCozy",
				brand_page_link: "https://www.ulta.com/brand/socozy",
			},
			{
				brand_id: "75f361d2-d272-4188-803d-f895f27f2313",
				brand_name: "Sol de Janeiro",
				brand_page_link: "https://www.ulta.com/brand/sol-de-janeiro",
			},
			{
				brand_id: "6d26fd27-2d76-4471-9917-5abddce2bf75",
				brand_name: "Solawave",
				brand_page_link: "https://www.ulta.com/brand/solawave",
			},
			{
				brand_id: "1b9cfa84-d47e-4423-a404-15617ed8ada7",
				brand_name: "Spectrum",
				brand_page_link: "https://www.ulta.com/brand/spectrum",
			},
			{
				brand_id: "53bb3bcb-4c2d-49b1-a58b-8753f92d91dd",
				brand_name: "Spongeables",
				brand_page_link: "https://www.ulta.com/brand/spongeables",
			},
			{
				brand_id: "c9c8f8bb-e605-4768-9bb7-cbdb6a17aa58",
				brand_name: "Spotlight Oral Care",
				brand_page_link:
					"https://www.ulta.com/brand/spotlight-oral-care",
			},
			{
				brand_id: "68cb95d4-47bf-4fed-8b26-94b127d87121",
				brand_name: "St. Moriz",
				brand_page_link: "https://www.ulta.com/brand/st-moriz",
			},
			{
				brand_id: "97d4b5ac-6eb4-47e9-b999-eec68ba67669",
				brand_name: "St. Tropez",
				brand_page_link: "https://www.ulta.com/brand/st-tropez",
			},
			{
				brand_id: "d1fa7de6-697a-4667-96f6-1cc11ef12366",
				brand_name: "Static Nails",
				brand_page_link: "https://www.ulta.com/brand/static-nails",
			},
			{
				brand_id: "e1fd266c-aaf6-4db0-bc0b-ac740a6c4e29",
				brand_name: "Stila",
				brand_page_link: "https://www.ulta.com/brand/stila",
			},
			{
				brand_id: "90913c5a-4335-4d4d-9a74-9881e3ca6639",
				brand_name: "StriVectin",
				brand_page_link: "https://www.ulta.com/brand/strivectin",
			},
			{
				brand_id: "8179c4fd-d7ff-46aa-96b8-12c9ba1b7403",
				brand_name: "Sugarbear",
				brand_page_link: "https://www.ulta.com/brand/sugarbear",
			},
			{
				brand_id: "25f46fbd-3e72-4716-9611-1d7f42029485",
				brand_name: "sugardoh",
				brand_page_link: "https://www.ulta.com/brand/sugardoh",
			},
			{
				brand_id: "279dc0be-0ced-4304-ad2e-ecd7ad044882",
				brand_name: "Sun Bum",
				brand_page_link: "https://www.ulta.com/brand/sun-bum",
			},
			{
				brand_id: "f10e5142-ee80-4989-bd86-e9433d0194c0",
				brand_name: "Sunday || Sunday",
				brand_page_link: "https://www.ulta.com/brand/sunday-sunday",
			},
			{
				brand_id: "bbeeba9c-69b5-4be6-bb95-f061e1777c2a",
				brand_name: "SUNDAY RILEY",
				brand_page_link: "https://www.ulta.com/brand/sunday-riley",
			},
			{
				brand_id: "d92720f4-8862-4ee7-a11c-9616fe01bf71",
				brand_name: "Supergoop!",
				brand_page_link: "https://www.ulta.com/brand/supergoop",
			},
			{
				brand_id: "d6b2ada0-5127-4576-bfab-a8ea724cbe3e",
				brand_name: "Supersmile",
				brand_page_link: "https://www.ulta.com/brand/supersmile",
			},
			{
				brand_id: "d49b6282-2ab3-40cb-92aa-bc8aef2120fd",
				brand_name: "SweetSpot Labs",
				brand_page_link: "https://www.ulta.com/brand/sweetspot-labs",
			},
			{
				brand_id: "54d52541-1fe1-4bf4-82f1-518f4592aa20",
				brand_name: "T3",
				brand_page_link: "https://www.ulta.com/brand/t3",
			},
			{
				brand_id: "41386fee-bf10-40cd-88cd-c291fbc7fd09",
				brand_name: "TAN-LUXE",
				brand_page_link: "https://www.ulta.com/brand/tan-luxe",
			},
			{
				brand_id: "9b00a823-f4b7-4931-9a3b-b75e88f8d0e2",
				brand_name: "Tangle Teezer",
				brand_page_link: "https://www.ulta.com/brand/tangle-teezer",
			},
			{
				brand_id: "7016692e-6a81-4e22-83ea-fc5a393bb9a6",
				brand_name: "Tanologist",
				brand_page_link: "https://www.ulta.com/brand/tanologist",
			},
			{
				brand_id: "371765c4-5b1b-4759-8729-7f7ac0988bc2",
				brand_name: "Tartan + Twine",
				brand_page_link: "https://www.ulta.com/brand/tartan-twine",
			},
			{
				brand_id: "5819d7d3-ca60-4e05-b316-3640beb06581",
				brand_name: "Tarte",
				brand_page_link: "https://www.ulta.com/brand/tarte",
			},
			{
				brand_id: "98a4d886-fdae-4a93-b138-f3129f4bf269",
				brand_name: "tgin",
				brand_page_link: "https://www.ulta.com/brand/tgin",
			},
			{
				brand_id: "4907fc5c-60f1-4585-afce-0d666de7679b",
				brand_name: "Thayers",
				brand_page_link: "https://www.ulta.com/brand/thayers",
			},
			{
				brand_id: "8d3799cd-4887-437c-805a-782d35015807",
				brand_name: "The Body Shop",
				brand_page_link: "https://www.ulta.com/brand/body-shop",
			},
			{
				brand_id: "49c9ff4a-71f8-4da6-afaf-7c83f2ea6113",
				brand_name: "The Crème Shop",
				brand_page_link: "https://www.ulta.com/brand/creme-shop",
			},
			{
				brand_id: "bbf1d2f7-bc1e-427b-81e7-185a57e3ab3c",
				brand_name: "The Good Patch",
				brand_page_link: "https://www.ulta.com/brand/good-patch",
			},
			{
				brand_id: "db0c8896-269e-41c1-9f29-bf15e8d121a1",
				brand_name: "The Hair Edit",
				brand_page_link: "https://www.ulta.com/brand/hair-edit",
			},
			{
				brand_id: "1f86a606-29d6-46d5-95c4-cd55a799be03",
				brand_name: "The Handmade Soap Co.",
				brand_page_link: "https://www.ulta.com/brand/handmade-soap-co",
			},
			{
				brand_id: "654aaefd-2284-4b28-8278-6577977c21e3",
				brand_name: "The Mane Choice",
				brand_page_link: "https://www.ulta.com/brand/mane-choice",
			},
			{
				brand_id: "62453634-b06b-4dcb-be0f-ee89b9377541",
				brand_name: "The Ordinary",
				brand_page_link: "https://www.ulta.com/brand/ordinary",
			},
			{
				brand_id: "4359ef8a-d86f-48be-bef5-83158a09d24b",
				brand_name: "The Original MakeUp Eraser",
				brand_page_link:
					"https://www.ulta.com/brand/original-makeup-eraser",
			},
			{
				brand_id: "93219421-8f10-45a0-ab34-7992fb709114",
				brand_name: "THE ROUTE",
				brand_page_link: "https://www.ulta.com/brand/route",
			},
			{
				brand_id: "bc63b7ef-94a5-45ee-bd40-6e8f33f59ad7",
				brand_name: "The Vintage Cosmetic Company",
				brand_page_link:
					"https://www.ulta.com/brand/vintage-cosmetic-company",
			},
			{
				brand_id: "49f18123-baef-4d6f-a01e-735586682b92",
				brand_name: "TheraBreath",
				brand_page_link: "https://www.ulta.com/brand/therabreath",
			},
			{
				brand_id: "104a0790-afd3-4af4-abac-8418d2fd9483",
				brand_name: "Thick Head",
				brand_page_link: "https://www.ulta.com/brand/thick-head",
			},
			{
				brand_id: "974edc39-1de3-4ea5-9a8f-58897057cb56",
				brand_name: "Tiffany & Co.",
				brand_page_link: "https://www.ulta.com/brand/tiffany-co",
			},
			{
				brand_id: "9307c163-2d7e-4aab-9c7a-b59a584057ac",
				brand_name: "TOCCA",
				brand_page_link: "https://www.ulta.com/brand/tocca",
			},
			{
				brand_id: "df153697-50f1-4386-96ea-3d3c9841818c",
				brand_name: "TOM FORD",
				brand_page_link: "https://www.ulta.com/brand/tom-ford",
			},
			{
				brand_id: "1dde1958-d599-4a8e-846f-6598290046d1",
				brand_name: "TONYMOLY",
				brand_page_link: "https://www.ulta.com/brand/tonymoly",
			},
			{
				brand_id: "f57ce423-2fa9-4ab2-a3a8-82d5090ac89c",
				brand_name: "Too Faced",
				brand_page_link: "https://www.ulta.com/brand/too-faced",
			},
			{
				brand_id: "02be2674-8ec6-4a55-8b69-a1c3f3559fc0",
				brand_name: "Toppik",
				brand_page_link: "https://www.ulta.com/brand/toppik",
			},
			{
				brand_id: "cafde247-3455-4f03-b47a-e381b0ce5494",
				brand_name: "Tory Burch",
				brand_page_link: "https://www.ulta.com/brand/tory-burch",
			},
			{
				brand_id: "43b06194-ce0a-4c9c-8368-e1b9d62f4974",
				brand_name: "Touchland",
				brand_page_link: "https://www.ulta.com/brand/touchland",
			},
			{
				brand_id: "32a1034d-d63e-466a-b98c-c1378b79a09b",
				brand_name: "Tree Hut",
				brand_page_link: "https://www.ulta.com/brand/tree-hut",
			},
			{
				brand_id: "13911f1c-6c0d-4595-84ec-ea5fb7128cf2",
				brand_name: "Treslúce Beauty",
				brand_page_link: "https://www.ulta.com/brand/tresluce-beauty",
			},
			{
				brand_id: "c358976b-a2aa-4dbb-9854-e1f82e81ee10",
				brand_name: "Truly",
				brand_page_link: "https://www.ulta.com/brand/truly",
			},
			{
				brand_id: "ec7d5aa7-7ac3-4674-9981-9764188a9b15",
				brand_name: "TULA",
				brand_page_link: "https://www.ulta.com/brand/tula",
			},
			{
				brand_id: "00bd2af8-05d6-4176-8d4e-1cbe7cd10fe1",
				brand_name: "Turbie Twist",
				brand_page_link: "https://www.ulta.com/brand/turbie-twist",
			},
			{
				brand_id: "1d76a8fe-9144-4928-b72c-4011cfbc736f",
				brand_name: "Tweezerman",
				brand_page_link: "https://www.ulta.com/brand/tweezerman",
			},
			{
				brand_id: "afd08e3e-2658-48d5-a8f0-282044347b1b",
				brand_name: "ULTA Beauty Collection",
				brand_page_link:
					"https://www.ulta.com/brand/ulta-beauty-collection",
			},
			{
				brand_id: "a13abbc2-295d-4fe5-ba85-ddabefb18b7d",
				brand_name: "Unbound",
				brand_page_link: "https://www.ulta.com/brand/unbound",
			},
			{
				brand_id: "899eb784-2851-4479-b2a3-8f8b66fb44ab",
				brand_name: "Undefined Beauty",
				brand_page_link: "https://www.ulta.com/brand/undefined-beauty",
			},
			{
				brand_id: "e3efb2b1-efa6-4b9e-85b5-9dc6e7fde0f0",
				brand_name: "Undone Beauty",
				brand_page_link: "https://www.ulta.com/brand/undone-beauty",
			},
			{
				brand_id: "fbc270e8-9bc9-45b8-b89b-714776b60755",
				brand_name: "UNITE Hair",
				brand_page_link: "https://www.ulta.com/brand/unite-hair",
			},
			{
				brand_id: "9deeb9b2-fdfc-48d1-87bc-82c56e359ed6",
				brand_name: "UOMA Beauty",
				brand_page_link: "https://www.ulta.com/brand/uoma-beauty",
			},
			{
				brand_id: "de82a3e4-1bf3-43e5-a30f-282b5ee59d9b",
				brand_name: "Urban Decay Cosmetics",
				brand_page_link:
					"https://www.ulta.com/brand/urban-decay-cosmetics",
			},
			{
				brand_id: "c68532e9-25ab-4087-b458-09a48f73f413",
				brand_name: "Urban Hydration",
				brand_page_link: "https://www.ulta.com/brand/urban-hydration",
			},
			{
				brand_id: "067c9088-d4d3-46a1-beea-638581dca2fc",
				brand_name: "Urban Skin Rx",
				brand_page_link: "https://www.ulta.com/brand/urban-skin-rx",
			},
			{
				brand_id: "51fd3627-618b-48d7-a4cc-3d178898834f",
				brand_name: "Urban Veda",
				brand_page_link: "https://www.ulta.com/brand/urban-veda",
			},
			{
				brand_id: "cd8efd53-7658-42d5-964c-daaa09d229e9",
				brand_name: "Vacation",
				brand_page_link: "https://www.ulta.com/brand/vacation",
			},
			{
				brand_id: "ac412245-37a8-406e-be6a-724e30ebcd76",
				brand_name: "Valentino",
				brand_page_link: "https://www.ulta.com/brand/valentino",
			},
			{
				brand_id: "481d23f8-3897-4102-a96f-229f3b5d5a46",
				brand_name: "VANICREAM",
				brand_page_link: "https://www.ulta.com/brand/vanicream",
			},
			{
				brand_id: "a002873e-06e1-4280-83b3-8324a15dba20",
				brand_name: "VDL",
				brand_page_link: "https://www.ulta.com/brand/vdl",
			},
			{
				brand_id: "062c5969-fabd-4920-bf20-40d67b7de90c",
				brand_name: "Velour Lashes",
				brand_page_link: "https://www.ulta.com/brand/velour-lashes",
			},
			{
				brand_id: "fb914914-0655-4621-bee8-f2bae47a40e6",
				brand_name: "Verb",
				brand_page_link: "https://www.ulta.com/brand/verb",
			},
			{
				brand_id: "c4bb4799-6ce4-4fa1-b278-e1ae413efb72",
				brand_name: "Versace",
				brand_page_link: "https://www.ulta.com/brand/versace",
			},
			{
				brand_id: "eaa0b82e-75b4-41af-bad8-baf5e1403c87",
				brand_name: "Vichy",
				brand_page_link: "https://www.ulta.com/brand/vichy",
			},
			{
				brand_id: "e30943a3-ad7b-449e-b307-ded7decc5ea4",
				brand_name: "Viktor&Rolf",
				brand_page_link: "https://www.ulta.com/brand/viktor-rolf",
			},
			{
				brand_id: "700ab3d9-c0da-478b-9cea-a9c32d8bbc3a",
				brand_name: "Virtue",
				brand_page_link: "https://www.ulta.com/brand/virtue",
			},
			{
				brand_id: "03f7d535-dc3a-440d-b83e-e7ca96899e15",
				brand_name: "Vitamins and Sea beauty",
				brand_page_link:
					"https://www.ulta.com/brand/vitamins-sea-beauty",
			},
			{
				brand_id: "63ca6ae4-4f42-4de5-9bdf-42eb3c14c249",
				brand_name: "Viviscal",
				brand_page_link: "https://www.ulta.com/brand/viviscal",
			},
			{
				brand_id: "003152a8-20b4-44fb-befc-34410290768b",
				brand_name: "VOLITION",
				brand_page_link: "https://www.ulta.com/brand/volition",
			},
			{
				brand_id: "bc4aad67-c15e-4ada-a62b-362383be4ba4",
				brand_name: "VUSH",
				brand_page_link: "https://www.ulta.com/brand/vush",
			},
			{
				brand_id: "2650c575-e9b1-48c9-84d8-0af2444405ac",
				brand_name: "Wahl",
				brand_page_link: "https://www.ulta.com/brand/wahl",
			},
			{
				brand_id: "7e2c3624-6264-49d7-b4a7-c3f32ad0645a",
				brand_name: "Wakse",
				brand_page_link: "https://www.ulta.com/brand/wakse",
			},
			{
				brand_id: "f0e3d67a-0031-4f8c-99b0-f18757ff1cf9",
				brand_name: "Well People",
				brand_page_link: "https://www.ulta.com/brand/well-people",
			},
			{
				brand_id: "e3882931-fa5b-43ad-bc04-02b964748418",
				brand_name: "Wella",
				brand_page_link: "https://www.ulta.com/brand/wella",
			},
			{
				brand_id: "045e117b-1514-44ca-a420-fd41f77627ee",
				brand_name: "Wet Brush",
				brand_page_link: "https://www.ulta.com/brand/wet-brush",
			},
			{
				brand_id: "e2f4cb14-a233-432d-92f9-6c89bd223b70",
				brand_name: "Wet n Wild",
				brand_page_link: "https://www.ulta.com/brand/wet-n-wild",
			},
			{
				brand_id: "1fa75d7f-7969-4132-85e3-4d2a07549e3b",
				brand_name: "Wigo",
				brand_page_link: "https://www.ulta.com/brand/wigo",
			},
			{
				brand_id: "6cd0e269-b5e4-4369-8736-7c9cf04df9f7",
				brand_name: "Winky Lux",
				brand_page_link: "https://www.ulta.com/brand/winky-lux",
			},
			{
				brand_id: "c1535d93-b650-4fc3-9420-182074df6dfd",
				brand_name: "WLDKAT",
				brand_page_link: "https://www.ulta.com/brand/wldkat",
			},
			{
				brand_id: "0aef57e9-7a62-4efb-ace9-6eca8d4ec56f",
				brand_name: "Womaness",
				brand_page_link: "https://www.ulta.com/brand/womaness",
			},
			{
				brand_id: "4665e17b-6382-490c-86aa-388ff2173a18",
				brand_name: "Wunder2",
				brand_page_link: "https://www.ulta.com/brand/wunder2",
			},
			{
				brand_id: "990fc06a-ba31-4b26-9382-19b1ed4b4e23",
				brand_name: "WYN BEAUTY",
				brand_page_link: "https://www.ulta.com/brand/wyn-beauty",
			},
			{
				brand_id: "7eb71b96-ff85-4f69-abea-29ec50bee1f1",
				brand_name: "Youthforia",
				brand_page_link: "https://www.ulta.com/brand/youthforia",
			},
			{
				brand_id: "693e869d-5b96-404e-b0a4-de5b87f69f5a",
				brand_name: "Yves Saint Laurent",
				brand_page_link:
					"https://www.ulta.com/brand/yves-saint-laurent",
			},
			{
				brand_id: "2463f8f7-650e-4212-af80-2655b15bb9e9",
				brand_name: "ZitSticka",
				brand_page_link: "https://www.ulta.com/brand/zitsticka",
			},
			{
				brand_id: "920d83f1-f7da-448a-9733-84c6b61f4ee6",
				brand_name: "Zoya",
				brand_page_link: "https://www.ulta.com/brand/zoya",
			},
			{
				brand_id: "70d56a4c-d630-4854-b82a-e6725efc73a2",
				brand_name: "18.21 Man Made",
				brand_page_link: "https://www.ulta.com/brand/1821-man-made",
			},
		];

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

			console.dir(
				data.map((item) => item.sku_id),
				{ maxArrayLength: null }
			);
		}

		console.log(allSephoraBrands.map(brand => brand.brand_name))

		// log(data);
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
