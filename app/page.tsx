import Search from "./_components/Search";
import { Baloo_2 } from "next/font/google";
import { AllProducts, Review, SearchParams } from "./libs/types";
import ProductCard from "./(routes)/compare/[slug]/_components/ProductCard";
import compareProducts from "./actions/Compare/compareProducts";

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

	const data = await compareProducts(slug);

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
			<section className="w-full h-full mt-8 lg:px-80">
				<Search />
			</section>

			<section
				aria-label="compare2"
				className="mt-4 flex flex-col lg:grid grid-cols-2 w-full gap-4 h-full"
			>
				{data &&
					data.length > 0 &&
					data.map(
						(result, index) =>
							result.productData &&
							result.reviewsData && (
								<ProductCard
									key={index}
									data={result.productData}
									reviewsData={result.reviewsData}
								/>
							)
					)}
			</section>
		</main>
	);
}
