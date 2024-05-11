import SelectForm from "../../components/Dashboard/SelectForm";
import SharedProducts from "@/app/components/Dashboard/SharedProducts";

export default function Page() {
	return (
		<main className="space-y-4">
			<section className="grid grid-rows-2 gap-4">
				<SelectForm />
			</section>
			<section>
				<SharedProducts />
			</section>
		</main>
	);
}
