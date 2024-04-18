import { type ClassValue, clsx } from "clsx";
import { generate } from "random-words";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatRating(rating: number) {
	if (rating % 1 === 0) {
		return `${rating}.0`;
	} else {
		return rating.toString();
	}
}

export function SephoraReviewCount(
	ratings: number,
	totalReviews: number | null
) {
	if (!totalReviews) return 0;
	return Math.round((ratings / 100) * totalReviews);
}

export function getNumber(text: string | null): number | null {
	if (!text) return null;
	const regex = /(\d{1,3}(,\d{3})*(\.\d+)?)/;
	const match = text.match(regex);

	if (!match) return null;

	let numberString = match[0].replace(/[^\d.]/g, "");
	if (numberString.includes(".")) {
		return parseFloat(numberString);
	} else {
		return parseInt(numberString, 10);
	}
}

export function getReviewTimeStamp(dateString: string | null): Date | null {
	if (!dateString) return null;

	const currentDate = new Date();
	const dateParts = dateString.split(" ");

	const [count, mdh, trailer] = dateParts;

	const monthNames = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	let reviewDate: Date | null = null;
	if (mdh === "h") {
		reviewDate = new Date(
			currentDate.setHours(currentDate.getHours() - parseInt(count))
		);
	} else if (mdh === "d") {
		reviewDate = new Date(
			currentDate.setDate(currentDate.getDate() - parseInt(count))
		);
	} else if (monthNames.includes(mdh)) {
		const monthIndex = monthNames.indexOf(mdh);
		reviewDate = new Date(parseInt(trailer), monthIndex, parseInt(count));
	}

	return reviewDate;
}

export function getRandomTimestamp() {
	const currentDate = new Date();

	// Timestamp of April 18, 2022
	const targetDate = new Date("2022-04-18");

	const difference = targetDate.getTime() - currentDate.getTime();
	const randomDifference = Math.floor(Math.random() * difference);

	const randomDate = new Date(currentDate.getTime() + randomDifference);

	return randomDate.toISOString();
}

export function randomUserName() {
	const randomNumber = Math.floor(Math.random() * (999999 - 10 + 1)) + 10;

	const usernameWords = generate({
		exactly: 2,
		join: "",
	});

	return usernameWords + randomNumber;
}



