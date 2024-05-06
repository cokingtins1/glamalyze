import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAllSephoraProducts } from "../../actions/getAllSephoraProducts";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default function Page() {
	async function handleSubmit(formData: FormData) {
		"use server";

		// const url = formData.get("url");
		// if (typeof url !== "string" || !url.includes("sephora.com/brand"))
		// 	return;

		// const allProducts = await getAllSephoraProducts(url);

		// if (allProducts.length > 0) {
		// 	const uniqueSkuIds: { [key: string]: boolean } = {};

		// 	const uniqueResults = allProducts.filter((product) => {
		// 		if (product.sku_id !== null && product.sku_id !== undefined) {
		// 			if (!uniqueSkuIds[product.sku_id]) {
		// 				uniqueSkuIds[product.sku_id] = true;
		// 				return true;
		// 			}
		// 		}

		// 		return false;
		// 	});

		const ultaBrands = await prisma.ultaProduct.findMany();
		const sephoraBrands = await prisma.sephoraProduct.findMany();

		const updatedUltaBrands = ultaBrands.map((brand) => {
			return { ...brand, brand_name: brand.brand_name?.toLowerCase() };
		});
		const updatedSephoraBrands = sephoraBrands.map((brand) => {
			return { ...brand, brand_name: brand.brand_name?.toLowerCase() };
		});

		const ultaBrandNames = updatedUltaBrands.map(
			(brand) => brand.brand_name
		);
		const sephoraBrandNames = updatedSephoraBrands.map(
			(brand) => brand.brand_name
		);

		const sharedBrandNames = ultaBrandNames.filter((brandName) =>
			sephoraBrandNames.includes(brandName)
		);

		// percent of products that share brand_name from U and S
		const sharedPercent =
			sharedBrandNames.length /
			(ultaBrandNames.length + sephoraBrandNames.length);
		
		const count = await prisma.$queryRaw`
		SELECT brand_name
		FROM "UltaProduct" tu 
		JOIN "SephoraProduct" ts ON LOWER(ts.brand_name) 
		`

		console.dir(ultaBrandNames.length, { maxArrayLength: null });
		console.log(sharedPercent);

		// }
	}

	return (
		<div className="flex justify-center">
			<form action={handleSubmit} className="flex gap-4">
				<Input name="url" type="text" className="bg-white" />
				<Button type="submit">Scrape Products</Button>
			</form>
		</div>
	);
}
