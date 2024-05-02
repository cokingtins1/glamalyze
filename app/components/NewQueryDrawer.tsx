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

type NewQueryDrawerProps = {
	searchParams: SearchParams;
	queryResults: AllProducts[];
};

export default async function NewQueryDrawer({
	searchParams,
	queryResults,
}: NewQueryDrawerProps) {
	const data = {
		product_id: "a42dc12a-9f2c-417f-9b35-9af32c953190",
		product_name: "Super A Serum",
		retailer_id: "Ulta",
		brand_id: "ce5c3bd4-8153-4b73-8041-05d0c12be0ae",
		brand_name: "Mad Hippie",
		sku_id: "2530019",
		avg_rating: 4.6,
		total_reviews: 168,
		page_link:
			"https://www.ulta.com/p/super-a-serum-xlsImpprod18731243?sku=2530019",
		product_price: [32.99],
		product_image_url: [
			"https://media.ulta.com/i/ulta/2530019?w=240&$ProductCardNeutralBGLight$&fmt=auto",
		],
		created_at: new Date("2024-04-30T18:48:55.094Z"),
		updated_at: new Date("2024-04-30T18:48:55.094Z"),
	};

	return (
		<Sheet>
			<SheetTrigger>New Search</SheetTrigger>
			<SheetContent side={"left"} className="bg-white">
				<SheetHeader>
					<SheetTitle>New Search</SheetTitle>
				</SheetHeader>
				<GetProductForm />
				<div className="mt-4"></div>
				{queryResults.length > 0 &&
					queryResults.map((result, index) => (
						<QueryResultCard key={index} data={result} />
					))}
			</SheetContent>
		</Sheet>
	);
}
