"use client";

import { Card, CardContent } from "@/components/ui/card";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import ChatGPTIcon from "./Icons/ChatGPT";
import { Button } from "@/components/ui/button";

import { chatSchema, Review, TChatSchema } from "../libs/types";
import { useState } from "react";
import { getChatAI } from "../actions/getChatAI";

import { readStreamableValue } from "ai/rsc";

type Props = {
	reviews: Review[];
};

export default function OpenAIAnalysis({ reviews }: Props) {
	const placeholder =
		"Based on the most helpful reviews for the product, it seems that opinions are divided. While some users found the shampoo to be extremely drying and unsuitable for their hair type, others praised it for its moisturizing properties and effectiveness in cleansing the scalp without stripping the hair. Positive reviews highlighted the product's ability to leave the hair feeling soft, clean, and moisturized, especially when used in conjunction with the conditioner from the same line. Users also appreciated the nozzle design for easy application and the natural ingredients used in the product. Overall, the reviews suggest that the shampoo may work well for some individuals, particularly those looking for a clarifying shampoo with moisturizing benefits.";

	const [generation, setGeneration] = useState<string>(placeholder);

	function formatReviews(reviews: Review[]) {
		const formattedReviews = reviews.map((review) => {
			const {
				reviewer_name,
				review_rating,
				review_text,
				up_votes,
				down_votes,
				...rest
			} = review;

			return {
				reviewer_name,
				review_rating,
				review_text,
				up_votes,
				down_votes,
			};
		});
		return JSON.stringify(formattedReviews);
	}

	const generateSummary = async () => {
		const { output } = await getChatAI(formatReviews(reviews));

		for await (const delta of readStreamableValue(output)) {
			setGeneration(
				(currentGeneration) => `${currentGeneration}${delta}`
			);
		}
	};

	return (
		<Card className="w-full">
			<CardContent className="pb-0">
				<Accordion type="single" collapsible className="w-full">
					<AccordionItem value="item-1">
						<AccordionTrigger>
							<div className="flex items-center gap-4">
								<ChatGPTIcon />
								<p>Ask ChatGPT</p>
							</div>
						</AccordionTrigger>
						<AccordionContent>
							{generation && <p>{generation}</p>}
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</CardContent>
		</Card>
	);
}
