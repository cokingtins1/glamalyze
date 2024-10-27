"use client";

import { Card, CardContent } from "@/components/ui/card";
import StarIcon from "@mui/icons-material/Star";

import { Progress } from "@/components/ui/progress";
import Stars from "../../../../components/Review/Stars";
import { formatRating, SephoraReviewCount } from "@/app/libs/utils";
import { SephoraProduct, UltaProduct } from "@prisma/client";
import StarsSmall from "@/app/components/Review/StarsSmall";

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
						<div className="flex items-center gap-1">
							<span className=" mb-1 lg:hidden">
								<StarIcon sx={{ fontSize: "1.25rem" }} />
							</span>
							<p className="text-xl font-bold ml-2">
								{metaData.avg_rating &&
									formatRating(metaData.avg_rating)}
							</p>
						</div>
					</div>
					<p className="text-xs text-slate-400 pb-1">
						{metaData.total_reviews?.toLocaleString()} Reviews
					</p>
				</div>
				<div className="flex flex-col items-center">
					<p className="font-bold">
						{metaData.percent_recommended
							? metaData.percent_recommended + "%"
							: "N/A"}
					</p>
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
											"repeat(3, 15% 75% 10%)",
										alignItems: "center",
									}}
								>
									{metaData.review_histogram &&
										metaData.total_reviews && (
											<>
												<StarsSmall
													index={Math.abs(index - 5)}
												/>

												<Stars
													searchResult
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
														"Sephora"
															? count
															: (count /
																	metaData.total_reviews) *
															  100
													}
												/>
											</>
										)}
									<p className="text-sm text-slate-400 ml-2 text-right">
										{metaData.retailer_id === "Sephora"
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
