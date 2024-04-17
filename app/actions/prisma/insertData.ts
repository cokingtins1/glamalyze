import { PrismaClient, Review, SephoraProduct } from "@prisma/client";
const prisma = new PrismaClient();

export async function insertData(
	metaData: SephoraProduct,
	reviewsData: Review[]
) {
	// Assign common productId
	const product_id = crypto.randomUUID();

	metaData.product_id = product_id;

	for (const review of reviewsData) {
		review.product_id = product_id;
	}

	console.log("metaData and reviewsData back end:", metaData, reviewsData);

	await prisma.sephoraProduct.create({ data: metaData });
	await prisma.review.createMany({ data: reviewsData });
}
