import React from "react";

type Props = {};

export default function page({}: Props) {
	const string = "$20.99";
	function getNumber(text: string | null): number | null {
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

	function getSku(url: URL) {
		const searchParams = url.searchParams;
		const sku = searchParams.get("sku");
		return sku;
	}

	// const url = "https://www.sephora.com/product/tula-skincare-24-7-moisture-hydrating-day-night-cream-P475185?skuId=2500742&icid2=products%20grid:p475185:product"

	const url = null;

	// console.log(getSku(new URL(url)));
	console.log(getNumber(""))

	return <div>page</div>;
}
