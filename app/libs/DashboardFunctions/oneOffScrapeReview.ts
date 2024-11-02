import { getSephoraReviews } from "@/app/actions/getSephoraReviews";
import { getUltaReviews } from "@/app/actions/getUltaReviews";
import { SephoraReviewer, UltaReviewer } from "@prisma/client";
import { Retailer, Review, ReviewsScrape } from "../types";
import { getSharedUpdate } from "../badUtils";
import { prisma } from "@/prisma/_base";

export default async function oneOffScrapeReview(
	url: string,
	productId: string,
	reviewsPresent: boolean,
	retailer: Retailer
): Promise<boolean> {
	let success = false;
	let data: ReviewsScrape | null = null;

	if (retailer === "Ulta") {
		data = await getUltaReviews(url, productId, reviewsPresent);
	} else if (retailer === "Sephora") {
		console.log("here");
		data = await getSephoraReviews(url, productId, reviewsPresent);
	}

	if (data?.response.status.success && data.reviewsData.length > 0) {
		// console.log("data:", data.metaData, data.reviewsData);
		await upsertData(data, retailer, productId, reviewsPresent);
		success = true;
		return success;
	} else {
		return success;
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
