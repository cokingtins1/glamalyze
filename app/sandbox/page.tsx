import React from "react";

type Props = {};

export default function page({}: Props) {
	const string = "$20.99";
	function getNumber(text: string | null): number | null {
		if (!text) return null;
		const regex = /(\d+(\.\d+)?)/;
		const match = text.match(regex);

		if (!match) return null;

		let numberString = match[0].replace(/[^\d.]/g, "");
		if (numberString.includes(".")) {
			return parseFloat(numberString); 
		} else {
			return parseInt(numberString, 10);
		}
	}

	// console.log(getNumber(string));

	return <div>page</div>;
}
