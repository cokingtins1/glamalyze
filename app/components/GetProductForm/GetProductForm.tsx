"use client";

import { useCallback, useState } from "react";
import SubmitForm from "../SubmitForm";
import { QueryResult, querySchema, TQuerySchema } from "../../libs/types";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, Tab } from "@nextui-org/tabs";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import QueryResults from "../SheetQuery/QueryResults";
import QueryResultsHome from "../HomeQuery/QueryResultsHome";
import { cn } from "@/lib/utils";
import CompareTabs from "./CompareTabs";

type GetProductFormProps = {
	sheet: boolean;
};
export default function GetProductForm({ sheet }: GetProductFormProps) {
	const [sheetData, setSheetData] = useState<QueryResult | null>(null);
	const [homeData, setHomeData] = useState<QueryResult | null>(null);

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
			if (sheet) {
				setSheetData(responseData.success.data);
			} else {
				setHomeData(responseData.success.data);
			}
		}
	};

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					// className="flex flex-col gap-4 w-full lg:flex-row items-center"
					className="flex flex-col gap-2 px-2"
				>
					<div
						className={cn("flex flex-col", {
							"flex-col gap-4 w-full": sheet,
							"flex-row items-center justify-center gap-2": !sheet,
						})}
					>
						<FormField
							control={form.control}
							name="query"
							render={({ field }) => (
								<FormItem className="grow">
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
							pendingText={["Searching...", "Search"]}
							sheet={sheet}
						/>
					</div>
					{/* <CompareTabs /> */}
				</form>
			</Form>
			<form
				action={(formData) => {
					// const ultaLink = formData.get("ultaLink");
					// const sephoraLink = formData.get("sephoraLink");
					// const compareString = `u:[${ultaLink}],s:[${sephoraLink}]`;
					// router.push(`/compare/${compareString}`);
				}}
			>
				{sheetData && (
					<QueryResults
						isSubmitting={form.formState.isSubmitting}
						data={sheetData}
					/>
				)}

				{homeData && (
					<QueryResultsHome
						isSubmitting={form.formState.isSubmitting}
						data={homeData}
					/>
				)}
			</form>
		</>
	);
}
