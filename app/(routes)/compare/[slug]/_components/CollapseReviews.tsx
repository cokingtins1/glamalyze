import { Review } from "@/app/libs/types";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

import { Card } from "@/components/ui/card";

import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { parseReviewTimeStamp } from "@/lib/utils";
import Stars from "@/app/components/Review/Stars";
import Verified from "@/app/components/Review/Verified";

import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

type Props = {
	reviews: Review[];
};

export default function CollapseReviews({ reviews }: Props) {
	const [reviewLimit, setReveiwLimit] = useState<Review[]>(
		reviews.slice(0, 3)
	);
	const [isMore, setIsMore] = useState(reviews.length > 3);

	useEffect(() => {
		// console.log(reviews.length)
		// console.log(reviewLimit.length)
		// console.log(isMore)
		if (reviews.length >= reviewLimit.length) {
			setIsMore(true);
		} else {
			setIsMore(false);
		}
	}, [reviewLimit, reviews.length]);

	const loadMore = () => {
		setReveiwLimit(reviews.slice(0, reviewLimit.length + 3));
	};

	const firstThree = reviews.slice(0, 3);
	const restOfData = reviews.slice(3);

	return (
		<div className="transition ease-in-out delay-150 resize-none">
			<Accordion type="multiple" className="space-y-4">
				{reviewLimit.map((rev, index) => (
					<AccordionItem key={index} value={`review${index}`}>
						<Card className="p-2">
							<AccordionTrigger>
								<div>
									<div className="flex items-center gap-4">
										<Stars
											rating={rev.review_rating}
											searchResult
										/>
										<p className="text-sm text-left lg:text-lg font-semibold">
											{rev.review_headline}
										</p>
									</div>
									<div className="flex gap-2 mt-2 px-2">
										<span className="flex gap-px items-center">
											<ThumbUpOffAltIcon fontSize="small" />
											<p className="text-xs">{`(${rev.up_votes})`}</p>
										</span>
										<span className="flex gap-px items-center">
											<ThumbDownOffAltIcon fontSize="small" />
											<p className="text-xs">{`(${rev.down_votes})`}</p>
										</span>
										<Verified
											verified={rev.verified_buyer}
										/>
									</div>
								</div>

								<div className="flex items-center gap-2">
									<div>
										<p className="text-xs font-semibold">
											{rev.reviewer_name}
										</p>
										<p className="text-xs whitespace-nowrap">
											{parseReviewTimeStamp(
												rev.review_date
											)}
										</p>
									</div>
									<ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
								</div>
							</AccordionTrigger>
							<AccordionContent className="pl-2">
								{rev.review_text}
							</AccordionContent>
						</Card>
					</AccordionItem>
				))}
			</Accordion>
			<div className="mt-4 text-center">
				<Button disabled={!isMore} onClick={loadMore}>
					{isMore ? "More Reviews" : "Show Less"}
				</Button>
			</div>
		</div>
	);
}
