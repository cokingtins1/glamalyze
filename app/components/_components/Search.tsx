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
import { AllProducts, QueryResult, Review } from "../../libs/types";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverAnchor } from "@radix-ui/react-popover";
import CompareCard from "./CompareCard";
import PlaceholderCard from "./PlaceholderCard";
import { Button as NextUIButton } from "@nextui-org/button";
import { useRouter, useSearchParams } from "next/navigation";
import ProductQueryCard from "./RetailerProductQueryCard";
import compareProducts from "../../actions/Compare/compareProducts";
import { cn } from "@/lib/utils";
import { isNull } from "util";
import { SharedProduct } from "@prisma/client";
import { Checkbox } from "@nextui-org/checkbox";
import InfoPopover from "./InfoPopover";
import { select } from "@nextui-org/react";
import { checkServerIdentity } from "tls";

type ReviewData = {
	productData: AllProducts | null;
	reviewsData: Review[] | null;
};

type SearchProps = {
	reviews: Review[][] | undefined;
};

export default function Search() {
	const [data, setData] = useState<AllProducts[]>([]);
	const [combinedData, setCombinedData] = useState<AllProducts[]>([]);

	const [combinedProducts, setCombinedProducts] = useState<QueryResult>({
		ultaRes: [],
		sephoraRes: [],
		sharedRes: [],
	});

	const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
	const [checkedStates, setCheckedStates] = useState({
		ulta: false,
		sephora: false,
		all: true,
		shared: false,
	});

	useEffect(() => {
		let updatedProducts: any[] = [];

		if (checkedStates.ulta) {
			updatedProducts = updatedProducts.concat(combinedProducts.ultaRes);
		}
		if (checkedStates.sephora) {
			updatedProducts = updatedProducts.concat(
				combinedProducts.sephoraRes
			);
		}
		if (checkedStates.all) {
			updatedProducts = [];
			updatedProducts = updatedProducts.concat(
				combinedProducts.ultaRes,
				combinedProducts.sephoraRes
			);
		}
		if (checkedStates.shared) {
			updatedProducts = updatedProducts.concat(
				combinedProducts.sharedRes
			);
		}

		setSelectedProducts(updatedProducts);
	}, [checkedStates, combinedProducts]);

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = e.target;
		setCheckedStates((prev) => ({
			...prev,
			[name]: checked,
		}));
	};

	const [products, setProducts] = useState<AllProducts[]>([]);
	const [sharedProduct, setSharedProduct] = useState<AllProducts | null>(
		null
	);
	const [open, setOpen] = useState(false);
	const [shared, setShared] = useState(false);
	const [sku, setSku] = useState("");

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
		if (shared) {
			if (sharedProduct?.product_id === product.product_id) {
				setSharedProduct(null);
			} else {
				setSharedProduct(product);
			}
		} else {
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
		}
		// const existingProductIndex = products.findIndex(
		// 	(p) => p.product_id === product.product_id
		// );
		// let updatedProducts;

		// if (existingProductIndex !== -1) {
		// 	updatedProducts = products.filter(
		// 		(p) => p.product_id !== product.product_id
		// 	);
		// } else if (products.length < 2) {
		// 	updatedProducts = [...products, product];
		// } else {
		// 	updatedProducts = products;
		// }

		// setProducts(updatedProducts);
		// updateSku(updatedProducts);
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

	const [count, setCount] = useState(0);
	// console.log("products:", products);

	const handleCompare = async (products: AllProducts[]) => {
		// setCount(count + 1);
		// const sku1 = "u:[2210030], s:[2162220]";
		// const sku2 = "u:[2607622], s:[2255503]";
		// const sku3 = "u:[2572193], s:[2435006]";
		// let skuToCompare;
		// switch (count) {
		// 	case 0:
		// 		skuToCompare = sku1;
		// 		break;
		// 	case 1:
		// 		skuToCompare = sku2;
		// 		break;
		// 	case 2:
		// 		skuToCompare = sku3;
		// 		break;
		// 	default:
		// 		skuToCompare = sku1;
		// }
		// router.push("/" + "?" + createQueryString("compare", skuToCompare));

		let string = "";

		products.find((product) => {
			const prefix = product.retailer_id === "Ulta" ? "u" : "s";
			string += `${prefix}:[${product.sku_id}], `;
		});

		const queryString = string.slice(0, -2);
		router.push("/" + "?" + createQueryString("compare", queryString));
	};

	useEffect(() => {
		setOpen(true);
	}, [
		products,
		products.length,
		combinedProducts,
		checkedStates.ulta,
		checkedStates.sephora,
		checkedStates.all,
		checkedStates.shared,
	]);

	return (
		<>
			<section className="w-full h-full mt-8 lg:px-80">
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
							onClick={() => handleCompare(products)}
						>
							Compare
						</NextUIButton>
					</CardHeader>
					<CardContent className="flex flex-col items-center">
						<div
							className={cn(
								"flex flex-col gap-2 lg:h-[100px] w-full",
								{
									"lg:grid max-w-[330px]":
										checkedStates.shared,
									"lg:grid grid-cols-2":
										!checkedStates.shared,
								}
							)}
						>
							{checkedStates.shared ? (
								sharedProduct ? (
									<CompareCard
										data={sharedProduct}
										onClick={() =>
											handleClick(sharedProduct)
										}
									/>
								) : (
									<PlaceholderCard num={1} />
								)
							) : (
								<>
									{products[0] ? (
										<CompareCard
											data={products[0]}
											onClick={() =>
												handleClick(products[0])
											}
										/>
									) : (
										<PlaceholderCard num={1} />
									)}

									{products[1] ? (
										<CompareCard
											data={products[1]}
											onClick={() =>
												handleClick(products[1])
											}
										/>
									) : (
										<PlaceholderCard num={2} />
									)}
								</>
							)}
						</div>
						<div className="pt-6">
							<div className="flex flex-col items-center gap-2 lg:flex-row">
								<p className="text-xs lg:text-base">
									Search within:
								</p>

								<div className="flex gap-4">
									<Checkbox
										name="ulta"
										onChange={handleCheckboxChange}
										checked={checkedStates.ulta}
										className="text-xs lg:text-base"
									>
										<p className="text-xs lg:text-base">
											Ulta
										</p>
									</Checkbox>

									<Checkbox
										name="sephora"
										onChange={handleCheckboxChange}
										checked={checkedStates.sephora}
										className="text-xs lg:text-base"
									>
										<p className="text-xs lg:text-base">
											Sephora
										</p>
									</Checkbox>

									<Checkbox
										name="all"
										defaultChecked={checkedStates.all}
										onChange={handleCheckboxChange}
										className="text-xs lg:text-base"
									>
										<p className="text-xs lg:text-base">
											All Products
										</p>
									</Checkbox>

									<Checkbox
										isDisabled={true}
										name="shared"
										checked={checkedStates.shared}
										onChange={handleCheckboxChange}
									>
										<span className="flex gap-1">
											<p className="text-xs lg:text-base">
												Shared
											</p>
											<InfoPopover />
										</span>
									</Checkbox>
								</div>
							</div>
							<Popover
								open={open}
								onOpenChange={() => setOpen(!open)}
							>
								<PopoverAnchor>
									<PopoverTrigger asChild>
										<div>
											<RetailerQueryForm
												sheet={false}
												setData={setData}
												setCombinedProducts={
													setCombinedProducts
												}
												setShared={setShared}
											/>
										</div>
									</PopoverTrigger>

									{selectedProducts.length > 0 && (
										<PopoverContent side="bottom">
											<ScrollArea className="h-52 lg:h-72 w-full">
												<div className="flex flex-col gap-2">
													{selectedProducts.map(
														(result, index) => (
															<ProductQueryCard
																onClick={() => {
																	handleClick(
																		result
																	);
																}}
																key={index}
																data={result}
															/>
														)
													)}
												</div>
											</ScrollArea>
										</PopoverContent>
									)}
								</PopoverAnchor>
							</Popover>
						</div>
					</CardContent>
				</Card>
			</section>
		</>
	);
}
