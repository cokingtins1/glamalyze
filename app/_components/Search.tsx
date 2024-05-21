"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ScrollShadow } from "@nextui-org/scroll-shadow";

import { Input } from "@/components/ui/input";
import RetailerQueryForm from "../components/HomeQuery/RetailerQueryForm";
import { useState } from "react";
import { AllProducts } from "../libs/types";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverAnchor } from "@radix-ui/react-popover";
import RetailerQueryResultCardHome from "../components/HomeQuery/RetailerQueryResultCardHome";
import CompareCard from "../components/HomeQuery/CompareCard";
import PlaceholderCard from "./PlaceholderCard";

type Props = {};

export default function Search({}: Props) {
	const [data, setData] = useState<AllProducts[]>([]);
	const [products, setProducts] = useState<AllProducts[]>([]);

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
		<Card className="">
			<CardHeader>
				<CardTitle className="text-primary">Compare Products</CardTitle>
				<CardDescription>
					These products are only carried by
				</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col items-center">
				<div className="flex flex-col gap-2 lg:grid grid-cols-2 lg:h-[100px] w-full ">
					{products[0] ? (
						<CompareCard data={products[0]} />
					) : (
						<PlaceholderCard num={1} />
					)}

					{products[1] ? (
						<CompareCard data={products[1]} />
					) : (
						<PlaceholderCard num={2} />
					)}
				</div>
				<div className="pt-6">
					<Popover>
						<PopoverAnchor>
							<PopoverTrigger asChild>
								<div className="p-2 h-max">
									<div className="flex w-full flex-wrap md:flex-nowrap gap-4">
										<RetailerQueryForm
											sheet={false}
											setData={setData}
											retailer={"Sephora"}
										/>
									</div>
								</div>
							</PopoverTrigger>

							<PopoverContent side="bottom">
								<ScrollArea className="h-72 w-full">
									<div className="flex flex-col gap-2">
										{data.length > 0 &&
											data.map((result, index) => (
												<RetailerQueryResultCardHome
													onClick={() => {
														handleClick(result);
													}}
													key={index}
													data={result}
												/>
											))}
									</div>
								</ScrollArea>
							</PopoverContent>
						</PopoverAnchor>
					</Popover>
				</div>
			</CardContent>
		</Card>
	);
}
