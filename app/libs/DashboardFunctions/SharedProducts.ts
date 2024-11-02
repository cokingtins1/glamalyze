"use server";

import { PrismaClient, SharedProduct } from "@prisma/client";
import { withPgTrgm } from "prisma-extension-pg-trgm";

const prisma = new PrismaClient().$extends(withPgTrgm());
export default async function PopSharedProducts() {
	// console.log("getting shared products...");
	// type simQuery = SharedProduct[] & {
	// 	ulta_product_name_similarity_score: string;
	// 	ulta_product_name_word_similarity_score: string;
	// };
	// const sim: simQuery[] = await prisma.$queryRaw`
	// 	SELECT
	// 		p1.brand_id AS brand_id,
	// 		p1.brand_name AS brand_name,
	// 		p1.product_name AS ulta_product_name,
	// 		p2.product_name AS sephora_product_name,
	// 		p1.product_id AS ulta_product_id,
	// 		p2.product_id AS sephora_product_id,
	// 		p1.avg_rating AS ulta_avg_rating,
	// 		p2.avg_rating AS sephora_avg_rating,
	// 		p1.total_reviews AS ulta_total_reviews,
	// 		p2.total_reviews AS sephora_total_reviews,
	// 		p1.product_image_url AS ulta_product_image_url,
	// 		p2.product_image_url AS sephora_product_image_url,
	// 		p1.sku_id AS ulta_sku_id,
	// 		p2.sku_id AS sephora_sku_id,
	// 		p1.page_link AS ulta_page_link,
	// 		p2.page_link AS sephora_page_link,
	// 		p1.product_price AS ulta_product_price,
	// 		p2.product_price AS sephora_product_price,
	// 		p1.product_price_range AS ulta_product_price_range,
	// 		p2.product_price_range AS sephora_product_price_range,
	// 		p1.created_at AS created_at,
	// 		p1.updated_at AS updated_at,
	// 		similarity(p1.product_name, p2.product_name) AS similarity_score
	// 	FROM
	// 		"UltaProduct" AS p1
	// 	JOIN
	// 		"SephoraProduct" AS p2
	// 	ON
	// 		p1.brand_id = p2.brand_id
	// 		AND similarity(p1.product_name, p2.product_name) >= 0.7
	// 	WHERE
	// 		similarity(p1.product_name, p2.product_name) >= 0.7
	// 	ORDER BY
	// 		similarity_score DESC
	// 	`;
	// const mappedResults = sim.map((result) => {
	// 	const {
	// 		ulta_product_name_similarity_score,
	// 		ulta_product_name_word_similarity_score,
	// 		...rest
	// 	} = result;
	// 	return {
	// 		id: crypto.randomUUID(),
	// 		...rest,
	// 	};
	// });
	// await prisma.sharedProduct.createMany({ data: mappedResults });
	// console.log(`found ${mappedResults.length} shared prodcuts`);
}
