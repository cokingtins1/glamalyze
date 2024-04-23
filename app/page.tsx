import { PrismaClient } from "@prisma/client";
import NewQueryDrawer from "./components/NewQueryDrawer";
import DataDisplay from "./components/Ulta/DataDisplay";
import NextId from "./components/Data Validation/NextId";
import { Suspense } from "react";
import DisplaySkeleton from "./components/Loading Skeletons/DisplaySkeleton";

export default async function Home() {
	const prisma = new PrismaClient();

	const productIdData = await prisma.product.findMany({
		select: {
			product_id: true,
		},
	});

	const productIds = productIdData.map((id) => id.product_id);
	const selectedProduct = productIds[0];

	let ultaData, sephoraData;

	if (selectedProduct) {
		ultaData = await prisma.ultaProduct.findUnique({
			where: {
				product_id: selectedProduct,
			},
		});

		sephoraData = await prisma.sephoraProduct.findUnique({
			where: {
				product_id: selectedProduct,
			},
		});
	}
	const ultaReviewsData = await prisma.review.findMany({
		where: {
			product_id: selectedProduct,
			retailer_id: "Ulta123",
		},
	});

	const sephoraReviewsData = await prisma.review.findMany({
		where: {
			product_id: selectedProduct,
			retailer_id: "Sephora123",
		},
	});

	return (
		<main className="flex flex-col items-start justify-center">
			{/* <NewQueryDrawer /> */}
			<NextId />
			<section className="grid grid-cols-2 gap-4 w-full mt-12">
				{ultaData && sephoraData && (
					<>
						<Suspense fallback={<DisplaySkeleton />}>
							<DataDisplay
								data={ultaData}
								reviewsData={ultaReviewsData}
							/>
						</Suspense>

						<Suspense fallback={<DisplaySkeleton />}>
							<DataDisplay
								data={sephoraData}
								reviewsData={sephoraReviewsData}
							/>
						</Suspense>
					</>
				)}
			</section>
		</main>
	);
}
