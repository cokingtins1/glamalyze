import { UltaBrand } from "@prisma/client";
import { Page } from "puppeteer";

export async function scrapeAllUltaBrands(page: Page) {
	const allBrands = await page.evaluate(() => {
		const brandListCont = document.querySelector(
			".ShopAllBrands__brandList"
		);

		if (!brandListCont) return [];

		const brandSections = brandListCont.querySelectorAll("div");

		if (brandSections.length === 0) return [];

		const result: UltaBrand[] = [];
		brandSections.forEach((section) => {
			const brandSection = section.querySelector(
				".BrandListSection__Listing"
			);
			if (!brandSection) return;

			const brandListSections = brandSection.querySelectorAll("ul");

			if (brandListSections.length === 0) return;

			brandListSections.forEach((brandList) => {
				const subSection = brandList.querySelectorAll("li");
				if (subSection.length === 0) return;

				subSection.forEach((brand) => {
					const brandNameEl = brand.querySelector("a");

					const brandName = brandNameEl
						? brandNameEl.textContent
						: "";

					const brandPageLink = brandNameEl
						? brandNameEl.getAttribute("href")
						: "";

					result.push({
						brand_id: crypto.randomUUID(),
						brand_name: brandName,
						brand_page_link: brandPageLink,
					});
				});
			});
		});
		return result;
	});
	return allBrands;
}
