"use client";

import { Dispatch, SetStateAction, useState } from "react";
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
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@nextui-org/checkbox";

import { cn } from "@/lib/utils";
import InfoPopover from "@/app/_components/InfoPopover";

type RetailerQueryFormProps = {
	sheet: boolean;
	setData: Dispatch<SetStateAction<AllProducts[]>>;
};
export default function RetailerQueryForm({
	sheet,
	setData,
}: RetailerQueryFormProps) {
	const [sheetData, setSheetData] = useState<QueryResult | null>(null);
	const [homeData, setHomeData] = useState<QueryResult | null>(null);

	const form = useForm<TQuerySchema>({
		resolver: zodResolver(querySchema),
		defaultValues: {
			query: "",
			ulta: true,
			sephora: true,
			shared: false,
		},
	});

	const onSubmit = async (data: TQuerySchema) => {
		const res = await fetch("/api/retailerQuery", {
			method: "POST",
			body: JSON.stringify({
				query: data.query,
				ulta: data.ulta,
				sephora: data.sephora,
				shared: data.shared,
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
					className="flex flex-col gap-2 px-2 w-full"
				>
					<div
						className={cn("flex flex-col", {
							"flex-col gap-4 w-full": sheet,
							"flex-col items-center justify-center gap-4":
								!sheet,
						})}
					>
						<div className="flex flex-col items-center gap-2 lg:flex-row">
							<p className="text-xs lg:text-base">
								Search within:
							</p>
							<div className="flex gap-4">
								<Checkbox
									{...form.register("ulta")}
									defaultSelected
									className="text-xs lg:text-base"
								>
									<p className="text-xs lg:text-base">
										Ulta
									</p>
								</Checkbox>

								<Checkbox
									{...form.register("sephora")}
									defaultSelected
									className="text-xs lg:text-base"
								>
									<p className="text-xs lg:text-base">
										Sephora
									</p>
								</Checkbox>
								<Checkbox {...form.register("shared")}>
									<span className="flex gap-1">
										<p className="text-xs lg:text-base">
											Shared
										</p>
										<InfoPopover />
									</span>
								</Checkbox>
							</div>
						</div>
						<div className="flex gap-2 items-center lg:flex-row lg:full">
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
