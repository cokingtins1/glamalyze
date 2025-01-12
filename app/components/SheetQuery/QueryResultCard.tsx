import { Card } from "@/components/ui/card";
import Image, { StaticImageData } from "next/image";
import CombinedLogo from "@/public/CombinedLogo.png";
import { SharedProduct } from "@prisma/client";
import { SheetClose } from "@/components/ui/sheet";
import { cleanUrl } from "@/app/libs/utils";

type QueryResultCardProps = {
	data: SharedProduct;
};

export default function QueryResultCard({ data }: QueryResultCardProps) {
	function getImage(ultaSrc: string, sephoraSrc: string) {
		let imageSrc: string | StaticImageData = CombinedLogo;

		const cleanUltaSrc = cleanUrl(ultaSrc);
		const cleanSephoraSrc = cleanUrl(sephoraSrc);

		if (cleanUltaSrc?.includes("ulta.com")) {
			imageSrc = cleanUltaSrc;
		} else if (cleanSephoraSrc?.includes("sephora.com")) {
			imageSrc = cleanSephoraSrc;
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
								cleanUrl(data.ulta_product_image_url[0]),
								cleanUrl(data.sephora_product_image_url[0])
							)}
							alt="product image"
							fill
							style={{ objectFit: "contain" }}
						/>
					</div>
					<div className="flex flex-col p-2">
						<h1 className="text-sm font-bold">
							{data.ulta_product_name}
						</h1>
						<h2 className="text-xs">{data.brand_name}</h2>
						<input
							readOnly={true}
							className="hidden"
							name="ultaLink"
							value={`${data.ulta_sku_id}`}
						/>
						<input
							readOnly={true}
							className="hidden"
							name="sephoraLink"
							value={`${data.sephora_sku_id}`}
						/>
					</div>
				</button>
			</Card>
		</SheetClose>
	);
}
