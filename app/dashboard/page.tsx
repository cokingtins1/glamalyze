import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { PrismaClient } from "@prisma/client";
import BrandScrape from "../components/Dashboard/BrandScrape";

const prisma = new PrismaClient();

export default function Page() {
	return (
		<main>
			<section className='flex'>
				<BrandScrape />
			</section>
		</main>
	);
}
