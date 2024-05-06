import { getProductData } from "../libs/getProductData"

export default async function Page() {
	const text = await getProductData()

	return (
		<div>
			<p className="text-white">{JSON.stringify(text)}</p>
		</div>
	)
}
