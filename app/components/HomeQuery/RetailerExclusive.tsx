import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import RetailerQueryResultCardHome from "./RetailerQueryResultCardHome";
import { AllProducts } from "@/app/libs/types";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction, useState } from "react";
import RetailerQueryForm from "./RetailerQueryForm";
import {
	Accordion,
	AccordionTrigger,
	AccordionContent,
	AccordionItem,
} from "@/components/ui/accordion";

type Props = {
	retailer: "Ulta" | "Sephora";
	products: AllProducts[];
	setProducts: Dispatch<SetStateAction<AllProducts[]>>;
};

export default function RetailerExclusive({
	retailer,
	products,
	setProducts,
}: Props) {
	const [data, setData] = useState<AllProducts[]>([]);

	const firstThree = data.slice(0, 3);
	const restOfData = data.slice(3);

	const handleClick = (product: AllProducts) => {
		const existingProductIndex = products.findIndex(
			(p) => p.product_id === product.product_id
		);
		if (existingProductIndex !== -1) {
			setProducts((prevProducts) =>
				prevProducts.filter((p) => p.product_id !== product.product_id)
			);
		} else if (products.length < 2) {
			setProducts((prevProducts) => [...prevProducts, product]);
		}
	};
	return (
		<Card>
			<CardHeader
				className={cn("flex justify-between pb-2 px-2", {
					"text-orange-500": retailer === "Ulta",
					"text-black": retailer === "Sephora",
				})}
			>
				<div className="pl-2">
					<CardTitle>{retailer} Exclusive</CardTitle>
					<CardDescription>
						Search for {retailer} products
					</CardDescription>
				</div>
				<div>
					<RetailerQueryForm sheet={false} setData={setData} />
				</div>
			</CardHeader>
			<CardContent className="px-2">
				<div className="flex flex-col gap-2">
					{firstThree.map((result, index) => (
						<RetailerQueryResultCardHome
							onClick={() => {
								handleClick(result);
							}}
							key={index}
							data={result}
						/>
					))}
					<Accordion type="single" collapsible>
						{restOfData.map((result, index) => (
							<AccordionItem key={index} value="index">
								<AccordionTrigger className="text-slate-500 text-md text-center">
									Show More ({restOfData.length})
								</AccordionTrigger>
								<AccordionContent>
									<RetailerQueryResultCardHome
										onClick={() => {
											handleClick(result);
										}}
										data={result}
									/>
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</CardContent>
		</Card>
	);
}
