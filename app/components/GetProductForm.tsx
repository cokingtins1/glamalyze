"use client";

import { useCallback, useState } from "react";
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
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function GetProductForm() {
	const [loading, setLoading] = useState<Boolean>(false);
	const [reviews, setReviews] = useState<Review[] | null>(null);
	const [metaData, setMetaData] = useState<SephoraProduct | null>(null);

	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [resData, setResData] = useState("");

	const form = useForm<TQuerySchema>({
		resolver: zodResolver(querySchema),
		defaultValues: {
			query: "",
		},
	});

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set(name, value);

			return params.toString();
		},
		[searchParams]
	);

	const onSubmit = async (data: TQuerySchema) => {
		const start = new Date().getTime();

		router.push("/" + "?" + createQueryString("search", data.query));

		const res = await fetch("/api/submitQuery", {
			method: "POST",
			body: JSON.stringify({
				query: data.query,
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
				form.setError("query", {
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
					name="query"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Ulta URL</FormLabel>
							<FormControl>
								<Input
									placeholder="Search for products"
									{...field}
									className="bg-white"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<SubmitForm
					disabled={!form.formState.isDirty}
					pending={form.formState.isSubmitting}
					pendingText={["Searching for Products...", "Search"]}
				/>
			</form>
		</Form>
	);
}
