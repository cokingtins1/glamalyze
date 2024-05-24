import Image, { StaticImageData } from "next/image";
import CombinedLogo from "@/public/CombinedLogo.png";
import { AllProducts } from "../../../../libs/types";
import { formatPrice } from "@/lib/utils";

import UltaLogo from "@/public/Ulta_Logo.png";
import SephoraLogo from "@/public/Sephora_Logo.png";

import GoToPage from "./GoToPage";

type ProductMetaDataProps = {
	data: AllProducts;
};

export default function ProductMetaData({ data }: ProductMetaDataProps) {
	function getImage(src: string, retailer: string) {
		let imageSrc: string | StaticImageData = CombinedLogo;

		if (src.includes("ulta.com") && retailer === "Ulta") {
			imageSrc = src;
		}

		if (src.includes("sephora.com") && retailer === "Sephora") {
			imageSrc = src;
		}

		return imageSrc;
	}

	const productSrc = getImage(data.product_image_url[0], data.retailer_id);

	return (
		<div className="flex items-start w-full my-4">
			<div className="flex flex-col items-center mr-auto mt-4">
				<div className="h-[100px] w-[100px] relative mb-2">
					<Image
						src={productSrc}
						fill
						style={{ objectFit: "contain" }}
						sizes="(max-width: 430px), 300px "
						alt={`${data.product_name} image`}
					/>
				</div>
			</div>
			<div className="flex flex-col mt-8">
				<p className="text-lg font-semibold">{data.product_name}</p>
				<p>{formatPrice(data.product_price)}</p>
				<GoToPage pageLink={data.page_link} />
			</div>
			<div className="h-[50px] w-[100px] relative ml-auto">
				<Image
					src={data.retailer_id === "Ulta" ? UltaLogo : SephoraLogo}
					alt="ulta logo"
					fill
					style={{ objectFit: "contain" }}
					sizes="(max-width: 430px), 300px "
				></Image>
			</div>
		</div>
	);
}
