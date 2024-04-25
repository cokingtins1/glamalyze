import { Button } from "@/components/ui/button";
import { productSeeds } from "@/lib/seeding/seedingFuncs";
import { randomUserName } from "@/lib/utils";
import { PrismaClient, Review } from "@prisma/client";
import { randomInt } from "crypto";
import dayjs from "dayjs";
import { generate } from "random-words";
import React from "react";

const prisma = new PrismaClient();
export default function Page() {
	async function handleSubmit() {
		"use server";

		const productId = "da7f69ee-c059-413b-a654-6400f25ad1ba";
		const queryId = "c7d8dea4-1dbe-4536-9c3c-73d1971eb256"
		const data = [
			{
				review_id: "0b2818d7-2743-406c-9c77-91fa27759fb0",
				product_id: "053e1452-e2b2-4982-bdf4-5ba0c308239b",
				retailer_id: "Ulta123",
				review_headline: "In lalalalalove with Tula",
				review_text:
					"I rarely buy expensive beauty brands, but I took a whim on the Tula discovery kit from their website along with the acne gel. I could not be more thrilled with this purchase. I have PCOS so getting rid of my cystic acne is not easy, but Tula is really changing my skin for the better. After 3 weeks my skin went from very broken out to no new breakouts and a bunch of the acne scarring is gone.",
				review_rating: 5,
				review_date: "2019-04-24T21:07:13.073Z",
				reviewer_name: "Frugal beauty spender",
				reviewer_id: "a129a437-87b5-442e-b657-680de5ad271a",
				verified_buyer: false,
				up_votes: 28,
				down_votes: 0,
				query_id: "49801d36-7bfd-44c6-bf3c-577cca310af9",
			},
			{
				review_id: "85a5da33-c9ff-4036-8a69-325b479d47d6",
				product_id: "31f74761-deed-4637-ac5c-f18db2dab9f2",
				retailer_id: "Ulta123",
				review_headline: "What Changed?",
				review_text:
					"i have used this for a few years now. just got a new bottle this week. ingredient list changed and it now smells like moth balls. so disappointed.",
				review_rating: 1,
				review_date: "2023-04-24T21:07:13.073Z",
				reviewer_name: "al",
				reviewer_id: "5d18d327-b716-49f9-90ee-a5556000bfd5",
				verified_buyer: false,
				up_votes: 23,
				down_votes: 0,
				query_id: "58dfbdfc-3911-4229-82d4-951d401bc606",
			},
			{
				review_id: "6a5e101c-d5cc-4674-ace8-9198f520cdb9",
				product_id: "838da972-4bb3-4dce-ad7e-227a051fbeb7",
				retailer_id: "Ulta123",
				review_headline: "wanted to see why everyone loves Tula",
				review_text:
					"smells bad like bad perfume. doesn't lather well or removes makeup.",
				review_rating: 1,
				review_date: "2023-04-24T21:07:13.073Z",
				reviewer_name: "KM",
				reviewer_id: "f038181b-d238-4691-bd4a-a70373f59c4a",
				verified_buyer: false,
				up_votes: 23,
				down_votes: 0,
				query_id: "6197c533-2b67-4ad3-8bc3-28201f5f4e13",
			},
			{
				review_id: "1f9e6b17-4576-457b-bab6-a69954c2d1aa",
				product_id: "99d55ff5-e71f-4c40-b224-c93414070b1a",
				retailer_id: "Ulta123",
				review_headline: "Fragrance",
				review_text:
					"Because Ulta chose not to post my previous review, let me try again. There is too much fragrance in this product. Fragrance is not necessary in a facial cleanser and can be irritating.",
				review_rating: 2,
				review_date: "2023-04-24T21:07:13.073Z",
				reviewer_name: "Nano",
				reviewer_id: "2d10e0c1-d315-495a-9082-efa95b5dad1f",
				verified_buyer: false,
				up_votes: 19,
				down_votes: 2,
				query_id: "4fa52bf9-43a4-4eee-a8f0-9a0116f7559c",
			},
			{
				review_id: "8f3447f9-f4df-4dcb-99b2-acfcf74134d0",
				product_id: "5c8b3147-3e68-450a-a447-c8451777f65a",
				retailer_id: "Ulta123",
				review_headline: "Left my face feeling tight",
				review_text:
					'I have very dry skin and found myself rushing to get to my moisturizer after using this because my face would feel so tight. It says no synthetic fragrance added, but the bottle says "parfum." Regardless, I wish I would have done a little more homework.',
				review_rating: 2,
				review_date: "2023-04-24T21:07:13.073Z",
				reviewer_name: "MJ",
				reviewer_id: "568e3ca9-dce3-4774-bfc6-55d74abf6d2a",
				verified_buyer: false,
				up_votes: 17,
				down_votes: 0,
				query_id: "5af581bf-8367-46f9-a034-f2d52828fdfe",
			},
			{
				review_id: "0f4b0eb5-36c0-4609-948e-9b794a8d15a0",
				product_id: "82a9e9b1-812e-4688-b7a8-8620aaf21d6d",
				retailer_id: "Ulta123",
				review_headline: "STRONG Fragrance!",
				review_text: `This may be a cult favorite, but the smell is so strong and lasts so long on the face and hands that it becomes sickening after a while. I'm not opposed to fragrance in my skincare (in fact I prefer it) but this "cheap cologne" smell was too much for me to tolerate.`,
				review_rating: 2,
				review_date: "2024-03-24T21:07:16.392Z",
				reviewer_name: "Barb",
				reviewer_id: "0b557593-b1bb-4d0a-9f08-6fb877b03f8d",
				verified_buyer: false,
				up_votes: 16,
				down_votes: 3,
				query_id: "d80a06a4-f3bc-41ec-ad85-dcaa9dce291c",
			},
			{
				review_id: "e60b203b-65e4-4341-a069-7df9ee0f471a",
				product_id: "ad9fd99b-cfed-4ac9-9e57-7bfb58e63bc6",
				retailer_id: "Ulta123",
				review_headline: "Didn't work out for me",
				review_text:
					"I used this a few times hoping to like it, but I just couldn't. It made my face so dry after using it and I have really oily skin so that's a surprise to me. It has a slight fragrance which didn't bother me but could bother others. I just wish i could like it but it make my eczema flare up bad.",
				review_rating: 2,
				review_date: "2023-04-24T21:07:16.392Z",
				reviewer_name: "Lani",
				reviewer_id: "d009ceda-0595-4e93-b3e1-78924eacec1f",
				verified_buyer: false,
				up_votes: 16,
				down_votes: 0,
				query_id: "26fd5240-cac5-4449-a510-ac0dda58590f",
			},
			{
				review_id: "8edee036-027b-444e-a87e-b5a2ce32eefe",
				product_id: "56e68559-311a-4403-a1f4-fd6bc816dbce",
				retailer_id: "Ulta123",
				review_headline: "I'm a Tula convert for life!",
				review_text:
					"I have spent many many years searching out the best skin care products. I've tried them all, from drug store brands to super high end. Tula is where the search ended for me. I have normal to dry skin (especially in the Winter.) I ADORE the Cult Classic cleanser. You don't need more than a nickel sized amount, it lathers richly, rinses clean, removes all makeup, and leaves my skin feeling soft and clean without being tight or over dry. I follow with the So Polished sugar scrub and then the 24/7 moisturizer. Sometimes I'll add the Brightening Treatment vitamin c drops before moisturizer. I'm 41 and my skin has never looked so good. Having said all that, I don't know that I would recommend this line for super sensitive or problematic skin. It is also pretty fragrant, which doesn't bother me at all (it's a very clean soapy scent.) 100% recommend!",
				review_rating: 5,
				review_date: "2023-04-24T21:07:16.392Z",
				reviewer_name: "Erin",
				reviewer_id: "2958003b-4428-43da-ac0d-d7e9c1c401e1",
				verified_buyer: false,
				up_votes: 14,
				down_votes: 0,
				query_id: "10bf1aee-a594-4420-9c6b-f0eef506b9f8",
			},
			{
				review_id: "9de077bb-e063-4ee8-8d7a-f45cd12b4f58",
				product_id: "193bd7bd-80fb-4b03-8245-0dc4e518a535",
				retailer_id: "Ulta123",
				review_headline:
					"Not made with clean ingredients like website claims",
				review_text: `This product contains fragrance/parfum. This is not a clean ingredient, so I'm not sure why they are advertising it as a "clean" product. Very heavily fragranced. Smells like I washed my face with a bottle of downy fabric softener.`,
				review_rating: 1,
				review_date: "2023-04-24T21:07:16.392Z",
				reviewer_name: "Jess",
				reviewer_id: "29e2f3fe-06cd-4e51-97a4-28a09aec332b",
				verified_buyer: false,
				up_votes: 13,
				down_votes: 2,
				query_id: "92eaa186-7e5b-40a8-a5fa-982e115e7f8a",
			},
			{
				review_id: "bcae7ef4-4e5d-402a-a148-24e4a0d59e35",
				product_id: "52f34ad7-8e94-4246-af87-517536ad4516",
				retailer_id: "Ulta123",
				review_headline: "Never Again!",
				review_text:
					"I received this product as my birthday gift from Ulta. I was excited to use it! After the first wash, my face felt squeaky clean. After a few days of use, my face broke out like crazy! I am almost 40 so acne is not the norm for me. I threw it away and now trying to salvage the current state of my face.",
				review_rating: 1,
				review_date: "2023-10-24T21:07:16.392Z",
				reviewer_name: "Trina",
				reviewer_id: "ae829159-2d70-4de3-81e1-13f53e6b3f76",
				verified_buyer: false,
				up_votes: 12,
				down_votes: 4,
				query_id: "70e17e8f-b79f-431a-9027-d1ab3158e536",
			},
			{
				review_id: "e2798915-fa80-4465-8db9-f40188c08b9c",
				product_id: "ec0302a3-4523-42eb-97b6-391b567750a4",
				retailer_id: "Sephora123",
				review_headline: "broke me out",
				review_text:
					"it feels nice on ur skin after u first use it but it slowly broke me out each time i used it",
				review_rating: 2,
				review_date: "2024-04-19T21:07:09.166Z",
				reviewer_name: "lovexiris",
				reviewer_id: "26047e5f-d367-4ae8-82ef-6f47962b4582",
				verified_buyer: false,
				up_votes: 1,
				down_votes: 0,
				query_id: "951a3c20-c18b-477d-bedd-f86b3059a33c",
			},
			{
				review_id: "84702b5c-13b5-48f6-9a4a-8f4735c75bbb",
				product_id: "f84efa12-8eb9-4308-b584-d0e437044be5",
				retailer_id: "Sephora123",
				review_headline: "0/10 - Burning Sensation",
				review_text:
					"I'm trying to use cleaner products and this gave highly recommended so I thought I'd try it during the sale. Used one night and had to triple cleanse to feel like my makeup was removed and my face was clean, but there still seemed to be a residue but I thought maybe it's just a different feeling because it was new so I continued with my routine. After about 15 minutes I had to rewash my face with my old cleaner because my face was burning and I now have multiple breakouts on my normally clear skin. 0/10 would not recommend for someone with sensitive skin.",
				review_rating: 1,
				review_date: "2024-04-18T21:07:09.167Z",
				reviewer_name: "ladyelizabeth44",
				reviewer_id: "1812d69f-f0c4-457c-bd51-a0ba6ec908df",
				verified_buyer: false,
				up_votes: 2,
				down_votes: 0,
				query_id: "3a6d7274-a78c-4fd9-95fb-06fa823d83d5",
			},
			{
				review_id: "47f1c675-9b52-4df1-ad00-244b69105605",
				product_id: "fd684ae9-5575-4535-b97b-79a911d8f21d",
				retailer_id: "Sephora123",
				review_headline: "The best",
				review_text:
					"I've been using this for years and years. Nothing takes off my makeup (even waterproof eyeliner!) like this. Works well for my sensitive skin.",
				review_rating: 5,
				review_date: "2024-04-15T21:07:09.167Z",
				reviewer_name: "cecrn4",
				reviewer_id: "b9007d47-13e9-4280-a3d6-85f217ff7d09",
				verified_buyer: false,
				up_votes: 0,
				down_votes: 1,
				query_id: "2059ad2a-0b00-42bb-af63-237095c19594",
			},
			{
				review_id: "1f03c4b7-dff2-418e-8e78-bc87c5a4e04a",
				product_id: "fce0d1fa-e111-42b8-b50f-0dc24eff08ad",
				retailer_id: "Sephora123",
				review_headline: "",
				review_text:
					"I have been using the product over the past few days and I do like it! I don't think it will become a holy grail but it does not break out my acne prone skin and it leaves my face feeling clean. There is a scent that could bother some people",
				review_rating: 3,
				review_date: "2024-04-13T21:07:09.167Z",
				reviewer_name: "Maeve115",
				reviewer_id: "3e61ff7f-e41f-4c08-9d03-43748409b89f",
				verified_buyer: true,
				up_votes: 1,
				down_votes: 0,
				query_id: "68639f8a-6b0f-4869-90e8-1ff7271247f7",
			},
			{
				review_id: "4635aa1e-f4b6-4e3c-85b5-4af15a624ea1",
				product_id: "0f58d6c4-53d8-4dcc-93eb-8ca32d1e510a",
				retailer_id: "Sephora123",
				review_headline: "Overwhelming fragrance",
				review_text:
					"This fragrance was so strong that I couldn't continue to use it. It also was very drying for my sensitive/dry skin. I did like the consistency of it, but could not get past the smell.",
				review_rating: 2,
				review_date: "2024-04-13T21:07:09.167Z",
				reviewer_name: "jenneelee",
				reviewer_id: "65e40719-0569-46a9-98ec-a38197e2ba14",
				verified_buyer: false,
				up_votes: 0,
				down_votes: 0,
				query_id: "4610a810-7603-401e-9e29-484fce033a03",
			},
			{
				review_id: "c8c635c2-8d91-40f7-91fb-16cb42d8b9ae",
				product_id: "2babdf8b-0596-4566-b734-5e5cd070c18e",
				retailer_id: "Sephora123",
				review_headline: "Great for after dermaplaning",
				review_text:
					"Let me preface, I have normal to oily acne prone skin. This cleanser is really gentle and helped with flare up after dermaplaning. It soothed some small popped pimples as well. Pairs well with Skin1004 Cantella pore mixing deep cleanser",
				review_rating: 5,
				review_date: "2024-04-10T21:07:09.167Z",
				reviewer_name: "luvUum",
				reviewer_id: "2d9e12a7-be2a-455e-91df-aa11b5892e00",
				verified_buyer: false,
				up_votes: 0,
				down_votes: 0,
				query_id: "08bd5288-0a2c-4e4e-939e-0c291ae3b5a7",
			},
			{
				review_id: "aab66bc6-998a-41b7-9ee7-44f8b551299f",
				product_id: "15fa871f-c5b8-40c1-8d31-65d69c3a39c0",
				retailer_id: "Sephora123",
				review_headline: "broke me out",
				review_text:
					"it feels nice on ur skin after u first use it but it slowly broke me out each time i used it",
				review_rating: 2,
				review_date: "2024-04-19T21:07:10.204Z",
				reviewer_name: "lovexiris",
				reviewer_id: "0ca94bcb-47e5-46be-b702-c79a57367e2e",
				verified_buyer: false,
				up_votes: 1,
				down_votes: 0,
				query_id: "eb995503-1346-491f-b68f-a47906816145",
			},
			{
				review_id: "4b8a1438-8797-4d74-bfa0-c9eab5819806",
				product_id: "436c2b51-9b64-4af5-b1fe-6a1824fce678",
				retailer_id: "Sephora123",
				review_headline: "0/10 - Burning Sensation",
				review_text:
					"I'm trying to use cleaner products and this gave highly recommended so I thought I'd try it during the sale. Used one night and had to triple cleanse to feel like my makeup was removed and my face was clean, but there still seemed to be a residue but I thought maybe it's just a different feeling because it was new so I continued with my routine. After about 15 minutes I had to rewash my face with my old cleaner because my face was burning and I now have multiple breakouts on my normally clear skin. 0/10 would not recommend for someone with sensitive skin.",
				review_rating: 1,
				review_date: "2024-04-18T21:07:10.204Z",
				reviewer_name: "ladyelizabeth44",
				reviewer_id: "99ef120d-4ecb-4663-ba50-4c1685f86ff1",
				verified_buyer: false,
				up_votes: 2,
				down_votes: 0,
				query_id: "7ce5b5d0-6596-4eed-a59d-ff52fd508ef7",
			},
			{
				review_id: "f5010080-ff1b-4d05-8942-76312782cdda",
				product_id: "85675af4-83a0-43f5-99e6-9448a07488e6",
				retailer_id: "Sephora123",
				review_headline: "The best",
				review_text:
					"I've been using this for years and years. Nothing takes off my makeup (even waterproof eyeliner!) like this. Works well for my sensitive skin.",
				review_rating: 5,
				review_date: "2024-04-15T21:07:10.204Z",
				reviewer_name: "cecrn4",
				reviewer_id: "b6be8426-7315-46de-981b-65acd481c1b8",
				verified_buyer: false,
				up_votes: 0,
				down_votes: 1,
				query_id: "8d3fb6f2-5f26-423a-9eb2-346bf758edf8",
			},
			{
				review_id: "d6b9993b-1262-4957-8cbc-77c06ea797ea",
				product_id: "9a0fe179-5153-42a6-8161-af24f4a1275f",
				retailer_id: "Sephora123",
				review_headline: "",
				review_text:
					"I have been using the product over the past few days and I do like it! I don't think it will become a holy grail but it does not break out my acne prone skin and it leaves my face feeling clean. There is a scent that could bother some people",
				review_rating: 3,
				review_date: "2024-04-13T21:07:10.204Z",
				reviewer_name: "Maeve115",
				reviewer_id: "47bb8426-b7ca-48fa-8ce0-9bb15692de35",
				verified_buyer: true,
				up_votes: 1,
				down_votes: 0,
				query_id: "c1dec3c9-9126-49fd-b533-369cf75e7a4f",
			},
			{
				review_id: "192da0c0-0ae6-4b68-9c04-0af66f168941",
				product_id: "30e133cd-83bc-427d-bc13-2f62e5671cbe",
				retailer_id: "Sephora123",
				review_headline: "Overwhelming fragrance",
				review_text:
					"This fragrance was so strong that I couldn't continue to use it. It also was very drying for my sensitive/dry skin. I did like the consistency of it, but could not get past the smell.",
				review_rating: 2,
				review_date: "2024-04-13T21:07:10.204Z",
				reviewer_name: "jenneelee",
				reviewer_id: "154ec8da-7601-4265-959a-b13ed7672ab5",
				verified_buyer: false,
				up_votes: 0,
				down_votes: 0,
				query_id: "235aea82-6185-4cb5-a6f9-59616a13b368",
			},
			{
				review_id: "ca4e2161-5d82-4c53-86da-26186332432a",
				product_id: "da7f69ee-c059-413b-a654-6400f25ad1ba",
				retailer_id: "Sephora123",
				review_headline: "Great for after dermaplaning",
				review_text:
					"Let me preface, I have normal to oily acne prone skin. This cleanser is really gentle and helped with flare up after dermaplaning. It soothed some small popped pimples as well. Pairs well with Skin1004 Cantella pore mixing deep cleanser",
				review_rating: 5,
				review_date: "2024-04-10T21:07:10.204Z",
				reviewer_name: "luvUum",
				reviewer_id: "84a38d09-86ab-41ad-b483-0df502c151c5",
				verified_buyer: false,
				up_votes: 0,
				down_votes: 0,
				query_id: "e3fea741-9f2c-44ac-a885-1453f719a66c",
			},
		];

		data.forEach((review) => {
			review.product_id = productId;
			review.query_id = queryId
		});

		const product = {
			product_id: productId,
			product_name: "test",
			product_image_url: "test",
			retailer_id: ["Ulta123", "Sephora123"],
			brand_id: crypto.randomUUID(),
			brand_name: "test",
			queries: ["test"],
			ulta_sku_id: "test",
			sephora_sku_id: "test",
		};

		await prisma.product.create({ data: product });

		let count = 0;
		for (const review of data) {
			await prisma.review.create({ data: review });
			count++;
			console.log(count);
		}
	}

	function getNumber(text: string | null): number | null {
		if (!text) return null;
		const regex = /(\d{1,3}(,\d{3})*(\.\d+)?)/;
		const match = text.match(regex);

		if (!match) return null;

		let numberString = match[0].replace(/[^\d.]/g, "");
		if (numberString.includes(".")) {
			return parseFloat(numberString);
		} else {
			return parseInt(numberString, 10);
		}
	}

	console.log(parseInt("4109"))

	return (
		<form action={handleSubmit}>
			<Button type="submit">Add Data</Button>
		</form>
	);
}
