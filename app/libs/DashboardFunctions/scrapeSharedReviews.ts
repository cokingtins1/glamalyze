import {
	FailedScrapes,
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
import { getSharedUpdate } from "@/lib/badUtils";
import { getRetailerProduct } from "./getRetailerProduct";

const prisma = new PrismaClient();

export default async function scrapeSharedReviews(
	input: TScrapeSchema
): Promise<ScrapeReturnMessage> {
	let start = new Date().getTime();
	let scrapeIndex = "";

	console.log("input:", input);

	let allLinks: SharedLinks[] = [];

	if (input.retailer === "Shared") {
		allLinks = await getSharedProducts(input);
	} else {
		allLinks = await getRetailerProduct(input);
	}

	console.log(allLinks.length);

	if (allLinks.length > 0) {
		// const data = await prisma.sharedProduct.findMany({
		// 	where: { ulta_product_price: null },
		// });
		// const links: SharedLinks[] = data.map((p) => ({
		// 	sharedId: [p.id],
		// 	id: [p.ulta_product_id, ""],
		// 	page_link: [p.ulta_page_link ?? "", ""],
		// 	name: [p.ulta_product_name ?? "", p.sephora_product_name ?? ""],
		// 	total_reviews: [
		// 		p.ulta_total_reviews ?? 0,
		// 		p.sephora_total_reviews ?? 0,
		// 	],
		// }));
		// console.log(links.length);

		// const failedScrapes = await runReviewScraper(allLinks);
		// if (failedScrapes.length > 0) {
		// 	console.log("Failed Scrapes:");
		// 	console.dir(failedScrapes, { maxArrayLength: null });
		// 	console.log(`Running ${failedScrapes.length} failed scrapes`);
		// 	const failedScrapesTwice = await runReviewScraper(failedScrapes);
		// 	await prisma.failedScrapes.createMany({ data: failedScrapesTwice });
		// }
	}

	async function runReviewScraper(
		allProducts: SharedLinks[]
	): Promise<FailedScrapes[]> {
		let count = 0;
		let forceStop = 100;
		const numProducts = allProducts.length;

		let failedScrapes: FailedScrapes[] = [];

		while (count < allProducts.length && count < forceStop) {
			const sharedId = allProducts[count].sharedId[0];
			const [ultaProductId, sephoraProductId] = allProducts[count].id;
			const [ultaUrl, sephoraUrl] = allProducts[count].page_link;
			const [ultaProductName, sephoraProductName] =
				allProducts[count].name;
			const [ultaReviews, sephoraReviews] = allProducts[
				count
			].total_reviews?.map(Boolean) ?? [false, false];

			const retailer = !!allProducts[count].page_link[0]
				? "Ulta"
				: "Sephora";

			console.log(
				"current index:",
				`${count + 1}/ ${allProducts.length} of ${numProducts}`,
				"product name:",
				`${retailer} - ${ultaProductName || sephoraProductName}`
			);

			const [ultaData, sephoraData] = await Promise.all([
				getUltaReviews(ultaUrl, ultaProductId, ultaReviews),
				getSephoraReviews(sephoraUrl, sephoraProductId, sephoraReviews),
			]);

			if (
				!ultaData.response.status.success &&
				ultaData.response.status.messasge !== "No Url provided"
			) {
				failedScrapes.push({
					scrape_id: crypto.randomUUID(),
					id: [ultaProductId, ""],
					sharedId: [sharedId],
					page_link: [ultaUrl, ""],
					name: allProducts[count].name,
					total_reviews: allProducts[count].total_reviews,
				});
				console.log(`${ultaData.response.status.messasge}: ${ultaUrl}`);
			}
			if (
				!sephoraData.response.status.success &&
				sephoraData.response.status.messasge !== "No Url provided"
			) {
				failedScrapes.push({
					scrape_id: crypto.randomUUID(),
					id: ["", sephoraProductId],
					sharedId: [sharedId],
					page_link: ["", sephoraUrl],
					name: allProducts[count].name,
					total_reviews: allProducts[count].total_reviews,
				});
				console.log(
					`${sephoraData.response.status.messasge}: ${sephoraUrl}`
				);
			}

			if (ultaData.response.status.success) {
				await upsertData(
					ultaData,
					"Ulta",
					ultaProductId,
					ultaReviews,
					sharedId
				);
			}
			if (sephoraData.response.status.success) {
				await upsertData(
					sephoraData,
					"Sephora",
					sephoraProductId,
					sephoraReviews,
					sharedId
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
		reviewsPresent: boolean,
		sharedId: string
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

		const sharedData = getSharedUpdate(data.metaData, input.retailer);
		if (input.retailer === "Shared") {
			await prisma.sharedProduct.update({
				where: { id: sharedId },
				data: sharedData,
			});
		} else {
			await prisma.allProduct.update({
				where: { product_id: sharedId },
				data: sharedData,
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

	let end: number = new Date().getTime();

	console.log(`Done: ${(end - start) / 1000} seconds`);
	return {
		message: {
			executionTime: `${(end - start) / 1000}`,
			scrapeIndex,
			error: "",
		},
	};
}
