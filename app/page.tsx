import GetProductForm from "./components/GetProductForm";
import NewQueryDrawer from "./components/NewQueryDrawer";
import UltaDisplay from "./components/Ulta/UltaDisplay";

export default async function Home() {
	const testData = {
		metaData: {
			price: "$52.00 ",
			totalReviews: "1679 Reviews",
			averageRating: 4.1,
			reviewHistData: [1118, 249, 169, 168, 219],
		},
		reviewsData: [
			{
				headline: "Fantastic coverage, I'm obsessed!",
				reviewText:
					"This foundation is honestly so light feeling on my skin, but also gives beautiful coverage! My new #1 Worth every penny!!",
				verifiedBuyer: true,
				stars: 5,
			},
			{
				headline: "Amazing foundation",
				reviewText:
					"First time using it. I heard mixed reviews on it, but after trying it myslef I will definitely purchase again!",
				verifiedBuyer: false,
				stars: 5,
			},
			{
				headline: "Meh",
				reviewText: "Is not long wearing as it claims",
				verifiedBuyer: true,
				stars: 3,
			},
			{
				headline: "Everything was not good.",
				reviewText:
					"I read many people's reviews and even did some test makeup, but this product wasn't for me. I have normal skin with redness, so I chose this product to cover up my redness, but it contains too much powder, so it gets stuck in my pores and makes my skin look worse. I tried mixing it with serum, but the results were the same. And because it didn't settle on my skin, it almost looked like I had no makeup on in the afternoon. I will never purchase it again.",
				verifiedBuyer: false,
				stars: 1,
			},
			{
				headline: "Great foundation",
				reviewText:
					"Great coverage , smooth application, long lasting wear",
				verifiedBuyer: true,
				stars: 5,
			},
			{
				headline: "No",
				reviewText:
					"Once you finish putting on your makeup it looks flawless ( Moisturize, prime or not, bake etc. ) !!! But after 4 hrs it tends to separate, cake up and crease. Which I was hoping for it not to do. \n" +
					"\n" +
					"Skin type; Dry",
				verifiedBuyer: true,
				stars: 1,
			},
			{
				headline: "I love this foundation!",
				reviewText:
					"I am in the shade Gobi I was a little skeptical trying out this foundation cause I saw mixed reviews on YouTube about it. I wore it for 7 hours and it still looked amazing! I used the too faced hangover primer with it and it made my skin look flawless. I definitely recommend this foundation. One thing that I do want to point out is when you first apply the foundation if you touch it, it will remove the foundation but once the foundation dries it is transfer resistant!",
				verifiedBuyer: false,
				stars: 5,
			},
			{
				headline:
					"This formula has quality control issues because it separates",
				reviewText:
					"In the Q&A section someone asked if this is silicone or water based and the answer was both. That explains why the formula easily separates on your skin and in the bottle. It's a quality control issue because even when the bottle was brand new it separates like no other. Impossible to make it look good on your skin. Going in the trash sadly. Expected so much better from NARS.",
				verifiedBuyer: false,
				stars: 1,
			},
			{
				headline: "Top Tier!!",
				reviewText:
					"Ugh where do I start?? I love this foundation!\n" +
					"1. Lightweight\n" +
					"2. Great coverage\n" +
					"3. Long lasting\n" +
					"4. Sweat proof went to the gym & it lasted even though I was sweating ALOT\n" +
					"5. Excellent shade range \n" +
					"6. It rarely ever transfers, it will only be a bit",
				verifiedBuyer: false,
				stars: 5,
			},
			{
				headline: "No I would not buy this foundation again",
				reviewText:
					"This foundation is not good for oily skin. I was so shiny and it broke down and separated on different areas on my face especially my nose. I did like the texture of the foundation itself but definitely does not hold up in the heat.",
				verifiedBuyer: true,
				stars: 2,
			},
		],
	};

	return (
		<main className="flex flex-col items-start justify-center">
			<NewQueryDrawer />
			<section className="grid grid-cols-2 gap-4 w-full mt-12">
				<UltaDisplay data={testData} />
				<UltaDisplay data={testData} />
			</section>
		</main>
	);
}
