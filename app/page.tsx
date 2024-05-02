import { AllProducts, PrismaClient } from "@prisma/client";
import NewQueryDrawer from "./components/NewQueryDrawer";
import DataDisplay from "./components/Ulta/DataDisplay";
import NextId from "./components/Data Validation/NextId";
import { Suspense } from "react";
import DisplaySkeleton from "./components/Loading Skeletons/DisplaySkeleton";
import { SearchParams, SearchResults } from "./libs/types";
import Query from "./libs/QueryFunctions/query";

const prisma = new PrismaClient();
export default async function Home({
	params,
	searchParams,
}: {
	params: { slug: string };
	searchParams: SearchParams;
}) {
	const ultaData = "";
	const sephoraData = "";

	let queryResults: AllProducts[] = [];

	if (searchParams.search) {
		const query = searchParams.search as string;
		queryResults = await Query(query);
	}

	return (
		<main className="flex flex-col items-start justify-center">
			<NewQueryDrawer
				searchParams={searchParams}
				queryResults={queryResults}
			/>
			{/* <NextId /> */}
			<section className="grid grid-cols-2 gap-4 w-full mt-12">
				{ultaData && sephoraData && (
					<>
						<Suspense fallback={<DisplaySkeleton />}>
							{/* <DataDisplay
								data={ultaData}
								reviewsData={ultaReviewsData}
							/> */}
						</Suspense>

						<Suspense fallback={<DisplaySkeleton />}>
							{/* <DataDisplay
								data={sephoraData}
								reviewsData={sephoraReviewsData}
							/> */}
						</Suspense>
					</>
				)}
			</section>
		</main>
	);
}
