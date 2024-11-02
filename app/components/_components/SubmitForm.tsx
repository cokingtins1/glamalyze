"use client";

import { ButtonProps } from "@/components/ui/button";
import { Button as NextUIButton } from "@nextui-org/button";

type SubmitFormProps = ButtonProps & {
	pending: boolean;
	pendingText: string[];
	disabled?: boolean;
};

export default function SubmitForm({
	pending,
	pendingText,
	disabled,
}: SubmitFormProps) {
	return (
		<NextUIButton
			className="w-[140px]"
			type="submit"
			color="primary"
			disabled={pending || disabled}
			isLoading={pending}
		>
			{pending ? pendingText[0] : pendingText[1]}
		</NextUIButton>
	);
}
