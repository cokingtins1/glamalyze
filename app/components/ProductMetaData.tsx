import Image, { StaticImageData } from "next/image";
import CombinedLogo from "@/public/CombinedLogo.png";
import { AllProducts } from "../libs/types";
import { formatPrice } from "@/lib/utils";
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
		<div className="flex justify-between items-center w-full my-4 px-4">
			<div className="flex flex-col items-center">
				<div className="h-[100px] w-[200px] relative mb-2">
					<Image
						src={productSrc}
						fill
						style={{ objectFit: "contain" }}
						sizes="(max-width: 430px), 300px "
						alt={`${data.product_name} image`}
					/>
				</div>
			</div>
			<div className="flex flex-col items-end">
				<p className="text-lg font-semibold">{data.product_name}</p>
				<p>{formatPrice(data.product_price)}</p>
			</div>
		</div>
	);
}
