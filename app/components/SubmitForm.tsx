"use client";

import { Button } from "@/components/ui/button";
import { ButtonProps } from "@/components/ui/button";
import Spinner from "./Loading Skeletons/Spinner";
import { cn } from "@/lib/utils";
import { PopoverTrigger } from "@/components/ui/popover";

type SubmitFormProps = ButtonProps & {
	pending: boolean;
	pendingText: string[];
	disabled?: boolean;
	sheet: boolean;
};

export default function SubmitForm({
	pending,
	pendingText,
	disabled,
	sheet,
	...props
}: SubmitFormProps) {
	return (
		<Button
			type="submit"
			disabled={pending || disabled}
			{...props}
			className={cn("px-4", {
				"w-full": sheet,
				"w-fit lg:w-[135px]": !sheet,
			})}
		>
			{pending && !sheet && <Spinner />}
			{pending ? pendingText[0] : pendingText[1]}
		</Button>
	);
}
