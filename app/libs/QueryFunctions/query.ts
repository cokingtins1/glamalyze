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
	let threshold = 0.45;

	let result = await prisma.allProducts.similarity({
		query: {
			product_name: {
				similarity: { text: query, order: "desc" },
				word_similarity: { text: query, threshold: { gt: threshold } },
			},
		},
	});

	while (result.length < 3 || threshold <= 0) {
		threshold = threshold - 0.05;
		result = await prisma.allProducts.similarity({
			query: {
				product_name: {
					similarity: { text: query, order: "desc" },
					word_similarity: {
						text: query,
						threshold: { gt: threshold },
					},
				},
			},
		});
	}

	console.log("threshold", threshold);
	console.log("results.length", result.length);

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
