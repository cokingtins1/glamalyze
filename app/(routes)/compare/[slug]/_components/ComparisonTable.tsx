"use client";

import { formatPercent, formatPrice } from "@/lib/utils";
import { AllProducts, Review } from "../../../../libs/types";

import {
	Table,
	TableHeader,
	TableBody,
	TableColumn,
	TableRow,
	TableCell,
} from "@nextui-org/table";

type Props = {
	data: {
		productData: AllProducts | null;
		reviewsData: Review[] | null;
	}[];
};

export default function ComparisonTable({ data }: Props) {
	return (
		<Table className="lg:w-fit text-center">
			<TableHeader className='text-xs'>
				<TableColumn className="text-left">RETAILER</TableColumn>
				<TableColumn>PRICE</TableColumn>
				<TableColumn>RATING</TableColumn>
				<TableColumn>REVIEWS</TableColumn>
				<TableColumn>% REC.</TableColumn>
			</TableHeader>

			<TableBody>
				{data.map((item, index) => {
					const minPrice = Math.min(
						...data.map(
							(item) => item.productData?.product_price || 0
						)
					);

					let lowestPriceFound = false;

					return (
						<TableRow key={index}>
							<TableCell>
								{item.productData?.retailer_id}
							</TableCell>
							<TableCell
								className={
									item.productData?.product_price ===
										minPrice && !lowestPriceFound
										? "text-green-500"
										: ""
								}
							>
								{formatPrice(item.productData?.product_price)}
								{item.productData?.product_price === minPrice &&
									(lowestPriceFound = true)}
							</TableCell>
							<TableCell>
								{item.productData?.avg_rating}
							</TableCell>
							<TableCell>
								{item.productData?.total_reviews?.toLocaleString()}
							</TableCell>
							<TableCell>
								{formatPercent(
									item.productData?.percent_recommended
								)}
							</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
}
