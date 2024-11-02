import { getAllUltaProducts } from "@/app/actions/getAllUltaProducts";
import { AllProducts } from "../types";
import { getAllSephoraProducts } from "@/app/actions/getAllSephoraProducts";
import { prisma } from "@/prisma/_base";

export default async function oneOffScrapeProduct(
	retailer: string,
	url: string,
	brandId: string
) {
	let data: AllProducts[] = [];

	if (retailer === "Ulta" && url !== null) {
		data = await getAllUltaProducts(url as string, brandId);
	} else if (retailer === "Sephora" && url !== null) {
		data = await getAllSephoraProducts(url as string, brandId);
	}

	if (data) {
		const { productsToInsert, productsToUpdate } = await validateResult(
			data,
			retailer,
			brandId
		);
		if (productsToInsert.length > 0) {
			console.log(`Adding ${productsToInsert.length} products...`);

			// if (retailer === "Ulta") {
			// 	await prisma.ultaProduct.createMany({
			// 		data: productsToInsert,
			// 	});
			// } else if ((retailer = "Sephora")) {
			// 	await prisma.sephoraProduct.createMany({
			// 		data: productsToInsert,
			// 	});
			// }
		}
		if (productsToUpdate.length > 0) {
			console.log(`Updating ${productsToUpdate.length} products...`);

			// for (const product of productsToUpdate) {
			// 	const { sku_id, product_id, created_at, ...updateData } =
			// 		product;

			// 	if (retailer === "Ulta") {
			// 		await prisma.ultaProduct.update({
			// 			where: { product_id: product.product_id },
			// 			data: updateData,
			// 		});
			// 	} else if ((retailer = "Sephora")) {
			// 		await prisma.sephoraProduct.update({
			// 			where: { product_id: product.product_id },
			// 			data: updateData,
			// 		});
			// 	}
			// }
		}
	}

	async function validateResult(
		data: AllProducts[],
		retailer: string,
		brandId: string
	) {
		const filteredArray = data.filter(
			(product) =>
				product.product_name !== null || product.brand_name !== null
		);

		type BrandSkus = {
			sku_id: string | null;
			product_id: string;
		};
		let brandSkus: BrandSkus[] = [];

		if (retailer === "Ulta") {
			brandSkus = await prisma.ultaProduct.findMany({
				where: { brand_id: brandId },
				select: { sku_id: true, product_id: true },
			});
		} else if ((retailer = "Sephora")) {
			brandSkus = await prisma.sephoraProduct.findMany({
				where: { brand_id: brandId },
				select: { sku_id: true, product_id: true },
			});
		}

		const existingSkus = brandSkus.map((p) => p.sku_id);

		const productsToUpdate = filteredArray.filter((p) =>
			existingSkus.includes(p.sku_id)
		);

		productsToUpdate.forEach((p) => {
			const matchingBrandSku = brandSkus.find(
				(sku) => sku.sku_id === p.sku_id
			);
			if (matchingBrandSku) {
				p.product_id = matchingBrandSku.product_id;
			}
		});

		const productsToInsert = filteredArray.filter(
			(p) => !existingSkus.includes(p.sku_id)
		);

		return { productsToInsert, productsToUpdate };
	}
}
