import { PrismaClient, SharedProduct } from "@prisma/client";
import { withPgTrgm } from "prisma-extension-pg-trgm";
import { AllProducts, QueryResult } from "../types";

const prisma = new PrismaClient().$extends(withPgTrgm({ logQueries: false }));

export default async function combinedRetailerQuery(
	query: string
): Promise<QueryResult | undefined> {
	let sharedRes: SharedProduct[] = await prisma.$queryRaw`
		        with input as (select ${query} as q)
		        select *,
		            1 - (input.q <<-> (coalesce(id, '') || ' ' ||
		            coalesce(ulta_product_name, '') || ' ' ||
		            coalesce(brand_name, ''))) as score
		        from "SharedProduct", input
		        where input.q <% (coalesce(id, '') || ' ' ||
		            coalesce(ulta_product_name, '') || ' ' ||
		            coalesce(brand_name, ''))
		        order by input.q <<-> (coalesce(id, '') || ' ' ||
		            coalesce(ulta_product_name, '') || ' ' ||
		            coalesce(brand_name, ''))
		        limit 3
		`;

	let ultaRes: AllProducts[] = await prisma.$queryRaw`
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
			limit 3

    `;

	let sephoraRes: AllProducts[] = await prisma.$queryRaw`
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
			limit 3

    `;

	return { ultaRes, sephoraRes, sharedRes };
}
