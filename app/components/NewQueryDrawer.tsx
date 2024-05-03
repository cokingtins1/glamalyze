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
import { AllProducts } from "@prisma/client";
import { Suspense } from "react";

type NewQueryDrawerProps = {
	searchParams: SearchParams;
	queryResults: AllProducts[];
};

export default async function NewQueryDrawer({
	searchParams,
	queryResults,
}: NewQueryDrawerProps) {
	return (
		<Sheet>
			<SheetTrigger>New Search</SheetTrigger>
			<SheetContent side={"left"} className="bg-white">
				<SheetHeader>
					<SheetTitle>New Search</SheetTitle>
				</SheetHeader>
				<GetProductForm />
				<div className="mt-4 space-y-4">
					{queryResults.length > 0 &&
						queryResults.map((result, index) => (
							<QueryResultCard key={index} data={result} />
						))}
				</div>
			</SheetContent>
		</Sheet>
	);
}
