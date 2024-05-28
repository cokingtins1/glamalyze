import React from "react";
import DisplaySkeleton from "../components/Loading Skeletons/DisplaySkeleton";

type Props = {};

export default function ReviewDataSkeleton({}: Props) {
	return (
		<>
			<DisplaySkeleton />
			<DisplaySkeleton />
		</>
	);
}
