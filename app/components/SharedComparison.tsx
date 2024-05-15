import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AllProducts, Review } from "../libs/types";
import Image, { StaticImageData } from "next/image";
import CombinedLogo from "@/public/CombinedLogo.png";
import ComparisonTable from "./ComparisonTable";
import OpenAIAnalysis from './OpenAIAnalysis';

type SharedComparisonProps = {
	data: {
		productData: AllProducts | null;
		reviewsData: Review[] | null;
	}[];
};

export default function SharedComparison({ data }: SharedComparisonProps) {
	const [ultaData, sephoraData] = data;

	function getImage(
		ultaSrc: string | undefined,
		sephoraSrc: string | undefined
	) {
		let imageSrc: string | StaticImageData = CombinedLogo;

		if (!ultaSrc && !sephoraSrc) {
			return imageSrc;
		}

		if (ultaSrc && !sephoraSrc?.includes("sephora.com")) {
			imageSrc = ultaSrc;
		} else if (sephoraSrc && !ultaSrc?.includes("ulta.com")) {
			imageSrc = sephoraSrc;
		} else if (sephoraSrc) {
			imageSrc = sephoraSrc;
		}

		return imageSrc;
	}

	const productSrc = getImage(
		ultaData.productData?.product_image_url[0],
		sephoraData.productData?.product_image_url[0]
	);

	const productTitle = ultaData.productData?.product_name;
	const brandName = ultaData.productData?.brand_name;

	const allReviews = data.map(item => item.reviewsData).filter(rev => rev !== null)

	return (
		<Card className=''>
			<CardHeader className="flex-row">
				<div className="h-auto w-1/3 relative mr-8">
					<Image
						src={productSrc}
						fill
						className='object-contain'
						// sizes="(max-width: 430px), 300px "
						alt={`product image`}
						priority
					/>
				</div>
				<div className="flex flex-col w-2/3 gap-4">
					<div>
						<p className="mb-2 bg-slate-200 rounded-lg w-fit px-2">
							{brandName}
						</p>
						<CardTitle>{productTitle}</CardTitle>
					</div>
					<ComparisonTable data={data} />
				</div>
			{/* <OpenAIAnalysis reviews={allReviews}/> */}
			</CardHeader>
		</Card>
	);
}
