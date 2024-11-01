import { prisma } from "@/prisma/_base";
import { type ClassValue, clsx } from "clsx";
import { generate } from "random-words";
import { twMerge } from "tailwind-merge";
import { Retailer } from "./types";
import { AllProduct, SephoraProduct, UltaProduct } from "@prisma/client";

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

export function parseReviewTimeStamp(timestamp: Date | null): string | null {
	if (!timestamp) return null;

	const currentDate = timestamp;
	const now = new Date();

	// Difference in milliseconds
	const diffMs = now.getTime() - currentDate.getTime();

	// Difference in seconds
	const diffSeconds = Math.floor(diffMs / 1000);

	// Difference in minutes
	const diffMinutes = Math.floor(diffSeconds / 60);

	// Difference in hours
	const diffHours = Math.floor(diffMinutes / 60);

	// Difference in days
	const diffDays = Math.floor(diffHours / 24);

	// Check if it's within the same day
	if (diffMinutes < 1440) {
		return `${diffHours} h ago`;
	}
	// Check if it's within the same month
	else if (diffDays < 30) {
		return `${diffDays} d ago`;
	}
	// Otherwise, return the date in the format "DD Mon YYYY"
	else {
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

		const day = currentDate.getDate();
		const monthIndex = currentDate.getMonth();
		const year = currentDate.getFullYear();

		return `${day} ${monthNames[monthIndex]} ${year}`;
	}
}

export function nextLetter(s: string) {
	return s.replace(/([a-zA-Z])[^a-zA-Z]*$/, function (a) {
		var c = a.charCodeAt(0);
		switch (c) {
			case 90:
				return "A";
			case 122:
				return "a";
			default:
				return String.fromCharCode(++c);
		}
	});
}

export function alphaPos(letter: string): number {
	const position = parseInt(letter.toLowerCase(), 36) - 9;
	return position >= 1 && position <= 26 ? position : 999;
}

export function formatTime(time: string | null) {
	if (!time) return "00h:00m:00s";
	const seconds = parseFloat(time);
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const remainingSeconds = Math.floor(seconds % 60);
	return `${hours}h:${minutes.toString().padStart(2, "0")}m:${remainingSeconds
		.toString()
		.padStart(2, "0")}s`;
}

export const formatPrice = (price: number | null | undefined): string => {
	if (!price) return "";

	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(price);
};

export const formatPercent = (percent: number | null | undefined): string => {
	if (!percent) return "N/A";

	return `${percent}%`;
};

export const checkExpired = async (
	id: string,
	retailer: string,

	expirationThreshold: number
) => {
	let lastScrapedTime;
	let expired = false;
	let lastScraped;

	if (retailer === "Ulta") {
		lastScraped = await prisma.ultaProduct.findFirst({
			where: { product_id: id },
			select: {
				updated_at: true,
			},
		});
	} else if (retailer === "Sephora") {
		lastScraped = await prisma.sephoraProduct.findFirst({
			where: { product_id: id },
			select: {
				updated_at: true,
			},
		});
	}

	lastScrapedTime = lastScraped?.updated_at?.getTime();
	if (lastScrapedTime) {
		const delta =
			(new Date().getTime() - lastScrapedTime) / (1000 * 60 * 60 * 24);
		if (delta > expirationThreshold) {
			expired = true;
		}
	}

	return expired;
};

export const getProductFromSku = async (
	searchParam: string
): Promise<(UltaProduct | SephoraProduct)[]> => {
	if (!searchParam) {
		return [];
	}
	function getSku(slug: string) {
		const parts = slug.split(", ");
		return parts.map((part) => {
			const retailer: Retailer = part.startsWith("u")
				? "Ulta"
				: "Sephora";
			const sku = part.match(/\d+/)?.[0];
			return {
				sku: sku ?? "",
				retailer,
			};
		});
	}

	async function getProductDetails(
		skuArray: { sku: string; retailer: Retailer }[]
	): Promise<(UltaProduct | SephoraProduct)[]> {
		const promises = skuArray.map(async ({ sku, retailer }) => {
			let productData;

			if (retailer === "Ulta") {
				productData = await prisma.ultaProduct.findFirst({
					where: { sku_id: sku },
				});
			} else if (retailer === "Sephora") {
				productData = await prisma.sephoraProduct.findFirst({
					where: { sku_id: sku },
				});
			}

			return productData;
		});

		const results = await Promise.all(promises);

		return results.filter(
			(product): product is UltaProduct | SephoraProduct =>
				product !== null
		);
	}

	const skuArray = getSku(searchParam);
	const data = getProductDetails(skuArray);

	return data;
};
