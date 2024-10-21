import { main } from "@/app/actions/prisma/users";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";

export default function NextId() {
	const reseed = async () => {
		"use server";
		await main();
		revalidatePath("/");
	};

	return (
		<form action={reseed}>
			<Button>Reseed DB</Button>
		</form>
	);
}
