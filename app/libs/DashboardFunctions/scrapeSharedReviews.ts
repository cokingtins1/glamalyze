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

	// let products: AllProducts[] | SharedProduct[] = [];

	const products: SharedProduct[] = await getSharedProducts(input);

	const ultaLinks = products
		.filter((p) => p.ulta_page_link !== null)
		.map((p) => ({
			id: p.ulta_product_id,
			page_link: p.ulta_page_link,
			name: p.ulta_product_name,
		}));

	const sephoraLinks = products
		.filter((p) => p.sephora_page_link !== null)
		.map((p) => ({
			id: p.sephora_product_id,
			page_link: p.sephora_page_link,
			name: p.sephora_product_name,
		}));

	const allLinks = [...ultaLinks, ...sephoraLinks];

	console.log(allLinks.length);
	console.log(ultaLinks.length);
	console.log(sephoraLinks.length);

	console.log(ultaLinks.slice(0, 5));
	console.log(sephoraLinks.slice(0, 5));

	if (products.length > 0) {
		await runReviewScraper(allLinks);
	}

	// Shared:
	// scrape review at each product where ulta/sephora_page_link !== null

	type AllLinks = {
		id: string;
		page_link: string | null;
		name: string | null;
	};
	async function runReviewScraper(allProducts: AllLinks[]) {
		let ultaIndex = 0;
		let sephoraIndex = allProducts.length / 2 - 1;
		const numProducts = allProducts.length;
		let allIndex = 0;

		let data: SharedProduct[] = [];
		while (allIndex < numProducts) {
			const ultaUrl = allProducts[ultaIndex].page_link;
			const sephoraUrl = allProducts[sephoraIndex].page_link;

			const ultaBrandId = allProducts[ultaIndex].id;
			const sephoraBrandId = allProducts[sephoraIndex].id;

			console.log(
				"current index:",
				`${allIndex} of ${numProducts}`,
				"brand name:",
				allProducts[ultaIndex].name
			);
			const [ultaData, sephoraData] = await Promise.all([
				getUltaReviews(ultaUrl, ultaBrandId),
				getSephoraReviews(sephoraUrl, sephoraBrandId),
			]);

			if (ultaData || sephoraData) {
				await upsertData(ultaData, "Ulta", allProducts[ultaIndex].id);
				await upsertData(
					sephoraData,
					"Sephora",
					allProducts[sephoraIndex].id
				);
			}
			ultaIndex++;
			sephoraIndex++;
			allIndex++;
		}
	}

	async function upsertData(
		data: ReviewsScrape,
		retailer: "Ulta" | "Sephora",
		productId: string
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

			if (data.reviewsData.length > 0) {
				await prisma.ultaReview.createMany({
					data: data.reviewsData,
				});
			}
		} else if (retailer === "Sephora") {
			await prisma.sephoraProduct.update({
				where: { product_id: productId },
				data: scrubbedProductData,
			});

			if (data.reviewsData.length > 0) {
				await prisma.sephoraReview.createMany({
					data: data.reviewsData,
				});
			}
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
