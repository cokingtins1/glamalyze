"use client";

import PopSharedProducts from "@/app/libs/DashboardFunctions/SharedProducts";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";

type Props = {};

export default function SharedProducts({}: Props) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Database Functions</CardTitle>
			</CardHeader>
			<CardContent className="grid grid-flow-col auto-cols-min">
				<form
					action={PopSharedProducts}
					className="flex flex-col gap-2"
				>
					<CardDescription className="whitespace-nowrap">
						Populate SharedProducts Table
					</CardDescription>
					<Button disabled={true} type="submit">
						Execute
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
