"use client";

import { useCallback, useState } from "react";
import SubmitForm from "./SubmitForm";
import {
	QueryResult,
	querySchema,
	TQuerySchema,
} from "../libs/types";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import QueryResults from "./QueryResults";


export default function GetProductForm() {
	const [data, setData] = useState<QueryResult | null>(null);

	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const form = useForm<TQuerySchema>({
		resolver: zodResolver(querySchema),
		defaultValues: {
			query: "",
		},
	});

	const createQueryString = useCallback(
		(name: string, value: string) => {
			console.log("searchParams:", searchParams.toString());
			const params = new URLSearchParams(searchParams.toString());
			params.set(name, value);

			return params.toString();
		},
		[searchParams]
	);

	const onSubmit = async (data: TQuerySchema) => {
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

		if (res.ok) {
			const responseData = await res.json();
			setData(responseData.success.data);
		}
	};

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-4 w-full lg:flex-row items-center"
				>
					<FormField
					
						control={form.control}
						name="query"
						render={({ field }) => (
							<FormItem className='grow'>
								<FormLabel className='lg:hidden'>Search Products</FormLabel>
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
			<form
				action={(formData) => {
					const ultaLink = formData.get("ultaLink");
					const sephoraLink = formData.get("sephoraLink");
					const compareString = `u:[${ultaLink}],s:[${sephoraLink}]`;
					router.push(`/compare/${compareString}`);
				}}
			>
				{data && (
					<QueryResults
						isSubmitting={form.formState.isSubmitting}
						data={data}
					/>
				)}
			</form>
		</>
	);
}
