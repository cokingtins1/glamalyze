import {
	AllProducts,
	Review,
	ReviewsScrape,
	ScrapeReturnMessage,
	SharedLinks,
	TScrapeSchema,
} from "../types";

import {
	FailedScrapes,
	PrismaClient,
	SephoraReviewer,
	SharedProduct,
	UltaReviewer,
} from "@prisma/client";

const prisma = new PrismaClient();

export default async function scrapeSharedReviews(
	input: TScrapeSchema
): Promise<ScrapeReturnMessage> {
	let start = new Date().getTime();
	let scrapeIndex = "";

	let end: number = new Date().getTime();

	console.log(`Done: ${(end - start) / 1000} seconds`);

	return {
		message: {
			executionTime: `${(end - start) / 1000}`,
			scrapeIndex,
			error: "",
		},
	};
}
