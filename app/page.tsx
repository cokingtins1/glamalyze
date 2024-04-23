import { PrismaClient } from "@prisma/client";
import NewQueryDrawer from "./components/NewQueryDrawer";
import DataDisplay from "./components/Ulta/DataDisplay";
import NextId from "./components/Data Validation/NextId";
import { Suspense } from "react";

export default async function Home() {
	const prisma = new PrismaClient();

	const productIdData = await prisma.product.findMany({
		select: {
			product_id: true,
		},
	});

	const productIds = productIdData.map((id) => id.product_id);
	const selectedProduct = productIds[0];

	const ultaData = await prisma.ultaProduct.findUnique({
		where: {
			product_id: selectedProduct,
		},
	});

	const sephoraData = await prisma.sephoraProduct.findUnique({
		where: {
			product_id: selectedProduct,
		},
	});

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
						<Suspense fallback>
							<DataDisplay
								data={ultaData}
								reviewsData={ultaReviewsData}
							/>
						</Suspense>
						<DataDisplay
							data={sephoraData}
							reviewsData={sephoraReviewsData}
						/>
					</>
				)}
			</section>
		</main>
	);
}
