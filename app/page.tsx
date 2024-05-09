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
		</main>
	);
}
