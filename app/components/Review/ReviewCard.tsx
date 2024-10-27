import { Review } from "@/app/libs/types";
import Stars from "./Stars";
import Verified from "./Verified";
import { Card, CardContent } from "@/components/ui/card";
import { parseReviewTimeStamp } from "@/app/libs/utils";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
type ReviewData = {
	reviewData: Review;
};

export default function ReviewCard({ reviewData }: ReviewData) {
	return (
		<Card className="flex flex-col w-full gap-2 mb-4">
			<CardContent>
				<div className="flex justify-between items-center pt-4">
					<div className="flex items-center gap-4">
						<Stars rating={reviewData.review_rating} />
						<p className="text-lg font-semibold">
							{reviewData.review_headline}
						</p>
						<Verified verified={reviewData.verified_buyer} />
					</div>
					<div className="text-right">
						<p className="text-xs font-semibold">
							{reviewData.reviewer_name}
						</p>
						<p className="text-xs whitespace-nowrap">
							{parseReviewTimeStamp(reviewData.review_date)}
						</p>
					</div>
				</div>
				<p className="text-sm mt-4">{reviewData.review_text}</p>
				<div className="flex gap-4 mt-2">
					<span className="flex gap-2 items-center">
						<ThumbUpOffAltIcon fontSize="small" />
						<p className="text-xs">{`(${reviewData.up_votes})`}</p>
					</span>
					<span className="flex gap-2 items-center">
						<ThumbDownOffAltIcon fontSize="small" />
						<p className="text-xs">{`(${reviewData.down_votes})`}</p>
					</span>
				</div>
			</CardContent>
		</Card>
	);
}
