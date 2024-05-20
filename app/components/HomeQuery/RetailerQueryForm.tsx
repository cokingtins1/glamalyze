"use client";

import { Dispatch, SetStateAction, useCallback, useState } from "react";
import SubmitForm from "../SubmitForm";
import {
	AllProducts,
	QueryResult,
	querySchema,
	TQuerySchema,
} from "../../libs/types";
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
import QueryResultsHome from "./QueryResultsHome";
import { cn } from "@/lib/utils";

type RetailerQueryFormProps = {
	sheet: boolean;
	setData: Dispatch<SetStateAction<AllProducts[]>>;
	retailer: "Ulta" | "Sephora";
};
export default function RetailerQueryForm({
	sheet,
	setData,
	retailer,
}: RetailerQueryFormProps) {
	const [sheetData, setSheetData] = useState<QueryResult | null>(null);
	const [homeData, setHomeData] = useState<QueryResult | null>(null);

	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const form = useForm<TQuerySchema>({
		resolver: zodResolver(querySchema),
		defaultValues: {
			query: "",
			retailer: retailer,
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

		const res = await fetch("/api/retailerQuery", {
			method: "POST",
			body: JSON.stringify({
				query: data.query,
				retailer: data.retailer,
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
				setData(responseData.success.data);
			}
		}
	};

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-2 px-2"
				>
					<div
						className={cn("flex flex-col", {
							"flex-col gap-4 w-full": sheet,
							"flex-row items-center justify-center gap-2":
								!sheet,
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
				</form>
			</Form>
			<form
				action={(formData) => {
					// const ultaLink = formData.get("ultaLink");
					// const sephoraLink = formData.get("sephoraLink");
					// const compareString = `u:[${ultaLink}],s:[${sephoraLink}]`;
					// router.push(`/compare/${compareString}`);
				}}
			></form>
		</>
	);
}
