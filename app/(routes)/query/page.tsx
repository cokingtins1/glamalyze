import { getSephoraReviews } from "@/app/actions/getSephoraReviews";
import { getUltaReviews } from "@/app/actions/getUltaReviews";
import { Review, ReviewsScrape } from "@/app/libs/types";
import { Button } from "@/components/ui/button";
import { getSharedUpdate } from "@/lib/badUtils";
import {
	FailedScrapes,
	PrismaClient,
	SephoraReviewer,
	UltaReviewer,
} from "@prisma/client";

const prisma = new PrismaClient();

export default async function Page() {
	const runQuery = async () => {
		"use server";

		const startingCharacters = ["b"];

		const query = "sweet";

		const data = await prisma.$queryRaw`
			with input as (select ${query} as q)
			select product_name, brand_name,
				1 - (input.q <<-> (coalesce(product_id, '') || ' ' || 
				coalesce(product_name, '') || ' ' ||
				coalesce(brand_name, ''))) as score                   
			from "SephoraProduct", input
			where input.q <% (coalesce(product_id, '') || ' ' ||
				coalesce(product_name, '') || ' ' ||
				coalesce(brand_name, ''))
			order by input.q <<-> (coalesce(product_id, '') || ' ' ||
				coalesce(product_name, '') || ' ' ||
				coalesce(brand_name, ''))
			limit 7
		`;

		console.log(data);

		const fail: FailedScrapes[] = [];

		// let count = 69;
		// let forceStop = Infinity;
		// const numProducts = fail.length;
		// // const sharedId = fail[count].sharedId[0];
		// const sharedId = "balls";
		// while (count < fail.length) {
		// 	const [ultaProductId, sephoraProductId] = fail[count].id;
		// 	const [ultaUrl, sephoraUrl] = fail[count].page_link;
		// 	const [ultaProductName, sephoraProductName] = fail[count].name;
		// 	const [ultaReviews, sephoraReviews] = fail[
		// 		count
		// 	].total_reviews?.map(Boolean) ?? [false, false];

		// 	console.log(
		// 		"current index:",
		// 		`${count + 1}/ ${fail.length} of ${numProducts}`,
		// 		"brand name:",
		// 		`${ultaProductName}/${sephoraProductName}`
		// 	);

		// 	const [ultaData, sephoraData] = await Promise.all([
		// 		getUltaReviews(ultaUrl, ultaProductId, ultaReviews),
		// 		getSephoraReviews(sephoraUrl, sephoraProductId, sephoraReviews),
		// 	]);

		// 	console.log(
		// 		"ulta res:",
		// 		ultaData.response.status.success,
		// 		ultaData.response.status.messasge
		// 	);
		// 	console.log(
		// 		"sephora res:",
		// 		sephoraData.response.status.success,
		// 		sephoraData.response.status.messasge
		// 	);
		// 	if (ultaData.response.status.success) {
		// 		await upsertData(
		// 			ultaData,
		// 			"Ulta",
		// 			ultaProductId,
		// 			ultaReviews,
		// 			sharedId
		// 		);
		// 	}
		// 	if (sephoraData.response.status.success) {
		// 		await upsertData(
		// 			sephoraData,
		// 			"Sephora",
		// 			sephoraProductId,
		// 			sephoraReviews,
		// 			sharedId
		// 		);
		// 	}
		// 	count++;
		// }

		// async function upsertData(
		// 	data: ReviewsScrape,
		// 	retailer: "Ulta" | "Sephora",
		// 	productId: string,
		// 	reviewsPresent: boolean,
		// 	sharedId: string
		// ) {
		// 	const scrubbedProductData = Object.fromEntries(
		// 		Object.entries(data.metaData).filter(
		// 			([k, v]) =>
		// 				v !== null &&
		// 				v !== undefined &&
		// 				v !== "" &&
		// 				!(Array.isArray(v) && v.length === 0)
		// 		)
		// 	);

		// 	if (retailer === "Ulta") {
		// 		await prisma.ultaProduct.update({
		// 			where: { product_id: productId },
		// 			data: scrubbedProductData,
		// 		});
		// 	} else if (retailer === "Sephora") {
		// 		await prisma.sephoraProduct.update({
		// 			where: { product_id: productId },
		// 			data: scrubbedProductData,
		// 		});
		// 	}

		// 	const sharedData = getSharedUpdate(data.metaData, retailer);
		// 	await prisma.sharedProduct.update({
		// 		where: { id: sharedId },
		// 		data: sharedData,
		// 	});

		// 	if (!reviewsPresent) {
		// 		console.log(data.response.status.messasge);
		// 		return;
		// 	}

		// 	let existingReviews: Review[] = [];

		// 	if (retailer === "Ulta") {
		// 		existingReviews = await prisma.ultaReview.findMany({
		// 			where: { product_id: productId },
		// 		});
		// 	} else if (retailer === "Sephora") {
		// 		existingReviews = await prisma.sephoraReview.findMany({
		// 			where: { product_id: productId },
		// 		});
		// 	}

		// 	const reviewsToAdd = data.reviewsData.filter(
		// 		(newReview) =>
		// 			!existingReviews.some(
		// 				(existingReview) =>
		// 					existingReview.review_text === newReview.review_text
		// 			)
		// 	);

		// 	const reviewsToUpdate = existingReviews.map((existingReview) => {
		// 		const matchingNewReview = data.reviewsData.find(
		// 			(newReview) =>
		// 				newReview.review_text === existingReview.review_text
		// 		);
		// 		if (matchingNewReview) {
		// 			return {
		// 				...existingReview,
		// 				review_rating: matchingNewReview.review_rating,
		// 				up_votes: matchingNewReview.up_votes,
		// 				down_votes: matchingNewReview.down_votes,
		// 			};
		// 		} else {
		// 			return existingReview;
		// 		}
		// 	});

		// 	if (reviewsToAdd.length > 0) {
		// 		console.log(`Adding ${reviewsToAdd.length} reviews...`);

		// 		const reviewerToAdd: (UltaReviewer | SephoraReviewer)[] =
		// 			reviewsToAdd.map((r) => {
		// 				return {
		// 					reviewer_id: crypto.randomUUID(),
		// 					product_id: r.product_id,
		// 					reviewer_name: r.reviewer_name,
		// 					retailer_id: r.retailer_id,
		// 				};
		// 			});

		// 		if (retailer === "Ulta") {
		// 			await prisma.ultaReview.createMany({
		// 				data: reviewsToAdd,
		// 			});
		// 			await prisma.ultaReviewer.createMany({
		// 				data: reviewerToAdd,
		// 			});
		// 		} else if ((retailer = "Sephora")) {
		// 			await prisma.sephoraReview.createMany({
		// 				data: reviewsToAdd,
		// 			});
		// 			await prisma.sephoraReviewer.createMany({
		// 				data: reviewerToAdd,
		// 			});
		// 		}
		// 	}

		// 	if (reviewsToUpdate.length > 0) {
		// 		console.log(`Updating ${reviewsToUpdate.length} reviews...`);

		// 		for (const review of reviewsToUpdate) {
		// 			const {
		// 				retailer_id,
		// 				product_id,
		// 				reviewer_name,
		// 				review_date,
		// 				review_date_string,
		// 				created_at,
		// 				...updateData
		// 			} = review;

		// 			if (retailer === "Ulta") {
		// 				await prisma.ultaReview.update({
		// 					where: { review_id: review.review_id },
		// 					data: updateData,
		// 				});
		// 			} else if ((retailer = "Sephora")) {
		// 				await prisma.sephoraReview.update({
		// 					where: { review_id: review.review_id },
		// 					data: updateData,
		// 				});
		// 			}
		// 		}
		// 	}
		// }
	};

	return (
		<div className="grid place-content-center">
			<form action={runQuery}>
				<Button type="submit">Run Query</Button>
			</form>
		</div>
	);
}
