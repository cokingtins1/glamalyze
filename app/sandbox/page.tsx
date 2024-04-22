import { productSeeds } from "@/lib/seeding/seedingFuncs";
import { randomUserName } from "@/lib/utils";
import { randomInt } from "crypto";
import dayjs from "dayjs";
import { generate } from "random-words";
import React from "react";

type Props = {};

export default function page({}: Props) {
	function randomNum(min: number, max: number) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	console.log(randomNum(0, 2));

	return <div>page</div>;
}
