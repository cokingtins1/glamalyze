import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

import GetProductForm from "./GetProductForm/GetProductForm";

export default async function NewQueryDrawer() {
	return (
		<Sheet>
			<SheetTrigger>New Search</SheetTrigger>
			<SheetContent side={"left"} className="bg-white">
				<SheetHeader>
					<SheetTitle className="pl-3 mb-4">New Search</SheetTitle>
				</SheetHeader>
				<GetProductForm sheet={true} />
			</SheetContent>
		</Sheet>
	);
}
