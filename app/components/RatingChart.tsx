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

type RatingChartProps = {
	reviewHistData: (number | null)[] | null;
	averageRating: number | null;
};

export default function RatingChart({
	reviewHistData,
	averageRating,
}: RatingChartProps) {
	if (!reviewHistData || reviewHistData.some((r) => r === null)) return;

	const filteredRatings = reviewHistData.filter(
		(r) => r !== null
	) as number[];

	const ratingTotal = filteredRatings.reduce((sum, a) => sum + a, 0);

	return (
		<Card className="w-full">
			<div className='flex items-center justify-between p-6'>
				<div className="flex items-end gap-2">
					<div className="flex">
						<Stars rating={averageRating} />

						<p className="text-xl font-bold ml-4">
							{averageRating}
						</p>
					</div>
					<p className="text-xs text-slate-400 pb-1">
						{ratingTotal} Reviews
					</p>
				</div>
				<div className='flex flex-col items-center'>
                    <p className='font-bold'>85%</p>
                    <p className='text-xs'>Recommended</p>
                </div>
			</div>
			<CardContent>
				{reviewHistData &&
					filteredRatings.map(
						(count, index) =>
							index < 5 && (
								<div key={index} className="flex items-center">
									<Stars
										rating={reviewHistData.length - index}
										reverse={true}
									/>
									<Progress
										value={(count / ratingTotal) * 100}
									/>
									<p className="text-sm text-slate-400 ml-4">
										{count}
									</p>
								</div>
							)
					)}
			</CardContent>
		</Card>
	);
}
