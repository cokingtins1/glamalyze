import Image from "next/image";
import UltaLogo from "@/public/Ulta_Logo.png";
import SephoraLogo from "@/public/Sephora_Logo.png";
import ReviewCard from "../Review/ReviewCard";
import RatingChart from "../RatingChart";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { AllProducts, Review } from "@/app/libs/types";
import Link from "next/link";
import { it } from "node:test";

type DataProps = {
	data: AllProducts;
	reviewsData: Review[];
};

export default function DataDisplay({ data, reviewsData }: DataProps) {
	if (!data) return null;

	const retailerLink =
		data.retailer_id === "Ulta" ? "ulta.com" : "sephora.com";

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
					<Link
						target="_blank"
						href={data.page_link || `https://www.${retailerLink}`}
						className="flex items-center gap-2 mb-2 "
						rel="noopener noreferrer"
					>
						<p className="text-sm">Go to page</p>
						<OpenInNewIcon sx={{ fontSize: "1rem" }} />
					</Link>
					<RatingChart metaData={data} />
					<div className="flex flex-col w-full mt-4">
						<p className="text-sm text-slate-500 pl-4 mb-2">{`Reviews (${reviewsData.length})`}</p>
						{reviewsData.map((review, index) => (
							<ReviewCard key={index} reviewData={review} />
						))}
					</div>
				</>
			)}
		</div>
	);
}

//lean data structures and algorithims
//const foo = array.shift()!
// city scape - be good with arrays
