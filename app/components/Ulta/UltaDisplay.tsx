import { MetaData, Review } from "@/app/libs/types";
import Image from "next/image";
import UltaLogo from "@/public/Ulta_Logo.png";
import SephoraLogo from "@/public/Sephora_Logo.png";
import ReviewCard from "../Review/ReviewCard";
import RatingChart from "../RatingChart";

type Data = {
	metaData: MetaData;
	reviewsData: Review[];
};

export default function UltaDisplay({ data }: { data: Data }) {
	const styles = {
		textColor: "",
		backgroundColor: "#F37830",
		font: "Circular, sans serif",
	};

	return (
		<div className="displayContainer flex flex-col justify-start items-center border border-white rounded-lg bg-white p-4">
			<div className="h-[100px] w-[200px] relative">
				<Image
					src={data.metaData.company === "Sephora" ? SephoraLogo : UltaLogo}
					layout="fill"
					objectFit="contain"
					sizes="(max-width: 430px), 300px "
					alt="Ulta Logo"
				/>
			</div>
			{data && (
				<>
					<RatingChart
						reviewHistData={data.metaData.reviewHistData}
						averageRating={data.metaData.averageRating}
					/>
					{data.reviewsData.map((review, index) => (
						<ReviewCard key={index} reviewData={review} />
					))}
				</>
			)}
		</div>
	);
}
