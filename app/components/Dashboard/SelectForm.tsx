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
import { formatTime } from "@/lib/utils";

export default function SelectForm() {
	const [retailer, setRetailer] = useState("");
	const [target, setTarget] = useState("");

	const [executionTime, setExecutionTime] = useState("");
	const [scrapeIndex, setScrapeIndex] = useState("");

	const form = useForm<TScrapeSchema>({
		resolver: zodResolver(scrapeSchema),
		defaultValues: {
			retailer: "",
			target: "",
			startIndex: "A",
			endIndex: "Z",
			brandUrl: ""
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
				brandUrl: data.brandUrl
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (res.ok) {
			const responseData = await res.json();
			const executionTime = responseData.message.executionTime;
			const scrapeIndex = responseData.message.scrapeIndex;

			setExecutionTime(executionTime);
			setScrapeIndex(scrapeIndex);
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
						<div className="grid grid-cols-5 grid-rows-2 gap-x-2 justify-items-stretch items-center justify-center text-center">
							<Label>Retailer</Label>
							<Label>Target</Label>
							<Label>Start Index</Label>
							<Label>End Index</Label>
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
								type="text"
								onKeyDown={(event) => {
									if (!/[a-z*]/i.test(event.key)) {
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
									if (!/[a-z*]/i.test(event.key)) {
										event.preventDefault();
									}
								}}
								maxLength={1}
								id="endIndex"
								name="endIndex"
								placeholder="End Index"
								className="bg-white"
							/>
							<Input
								{...form.register("brandUrl")}
								type="text"
								id="brand"
								name="brand"
								placeholder="Brand Url"
								className="bg-white"
							/>
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
				</CardContent>
			</Card>
		</>
	);
}
