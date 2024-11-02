import React from "react";
import compareProducts from "../../actions/Compare/compareProducts";
import ProductCard from "../../(routes)/compare/[slug]/_components/ProductCard";
import { AllProducts, Review } from "@/app/libs/types";

type Props =
	| {
			productData: AllProducts | null;
			reviewsData: Review[] | null;
	  }[]
	| undefined;

export default async function ReviewData(props: { sku: string }) {
	const reviewData = await compareProducts(props.sku);

	return (
		<>
			{reviewData &&
				reviewData.length > 0 &&
				reviewData.map(
					(result, index) =>
						result.productData &&
						result.reviewsData && (
							<ProductCard
								key={index}
								data={result.productData}
								reviewsData={result.reviewsData}
							/>
						)
				)}
		</>
	);
}
