import React, { Suspense } from "react";
import { SearchParams } from "../libs/types";
import Query from "../libs/QueryFunctions/query";
import { AllProducts } from "@prisma/client";
import DisplaySkeleton from "./Loading Skeletons/DisplaySkeleton";
import QueryResultCard from "./QueryResultCard";

type Props = {
	searchParams: SearchParams;
};

export default async function QueryResults({ searchParams }: Props) {
	let queryResults: AllProducts[] = [];

	if (searchParams.search) {
		const query = searchParams.search as string;
		queryResults = await Query(query);
	}
	return (
		<div className="mt-4 space-y-4">
			{queryResults.length > 0 &&
				queryResults.map((result, index) => (
					<QueryResultCard key={index} data={result} />
				))}
		</div>
	);
}
