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
import Image from "next/image";

import UltaLogo from "@/public/Ulta_Logo.png";
import SephoraLogo from "@/public/Sephora_Logo.png";
import SubmitForm from "../SubmitForm";
import { FieldValues, useForm } from "react-hook-form";
import { ChangeEvent, FormEvent } from "react";

type ScrapeFormProps = {
	callback: (formData: FieldValues) => Promise<unknown>;
	formType: "brand" | "products";
};

export default function ScrapeForm({ callback, formType }: ScrapeFormProps) {
	const form = useForm({
		defaultValues: {
			ulta: false,
			sephora: false,
		},
	});

	const onSubmit = async (data: FieldValues) => {
		console.log(form.getValues("sephora"));
		await callback(data);
		form.reset({
			ulta: false,
			sephora: false,
		});
	};

	const text = {
		brand: { title: "Brands", lower: "brand" },
		products: { title: "Products", lower: "product" },
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Scrape {text[formType].title}</CardTitle>
				<CardDescription>
					Run function to scrape list of {text[formType].lower}s and
					associated page links
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form
					id="brand"
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-4"
				>
					<div className="grid grid-cols-2 justify-items-center">
						<div className="h-[40px] w-[75px] relative">
							<Image
								src={UltaLogo}
								fill
								style={{ objectFit: "contain" }}
								sizes="(max-width: 430px), 75px "
								alt={`Ulta Logo`}
							/>
						</div>
						<SubmitForm
							onClick={() => {
								form.setValue("ulta", true);
							}}
							pending={form.formState.isSubmitting}
							pendingText={[
								`Scraping ${text[formType].title}...`,
								`Scrape Ulta ${text[formType].title}`,
							]}
						/>
						<input
							{...form.register("ulta")}
							className="hidden"
							name="ulta"
						/>
					</div>
					<div className="grid grid-cols-2 justify-items-center">
						<div className="h-[40px] w-[75px] relative">
							<Image
								src={SephoraLogo}
								fill
								style={{ objectFit: "contain" }}
								sizes="(max-width: 430px), 75px "
								alt={`Ulta Logo`}
							/>
						</div>

						<SubmitForm
							onClick={() => {
								form.setValue("sephora", true);
							}}
							pending={form.formState.isSubmitting}
							pendingText={[
								`Scraping ${text[formType].title}...`,
								`Scrape Sephora ${text[formType].title}`,
							]}
						/>

						<input
							{...form.register("sephora")}
							className="hidden"
							name="sephora"
						/>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}
