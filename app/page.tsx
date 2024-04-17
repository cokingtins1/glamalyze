import NewQueryDrawer from "./components/NewQueryDrawer";
import DataDisplay from "./components/Ulta/DataDisplay";

export default async function Home() {
	const testDataUlta = {
		metaData: {
			company: "Ulta",
			price: "$52.00 ",
			totalReviews: 1679,
			averageRating: 4.1,
			reviewHistData: [1118, 249, 169, 168, 219],
			recommended: 85,
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

	const testDataSephora = {
		metaData: {
			company: "Sephora",
			price: "$68.00",
			totalReviews: 81,
			averageRating: 4,
			reviewHistData: [37, 38, 14, 6, 5],
			recommended: 81,
		},
		reviewsData: [
			{
				headline: "Hives and Rash",
				reviewText:
					"I used this product for a total of three days before I got a rash all over my face. It was itchy and lasted for a long time. It eventually scabbed and went away, a month later now my face is finally back to normal.",
				verifiedBuyer: true,
				stars: 2,
			},
			{
				headline: "Smells amazing!!!",
				reviewText:
					"I love this product. It’s great hydration and the smell! I love it, great for combo dry skin needing a basic nighttime routine. But the smell, heaven!!",
				verifiedBuyer: false,
				stars: 5,
			},
			{
				headline: null,
				reviewText:
					"I received this item for free from Influenster and Tula. I have been really enjoying this overnight treatment! I notice my skin is softer and smoother the next day. It does have a bit of a self tanner scent to my nose, but it isn’t strong and goes away quickly. The texture is slightly tacky, but it’s not bothersome. I would definitely purchase this product and recommend it to a friend",
				verifiedBuyer: false,
				stars: 5,
			},
			{
				headline: "Super hydrating and nourishing",
				reviewText:
					"I have combination skin but I love the consistency of this product, it stays on your skin and it feels so hydrating in the morning, I am a fan of clean beauty and I like all of the ways this nourishes my skin.",
				verifiedBuyer: false,
				stars: 4,
			},
			{
				headline: "Love it! Awesome product.",
				reviewText:
					"I’ve been using this product for a couple days and I can already tell a difference in my skin. It’s light and not heavy at all. I have some acne scars that I’m sure this will help lighten.",
				verifiedBuyer: false,
				stars: 5,
			},
			{
				headline: "Nice night time moisturizer",
				reviewText:
					"My spouse and I both use this, and love the way it feels. One of us has dry mature skin and the other has mature combo, and it works great for both! The texture is nice, no strong smell, and leave a skin feeling moisturized, but not super greasy.",
				verifiedBuyer: false,
				stars: 4,
			},
			{
				headline: "THE SMELL IS AWFUL!!!!!",
				reviewText:
					"This smells SOOOO bad!!! Like a bottle depot with fermenting juices. Honestly couldn’t even use the product for more than a week because I hated the smell.",
				verifiedBuyer: false,
				stars: 1,
			},
			{
				headline: "Nope",
				reviewText:
					"This smells awful. Usually I’m not sensitive to smells but it’s just weird. It also has shimmer which is totally unnecessary for a night cream. Plus it stays sticky on my face so when I go to sleep it just comes off on the pillow.",
				verifiedBuyer: false,
				stars: 1,
			},
			{
				headline: "Works but foul smelling",
				reviewText:
					"It works on dry winter skin, but the smell is really off putting.  It doesn’t linger so I’ll finish the jar, but I won’t but again.",
				verifiedBuyer: false,
				stars: 3,
			},
			{
				headline: "Just can't get past the smell!",
				reviewText:
					"Normally love Tula products, especially the cleanser, so was looking forward to trying out this product. Unfortunately, I should have paid more attention to the reviews commenting on the sour smell. Facial products for me are all about the three F's...fragrance, feel, and function. This product rates zero on the scent, definitely a sour and unpleasant fragrance. The feel on my skin was a little too tacky and sticky for comfort. Not sure about function, as I won't be sticking with the product long enough to see if it produces results...disappointing.",
				verifiedBuyer: true,
				stars: 1,
			},
			{
				headline: "Made a difference for me",
				reviewText:
					"I was very excited to receive free this sample product to test. I have enjoyed using it. It’s really smooth application to put on and does not take long either. I’m slightly sensitive to smells so it was a little bit of an adjustment. I did not and still don’t use a lot at once. My face looks so much better after a period of time. I think maybe a week or so. My skins usually pretty dull but this actually brought some glow to it. I am really happy with the product. It did feel like at first it was not soaking up, like it took time to soak into my skin so I could feel it if I was touching my face after applying it. That and the scent is why I gave it 4 stars. The product works and I love the packaging just could use some minor improvements.",
				verifiedBuyer: false,
				stars: 4,
			},
			{
				headline: "Repairing moisturizer that feels pure and works!",
				reviewText:
					"Thick yogurt scented moisturizer, in a nifty cool gadget pretty container at a fair price point that can be purchased at Sephora. As someone who’s taken years to heal their acne prone skin I am cautious on what I apply especially a thickening moisturizer overnight. The packaging feels so tailored with premeasurized pumps. Warning it straight up has a lingering yogurt smell but once you are a habitual user, it’s not potent. Great for fall/winter months as our skin is less greasy. I apply mine overnight and can feel my plump skin in the morning after deep cleansing. It’s a must try.",
				verifiedBuyer: false,
				stars: 4,
			},
		],
	};

	return (
		<main className="flex flex-col items-start justify-center">
			<NewQueryDrawer />
			<section className="grid grid-cols-2 gap-4 w-full mt-12">
				{/* <DataDisplay data={testDataUlta} />
				<DataDisplay data={testDataSephora} /> */}
			</section>
		</main>
	);
}
