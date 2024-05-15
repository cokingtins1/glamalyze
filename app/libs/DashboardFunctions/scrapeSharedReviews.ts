import {
	PrismaClient,
	SephoraReviewer,
	SharedProduct,
	UltaReviewer,
} from "@prisma/client";
import {
	AllProducts,
	Review,
	ReviewsScrape,
	ScrapeReturnMessage,
	SharedLinks,
	TScrapeSchema,
} from "../types";
import { getSharedProducts } from "./getSharedProducts";

import { getUltaReviews } from "@/app/actions/getUltaReviews";
import { getSephoraReviews } from "@/app/actions/getSephoraReviews";

const prisma = new PrismaClient();

export default async function scrapeSharedReviews(
	input: TScrapeSchema
): Promise<ScrapeReturnMessage> {
	let start = new Date().getTime();
	let end: number = new Date().getTime();
	let scrapeIndex = "";

	console.log("input:", input);

	const allLinks: SharedLinks[] = await getSharedProducts(input);

	console.log(allLinks);

	if (allLinks.length > 0) {
		const failedScrapes = await runReviewScraper(allLinks);

		if (failedScrapes.length > 0) {
			console.log(`Running ${failedScrapes.length} failed scrapes`);
			await runReviewScraper(failedScrapes);
		}
	}

	async function runReviewScraper(allProducts: SharedLinks[]) {
		let count = 108;
		const numProducts = allProducts.length;

		let failedScrapes: SharedLinks[] = [];

		while (count < allProducts.length) {
			const [ultaProductId, sephoraProductId] = allProducts[count].id;
			const [ultaUrl, sephoraUrl] = allProducts[count].page_link;
			const [ultaProductName, sephoraProductName] = allProducts[count].name;
			const [ultaReviews, sephoraReviews] = allProducts[
				count
			].total_reviews?.map(Boolean) ?? [false, false];

			console.log(
				"current index:",
				`${count}/ ${allProducts.length} of ${numProducts}`,
				"brand name:",
				`${ultaProductName}/${sephoraProductName}`
			);

			const [ultaData, sephoraData] = await Promise.all([
				getUltaReviews(ultaUrl, ultaProductId, ultaReviews),
				getSephoraReviews(sephoraUrl, sephoraProductId, sephoraReviews),
			]);

			if (!ultaData.response.status.success) {
				failedScrapes.push({
					id: [ultaProductId, ""],
					page_link: [ultaUrl, ""],
					name: allProducts[0].name,
					total_reviews: allProducts[count].total_reviews,
				});
				console.log(`${ultaData.response.status.messasge}: ${ultaUrl}`);
			}
			if (!sephoraData.response.status.success) {
				failedScrapes.push({
					id: ["", sephoraProductId],
					page_link: ["", sephoraUrl],
					name: allProducts[0].name,
					total_reviews: allProducts[count].total_reviews,
				});
				console.log(
					`${sephoraData.response.status.messasge}: ${sephoraUrl}`
				);
			}

			if (ultaData) {
				await upsertData(ultaData, "Ulta", ultaProductId, ultaReviews);
			}
			if (sephoraData) {
				await upsertData(
					sephoraData,
					"Sephora",
					sephoraProductId,
					sephoraReviews
				);
			}
			count++;
		}
		return failedScrapes;
	}

	async function upsertData(
		data: ReviewsScrape,
		retailer: "Ulta" | "Sephora",
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

		// await prisma.sharedProduct.update({where: {AND: [{ulta_product_id: }]}})

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

	return {
		message: {
			executionTime: `${(end - start) / 1000}`,
			scrapeIndex,
			error: "",
		},
	};
}
