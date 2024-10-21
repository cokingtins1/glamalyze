import React from "react";
import DisplaySkeleton from "../Loading Skeletons/DisplaySkeleton";

type Props = {};

export default function ReviewDataSkeleton({}: Props) {
	return (
		<>
			<DisplaySkeleton />
			<DisplaySkeleton />
		</>
	);
}
