"use client";

import { useFormStatus } from "react-dom";

export default function SubmitForm() {
	const { pending } = useFormStatus();

	return (
		<button className="bg-green-500 rounded-lg p-2" type="submit">
			{pending ? "Fetching reviews..." : "Get reviews"}
		</button>
	);
}
