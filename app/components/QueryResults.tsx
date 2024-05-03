import React, { Suspense } from "react";
import { SearchParams } from "../libs/types";
import Query from "../libs/QueryFunctions/query";
import { AllProducts } from "@prisma/client";
import DisplaySkeleton from "./Loading Skeletons/DisplaySkeleton";
import QueryResultCard from "./QueryResultCard";

type Props = {
	isSubmitting: boolean;
	data: AllProducts[];
};

export default function QueryResults({ isSubmitting, data }: Props) {
	return (
		<>
			{isSubmitting && (
				<div className="my-4 space-y-4">
					{Array.from({ length: 5 }).map((_, index) => (
						<DisplaySkeleton key={index} />
					))}
				</div>
			)}

			{!isSubmitting && data.length > 0 && (
				<div className="mt-4 space-y-4">
					{data.map((result, index) => (
						<QueryResultCard key={index} data={result} />
					))}
				</div>
			)}
		</>
	);
}
