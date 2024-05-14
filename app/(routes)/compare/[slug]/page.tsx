import compareProducts from "@/app/actions/Compare/compareProducts";
import DataDisplay from "@/app/components/DataDisplay";
import SharedComparison from '@/app/components/SharedComparison';

type Props = {
	params: { slug: string };
};

export default async function Page({ params }: Props) {
	const data = await compareProducts(params.slug);

	return (
		<>
			<main>
				<section>
					<SharedComparison/>
				</section>
				<section className="grid grid-cols-2 gap-4 w-full mt-12">
					{data.length > 0 &&
						data.map(
							(result, index) =>
								result.productData &&
								result.reviewsData && (
									<DataDisplay
										key={index}
										data={result.productData}
										reviewsData={result.reviewsData}
									/>
								)
						)}
				</section>
			</main>
		</>
	);
}
