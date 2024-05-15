import Image from "next/image";
import UltaLogo from "@/public/Ulta_Logo.png";
import SephoraLogo from "@/public/Sephora_Logo.png";
import ReviewCard from "./Review/ReviewCard";
import RatingChart from "./RatingChart";
import ProductMetaData from "./ProductMetaData";
import { AllProducts, Review } from "../libs/types";
import OpenAIAnalysis from "./OpenAIAnalysis";
import GoToPage from "./GoToPage";
import { Card } from "@/components/ui/card";


type DataDisplayProps = {
	data: AllProducts;
	reviewsData: Review[];
};

export default function DataDisplay({ data, reviewsData }: DataDisplayProps) {
	if (!data) return null;

	return (
		<Card className="flex flex-col justify-start items-center bg-white p-4">
			<div className="h-[100px] w-[200px] relative">
				<Image
					src={
						data.retailer_id === "Sephora" ? SephoraLogo : UltaLogo
					}
					fill
					style={{ objectFit: "contain" }}
					sizes="(max-width: 430px), 300px "
					alt={`${data.retailer_id} Logo`}
				/>
			</div>

			{data && (
				<div className="flex flex-col items-center gap-2">
					<GoToPage pageLink={data.page_link} />

					<RatingChart metaData={data} />

					<div className="flex flex-col w-full mt-4">
						<p className="text-sm text-slate-500 pl-4 mb-2">{`Reviews (${reviewsData.length}) - Most Helpful`}</p>
						{reviewsData.map((review, index) => (
							<ReviewCard key={index} reviewData={review} />
						))}
					</div>
				</div>
			)}
		</Card>
	);
}

//lean data structures and algorithims
//const foo = array.shift()!
// city scape - be good with arrays
