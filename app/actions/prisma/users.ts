"use server";

import {
	productSeeds,
	reviewerSeeds,
	userSeeds,
	reviewSeeds,
	querySeeds,
	retailerProductSeeds,
} from "@/lib/seeding/seedingFuncs";

import { PrismaClient } from "@prisma/client";

import {
	productExists,
	seedProduct,
	seedQuery,
	seedRetailerProduct,
	seedReview,
	seedUser,
	updateQuery,
	updateSku,
} from "./seed";

const prisma = new PrismaClient();

export async function main() {
	// const start = new Date().getTime();
	// // const user = await prisma.user.findUnique({
	// // 	where: {
	// // 		user_id: userId,
	// // 	},
	// // });
	// // if (!user) {
	// // 	await prisma.user.create({
	// // 		data: {
	// // 			user_id: "",
	// // 			user_email: "seancokingtin@gmail.com",
	// // 			user_name: "cokingtins1",
	// // 			created_at: new Date(),
	// // 		},
	// // 	});
	// // }
	// // Clear DB
	// // await prisma.product.deleteMany({});
	// // await prisma.query.deleteMany({});
	// // await prisma.review.deleteMany({});
	// // await prisma.reviewer.deleteMany({});
	// // await prisma.sephoraProduct.deleteMany({});
	// // await prisma.ultaProduct.deleteMany({});
	// // await prisma.user.deleteMany({});
	// // Create seeds
	// const userSeed = userSeeds(10);
	// // await seedUser(userSeed);
	// for (let i = 0; i < 1; i++) {
	// 	//getting sku from initial baby scrape of sku #'s
	// 	const dummySku = ["103310", "909626"];
	// 	// initialize the query
	// 	const querySeed = querySeeds(userSeed);
	// 	// await seedQuery(querySeed);
	// 	//check ulta and sephora DB if product exists
	// 	const existingData = await productExists(querySeed, dummySku);
	// 	if (existingData) {
	// 		return existingData;
	// 	}
	// 	// "scrape" the product data:
	// 	const productSeed = productSeeds(querySeed);
	// 	// await seedProduct(querySeed, productSeed);
	// 	const retailerSeed = retailerProductSeeds(querySeed, productSeed);
	// 	// await seedRetailerProduct(retailerSeed);
	// 	// Retroactive Updating: SKU's and query product_id
	// 	// await updateQuery(productSeed.product_id, querySeed);
	// 	// const skuIds = [retailerSeed[0].sku_id, retailerSeed[1].sku_id];
	// 	// await updateSku(productSeed.product_id, skuIds);
	// 	const reviewerSeed = reviewerSeeds(25);
	// 	// await seedReviewer(reviewerSeed);
	// 	const reviewSeed = reviewSeeds(
	// 		querySeed,
	// 		productSeed,
	// 		reviewerSeed,
	// 		10
	// 	);
	// 	// await seedReview(reviewSeed);
	// }
	// const end = new Date().getTime();
	// console.log(`Execution time: ${(end - start) / 1000} seconds`);
}
