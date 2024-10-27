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

import { useState } from "react";
import { useForm } from "react-hook-form";
import SubmitForm from "../SubmitForm";
import { Input } from "@/components/ui/input";
import { scrapeSchema, TScrapeSchema } from "@/app/libs/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { formatTime } from "@/app/libs/utils";

export default function SelectForm() {
	const [retailer, setRetailer] = useState("");
	const [target, setTarget] = useState("");

	const [executionTime, setExecutionTime] = useState("");
	const [scrapeIndex, setScrapeIndex] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const form = useForm<TScrapeSchema>({
		resolver: zodResolver(scrapeSchema),
		defaultValues: {
			retailer: "Ulta",
			target: "Reviews",
			startIndex: "A",
			endIndex: "Z",
			// productLimit: 1000000,
			url: "",
		},
	});

	const onSubmit = async (data: TScrapeSchema) => {
		const res = await fetch("/api/scrapeData", {
			method: "POST",
			body: JSON.stringify({
				retailer: retailer,
				target: target,
				startIndex: data.startIndex.toUpperCase(),
				endIndex: data.endIndex.toUpperCase(),
				// productLimit: data.productLimit,
				url: data.url?.toLowerCase(),
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (res.ok) {
			const responseData = await res.json();
			const executionTime = responseData.message.executionTime;
			const scrapeIndex = responseData.message.scrapeIndex;
			const errorMessage = responseData.message.errorMessage;

			setExecutionTime(executionTime);
			setScrapeIndex(scrapeIndex);
			setErrorMessage(errorMessage);
		}
	};

	return (
		<>
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
						className="grid grid-cols-auto gap-4 items-center"
					>
						<div className="grid grid-cols-5 grid-rows-auto gap-2 justify-items-stretch items-center justify-center text-center">
							<Label>Retailer</Label>
							<Label>Target</Label>
							<Label>Start Index</Label>
							<Label>End Index</Label>
							{/* <Label>Product Limit</Label> */}
							<Label>Brand</Label>
							<Select onValueChange={setRetailer}>
								<SelectTrigger
									id="retailer"
									className=" bg-white"
								>
									<SelectValue placeholder="Select Retailer" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Retailer</SelectLabel>
										<SelectItem value="Ulta">
											Ulta
										</SelectItem>
										<SelectItem value="Sephora">
											Sephora
										</SelectItem>
										<SelectItem value="Shared">
											Shared
										</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
							<Select onValueChange={setTarget}>
								<SelectTrigger
									id="target"
									className=" bg-white"
								>
									<SelectValue placeholder="Select Target" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Target</SelectLabel>
										<SelectItem value="Reviews">
											Reviews
										</SelectItem>
										<SelectItem value="Products">
											Products
										</SelectItem>
										<SelectItem value="Brands">
											Brands
										</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>

							<Input
								{...form.register("startIndex")}
								type="text"
								onKeyDown={(event) => {
									if (!/[a-z*#]/i.test(event.key)) {
										event.preventDefault();
									}
								}}
								maxLength={1}
								id="startIndex"
								name="startIndex"
								placeholder="Start Index"
								className="bg-white"
							/>

							<Input
								{...form.register("endIndex")}
								type="text"
								onKeyDown={(event) => {
									if (!/[a-z*#]/i.test(event.key)) {
										event.preventDefault();
									}
								}}
								maxLength={1}
								id="endIndex"
								name="endIndex"
								placeholder="End Index"
								className="bg-white"
							/>
							{/* <Input
								{...form.register("productLimit")}
								type="number"
								id="productLimit"
								name="productLimit"
								placeholder="Product Limit"
								className="bg-white"
							/> */}
							<Input
								{...form.register("url")}
								type="text"
								id="url"
								name="url"
								placeholder="Brand/Product Url"
								className="bg-white"
							/>

							<Label>
								{form.formState.errors.retailer?.message}
							</Label>
							<Label>
								{form.formState.errors.target?.message}
							</Label>
							<Label>
								{form.formState.errors.startIndex?.message}
							</Label>
							<Label>
								{form.formState.errors.endIndex?.message}
							</Label>
							{/* <Label>
								{form.formState.errors.productLimit?.message}
							</Label> */}
							<Label>{form.formState.errors.url?.message}</Label>
						</div>

						<SubmitForm
							pending={form.formState.isSubmitting}
							pendingText={["Scraping data...", "Get Data"]}
						/>
					</form>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Results</CardTitle>
				</CardHeader>
				<CardContent>
					<p>
						Execution Time:{" "}
						{executionTime && formatTime(executionTime)}
					</p>
					<p>Scraped Brands: {scrapeIndex && scrapeIndex}</p>
					{errorMessage && (
						<p className="text-rose-600 font-bold">
							Errors: {errorMessage}
						</p>
					)}
				</CardContent>
			</Card>
		</>
	);
}
