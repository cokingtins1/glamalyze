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

	const keys = ["product_image_url", "total_reviews", "product_price"];

	const extractedValues = keys
		.map((key) => [key, scrubbedProductData[key]])
		.filter(([_, value]) => value !== undefined);

	const objectData = extractedValues.reduce<{ [key: string]: number }>(
		(obj, [key, value]) => {
			obj[`${retailer}_` + key] = value;
			return obj;
		},
		{}
	);

	return objectData;
}
