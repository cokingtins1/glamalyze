"use server";

import { PrismaClient } from "@prisma/client";
import { getUltaData } from "../getUltaData";
import { getSephoraData } from "../getSephoraData";

const prisma = new PrismaClient();
export default async function compareProducts(slug: string) {
	function getSku(slug: string) {
		const string = decodeURIComponent(slug);

		const uSkuPattern = /u_sku:(\d+)/;
		const sSkuPattern = /s_sku:(\d+)/;

		const uSkuMatch = string.match(uSkuPattern);
		const u_sku = uSkuMatch ? uSkuMatch[1] : "";

		const sSkuMatch = string.match(sSkuPattern);
		const s_sku = sSkuMatch ? sSkuMatch[1] : "";

		return {
			uSKU: u_sku,
			sSKU: s_sku,
		};
	}

	const { uSKU, sSKU } = getSku(slug);

	const ultaPage = await prisma.ultaProduct.findFirst({
		where: { sku_id: uSKU },
		select: { product_id: true, page_link: true },
	});
	const sephoraPage = await prisma.sephoraProduct.findFirst({
		where: { sku_id: sSKU },
		select: { product_id: true, page_link: true },
	});

	const u = ultaPage?.page_link;
	const s = sephoraPage?.page_link;

	if (ultaPage && sephoraPage) {
		const [ultaData, sephoraData] = await Promise.all([
			getUltaData(result.data.ultaUrl),
			getSephoraData(sephoraPage?.page_link, sephoraPage?.product_id),
		]);
	}

	await new Promise((resolve) => setTimeout(resolve, 3000));

	return { u, s };
}
