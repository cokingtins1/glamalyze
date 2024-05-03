import React from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
type Rating = {
	rating: number | null | undefined;
	reverse?: boolean | undefined;
	searchResult?: boolean | undefined;
	reviewNum: number | undefined | null;
};

export default function Stars({
	rating,
	reverse,
	searchResult,
	reviewNum,
}: Rating) {
	if (!rating) return;

	const ratingNum = Math.ceil(rating);
	const halfStar = !Number.isInteger(rating);

	const starIndexes = reverse
		? Array.from({ length: 5 }, (_, i) => 4 - i)
		: Array.from({ length: 5 }, (_, i) => i);

	return (
		<div className="flex items-center">
			<div className="whitespace-nowrap flex items-center">
				{rating &&
					starIndexes.map((index) =>
						index < ratingNum ? (
							halfStar && index + 1 === ratingNum ? (
								<StarHalfIcon
									style={{
										fontSize: `${
											searchResult ? "1rem" : ""
										}`,
									}}
									key={index}
								/>
							) : (
								<StarIcon
									style={{
										fontSize: `${
											searchResult ? "1rem" : ""
										}`,
									}}
									key={index}
								/>
							)
						) : (
							<StarBorderIcon
								style={{
									fontSize: `${searchResult ? "1rem" : ""}`,
								}}
								className={`${reverse && "opacity-0"}`}
								key={index}
							/>
						)
					)}
			</div>
			<p
				style={{ fontSize: "0.625rem" }}
				className="pl-1"
			>{`(${reviewNum})`}</p>
		</div>
	);
}
