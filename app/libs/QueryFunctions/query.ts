import { PrismaClient } from "@prisma/client";
import { withPgTrgm } from "prisma-extension-pg-trgm";

const prisma = new PrismaClient().$extends(withPgTrgm({ logQueries: false }));

export default async function Query(query: string) {
	let threshold = 0.9;

	let sharedResult = await prisma.sharedProduct.similarity({
		query: {
			ulta_product_name: {
				similarity: { text: query, order: "desc" },
				word_similarity: { text: query, threshold: { gt: threshold } },
			},
		},
	});

	while (sharedResult.length <= 3 || threshold <= 0.05) {
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

	const mappedResults = sharedResult.map((result) => {
		const {
			ulta_product_name_similarity_score,
			ulta_product_name_word_similarity_score,
			...rest
		} = result;
		return rest;
	});

	return mappedResults;
}
