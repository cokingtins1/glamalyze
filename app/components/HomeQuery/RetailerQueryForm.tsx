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
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@nextui-org/checkbox";

import QueryResults from "../SheetQuery/QueryResults";
import QueryResultsHome from "./QueryResultsHome";
import { cn } from "@/lib/utils";
import { PopoverAnchor } from "@radix-ui/react-popover";

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

	const form = useForm<TQuerySchema>({
		resolver: zodResolver(querySchema),
		defaultValues: {
			query: "",
			ulta: false,
			sephora: false,
		},
	});

	const onSubmit = async (data: TQuerySchema) => {
		const res = await fetch("/api/retailerQuery", {
			method: "POST",
			body: JSON.stringify({
				query: data.query,
				ulta: data.ulta,
				sephora: data.sephora,
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
					autoComplete="off"
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-2 px-2"
				>
					<div
						className={cn("flex flex-col", {
							"flex-col gap-4 w-full": sheet,
							"flex-col items-center justify-center gap-4":
								!sheet,
						})}
					>
						<div className="flex gap-4">
							<p>Search within:</p>
							<Checkbox
								{...form.register("ulta")}
								defaultSelected
							>
								Ulta
							</Checkbox>

							<Checkbox
								{...form.register("sephora")}
								defaultSelected
							>
								Sephora
							</Checkbox>
						</div>
						<div className="flex gap-2">
							<FormField
								control={form.control}
								name="query"
								render={({ field }) => (
									<FormItem className="grow">
										<FormControl>
											<Input
												autoFocus
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
