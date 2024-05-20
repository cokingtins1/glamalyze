import { Card } from "@/components/ui/card";

import {
	Autocomplete,
	AutocompleteSection,
	AutocompleteItem,
} from "@nextui-org/autocomplete";

type Props = {
	data: {
        product_id: string
		product_name: string | null;
		retailer_id: string;
		brand_name: string | null;
		sku_id: string | null;
		product_image_url: string[];
	}[];
};

export default function Search({ data }: Props) {
	const animals = [{ value: "balls", label: "balls" }];
    console.log(data.length)
	return (
		<Card className="p-2 h-max">
			<div className="flex w-full flex-wrap md:flex-nowrap gap-4">
				<Autocomplete label="Search products" className="max-w-xs">
					{data.map((p) => (
						<AutocompleteItem
							key={p.product_id}
							value={p.product_id}
						>
							{p.product_name}
						</AutocompleteItem>
					))}
				</Autocomplete>
			</div>
		</Card>
	);
}
