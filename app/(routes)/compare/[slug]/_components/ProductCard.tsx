"use client"

import { AllProducts, Review } from "@/app/libs/types";
import { Card } from "@/components/ui/card";
import ProductMetaData from "./ProductMetaData";

import { Tabs, Tab } from "@nextui-org/react";
import RatingChart from "./RatingChart";
import CollapseReviews from './CollapseReviews';
import OpenAIAnalysis from './OpenAIAnalysis';

type Props = {
	data: AllProducts;
	reviewsData: Review[];
};

export default function ProductCard({ data, reviewsData }: Props) {
	let tabs = [
		{
			id: "overview",
			label: "Overview",
			content: <RatingChart metaData={data} />,
		},
        {
			id: "reviews",
			label: "Reviews",
			content: <CollapseReviews reviews={reviewsData} />,
		},
        // {
		// 	id: "aiAnalysis",
		// 	label: "AI Analysis",
		// 	content: <OpenAIAnalysis reviews={[reviewsData]}/>
		// },
	];
	return (
		<Card aria-label='product card' className="flex flex-col justify-start items-center bg-white px-6 py-2 h-min-[560px]">
			<ProductMetaData data={data} />

			<div aria-label='product tabs' className='w-full'>
				<Tabs aria-label='tabs' color='primary' items={tabs}>
					{(item) => (
						<Tab aria-label='tab' key={item.id} title={item.label}>
							<div>
								<div>{item.content}</div>
							</div>
						</Tab>
					)}
				</Tabs>
			</div>
		</Card>
	);
}
