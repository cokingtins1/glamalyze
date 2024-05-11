import { AllBrands, PrismaClient } from "@prisma/client";
import { getBrands } from "./getBrands";
import { AllProducts, ScrapeReturnMessage, TScrapeSchema } from "../types";
import { getAllUltaProducts } from "@/app/actions/getAllUltaProducts";
import { getAllSephoraProducts } from "@/app/actions/getAllSephoraProducts";

const prisma = new PrismaClient();

export default async function scrapeProducts(
	input: TScrapeSchema
): Promise<ScrapeReturnMessage> {
	let start = new Date().getTime();
	let end: number = new Date().getTime();
	let scrapeIndex = "";

	const { retailer, target, startIndex, endIndex, brandUrl } = input;

	let brands: AllBrands[] = [];

	brands = await getBrands(input);

	if (brands.length === 0) {
		end = new Date().getTime();
		return {
			message: {
				executionTime: `${(end - start) / 1000}`,
				scrapeIndex,
				error: "invalid index",
			},
		};
	}

	console.dir(
		brands.map((b) => b.brand_name),
		{ maxArrayLength: null }
	);

	await runProductScraper(brands, retailer);

	async function runProductScraper(brands: AllBrands[], retailer: string) {
		const numBrands = brands.length;

		let count = 0;
		let data: AllProducts[] = [];
		while (count < numBrands) {
			const retailerKey: string = `${retailer.toLowerCase()}_page_link`;
			const url = brands[count][retailerKey as keyof AllBrands];
			const brandId = brands[count].brand_id;
			console.log(
				"current index:",
				`${count} of ${numBrands}`,
				"brand name:",
				brands[count].brand_name
			);

			if (retailer === "Ulta" && url !== null) {
				data = await getAllUltaProducts(url as string, brandId);
			} else if (retailer === "Sephora" && url !== null) {
				data = await getAllSephoraProducts(url as string, brandId);
			}

			if (data) {
				const { productsToInsert, productsToUpdate } =
					await validateResult(data, retailer, brandId);
				if (productsToInsert.length > 0) {
					console.log(
						`Adding ${productsToInsert.length} products...`
					);

					if (retailer === "Ulta") {
						await prisma.ultaProduct.createMany({
							data: productsToInsert,
						});
					} else if ((retailer = "Sephora")) {
						await prisma.sephoraProduct.createMany({
							data: productsToInsert,
						});
					}

					const productNames = productsToInsert
						.map((p) => p.product_name)
						.filter((name) => name !== null);
					end = new Date().getTime();

					await prisma.scrapeLog.create({
						data: {
							scrape_id: crypto.randomUUID(),
							scrape_date: new Date(),
							retailer: retailer,
							target: target,
							scrapeRange: productNames,
							failedOn: null,
							executionTime: (end - start) / 1000,
						},
					});
				}
				if (productsToUpdate.length > 0) {
					console.log(
						`Updating ${productsToInsert.length} products...`
					);

					for (const product of productsToUpdate) {
						const {
							sku_id,
							product_id,
							created_at,
							...updateData
						} = product;

						if (retailer === "Ulta") {
							await prisma.ultaProduct.update({
								where: { product_id: product.product_id },
								data: updateData,
							});
						} else if ((retailer = "Sephora")) {
							await prisma.sephoraProduct.update({
								where: { product_id: product.product_id },
								data: updateData,
							});
						}

						end = new Date().getTime();

						await prisma.scrapeLog.create({
							data: {
								scrape_id: crypto.randomUUID(),
								scrape_date: new Date(),
								retailer: retailer,
								target: target,
								scrapeRange: [product.product_name || ""],
								failedOn: null,
								executionTime: (end - start) / 1000,
							},
						});
					}
				}
			}
			count++;
		}

		scrapeIndex = `${brands[0].brand_name} to
			${brands[brands.length - 1].brand_name}`;

		end = new Date().getTime();

		await prisma.scrapeLog.create({
			data: {
				scrape_id: crypto.randomUUID(),
				scrape_date: new Date(),
				retailer: retailer,
				target: target,
				scrapeRange: [
					`${brands[0].brand_name}`,
					`${brands[brands.length - 1].brand_name}`,
				],
				failedOn: null,
				executionTime: (end - start) / 1000,
			},
		});
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

	end = new Date().getTime();

	return {
		message: {
			executionTime: `${(end - start) / 1000}`,
			scrapeIndex,
			error: "",
		},
	};
}
