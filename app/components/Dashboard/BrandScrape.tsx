import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

import UltaLogo from "@/public/Ulta_Logo.png";
import SephoraLogo from "@/public/Sephora_Logo.png";

type Props = {};

export default function BrandScrape({}: Props) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Scrape Brands</CardTitle>
				<CardDescription>
					Run function to scrape list of brands and associated page
					links
				</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col gap-4">
				<div className="grid grid-cols-2 justify-items-start">
					<div className="h-[40px] w-[75px] relative">
						<Image
							src={UltaLogo}
							fill
							style={{ objectFit: "contain" }}
							sizes="(max-width: 430px), 75px "
							alt={`Ulta Logo`}
						/>
					</div>
					<div className="justify-self-stretch">
						<Button className='justify-self-stretch'>Scrape Ulta Brands</Button>
					</div>
				</div>
				<div className="grid grid-cols-2">
					<div className="h-[40px] w-[75px] relative">
						<Image
							src={SephoraLogo}
							fill
							style={{ objectFit: "contain" }}
							sizes="(max-width: 430px), 75px "
							alt={`Ulta Logo`}
						/>
					</div>
					<div className="justify-self-center">
						<Button>Scrape Sephora Brands</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
