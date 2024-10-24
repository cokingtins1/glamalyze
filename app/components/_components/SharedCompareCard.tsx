import { Card } from "@/components/ui/card";
import Image, { StaticImageData } from "next/image";
import CombinedLogo from "@/public/CombinedLogo.png";
import { SharedProduct } from "@prisma/client";

type SharedQueryResultCardProps = {
	data: SharedProduct | null;
	onClick: (product: SharedProduct) => void;
};

export default function SharedCompareCard({
	data,
	onClick,
}: SharedQueryResultCardProps) {
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
			{data && (
				<button
					onClick={() => onClick(data)}
					className="flex w-full p-2"
				>
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
							{data.ulta_product_name ||
								data.sephora_product_name}
						</h1>
						<h2 className="text-xs text-left">{data.brand_name}</h2>
						<input
							readOnly={true}
							className="hidden"
							name="ultaLink"
							value={`${data.ulta_sku_id}`}
						/>
					</div>
				</button>
			)}
		</Card>
	);
}
