"use client";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const formSchema = z.object({
	ulta: z.boolean(),
	sephora: z.boolean(),
});

export function TabForm() {
	const [retailer, setRetailer] = useState("");
	const [target, setTarget] = useState("")
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			ulta: false,
			sephora: false,
		},
	});

	const handleSelect = (retailer: string) => {
		console.log(form.getValues("ulta"));
	};

	const onSubmit = async (data: FieldValues) => {
		console.log(retailer);
		// // await callback(data);
		// form.reset({
		// 	ulta: false,
		// 	sephora: false,
		// });
	};

	return (
		<form onSubmit={form.handleSubmit(onSubmit)}>
			<Select onValueChange={setRetailer}>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Select Retailer" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Retailer</SelectLabel>
						<SelectItem value="ulta">Ulta</SelectItem>
						<SelectItem value="sephora">Sephora</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
			<Select onValueChange={setTarget}>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Select Retailer" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Target</SelectLabel>
						<SelectItem value="brands">Brands</SelectItem>
						<SelectItem value="products">Products</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
			<Button type="submit">Submit</Button>
		</form>
	);
}
