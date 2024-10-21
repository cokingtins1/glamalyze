import { Card } from "@/components/ui/card";
import Image, { StaticImageData } from "next/image";
import CombinedLogo from "@/public/CombinedLogo.png";
import UltaLogo from "@/public/Ulta_Logo.png";
import SephoraLogo from "@/public/Sephora_Logo.png";
import { AllProducts } from "../../libs/types";

type Props = {
	data: AllProducts;
	onClick: (product: AllProducts) => void;
};

export default function CompareCard({ data, onClick }: Props) {
	function getImage(src: string, retailer: string) {
		let imageSrc: string | StaticImageData = CombinedLogo;

		if (src.includes("ulta.com")) {
			imageSrc = src;
		} else if (src.includes("sephora.com")) {
			imageSrc = src;
		} else if (retailer === "Ulta") {
			imageSrc = UltaLogo;
		} else if (retailer === "Sephora") {
			imageSrc = SephoraLogo;
		}

		return imageSrc;
	}
	return (
		<Card className="hover:shadow hover:shadow-slate-500">
			<button onClick={() => onClick(data)} className="flex p-2">
				<div className="size-[52px] lg:size-[75px] relative">
					<Image
						src={getImage(
							data.product_image_url[0],
							data.retailer_id
						)}
						alt="product image"
						fill
						sizes='sizes="(max-width: 430px), 75px'
						style={{ objectFit: "contain" }}
					/>
				</div>
				<div className="flex flex-col p-2">
					<h1 className="text-xs lg:text-sm font-bold text-left">
						{data.product_name}
					</h1>
					<h2 className="text-xs text-left">{data.brand_name}</h2>
					<input
						readOnly={true}
						className="hidden"
						name="ultaLink"
						value={`${data.sku_id}`}
					/>
				</div>
			</button>
		</Card>
	);
}
