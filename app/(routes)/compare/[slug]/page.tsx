import compareProducts from "@/app/actions/Compare/compareProducts";
import DataDisplay from "@/app/components/Ulta/DataDisplay";

type Props = {
	params: { slug: string };
};

export default async function Page({ params }: Props) {
	// const {
	// 	ultaMetaData,
	// 	ultaReviewsData,
	// 	sephoraMetaData,
	// 	sephoraReviewsData,
	// } = await compareProducts(params.slug);

	const data = await compareProducts(params.slug);

	console.log("data:", data);

	return (
		<>
			<section className="grid grid-cols-2 gap-4 w-full mt-12">
				{data.length > 0 &&
					data.map(
						(result) =>
							result.productData &&
							result.reviewsData && (
								<DataDisplay
									data={result.productData}
									reviewsData={result.reviewsData}
								/>
							)
					)}

				{/* <>
						<DataDisplay
							data={ultaMetaData}
							reviewsData={ultaReviewsData}
						/>

						<DataDisplay
							data={sephoraMetaData}
							reviewsData={sephoraReviewsData}
						/>
					</> */}
			</section>
		</>
	);
}
