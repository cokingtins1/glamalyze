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
import InfoPopover from "@/app/components/_components/InfoPopover";
import { SharedProduct } from "@prisma/client";

type RetailerQueryFormProps = {
	sheet: boolean;
	setData: Dispatch<SetStateAction<AllProducts[]>>;
	setCombinedProducts: Dispatch<SetStateAction<QueryResult>>;

	setShared: Dispatch<SetStateAction<boolean>>;
};
export default function RetailerQueryForm({
	sheet,
	setData,
	setShared,
	setCombinedProducts,
}: RetailerQueryFormProps) {
	const form = useForm<TQuerySchema>({
		resolver: zodResolver(querySchema),
		defaultValues: {
			query: "",
		},
	});

	const onSubmit = async (data: TQuerySchema) => {
		const res = await fetch("/api/retailerQuery", {
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
			if (!sheet) {
				setData(responseData.success.data);
				setCombinedProducts(responseData.success.data);
			}
		}
	};

	return (
		<Form {...form}>
			<form
				autoComplete="off"
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-2 px-2 w-full"
			>
				<div
					className={cn("flex flex-col", {
						"flex-col gap-4 w-full": sheet,
						"flex-col items-center justify-center gap-4": !sheet,
					})}
				>
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
						/>
					</div>
				</div>
			</form>
		</Form>
	);
}
