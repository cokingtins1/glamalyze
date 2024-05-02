import { AllProducts, PrismaClient } from "@prisma/client";
import { withPgTrgm } from "prisma-extension-pg-trgm";
import { SearchResults } from "../types";

import {
	SimilarityQuery,
	SimilarityResult,
	isOperation,
	operations,
	isComparator,
	comparators,
	isOrder,
	orders,
	SimilarityArgs,
} from "@/app/libs/pg_extension_types";

const prisma = new PrismaClient().$extends(withPgTrgm({ logQueries: true }));

export default async function Query(query: string) {
	// const result =
	// 	await prisma.$queryRaw`SELECT * FROM "AllProducts" WHERE "product_name" LIKE '%${query}%' `;

	// const result =
	// 	await prisma.$queryRaw`SELECT * FROM "AllProducts" WHERE levenshtein("product_name",  ${query})`;

	const result = await prisma.allProducts.similarity({
		query: {
			product_name: {
				similarity: { text: query, order: "desc" },
				word_similarity: { text: query, threshold: { gt: 0.2 } },
			},
		},
	});

	const mappedResults = result.map((result) => {
		const {
			product_name_similarity_score,
			product_name_word_similarity_score,
			...rest
		} = result;
		return rest;
	});

	return mappedResults;
}
