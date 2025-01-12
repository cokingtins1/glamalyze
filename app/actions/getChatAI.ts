// "use server";

// import { openai } from "@ai-sdk/openai";

// import { streamText } from "ai";
// import { createStreamableValue } from "ai/rsc";

// export async function getChatAI(promptData: string) {
// 	const stream = createStreamableValue("");

// 	const maxTokens = 60;

// 	const systemParams = `You are summarizing a list of the 'most helpful' reviews for a given product from a make-up retailer's website. This list is an object with key/value pairs pertaining to a particular review. Give a response using this context in three sentences and no more than ${maxTokens} tokens.`;

// 	(async () => {
// 		const { textStream } = await streamText({
// 			model: openai("gpt-3.5-turbo"),
// 			system: systemParams,
// 			prompt: promptData,
// 			maxTokens: maxTokens,
// 		});

// 		for await (const delta of textStream) {
// 			stream.update(delta);
// 		}

// 		stream.done();
// 	})();

// 	return { output: stream.value };
// }
