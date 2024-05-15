import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

import GetProductForm from "./GetProductForm";

export default async function NewQueryDrawer() {
	return (
		<Sheet>
			<SheetTrigger>New Search</SheetTrigger>
			<SheetContent side={"left"} className="bg-white">
				<SheetHeader>
					<SheetTitle>New Search</SheetTitle>
				</SheetHeader>
				<GetProductForm />
			</SheetContent>
		</Sheet>
	);
}
