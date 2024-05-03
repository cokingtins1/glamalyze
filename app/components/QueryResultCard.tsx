import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { AllProducts } from "@prisma/client";
import Image from "next/image";
import Stars from "./Review/Stars";
import { SearchResults } from "../libs/types";
import UltaLogo from "@/public/Ulta_Logo.png";

type QueryResultCardProps = {
	data: AllProducts;
};

export default async function QueryResultCard({ data }: QueryResultCardProps) {
	const imageSrc =
		data.product_image_url[0].includes("ulta.com") ||
		data.product_image_url[0].includes("sephora.com")
			? data.product_image_url[0]
			: UltaLogo;

	return (
		<Card>
			<div className="flex">
				<div className="size-[100px] relative">
					<Image
						src={imageSrc}
						alt={`${data.product_name} image`}
						fill
						style={{ objectFit: "contain" }}
					/>
				</div>
				<div className="p-2">
					<div className="flex gap-2">
						<h1 className="text-sm font-bold">
							{data.product_name}
						</h1>
						<Stars
							rating={data.avg_rating}
							searchResult={true}
							reviewNum={data.total_reviews}
						/>
					</div>
					<h2 className="text-xs">{data.brand_name}</h2>
				</div>
			</div>
		</Card>
	);
}
