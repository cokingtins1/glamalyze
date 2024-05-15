import { PrismaClient } from "@prisma/client";
import { withPgTrgm } from "prisma-extension-pg-trgm";
import { QueryResult } from "../types";

const prisma = new PrismaClient().$extends(withPgTrgm({ logQueries: false }));

export default async function Query(query: string): Promise<QueryResult> {
	let threshold = 0.9;

	let ultaResult = await prisma.ultaProduct.similarity({
		query: {
			product_name: {
				similarity: { text: query, order: "desc" },
				word_similarity: { text: query, threshold: { gt: threshold } },
			},
		},
	});

	while (ultaResult.length < 1 || threshold <= 0.05) {
		threshold = threshold - 0.05;
		ultaResult = await prisma.ultaProduct.similarity({
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

	let sephoraResult = await prisma.sephoraProduct.similarity({
		query: {
			product_name: {
				similarity: { text: query, order: "desc" },
				word_similarity: { text: query, threshold: { gt: threshold } },
			},
		},
	});

	while (sephoraResult.length < 1 || threshold <= 0.05) {
		threshold = threshold - 0.05;
		sephoraResult = await prisma.sephoraProduct.similarity({
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

	let sharedResult = await prisma.sharedProduct.similarity({
		query: {
			ulta_product_name: {
				similarity: { text: query, order: "desc" },
				word_similarity: { text: query, threshold: { gt: threshold } },
			},
		},
	});

	while (sharedResult.length < 1 || threshold <= 0.05) {
		threshold = threshold - 0.05;
		sharedResult = await prisma.sharedProduct.similarity({
			query: {
				ulta_product_name: {
					similarity: { text: query, order: "desc" },
					word_similarity: {
						text: query,
						threshold: { gt: threshold },
					},
				},
			},
		});
	}

	const filteredShared = sharedResult.map((result) => {
		const {
			ulta_product_name_similarity_score,
			ulta_product_name_word_similarity_score,
			...rest
		} = result;
		return rest;
	});

	const filteredUlta = ultaResult.map((result) => {
		const {
			product_name_similarity_score,
			product_name_word_similarity_score,
			...rest
		} = result;
		return rest;
	});

	const filteredSephora = sephoraResult.map((result) => {
		const {
			product_name_similarity_score,
			product_name_word_similarity_score,
			...rest
		} = result;
		return rest;
	});

	return { filteredShared, filteredUlta, filteredSephora };
}
