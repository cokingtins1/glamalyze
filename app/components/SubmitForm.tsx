"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

type SubmitFormProps = {
	disabled: boolean;
	pending: boolean
};

export default function SubmitForm({ disabled, pending }: SubmitFormProps) {

	return (
		<Button type="submit" disabled={disabled}>
			{pending ? "Fetching reviews..." : "Get reviews"}
		</Button>
	);
}
