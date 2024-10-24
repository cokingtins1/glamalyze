import { Card } from "@/components/ui/card";
import Image, { StaticImageData } from "next/image";
import CombinedLogo from "@/public/CombinedLogo.png";
import UltaLogo from "@/public/Ulta_Logo.png";
import SephoraLogo from "@/public/Sephora_Logo.png";
import { AllProducts } from "../../libs/types";
import { SharedProduct } from "@prisma/client";

type QueryResultCardProps = {
	data: SharedProduct;
	onClick: (product: SharedProduct) => void;
};

export default function SharedProductQueryCard({
	data,
	onClick,
}: QueryResultCardProps) {
	function getImage(ultaSrc: string, sephoraSrc: string) {
		let imageSrc: string | StaticImageData = CombinedLogo;

		if (ultaSrc.includes("ulta.com")) {
			imageSrc = ultaSrc;
		} else if (sephoraSrc.includes("sephora.com")) {
			imageSrc = sephoraSrc;
		}

		return imageSrc;
	}

	return (
		<Card className="hover:shadow hover:shadow-slate-500">
			<button onClick={() => onClick(data)} className="flex w-full p-2">
				<div className="size-[65px] relative">
					<Image
						src={getImage(
							data.ulta_product_image_url[0],
							data.sephora_product_image_url[0]
						)}
						alt="product image"
						sizes='sizes="(max-width: 430px), 65px'
						fill
						style={{ objectFit: "contain" }}
					/>
				</div>
				<div className="flex flex-col p-2">
					<h1 className="text-sm font-bold text-left">
						{data.ulta_product_name}{" "}
						{/* Should be same as Sephora */}
					</h1>
					<h2 className="text-xs text-left">{data.brand_name}</h2>
					<input
						readOnly={true}
						className="hidden"
						name="ultaLink"
						value={`u:[${data.ulta_sku_id}]:s[${data.sephora_sku_id}]`}
					/>
				</div>
			</button>
		</Card>
	);
}
