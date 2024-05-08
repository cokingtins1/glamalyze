import compareProducts from "@/app/actions/Compare/compareProducts";
import DataDisplay from "@/app/components/Ulta/DataDisplay";

type Props = {
	params: { slug: string };
};

export default async function Page({ params }: Props) {
	const { u, s } = await compareProducts(params.slug);

	return (
		<>
			<div>{u}</div>;<div>{s}</div>;
		</>
	);
}
