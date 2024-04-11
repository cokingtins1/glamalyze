"use client";

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from '@/components/ui/button';
import GetProductForm from "./GetProductForm";

export default function NewQueryDrawer() {
	return (
		<Sheet>
			<SheetTrigger >
                New Search
            </SheetTrigger>
			<SheetContent side={"left"} className='bg-white'>
				<SheetHeader>
					<SheetTitle>New Search</SheetTitle>
				</SheetHeader>
				<GetProductForm />
			</SheetContent>
		</Sheet>
	);
}
