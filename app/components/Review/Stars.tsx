import React from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
type Rating = {
	rating: string | null;
};

export default function Stars({ rating }: Rating) {
	return (
		<div>
			{rating &&
				[...Array(5)].map((_, index) =>
					index < parseFloat(rating) ? (
						<StarIcon key={index} />
					) : (
						<StarBorderIcon key={index} />
					)
				)}
		</div>
	);
}
