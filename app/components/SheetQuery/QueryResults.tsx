import React, { Suspense } from "react";
import Query from "../../libs/QueryFunctions/query";
import DisplaySkeleton from "../Loading Skeletons/DisplaySkeleton";
import QueryResultCard from "./QueryResultCard";
import { SharedProduct } from "@prisma/client";
import { QueryResult } from "../../libs/types";
import RetailerQueryResultCard from "./RetailerQueryResultCard";

type Props = {
	isSubmitting: boolean;
	data: QueryResult;
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

			{!isSubmitting && (
				<div className="mt-4 space-y-4">
					<p>Shared Products</p>
					{data.filteredShared.map((result, index) => (
						<QueryResultCard key={index} data={result} />
					))}
					<p>Ulta Products</p>
					{data.filteredUlta.map((result, index) => (
						<RetailerQueryResultCard key={index} data={result} />
					))}
					<p>Sephora Products</p>
					{data.filteredSephora.map((result, index) => (
						<RetailerQueryResultCard key={index} data={result} />
					))}
				</div>
			)}
		</>
	);
}

//Rocky1!
