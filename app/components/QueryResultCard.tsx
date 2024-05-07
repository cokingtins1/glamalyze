import { Card } from "@/components/ui/card";
import Image, { StaticImageData } from "next/image";
import Stars from "./Review/Stars";
import { AllProducts } from "../libs/types";
import UltaLogo from "@/public/Ulta_Logo.png";
import SephoraLogo from "@/public/Sephora_Logo.png";
import { SharedProduct } from "@prisma/client";

type QueryResultCardProps = {
	data: SharedProduct;
};

export default function QueryResultCard({ data }: QueryResultCardProps) {
	function returnImage(src: string, retailer: string) {
		let imageSrc: string | StaticImageData = "";
		if (src.includes("ulta.com") || src.includes("sephora.com")) {
			imageSrc = src;
		} else {
			imageSrc = retailer === "Ulta" ? UltaLogo : SephoraLogo;
		}

		return imageSrc;
	}

	function getImage(ultaSrc: string, sephoraSrc: string) {
		let imageSrc: string | StaticImageData = "";

		if (ultaSrc.includes("ulta.com")) {
			imageSrc = ultaSrc;
		} else if (sephoraSrc.includes("sephora.com")) {
			imageSrc = sephoraSrc;
		}

		return imageSrc;
	}

	return (
		<Card className="hover:shadow hover:shadow-slate-500 hover:cursor-pointer">
			<div className="flex p-2">
				<div className="size-[100px] relative">
					<Image
						src={getImage(
							data.ulta_product_image_url[0],
							data.sephora_product_image_url[0]
						)}
						alt="product image"
						fill
						style={{ objectFit: "contain" }}
					/>
				</div>
				<div className="flex flex-col p-2">
					<h1 className="text-sm font-bold">{data.ulta_product_name}</h1>
					<h2 className="text-xs">{data.brand_name}</h2>
					{/* <Stars
						rating={data.avg_rating}
						searchResult={true}
						reviewNum={data.total_reviews}
					/> */}
				</div>
			</div>
		</Card>
	);
}
