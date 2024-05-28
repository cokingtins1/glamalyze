import Search from "./_components/Search";
import { Baloo_2 } from "next/font/google";
import { AllProducts, Review, SearchParams } from "./libs/types";
import ProductCard from "./(routes)/compare/[slug]/_components/ProductCard";
import compareProducts from "./actions/Compare/compareProducts";
import suspense from "./actions/Compare/suspense";
import { Suspense } from "react";
import ReviewData from "./_components/ReviewData";
import ReviewDataSkeleton from "./_components/ReviewDataSkeleton";

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
			<Search />
			<section className="mt-4 flex flex-col lg:grid grid-cols-2 w-full gap-4 h-full">
				<Suspense key={slug} fallback={<ReviewDataSkeleton />}>
					<ReviewData sku={slug} />
				</Suspense>
			</section>
		</main>
	);
}
