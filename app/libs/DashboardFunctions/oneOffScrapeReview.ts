import { getSephoraReviews } from "@/app/actions/getSephoraReviews";
import { getUltaReviews } from "@/app/actions/getUltaReviews";
import {
	FailedScrapes,
	PrismaClient,
	SephoraReviewer,
	UltaReviewer,
} from "@prisma/client";
import { Review, ReviewsScrape } from "../types";
import { getSharedUpdate } from "../badUtils";

const prisma = new PrismaClient();

export default async function oneOffScrapeReview(
	url: string,
	productId: string,
	reviewsPresent: boolean,
	retailer: string
) {
	let data;
	let failedScrapes: FailedScrapes[] = [];

	if (retailer === "Ulta" && url !== null) {
		data = await getUltaReviews(url, productId, reviewsPresent);
	} else if (retailer === "Sephora" && url !== null) {
		data = await getSephoraReviews(url, productId, reviewsPresent);
	}

	if (data?.response.status.success) {
		await upsertData(data, retailer, productId, reviewsPresent);
	}

	async function upsertData(
		data: ReviewsScrape,
		retailer: string,
		productId: string,
		reviewsPresent: boolean
	) {
		const scrubbedProductData = Object.fromEntries(
			Object.entries(data.metaData).filter(
				([k, v]) =>
					v !== null &&
					v !== undefined &&
					v !== "" &&
					!(Array.isArray(v) && v.length === 0)
			)
		);

		if (retailer === "Ulta") {
			await prisma.ultaProduct.update({
				where: { product_id: productId },
				data: scrubbedProductData,
			});
		} else if (retailer === "Sephora") {
			await prisma.sephoraProduct.update({
				where: { product_id: productId },
				data: scrubbedProductData,
			});
		}

		let sharedData = getSharedUpdate(data.metaData, retailer);

		sharedData["scraped"] = true;
		await prisma.allProduct.update({
			where: { product_id: productId },
			data: sharedData,
		});

		if (!reviewsPresent) {
			console.log(data.response.status.messasge);
			return;
		}

		let existingReviews: Review[] = [];

		if (retailer === "Ulta") {
			existingReviews = await prisma.ultaReview.findMany({
				where: { product_id: productId },
			});
		} else if (retailer === "Sephora") {
			existingReviews = await prisma.sephoraReview.findMany({
				where: { product_id: productId },
			});
		}

		const reviewsToAdd = data.reviewsData.filter(
			(newReview) =>
				!existingReviews.some(
					(existingReview) =>
						existingReview.review_text === newReview.review_text
				)
		);

		const reviewsToUpdate = existingReviews.map((existingReview) => {
			const matchingNewReview = data.reviewsData.find(
				(newReview) =>
					newReview.review_text === existingReview.review_text
			);
			if (matchingNewReview) {
				return {
					...existingReview,
					review_rating: matchingNewReview.review_rating,
					up_votes: matchingNewReview.up_votes,
					down_votes: matchingNewReview.down_votes,
				};
			} else {
				return existingReview;
			}
		});

		if (reviewsToAdd.length > 0) {
			console.log(`Adding ${reviewsToAdd.length} reviews...`);

			const reviewerToAdd: (UltaReviewer | SephoraReviewer)[] =
				reviewsToAdd.map((r) => {
					return {
						reviewer_id: crypto.randomUUID(),
						product_id: r.product_id,
						reviewer_name: r.reviewer_name,
						retailer_id: r.retailer_id,
					};
				});

			if (retailer === "Ulta") {
				await prisma.ultaReview.createMany({
					data: reviewsToAdd,
				});
				await prisma.ultaReviewer.createMany({
					data: reviewerToAdd,
				});
			} else if ((retailer = "Sephora")) {
				await prisma.sephoraReview.createMany({
					data: reviewsToAdd,
				});
				await prisma.sephoraReviewer.createMany({
					data: reviewerToAdd,
				});
			}
		}

		if (reviewsToUpdate.length > 0) {
			console.log(`Updating ${reviewsToUpdate.length} reviews...`);

			for (const review of reviewsToUpdate) {
				const {
					retailer_id,
					product_id,
					reviewer_name,
					review_date,
					review_date_string,
					created_at,
					...updateData
				} = review;

				if (retailer === "Ulta") {
					await prisma.ultaReview.update({
						where: { review_id: review.review_id },
						data: updateData,
					});
				} else if ((retailer = "Sephora")) {
					await prisma.sephoraReview.update({
						where: { review_id: review.review_id },
						data: updateData,
					});
				}
			}
		}
	}
}
