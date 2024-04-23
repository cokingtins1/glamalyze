import { Review } from '@prisma/client';
import Stars from "./Stars";
import Verified from "./Verified";
import { Card, CardContent } from "@/components/ui/card";

type ReviewData = {
	reviewData: Review;
};

export default function ReviewCard({ reviewData }: ReviewData) {
	return (
		<Card className="flex flex-col w-full gap-2 my-4">
			<CardContent>
				<div className="flex items-center gap-4 pt-4">
					<Stars rating={reviewData.review_rating} />
					<p className="text-lg font-semibold">
						{reviewData.review_headline}
					</p>
					<Verified verified={reviewData.verified_buyer} />
				</div>
				<p className="text-sm">{reviewData.review_text}</p>
			</CardContent>
		</Card>
	);
}
