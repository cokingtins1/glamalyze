import {
	PrismaClient,
	Product,
	Review,
	Reviewer,
	SephoraProduct,
} from "@prisma/client";
const prisma = new PrismaClient();

export async function insertData(
	metaData: SephoraProduct,
	reviewsData: Review[],
	userId: string
) {
	// Check if user exists:

	const user = await prisma.user.findUnique({
		where: {
			user_id: userId,
		},
	});

	if (!user) return;


	// Check if user exists - DONE
	// Check if same query exists -> add expiration (could vary based on popularity)
	// Check if same reviewer exists
	// Check if same product exists -> upsert
	// Check if same sephora/ulta product exists -> upsert

	// Assign common global id's
	const product_id = crypto.randomUUID();
	const retailerId = "Sephora123"


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
		retailer_id: [metaData.retailer_id],
	};

	const reviewers: Reviewer[] = reviewsData.map((review) => {
		return {
			reviewer_id: review.reviewer_id,
			reviewer_name: review.reviewer_name,
			retailer_id: retailerId
		};
	});

	// console.log("metaData and reviewsData back end:", metaData, reviewsData);

	await prisma.product.create({ data: productData });
	await prisma.sephoraProduct.create({ data: metaData });

	await prisma.reviewer.createMany({ data: reviewers });
	await prisma.review.createMany({ data: reviewsData });
}
