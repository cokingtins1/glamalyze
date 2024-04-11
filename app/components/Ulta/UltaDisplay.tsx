import { MetaData, Review } from "@/app/libs/types";
import Image from "next/image";
import UltaLogo from "@/public/Ulta_Logo.png";
import ReviewCard from "../Review/ReviewCard";

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
		<div className="displayContainer flex flex-col justify-center items-center border border-white rounded-lg bg-white p-4">
			<div className="h-[100px] w-[200px] relative">
				<Image
					src={UltaLogo}
					layout="fill"
					objectFit="contain"
					sizes="(max-width: 430px), 300px "
					alt="Ulta Logo"
				/>
			</div>
			{data && (
				<>
					<p>{data.metaData.averageRating}</p>
					{data.reviewsData.map((review, index) => (
						<ReviewCard key={index} reviewData={review} />
					))}
				</>
			)}
		</div>
	);
}
