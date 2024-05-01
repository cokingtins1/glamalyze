import { PrismaClient } from "@prisma/client";
import NewQueryDrawer from "./components/NewQueryDrawer";
import DataDisplay from "./components/Ulta/DataDisplay";
import NextId from "./components/Data Validation/NextId";
import { Suspense } from "react";
import DisplaySkeleton from "./components/Loading Skeletons/DisplaySkeleton";

export default async function Home() {
	//https://www.ulta.com/p/cult-classic-purifying-face-cleanser-xlsImpprod18731041?sku=2532485
	//https://www.sephora.com/product/tula-skincare-the-cult-classic-purifying-face-cleanser-P475182?skuId=2500684&icid2=products%20grid:p475182:product

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
			retailer_id: "Ulta",
		},
	});

	const sephoraReviewsData = await prisma.review.findMany({
		where: {
			product_id: selectedProduct,
			retailer_id: "Sephora",
		},
	});

	return (
		<main className="flex flex-col items-start justify-center">
			<NewQueryDrawer />
			{/* <NextId /> */}
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
