import { PrismaClient, Product, Review, Reviewer, SephoraProduct } from "@prisma/client";
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

	const productData: Product = {
		product_id: product_id,
		product_name: metaData.product_name,
		brand_id: crypto.randomUUID(),
		brand_name: metaData.brand_name,
		product_image_url: "image.png",
		retailer_id: [metaData.retailer_id]

	}

	const reviewers: Reviewer[] = reviewsData.map((review) => {
		return {
			reviewer_id: review.reviewer_id,
			reviewer_name: review.reviewer_name
		};
	});

	// console.log("metaData and reviewsData back end:", metaData, reviewsData);

	await prisma.product.create({ data: productData });
	await prisma.sephoraProduct.create({ data: metaData });

	await prisma.reviewer.createMany({ data: reviewers });
	await prisma.review.createMany({ data: reviewsData });
}
