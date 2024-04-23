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

const prisma = new PrismaClient();

export async function seedUser(userData: User[]) {
	await prisma.user.createMany({ data: userData });
}

export async function seedProduct(query: Query, productData: Product) {
	const productsToAdd: Product[] = [];

	const productFound = await prisma.product.findFirst({
		where: { product_name: productData.product_name },
	});
	if (!productFound) {
		// Will need to do something if product is found
		productsToAdd.push(productData);
	} else {
		await prisma.product.update({
			data: {
				queries: {
					push: "currentQuery",
				},
			},
			where: { product_id: productFound.product_id },
		});
	}

	await prisma.product.createMany({ data: productsToAdd });
}

export async function seedReviewer(reviewerData: Reviewer[]) {
	await prisma.reviewer.createMany({ data: reviewerData });
}

export async function seedReview(reviewData: Review[]) {
	await prisma.review.createMany({ data: reviewData });
}

export async function seedQuery(queryData: Query) {
	await prisma.query.createMany({ data: queryData });
}

export async function seedRetailerProduct(
	retailerSeed: (SephoraProduct | UltaProduct)[]
) {
	for (const retailer of retailerSeed) {
		if (retailer.retailer_id === "Sephora123") {
			await prisma.sephoraProduct.create({ data: retailer });
		} else {
			await prisma.ultaProduct.create({ data: retailer });
		}
	}
}

export async function productExists(productName: string) {
	const sephoraProduct = await prisma.sephoraProduct.findFirst({
		where: { product_name: productName },
	});

	const ultaProduct = await prisma.ultaProduct.findFirst({
		where: { product_name: productName },
	});

	if (sephoraProduct && ultaProduct) {
		// do something
	} else {
		// proceed to upsert retailer product data
	}
}
