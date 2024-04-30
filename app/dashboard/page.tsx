import ScrapeForm from "../components/Dashboard/ScrapeForm";
import { scrapeBrands } from "../actions/Dashboard/scrapeBrands";
import { scrapeProducts } from '../actions/Dashboard/scrapeProducts';
import SelectForm from '../components/Dashboard/SelectForm';

export default function Page() {
	return (
		<main>
			<section className="grid grid-rows-2 gap-4">
				<SelectForm/>
			</section>
		</main>
	);
}
