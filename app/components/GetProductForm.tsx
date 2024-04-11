"use client";

import { useState } from "react";
import { getScrapedData } from "../actions/getScrapedData";
import SubmitForm from "./SubmitForm";
import { Review, MetaData } from "../libs/types";

export default function GetProductForm() {
	const [loading, setLoading] = useState<Boolean>(false);
	const [reviews, setReviews] = useState<Review[] | null>(null);
	const [metaData, setMetaData] = useState<MetaData | null>(null);

	return (
		<div className="flex flex-col items-center mt-12">
			<form
				className="flex gap-4 items-center"
				action={async (formData) => {
					setReviews(null);
					setLoading(true);
					const { metaData, reviewsData } = await getScrapedData(
						formData
					);
					if (reviewsData.length > 0) setReviews(reviewsData);
					if (metaData) setMetaData(metaData);

					setLoading(false);
				}}
			>
				<label htmlFor="url" className="text-white">
					URL
				</label>
				<input
					name="url"
					className="text-black text-sm w-[900px] p-2"
					type="text"
				/>
				<SubmitForm />
			</form>
			{/* <div className="flex flex-col gap-4 mt-12 text-white mb-12">
				{loading && <p>Loading reviews...</p>}
				<p>{metaData?.price}</p>
				<p>{metaData?.averageRating}</p>
				<p>{metaData?.totalReviews}</p>
				{metaData?.reviewHistData &&
					metaData.reviewHistData.map((rating, index) => (
						<p key={index}>
							{`${5 - index} stars: `}
							{rating}
						</p>
					))}

				{reviews && reviews?.length > 0 && !loading && (
					<>
						<p>Review Count: {reviews.length}</p>

						{reviews &&
							reviews?.map((r, index) => (
								<div
									key={index}
									className="border border-slate-600 rounded-lg p-4"
								>
									<p className="font-bold">{r.headline}</p>
									<p className="text-slate-300 text-sm">
										{r.reviewText}
									</p>
									<p className="">Stars: {r.stars}</p>
									<p className="">
										{r.verifiedBuyer && "verified buyer"}
									</p>
								</div>
							))}
					</>
				)}
			</div> */}
		</div>
	);
}
