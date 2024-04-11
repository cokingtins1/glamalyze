import { Review } from "@/app/libs/types";
import Stars from "./Stars";
import Verified from './Verified';

type ReviewData = {
	reviewData: Review;
};

export default function ReviewCard({ reviewData }: ReviewData) {
	return (
		<div className='flex flex-col w-full gap-2 my-4 '>
			<div className='flex items-center gap-4'>
				<Stars rating={reviewData.stars} />
				<p className='text-lg font-semibold'>{reviewData.headline}</p>
				<Verified verified={reviewData.verifiedBuyer}/>
			</div>
			<p className='text-sm'>{reviewData.reviewText}</p>
			
		</div>
	);
}
