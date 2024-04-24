import { createProduct, createQuery } from "@/lib/seeding/seedingFuncs";
import {
	PrismaClient,
	Review,
	SephoraProduct,
	UltaProduct,
	User,
} from "@prisma/client";
import {
	productExists,
	seedProduct,
	seedQuery,
	seedRetailerProduct,
	seedReview,
	updateQuery,
	updateSku,
} from "./seed";
const prisma = new PrismaClient();

export async function insertData(
	ultaProduct: UltaProduct,
	sephoraProduct: SephoraProduct,
	ultaReviews: Review[],
	sephoraReviews: Review[],
	userId: string
) {
	// Check if user exists:

	if (!ultaProduct.sku_id) return { missingParameter: "ultaProduct" };
	if (!sephoraProduct.sku_id) return { missingParameter: "sephoraProduct" };
	if (!ultaReviews) return { missingParameter: "ultaReviews" };
	if (!sephoraReviews) return { missingParameter: "sephoraReviews" };

	const user = await prisma.user.findUnique({
		where: {
			user_id: userId,
		},
	});

	let newUser;
	if (!user) {
		newUser = await prisma.user.create({
			data: {
				user_email: "seancokingtin@gmail.com",
				user_name: "cokingtins1",
			},
		});
	}

	const dummySku = ["103310", "909626"];

	const query = createQuery(newUser ? newUser.user_id : userId);
	await seedQuery(query);

	const existingData = await productExists(query, dummySku);
	if (existingData) {
		return existingData;
	}

	const product = createProduct(ultaProduct, sephoraProduct, query);
	await seedProduct(product);

	await seedRetailerProduct(ultaProduct, sephoraProduct, product, query);
	await seedReview([...ultaReviews, ...sephoraReviews], product, query);

	// Retroactive Updating: SKU's and query product_id
	await updateQuery(product.product_id, query);
	const skuIds = [ultaProduct.sku_id, sephoraProduct.sku_id];
	await updateSku(product.product_id, skuIds);

	return "Success";
}
