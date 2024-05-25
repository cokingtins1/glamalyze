"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { ScrollArea } from "@/components/ui/scroll-area";

import RetailerQueryForm from "./RetailerQueryForm";
import { useCallback, useEffect, useState } from "react";
import { AllProducts } from "../libs/types";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverAnchor } from "@radix-ui/react-popover";
import CompareCard from "./CompareCard";
import PlaceholderCard from "./PlaceholderCard";
import { Button } from "@/components/ui/button";
import { Button as NextUIButton } from "@nextui-org/button";
import { useRouter, useSearchParams } from "next/navigation";
import ProductQueryCard from "./RetailerQueryResultCardHome";
import compareProducts from "../actions/Compare/compareProducts";

export default function Search() {
	const [data, setData] = useState<AllProducts[]>([]);
	const [products, setProducts] = useState<AllProducts[]>([]);
	const [open, setOpen] = useState(false);
	const [sku, setSku] = useState("");

	const [loading, setLoading] = useState(false);

	const router = useRouter();
	const searchParams = useSearchParams();

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set(name, value);

			return params.toString();
		},
		[searchParams]
	);

	const handleClick = (product: AllProducts) => {
		const existingProductIndex = products.findIndex(
			(p) => p.product_id === product.product_id
		);
		let updatedProducts;

		if (existingProductIndex !== -1) {
			updatedProducts = products.filter(
				(p) => p.product_id !== product.product_id
			);
		} else if (products.length < 2) {
			updatedProducts = [...products, product];
		} else {
			updatedProducts = products;
		}

		setProducts(updatedProducts);
		updateSku(updatedProducts);
	};

	const updateSku = (products: AllProducts[]) => {
		const ultaSkus = products
			.filter((p) => p.retailer_id === "Ulta")
			.map((p) => p.sku_id);
		const sephoraSkus = products
			.filter((p) => p.retailer_id === "Sephora")
			.map((p) => p.sku_id);

		const ultaSkuString = `u:[${ultaSkus.join(",")}]`;
		const sephoraSkuString = `s:[${sephoraSkus.join(",")}]`;
		const skuString = `${ultaSkuString}, ${sephoraSkuString}`;

		setSku(skuString);
	};

	const handleCompare = async () => {
		setLoading(true);
		try {
			const data = await compareProducts("slug");

			if (data) {
				setLoading(false);
			}
		} catch (error) {}

		router.push("/" + "?" + createQueryString("compare", sku));
	};

	useEffect(() => {
		setOpen(true);
	}, [products, products.length, data, data.length]);

	return (
		<Card>
			<CardHeader className="flex-row justify-between">
				<div className="space-y-px">
					<CardTitle className="text-lg text-primary lg:text-2xl">
						Compare Products
					</CardTitle>
					<CardDescription>
						Choose two products to compare
					</CardDescription>
				</div>
				<NextUIButton
					color="primary"
					isLoading={loading}
					onClick={handleCompare}
				>
					{loading ? "Comparing..." : "Compare"}
				</NextUIButton>
			</CardHeader>
			<CardContent className="flex flex-col items-center">
				<div className="flex flex-col gap-2 lg:grid grid-cols-2 lg:h-[100px] w-full ">
					{products[0] ? (
						<CompareCard
							data={products[0]}
							onClick={() => handleClick(products[0])}
						/>
					) : (
						<PlaceholderCard num={1} />
					)}

					{products[1] ? (
						<CompareCard
							data={products[1]}
							onClick={() => handleClick(products[1])}
						/>
					) : (
						<PlaceholderCard num={2} />
					)}
				</div>
				<div className="pt-6">
					<Popover open={open} onOpenChange={() => setOpen(!open)}>
						<PopoverAnchor>
							<PopoverTrigger asChild>
								<div>
									<RetailerQueryForm
										sheet={false}
										setData={setData}
									/>
								</div>
							</PopoverTrigger>

							{data.length > 0 && (
								<PopoverContent side="bottom">
									<ScrollArea className="h-52 lg:h-72 w-full">
										<div className="flex flex-col gap-2">
											{data.map((result, index) => (
												<ProductQueryCard
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
							)}
						</PopoverAnchor>
					</Popover>
				</div>
			</CardContent>
		</Card>
	);
}
