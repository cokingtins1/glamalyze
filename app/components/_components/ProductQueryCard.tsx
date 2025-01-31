import { Card } from "@/components/ui/card";
import Image, { StaticImageData } from "next/image";
import CombinedLogo from "@/public/CombinedLogo.png";
import UltaLogo from "@/public/Ulta_Logo.png";
import SephoraLogo from "@/public/Sephora_Logo.png";
import { AllProducts } from "../../libs/types";
import { cleanUrl } from "@/app/libs/utils";

type QueryResultCardProps = {
	data: AllProducts;
	onClick: (product: AllProducts) => void;
};

export default function ProductQueryCard({
	data,
	onClick,
}: QueryResultCardProps) {
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
			<button
				onClick={() => onClick(data)}
				className="flex flex-col w-full p-2"
			>
				<div className="size-[30px] relative">
					<Image
						src={
							data.retailer_id === "Ulta" ? UltaLogo : SephoraLogo
						}
						alt="product image"
						sizes='sizes="(max-width: 30px), 30px'
						fill
						style={{ objectFit: "contain" }}
					/>
				</div>
				<div className="flex">
					<div className="size-[65px] relative">
						<Image
							src={getImage(
								cleanUrl(data.product_image_url[0]),
								data.retailer_id
							)}
							alt="product image"
							sizes='sizes="(max-width: 430px), 65px'
							fill
							style={{ objectFit: "contain" }}
						/>
					</div>
					<div className="flex flex-col ml-2">
						<h1 className="text-sm font-bold text-left">
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
				</div>
			</button>
		</Card>
	);
}
