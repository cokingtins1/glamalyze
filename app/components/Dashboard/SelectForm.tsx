"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import SubmitForm from "../SubmitForm";
import { Input } from "@/components/ui/input";

export default function SelectForm() {
	const [retailer, setRetailer] = useState("");
	const [target, setTarget] = useState("");

	const form = useForm({
		defaultValues: {
			retailer: "",
			target: "",
			startIndex: 0,
			endIndex: 0,
		},
	});

	const onSubmit = async (data: FieldValues) => {
		const res = await fetch("/api/scrapeData", {
			method: "POST",
			body: JSON.stringify({
				retailer: retailer,
				target: target,
				startIndex: data.startIndex,
				endIndex: data.endIndex,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		return new Promise(function (resolve) {
			setTimeout(resolve, 2000);
		});
	};
	return (
		<Card>
			<CardHeader>
				<CardTitle>Scrape Data</CardTitle>
				<CardDescription>
					Choose retailer and target data set to scrape.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="grid grid-cols-2 gap-4 items-center"
				>
					<div className="flex gap-2 items-center justify-center">
						<Select onValueChange={setRetailer}>
							<SelectTrigger
								id="retailer"
								className="w-[180px] bg-white"
							>
								<SelectValue placeholder="Select Retailer" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Retailer</SelectLabel>
									<SelectItem value="ulta">Ulta</SelectItem>
									<SelectItem value="sephora">
										Sephora
									</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
						<Select onValueChange={setTarget}>
							<SelectTrigger
								id="target"
								className="w-[180px]  bg-white"
							>
								<SelectValue placeholder="Select Retailer" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Target</SelectLabel>
									<SelectItem value="brands">
										Brands
									</SelectItem>
									<SelectItem value="products">
										Products
									</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>

						<Input
							{...form.register("startIndex")}
							type="number"
							id="startIndex"
							name="startIndex"
							placeholder="Start Index"
							className="bg-white w-[125px]"
						/>

						<Input
							{...form.register("endIndex")}
							type="number"
							id="endIndex"
							name="endIndex"
							placeholder="End Index"
							className="bg-white w-[125px]"
						/>
					</div>

					<SubmitForm
						pending={form.formState.isSubmitting}
						pendingText={["Scraping data...", "Get Data"]}
					/>
				</form>
			</CardContent>
		</Card>
	);
}
