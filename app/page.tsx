import { PrismaClient } from "@prisma/client";
import NewQueryDrawer from "./components/NewQueryDrawer";
import DataDisplay from "./components/Ulta/DataDisplay";
import NextId from "./components/Data Validation/NextId";
import { Suspense } from "react";
import DisplaySkeleton from "./components/Loading Skeletons/DisplaySkeleton";
import { SearchParams, SearchResults } from "./libs/types";
import Query from "./libs/QueryFunctions/query";

type Props = {
	searchParams: SearchParams;
};

export default async function Home({ searchParams }: Props) {
	const ultaData = "";
	const sephoraData = "";

	return (
		<main className="flex flex-col items-start justify-center">
			<NewQueryDrawer searchParams={searchParams} />
			<section>
				<svg
					className="w-64 h-32"
					viewBox="0 0 64 32"
					xmlns="http://www.w3.org/2000/svg"
					
				>
					<polygon
						points="12,0 64,0 64,32 0,32"
						className="fill-current bg-gray-300 rounded-lg"
					/>
				</svg>
			</section>
			<section className="grid grid-cols-2 gap-4 w-full mt-12">
				{ultaData && sephoraData && (
					<>
						{/* <DataDisplay
								data={ultaData}
								reviewsData={ultaReviewsData}
							/> */}

						{/* <DataDisplay
								data={sephoraData}
								reviewsData={sephoraReviewsData}
							/> */}
					</>
				)}
			</section>
		</main>
	);
}
