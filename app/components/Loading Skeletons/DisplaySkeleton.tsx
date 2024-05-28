import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DisplaySkeleton() {
	return (
		<Card className="h-[400px] space-y-8 p-4">
			<div className="flex gap-2 p-2">
				<Skeleton className="size-[100px] rounded-xl" />
				<div className="flex flex-col flex-grow gap-2">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-2/3 mt-2" />
				</div>
			</div>

			<Card className="space-y-4 p-2 border-slate-100">
				{Array.from({ length: 5 }).map((_, index) => (
					<Skeleton key={index} className="h-4 w-full" />
				))}
			</Card>
		</Card>
	);
}
