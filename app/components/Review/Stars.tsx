import React from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
type Rating = {
	rating: number | null | undefined;
	reverse?: boolean | undefined;
};

export default function Stars({ rating, reverse }: Rating) {
	if (!rating) return;

	const ratingNum = Math.ceil(rating);
	const halfStar = !Number.isInteger(rating);

	const starIndexes = reverse
		? Array.from({ length: 5 }, (_, i) => 4 - i)
		: Array.from({ length: 5 }, (_, i) => i);

	return (
		<div className="whitespace-nowrap pb-1">
			{rating &&
				starIndexes.map((index) =>
					index < ratingNum ? (
						halfStar && index + 1 === ratingNum ? (
							<StarHalfIcon key={index} />
						) : (
							<StarIcon key={index} />
						)
					) : (
						<StarBorderIcon
							className={`${reverse && "opacity-0"}`}
							key={index}
						/>
					)
				)}
		</div>
	);
}
