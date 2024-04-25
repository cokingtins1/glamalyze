"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { Progress } from "@/components/ui/progress";
import Stars from "./Review/Stars";
import { formatRating, SephoraReviewCount } from "@/lib/utils";
import { SephoraProduct, UltaProduct } from "@prisma/client";

type DataProps = {
	metaData: UltaProduct | SephoraProduct;
};

export default function RatingChart({ metaData }: DataProps) {
	if (
		!metaData.review_histogram ||
		metaData.review_histogram.some((r) => r === null)
	)
		return;

	const filteredRatings = metaData.review_histogram.filter(
		(r) => r !== null
	) as number[];

	return (
		<Card className="w-full">
			<div className="flex items-center justify-between p-6">
				<div className="flex items-end gap-2">
					<div className="flex">
						<Stars rating={metaData.avg_rating} />

						<p className="text-xl font-bold ml-4">
							{metaData.avg_rating &&
								formatRating(metaData.avg_rating)}
						</p>
					</div>
					<p className="text-xs text-slate-400 pb-1">
						{metaData.total_reviews} Reviews
					</p>
				</div>
				<div className="flex flex-col items-center">
					<p className="font-bold">{metaData.percent_recommended}%</p>
					<p className="text-xs">Recommended</p>
				</div>
			</div>
			<CardContent>
				{metaData.review_histogram &&
					filteredRatings.map(
						(count, index) =>
							index < 5 && (
								<div
									key={index}
									style={{
										display: "grid",
										gridTemplateColumns:
											"repeat(3, 20% 75% 5%)",
										alignItems: "center",
									}}
								>
									{metaData.review_histogram &&
										metaData.total_reviews && (
											<>
												<Stars
													rating={
														metaData
															.review_histogram
															.length - index
													}
													reverse={true}
												/>

												<Progress
													value={
														metaData.retailer_id ===
														"Sephora123"
															? count
															: (count /
																	metaData.total_reviews) *
															  100
													}
												/>
											</>
										)}
									<p className="text-sm text-slate-400 ml-2 text-right">
										{metaData.retailer_id === "Sephora123"
											? SephoraReviewCount(
													count,
													metaData.total_reviews
											  )
											: count}
									</p>
								</div>
							)
					)}
			</CardContent>
		</Card>
	);
}
