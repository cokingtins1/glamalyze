import { PrismaClient, SharedProduct } from "@prisma/client";
import { withPgTrgm } from "prisma-extension-pg-trgm";
import { AllProducts, QueryResult } from "../types";

const prisma = new PrismaClient().$extends(withPgTrgm({ logQueries: false }));

export default async function singleRetailerQuery(
	query: string,
	ulta: boolean,
	sephora: boolean
): Promise<AllProducts[] | SharedProduct[] | undefined> {
	let threshold = 0.7;

	if (ulta && !sephora) {
		let ultaResult = await prisma.ultaProduct.similarity({
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
		const filteredUlta = ultaResult.map((result) => {
			const {
				product_name_similarity_score,
				product_name_word_similarity_score,
				...rest
			} = result;
			return rest;
		});
		return filteredUlta;
	} else if (sephora && !ulta) {
		let sephoraResult = await prisma.sephoraProduct.similarity({
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

		const filteredSephora = sephoraResult.map((result) => {
			const {
				product_name_similarity_score,
				product_name_word_similarity_score,
				...rest
			} = result;
			return rest;
		});
		return filteredSephora;
	} else if ((ulta && sephora) || (!ulta && !sephora)) {
		const sharedResult: unknown[] = await prisma.$queryRaw`
            SELECT * FROM "UltaProduct"
            WHERE similarity(product_name, ${query}) > 0.9
            UNION
            SELECT * FROM "SephoraProduct"
            WHERE similarity(product_name, ${query}) > 0.9
        `;

		console.log("shared result:", sharedResult.slice(0,3));
		console.log("shared result:", sharedResult.length);

		// let sharedResult = await prisma.sharedProduct.similarity({
		// 	query: {
		// 		ulta_product_name: {
		// 			similarity: { text: query, order: "desc" },
		// 			word_similarity: {
		// 				text: query,
		// 				threshold: { gt: threshold },
		// 			},
		// 		},
		// 	},
		// });

		// while (sharedResult.length < 1 || threshold <= 0.05) {
		// 	threshold = threshold - 0.05;
		// 	sharedResult = await prisma.sharedProduct.similarity({
		// 		query: {
		// 			ulta_product_name: {
		// 				similarity: { text: query, order: "desc" },
		// 				word_similarity: {
		// 					text: query,
		// 					threshold: { gt: threshold },
		// 				},
		// 			},
		// 		},
		// 	});
		// }

		// const filteredShared = sharedResult.map((result) => {
		// 	const {
		// 		ulta_product_name_similarity_score,
		// 		ulta_product_name_word_similarity_score,
		// 		...rest
		// 	} = result;
		// 	return rest;
		// });

		// return filteredShared;
	}

	// return { filteredUlta, filteredSephora };
}
