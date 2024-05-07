import React, { Suspense } from "react";
import Query from "../libs/QueryFunctions/query";
import DisplaySkeleton from "./Loading Skeletons/DisplaySkeleton";
import QueryResultCard from "./QueryResultCard";
import { SharedProduct } from '@prisma/client';

type Props = {
	isSubmitting: boolean;
	data: SharedProduct[];
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
