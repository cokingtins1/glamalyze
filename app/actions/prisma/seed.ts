import {
	PrismaClient,
	Product,
	Query,
	Review,
	Reviewer,
	SephoraProduct,
	UltaProduct,
	User,
} from "@prisma/client";
import dayjs from "dayjs";

const prisma = new PrismaClient();

export async function seedUser(userData: User[]) {
	await prisma.user.createMany({ data: userData });
}

export async function seedProduct(productData: Product) {
	await prisma.product.create({ data: productData });

	// const productsToAdd: Product[] = [];

	// const productFound = await prisma.product.findFirst({
	// 	where: { product_name: productData.product_name },
	// });
	// if (!productFound) {
	// 	// Will need to do something if product is found
	// 	productsToAdd.push(productData);
	// } else {
	// 	await prisma.product.update({
	// 		data: {
	// 			queries: {
	// 				push: "currentQuery",
	// 			},
	// 		},
	// 		where: { product_id: productFound.product_id },
	// 	});
	// }

	// await prisma.product.createMany({ data: productsToAdd });
}

export async function seedReview(
	reviewData: Review[],
	productData: Product,
	query: Query
) {
	const reviewers: Reviewer[] = reviewData.map((review) => {
		return {
			reviewer_id: review.reviewer_id,
			reviewer_name: review.reviewer_name,
			retailer_id: review.retailer_id,
		};
	});

	reviewData.forEach((review) => {
		(review.product_id = productData.product_id),
			(review.query_id = query.query_id);
	});

	await prisma.reviewer.createMany({ data: reviewers });
	await prisma.review.createMany({ data: reviewData });
}

export async function seedQuery(queryData: Query) {
	await prisma.query.create({ data: queryData });
}

export async function seedRetailerProduct(
	ultaProduct: UltaProduct,
	sephoraProduct: SephoraProduct,
	product: Product,
	query: Query
) {
	ultaProduct.product_id = product.product_id;
	sephoraProduct.product_id = product.product_id;

	ultaProduct.queries = [query.query_id];
	sephoraProduct.queries = [query.query_id];

	await prisma.ultaProduct.create({ data: ultaProduct });
	await prisma.sephoraProduct.create({ data: sephoraProduct });
}

export async function productExists(querySeed: Query, productSku: string[]) {
	const [ulta_sku, sephora_sku] = productSku;
	let dataExists: boolean = false;

	const ultaProduct = await prisma.ultaProduct.findFirst({
		where: { sku_id: ulta_sku },
	});
	const sephoraProduct = await prisma.sephoraProduct.findFirst({
		where: { sku_id: sephora_sku },
	});

	if (ultaProduct && sephoraProduct) {
		const latestUltaQuery =
			ultaProduct.queries[ultaProduct.queries.length - 1];
		const ultaExpiration = await prisma.query.findUnique({
			where: { query_id: latestUltaQuery },
		});

		if (ultaExpiration?.created_at) {
			const expiration = 7;

			const queryAge = dayjs().diff(
				dayjs(ultaExpiration.created_at),
				"day"
			);

			if (queryAge <= expiration) {
				dataExists = true;
			}
		}

		await prisma.ultaProduct.update({
			where: { product_id: ultaProduct.product_id },
			data: { queries: { push: querySeed.query_id } },
		});

		await prisma.sephoraProduct.update({
			where: { product_id: sephoraProduct.product_id },
			data: { queries: { push: querySeed.query_id } },
		});

		if (dataExists) {
			const reviewsData = await prisma.review.findMany({
				where: { product_id: ultaProduct.product_id },
			});

			//update query with product_id as last thing
			await prisma.query.update({
				where: { query_id: querySeed.query_id },
				data: {
					product_id: ultaProduct.product_id,
				},
			});

			return { ultaProduct, sephoraProduct, reviewsData };
		}
	}
	return dataExists;
}

export async function updateSku(
	productId: string,
	productSku: (string | null)[]
) {
	const [ulta_sku, sephora_sku] = productSku;

	await prisma.product.update({
		where: { product_id: productId },
		data: {
			ulta_sku_id: ulta_sku,
			sephora_sku_id: sephora_sku,
		},
	});
}

export async function updateQuery(productId: string, querySeed: Query) {
	await prisma.query.update({
		where: { query_id: querySeed.query_id },
		data: {
			product_id: productId,
		},
	});
}
