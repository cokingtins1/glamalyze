import { Card } from "@/components/ui/card";
import Image, { StaticImageData } from "next/image";
import CombinedLogo from "@/public/CombinedLogo.png";
import UltaLogo from "@/public/Ulta_Logo.png";
import SephoraLogo from "@/public/Sephora_Logo.png";
import { SharedProduct } from "@prisma/client";
import { SheetClose } from "@/components/ui/sheet";
import { useSearchParams } from "next/navigation";
import { AllProducts } from "../libs/types";

type QueryResultCardProps = {
	data: AllProducts;
};

export default function RetailerQueryResultCard({
	data,
}: QueryResultCardProps) {
	const searchParams = useSearchParams();

	function getImage(src: string, retailer: string) {
		let imageSrc: string | StaticImageData = CombinedLogo;

		if (src.includes("ulta.com")) {
			imageSrc = imageSrc;
		} else if (src.includes("sephora.com")) {
			imageSrc = imageSrc;
		} else if (retailer === "Ulta") {
			imageSrc = UltaLogo;
		} else if (retailer === "Sephora") {
			imageSrc = SephoraLogo;
		}

		return imageSrc;
	}

	return (
		<SheetClose asChild>
			<Card className="hover:shadow hover:shadow-slate-500">
				<button type="submit" className="flex p-2">
					<div className="size-[100px] relative">
						<Image
							src={getImage(
								data.product_image_url[0],
								data.retailer_id
							)}
							alt="product image"
							fill
							style={{ objectFit: "contain" }}
						/>
					</div>
					<div className="flex flex-col p-2">
						<h1 className="text-sm font-bold">
							{data.product_name}
						</h1>
						<h2 className="text-xs">{data.brand_name}</h2>
						<input
							readOnly={true}
							className="hidden"
							name="ultaLink"
							value={`${data.sku_id}`}
						/>
					</div>
				</button>
			</Card>
		</SheetClose>
	);
}
