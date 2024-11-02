"use client";

import { Card, CardContent } from "@/components/ui/card";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import ChatGPTIcon from "../Icons/ChatGPT";
import { Button } from "@/components/ui/button";

import { chatSchema, Review, TChatSchema } from "../../libs/types";
import { useState } from "react";
import { getChatAI } from "../../actions/getChatAI";

import { readStreamableValue } from "ai/rsc";

type Props = {
	reviews: Review[][];
};

export default function OpenAIAnalysis({ reviews }: Props) {
	const placeholder =
		"Based on the most helpful reviews for the product, it seems that opinions are divided. While some users found the shampoo to be extremely drying and unsuitable for their hair type, others praised it for its moisturizing properties and effectiveness in cleansing the scalp without stripping the hair. Positive reviews highlighted the product's ability to .";

	const [generation, setGeneration] = useState<string>(placeholder);

	function formatReviews(reviews: Review[][]) {
		type FormattedReview = Pick<
			Review,
			| "reviewer_name"
			| "review_rating"
			| "review_text"
			| "up_votes"
			| "down_votes"
		>;

		const formattedReviews: FormattedReview[] = [];

		reviews.forEach((reviewArray) => {
			reviewArray.forEach((review) => {
				const {
					reviewer_name,
					review_rating,
					review_text,
					up_votes,
					down_votes,
					...rest
				} = review;

				const formattedReview: FormattedReview = {
					reviewer_name,
					review_rating,
					review_text,
					up_votes,
					down_votes,
				};

				formattedReviews.push(formattedReview);
			});
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
		<Card className="w-full h-fit">
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
