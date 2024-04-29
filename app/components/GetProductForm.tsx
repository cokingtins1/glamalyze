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
			ultaUrl: "",
			sephoraUrl: "",
		},
	});

	const onSubmit = async (data: TQuerySchema) => {
		const start = new Date().getTime();
		const res = await fetch("/api/submitQuery", {
			method: "POST",
			body: JSON.stringify({
				ultaUrl: data.ultaUrl,
				sephoraUrl: data.sephoraUrl,
			}),
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
				form.setError("ultaUrl", {
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
					name="ultaUrl"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Ulta URL</FormLabel>
							<FormControl>
								<Input
									placeholder="Enter Ulta URL"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="sephoraUrl"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Sephora URL</FormLabel>
							<FormControl>
								<Input
									placeholder="Enter Sephora URL"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<SubmitForm
					disabled={!form.formState.isDirty}
					pending={form.formState.isSubmitting}
					pendingText={["Getting Reviews...", "Get Reviews"]}
				/>
			</form>
		</Form>
	);
}
