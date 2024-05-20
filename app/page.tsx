import { PrismaClient } from "@prisma/client";
import GetProductForm from "./components/GetProductForm/GetProductForm";
import QueryResultsHome from "./components/HomeQuery/QueryResultsHome";
import NewQueryDrawer from "./components/NewQueryDrawer";
import { Baloo_2 } from "next/font/google";

const font = Baloo_2({
	subsets: ["latin"],
	weight: ["600"],
});

const prisma = new PrismaClient();
export default async function Home() {
	// const data = await prisma.ultaProduct.findMany({
	// 	select: {
	// 		product_id: true,
	// 		product_name: true,
	// 		brand_name: true,
	// 		retailer_id: true,
	// 		sku_id: true,
	// 		product_image_url: true,
	// 	},
	// });


	return (
		<main className="flex flex-col items-center justify-center px-10 lg:px-80">
			<section className="flex flex-col items-center">
				<h1
					className={`${font.className} text-6xl text-primary text-center`}
				>
					Welcome to Glamalyze<span className="text-lg">&#169;</span>
				</h1>
				<h2 className="text-center">
					Choose from over 30,000 products across Ulta and Sephora to
					compare reviews and product data
				</h2>
			</section>
			<section className="w-full mt-8">
				{/* <GetProductForm sheet={false} /> */}
				<QueryResultsHome isSubmitting={false} data={data}/>
			</section>
			{/* <NewQueryDrawer /> */}
		</main>
	);
}
