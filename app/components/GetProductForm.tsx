"use client";

import { useState } from "react";
import SubmitForm from "./SubmitForm";
import { querySchema, TQuerySchema } from "../libs/types";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Review, SephoraProduct } from "@prisma/client";

export default function GetProductForm() {
	const [loading, setLoading] = useState<Boolean>(false);
	const [reviews, setReviews] = useState<Review[] | null>(null);
	const [metaData, setMetaData] = useState<SephoraProduct | null>(null);

	const [resData, setResData] = useState("");

	const form = useForm<TQuerySchema>({
		resolver: zodResolver(querySchema),
		defaultValues: {
			url: "",
		},
	});

	const onSubmit = async (data: TQuerySchema) => {
		const start = new Date().getTime();
		const res = await fetch("/api/submitQuery", {
			method: "POST",
			body: JSON.stringify({ url: data.url }),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const end = new Date().getTime();

		const responseData = await res.json();
		if (!res.ok) {
			alert("Query failed");
		} else {
			console.log(`Execution time: ${(end - start) / 1000} seconds`);
		}

		if (responseData.errors) {
			const errors = responseData.errors;
			if (errors.url) {
				form.setError("url", {
					type: "server",
					message: errors.url,
				});
			}
		} else {
			setResData(responseData.success.data);
			console.log(responseData.success.data);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="url"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder="Search Products"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Get reviews from Ulta and Sephora
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<SubmitForm
					disabled={!form.formState.isDirty}
					pending={form.formState.isSubmitting}
				/>
			</form>
		</Form>

		// <div className="flex flex-col items-center mt-12">
		// 	<form
		// 		className="flex gap-4 items-center"
		// 		action={async (formData) => {
		// 			setReviews(null);
		// 			setLoading(true);
		// 			const { metaData, reviewsData } = await getScrapedData(
		// 				formData
		// 			);
		// 			if (reviewsData.length > 0) setReviews(reviewsData);
		// 			if (metaData) setMetaData(metaData);

		// 			setLoading(false);
		// 		}}
		// 	>
		// 		<label htmlFor="url" className="text-white">
		// 			URL
		// 		</label>
		// 		<Input
		// 			className="text-black text-sm p-2"
		// 			type="text"
		// 			{...register("url")}
		// 		/>
		// 		<SubmitForm disabled={isSubmitting} />
		// 	</form>
		// 	{/* <div className="flex flex-col gap-4 mt-12 text-white mb-12">
		// 		{loading && <p>Loading reviews...</p>}
		// 		<p>{metaData?.price}</p>
		// 		<p>{metaData?.averageRating}</p>
		// 		<p>{metaData?.totalReviews}</p>
		// 		{metaData?.reviewHistData &&
		// 			metaData.reviewHistData.map((rating, index) => (
		// 				<p key={index}>
		// 					{`${5 - index} stars: `}
		// 					{rating}
		// 				</p>
		// 			))}

		// 		{reviews && reviews?.length > 0 && !loading && (
		// 			<>
		// 				<p>Review Count: {reviews.length}</p>

		// 				{reviews &&
		// 					reviews?.map((r, index) => (
		// 						<div
		// 							key={index}
		// 							className="border border-slate-600 rounded-lg p-4"
		// 						>
		// 							<p className="font-bold">{r.headline}</p>
		// 							<p className="text-slate-300 text-sm">
		// 								{r.reviewText}
		// 							</p>
		// 							<p className="">Stars: {r.stars}</p>
		// 							<p className="">
		// 								{r.verifiedBuyer && "verified buyer"}
		// 							</p>
		// 						</div>
		// 					))}
		// 			</>
		// 		)}
		// 	</div> */}
		// </div>
	);
}
