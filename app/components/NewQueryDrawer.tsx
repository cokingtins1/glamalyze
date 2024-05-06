import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import GetProductForm from "./GetProductForm";
import { SearchParams, SearchResults } from "../libs/types";
import QueryResultCard from "./QueryResultCard";
import { Suspense } from "react";
import DisplaySkeleton from "./Loading Skeletons/DisplaySkeleton";
import Query from "../libs/QueryFunctions/query";
import QueryResults from "./QueryResults";

type NewQueryDrawerProps = {
	searchParams: SearchParams;
};

export default async function NewQueryDrawer({
	searchParams,
}: NewQueryDrawerProps) {

	const keyString = `search${searchParams}`
	return (
		<Sheet>
			<SheetTrigger>New Search</SheetTrigger>
			<SheetContent side={"left"} className="bg-white">
				<SheetHeader>
					<SheetTitle>New Search</SheetTitle>
				</SheetHeader>
				<GetProductForm />
				{/* <Suspense key={keyString} fallback={<DisplaySkeleton />}>
					<QueryResults searchParams={searchParams} />
				</Suspense> */}
			</SheetContent>
		</Sheet>
	);
}
