"use client";

import React, { Suspense, useState } from "react";
import DisplaySkeleton from "../Loading Skeletons/DisplaySkeleton";
import { AllProducts, QueryResult } from "../../libs/types";
import QueryResultCardHome from "./QueryResultCardHome";
import RetailerQueryResultCardHome from "./RetailerQueryResultCardHome";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import RetailerExclusive from "./RetailerExclusive";
import CompareCard from "./CompareCard";
import Search from "@/app/_components/Search";

type Props = {
	isSubmitting: boolean;
	data: {
		product_id: string
		product_name: string | null;
		retailer_id: string;
		brand_name: string | null;
		sku_id: string | null;
		product_image_url: string[];
	}[];
};

export default function QueryResultsHome({ isSubmitting, data }: Props) {
	const [products, setProducts] = useState<AllProducts[]>([]);

	return (
		<>
			{isSubmitting && (
				<div className="my-4 space-y-4">
					{Array.from({ length: 5 }).map((_, index) => (
						<DisplaySkeleton key={index} />
					))}
				</div>
			)}

			<div className="mt-4 space-y-4 ">
				<Card className="grid grid-cols-2 h-[200px]">
					<CardHeader>
						<CardTitle className="text-primary">
							Compare Products
						</CardTitle>
						<CardDescription>
							These products are only carried by
						</CardDescription>
					</CardHeader>
					<CardContent className="pt-6">
						<Search data={data}/>
					</CardContent>

					{/* <CardContent className="grid grid-cols-2 gap-2">
						{products.length > 0 &&
							products.map((result, index) => (
								<CompareCard key={index} data={result} />
							))}
					</CardContent> */}
				</Card>

				<div className="flex flex-col gap-4 lg:grid grid-cols-2 lg:gap-4">
					{/* <RetailerExclusive
						retailer="Ulta"
						products={products}
						setProducts={setProducts}
					/>

					<RetailerExclusive
						retailer="Sephora"
						products={products}
						setProducts={setProducts}
					/> */}
				</div>
			</div>
		</>
	);
}

{
	/* {data.filteredShared.length > 0 && (
						<Card>
							<CardHeader className="pb-2 text-primary">
								<CardTitle>Shared Products</CardTitle>
								<CardDescription>
									These products are carried by both Ulta and
									Sephora
								</CardDescription>
							</CardHeader>
							<CardContent>
								{data.filteredShared.map((result, index) => (
									<QueryResultCardHome
										key={index}
										data={result}
									/>
								))}
							</CardContent>
						</Card>
					)} */
}
