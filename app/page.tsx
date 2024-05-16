import GetProductForm from "./components/GetProductForm";
import NewQueryDrawer from "./components/NewQueryDrawer";
import { SearchParams } from "./libs/types";
import { Baloo_2 } from "next/font/google";

type Props = {
	searchParams: SearchParams;
};

const font = Baloo_2({
	subsets: ["latin"],
	weight: ["600"],
});

export default async function Home({ searchParams }: Props) {
	return (
		<main className="flex flex-col items-center justify-center h-full">
			<section>
				<h1
					className={`${font.className} text-6xl text-primary text-center`}
				>
					Welcome the the Beauty Scraper!
				</h1>
			</section>
			<section className='w-full px-80 mt-4'>
				<GetProductForm />
			</section>
			<NewQueryDrawer />
		</main>
	);
}
