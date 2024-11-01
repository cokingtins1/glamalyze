import { MetaData, Review } from "@/app/libs/types";
import { prisma } from '@/prisma/_base';
import {
	PrismaClient,
	SephoraReviewer,
	UltaReview,
	UltaReviewer,
} from "@prisma/client";

type ScrapedData = {
	metaData: MetaData;
	reviewsData: Review[];
};


export default async function updateData(scrapedData: ScrapedData[]) {
	// scrub results for "", {}, [], null, undefined -> extract only: product_id,
	//avg_rating, precent_recommended, review_histogram, total_reviews, product_price

	function createReviewer(reviewData: Review[]) {
		let reviewers: UltaReviewer[] | SephoraReviewer[] = [];

		for (const reviewer of reviewData) {
			const newReviewer = {
				reviewer_id: crypto.randomUUID(),
				reviewer_name: reviewer.reviewer_name,
				retailer_id: reviewer.retailer_id,
                product_id: reviewer.product_id
			};
			reviewers.push(newReviewer);
		}

		return reviewers;
	}

	for (const res of scrapedData) {
		const scrubbedData = Object.fromEntries(
			Object.entries(res.metaData).filter(
				([k, v]) =>
					v !== null &&
					v !== undefined &&
					v !== "" &&
					!(Array.isArray(v) && v.length === 0)
			)
		);

		if (res.metaData.retailer_id === "Ulta") {
			await prisma.ultaProduct.update({
				where: { product_id: res.metaData.product_id },
				data: scrubbedData,
			});

			const reviewers = createReviewer(res.reviewsData);
			await prisma.ultaReviewer.createMany({ data: reviewers });

			await prisma.ultaReview.createMany({ data: res.reviewsData });
		} else if (res.metaData.retailer_id === "Sephora") {
			await prisma.sephoraProduct.update({
				where: { product_id: res.metaData.product_id },
				data: scrubbedData,
			});

			const reviewers = createReviewer(res.reviewsData);
			await prisma.sephoraReviewer.createMany({ data: reviewers });

			await prisma.sephoraReview.createMany({ data: res.reviewsData });
		}
	}
}
