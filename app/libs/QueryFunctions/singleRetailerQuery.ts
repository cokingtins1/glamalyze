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
		let res: AllProducts[] = await prisma.$queryRaw`
            with input as (select ${query} as q)
            select *,
                1 - (input.q <<-> (coalesce(product_id, '') || ' ' || 
                coalesce(product_name, '') || ' ' ||
                coalesce(brand_name, ''))) as score                   
            from "UltaProduct", input
            where input.q <% (coalesce(product_id, '') || ' ' ||
                coalesce(product_name, '') || ' ' ||
                coalesce(brand_name, ''))
            order by input.q <<-> (coalesce(product_id, '') || ' ' ||
                coalesce(product_name, '') || ' ' ||
                coalesce(brand_name, ''))
			limit 7

    `;

		return res;
	} else if (sephora && !ulta) {
		let res: AllProducts[] = await prisma.$queryRaw`
            with input as (select ${query} as q)
            select *,
                1 - (input.q <<-> (coalesce(product_id, '') || ' ' || 
                coalesce(product_name, '') || ' ' ||
                coalesce(brand_name, ''))) as score                   
            from "SephoraProduct", input
            where input.q <% (coalesce(product_id, '') || ' ' ||
                coalesce(product_name, '') || ' ' ||
                coalesce(brand_name, ''))
            order by input.q <<-> (coalesce(product_id, '') || ' ' ||
                coalesce(product_name, '') || ' ' ||
                coalesce(brand_name, ''))
			limit 7

    `;

		return res;
	} else if ((ulta && sephora) || (!ulta && !sephora)) {
	}

	// return { filteredUlta, filteredSephora };
}
