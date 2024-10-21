import { PrismaClient, SharedProduct } from "@prisma/client";
import { withPgTrgm } from "prisma-extension-pg-trgm";
import { AllProducts, QueryResult } from "../types";

const prisma = new PrismaClient().$extends(withPgTrgm({ logQueries: false }));

export default async function singleRetailerQuery(
	query: string,
	ulta: boolean,
	sephora: boolean,
	shared: boolean
): Promise<AllProducts[] | SharedProduct[] | undefined> {
	if (shared && !ulta && !sephora) {
		let res: SharedProduct[] = await prisma.$queryRaw`
		        with input as (select ${query} as q)
		        select *,
		            1 - (input.q <<-> (coalesce(product_id, '') || ' ' ||
		            coalesce(product_name, '') || ' ' ||
		            coalesce(brand_name, ''))) as score
		        from "SharedProduct", input
		        where input.q <% (coalesce(product_id, '') || ' ' ||
		            coalesce(product_name, '') || ' ' ||
		            coalesce(brand_name, ''))
		        order by input.q <<-> (coalesce(product_id, '') || ' ' ||
		            coalesce(product_name, '') || ' ' ||
		            coalesce(brand_name, ''))
		        limit 7
		`;
		return res;
		// function transformToAllProduct(sharedProduct: SharedProduct): AllProducts {
		//     // Combine image URLs from both Ulta and Sephora
		//     const combinedImageUrls = [
		//       ...sharedProduct.ulta_product_image_url,
		//       ...sharedProduct.sephora_product_image_url,
		//     ];
		//     // Combine product names with a preference for non-null values
		//     const productName = sharedProduct.ulta_product_name || sharedProduct.sephora_product_name;
		//     // Combine product prices
		//     const productPrice = sharedProduct.ulta_product_price ?? sharedProduct.sephora_product_price;
		//     // Combine product price ranges
		//     const productPriceRange = [
		//       ...sharedProduct.ulta_product_price_range,
		//       ...sharedProduct.sephora_product_price_range,
		//     ];
		//     // Combine SKU IDs
		//     const skuId = sharedProduct.ulta_sku_id ?? sharedProduct.sephora_sku_id;
		//     // Combine average ratings
		//     const avgRating = sharedProduct.ulta_avg_rating ?? sharedProduct.sephora_avg_rating;
		//     // Combine total reviews
		//     const totalReviews = sharedProduct.ulta_total_reviews ?? sharedProduct.sephora_total_reviews;
		//     // Combine page links
		//     const pageLink = sharedProduct.ulta_page_link || sharedProduct.sephora_page_link;
		//     // Create the AllProduct object
		//     const allProduct: AllProducts = {
		//       product_id: sharedProduct.id,
		//       created_at: sharedProduct.created_at,
		//       updated_at: sharedProduct.updated_at,
		//       product_name: productName,
		//       product_image_url: combinedImageUrls,
		//       retailer_id: sharedProduct.similarity_score > 0.5 ? 'Ulta' : 'Sephora', // Example condition
		//       brand_id: sharedProduct.brand_id,
		//       brand_name: sharedProduct.brand_name,
		//       review_histogram: [], // Default empty array, modify as needed
		//       product_price_range: productPriceRange,
		//       product_price: productPrice,
		//       sku_id: skuId,
		//       avg_rating: avgRating,
		//       total_reviews: totalReviews,
		//       page_link: pageLink,
		//       percent_recommended: null, // Example: undefined by default
		//     };
		//     return allProduct;
		//   }
		//   const sharedRes = transformToAllProduct(res)
	} else if (ulta && !sephora && !shared) {
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
	} else if (sephora && !ulta && !shared) {
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
