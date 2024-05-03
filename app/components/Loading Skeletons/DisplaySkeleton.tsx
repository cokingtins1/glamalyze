import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DisplaySkeleton() {
	return (
		<Card>
			<div className="flex gap-2 p-2">
				<Skeleton className="size-[100px] rounded-xl" />
				<div className="flex flex-col flex-grow gap-2">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-2/3 mt-2" />
				</div>
			</div>
		</Card>
	);
}
