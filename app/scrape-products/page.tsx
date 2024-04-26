
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAllProducts } from "../actions/getAllProducts";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default function Page() {
	async function handleSubmit(formData: FormData) {
		"use server";

		const url = formData.get("url");
		if (typeof url !== "string" || !url.includes("sephora.com/brand")) return;

		const allProducts = await getAllProducts(url);

		if (allProducts.length > 0) {
			const uniqueSkuIds: { [key: string]: boolean } = {};

			const uniqueResults = allProducts.filter((product) => {
				if (product.sku_id !== null && product.sku_id !== undefined) {
					if (!uniqueSkuIds[product.sku_id]) {
						uniqueSkuIds[product.sku_id] = true;
						return true;
					}
				}

				return false;
			});

			await prisma.allProducts.createMany({ data: uniqueResults });
		}
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
