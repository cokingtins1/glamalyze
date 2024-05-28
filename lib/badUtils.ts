import { MetaData } from "@/app/libs/types";

export function getSharedUpdate(data: MetaData, upperRetailer: string) {
	const retailer = upperRetailer.toLowerCase();

	const scrubbedProductData = Object.fromEntries(
		Object.entries(data).filter(
			([k, v]) =>
				v !== null &&
				v !== undefined &&
				v !== "" &&
				!(Array.isArray(v) && v.length === 0)
		)
	);

	let keys: string[] = [];

	if (upperRetailer === "Shared") {
		keys = ["product_image_url", "total_reviews", "product_price"];
	} else {
		keys = ["total_reviews", "product_price", "review_histogram"];
	}

	const extractedValues = keys
		.map((key) => [key, scrubbedProductData[key]])
		.filter(([_, value]) => value !== undefined);

	const objectData = extractedValues.reduce<{ [key: string]: number | boolean }>(
		(obj, [key, value]) => {
			if (upperRetailer === "Ulta" || upperRetailer === "Sephora") {
				//@ts-ignore
				obj[key] = value;
			} else {
				//@ts-ignore
				obj[`${retailer}_${key}`] = value;
			}
			return obj;
		},
		{}
	);

	return objectData;
}
