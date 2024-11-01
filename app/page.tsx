import { Baloo_2 } from "next/font/google";
import { Suspense } from "react";
import Search from "./components/_components/Search";
import ReviewDataSkeleton from "./components/_components/ReviewDataSkeleton";
import ReviewData from "./components/_components/ReviewData";
import { prisma } from "@/prisma/_base";
import { Retailer } from "./libs/types";
import { getProductFromSku } from './libs/utils';

const font = Baloo_2({
	subsets: ["latin"],
	weight: ["600"],
});

export default async function Home({
	searchParams,
}: {
	searchParams: { compare: string };
}) {
	const slug = searchParams.compare;

	const existingSelected = await getProductFromSku(searchParams.compare)

	return (
		<main className="flex flex-col items-center justify-center px-10 h-full">
			<section className="flex flex-col items-center lg:px-80">
				<h1
					className={`${font.className} text-6xl text-primary text-center`}
				>
					Welcome to Glamalyze
					<span className="text-lg align-super">&#169;</span>
				</h1>
				<h2 className="text-sm text-center lg:text-base">
					Choose from over 25,000 products across Ulta and Sephora to
					compare reviews and product data
				</h2>
			</section>
			<Search existingSelected={existingSelected} />
			<section className="mt-4 flex flex-col lg:grid grid-cols-2 w-full gap-4 h-full">
				<Suspense key={slug} fallback={<ReviewDataSkeleton />}>
					<ReviewData sku={slug} />
				</Suspense>
			</section>
		</main>
	);
}
