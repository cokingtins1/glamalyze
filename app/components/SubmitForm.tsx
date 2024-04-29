"use client";

import { Button } from "@/components/ui/button";
import { ButtonProps } from "@/components/ui/button";

type SubmitFormProps = ButtonProps & {
	pending: boolean;
	pendingText: string[];
	disabled? :boolean
}

export default function SubmitForm({
	pending,
	pendingText,
	disabled,
	...props
}: SubmitFormProps) {
	return (
		<Button
			type="submit"
			disabled={pending || disabled}
			{...props}
			className="justify-self-stretch"
		>
			{pending ? pendingText[0] : pendingText[1]}
		</Button>
	);
}
