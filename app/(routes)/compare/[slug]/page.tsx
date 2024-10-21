import compareProducts from "@/app/actions/Compare/compareProducts";
import DataDisplay from "@/app/(routes)/compare/[slug]/_components/DataDisplay";
import SharedComparison from "@/app/(routes)/compare/[slug]/_components/SharedComparison";
import { AllProducts, Review } from "@/app/libs/types";
import ProductCard from "./_components/ProductCard";

type Props = {
	params: { slug: string };
};

export default async function Page({ params }: Props) {
	const data = await compareProducts(params.slug);

	return (
		<>
			{/* <main aria-label="compare" className="flex flex-col px-4">
				<section className="flex justify-center">
					<SharedComparison data={data} />
				</section>
				<section
					aria-label="compare2"
					className="mt-4 flex flex-col lg:grid grid-cols-2 gap-4 w-full h-max"
				>
					{data.length > 0 &&
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
			</main> */}
		</>
	);
}
