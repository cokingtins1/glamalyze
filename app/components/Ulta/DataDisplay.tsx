import Image from "next/image";
import UltaLogo from "@/public/Ulta_Logo.png";
import SephoraLogo from "@/public/Sephora_Logo.png";
import ReviewCard from "../Review/ReviewCard";
import RatingChart from "../RatingChart";
import { AllProducts, Review } from '@/app/libs/types';

type DataProps = {
	data: AllProducts;
	reviewsData: Review[];
};

export default function DataDisplay({ data, reviewsData }: DataProps) {
	
	return (
		<div className="displayContainer flex flex-col justify-start items-center border border-white rounded-lg bg-white p-4">
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
				<>
					<RatingChart metaData={data} />
					{reviewsData.map((review, index) => (
						<ReviewCard key={index} reviewData={review} />
					))}
				</>
			)}
		</div>
	);
}

//lean data structures and algorithims
//const foo = array.shift()!
// city scape - be good with arrays
