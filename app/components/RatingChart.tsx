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
import { MetaData } from "../libs/types";
import { formatRating, SephoraReviewCount } from "@/lib/utils";
import { metadata } from "../layout";

type RatingChartProps = {
	metaData: MetaData;
};

export default function RatingChart({ metaData }: RatingChartProps) {
	if (
		!metaData.reviewHistData ||
		metaData.reviewHistData.some((r) => r === null)
	)
		return;

	const filteredRatings = metaData.reviewHistData.filter(
		(r) => r !== null
	) as number[];

	return (
		<Card className="w-full">
			<div className="flex items-center justify-between p-6">
				<div className="flex items-end gap-2">
					<div className="flex">
						<Stars rating={metaData.averageRating} />

						<p className="text-xl font-bold ml-4">
							{metaData.averageRating &&
								formatRating(metaData.averageRating)}
						</p>
					</div>
					<p className="text-xs text-slate-400 pb-1">
						{metaData.totalReviews} Reviews
					</p>
				</div>
				<div className="flex flex-col items-center">
					<p className="font-bold">{metaData.recommended}%</p>
					<p className="text-xs">Recommended</p>
				</div>
			</div>
			<CardContent>
				{metaData.reviewHistData &&
					filteredRatings.map(
						(count, index) =>
							index < 5 && (
								<div
									key={index}
									style={{
										display: "grid",
										gridTemplateColumns:
											"repeat(3, 20% 75% 5%)",
									}}
								>
									{metaData.reviewHistData &&
										metaData.totalReviews && (
											<>
												<Stars
													rating={
														metaData.reviewHistData
															.length - index
													}
													reverse={true}
												/>

												<Progress
													value={
														(count /
															metaData.totalReviews) *
														100
													}
												/>
											</>
										)}
									<p className="text-sm text-slate-400 w-[30px]">
										{metaData.company === "Sephora"
											? SephoraReviewCount(
													count,
													metaData.totalReviews
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
