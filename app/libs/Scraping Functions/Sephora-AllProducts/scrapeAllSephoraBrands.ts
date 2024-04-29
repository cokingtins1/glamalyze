import { SephoraBrand } from "@prisma/client";
import { Page } from "puppeteer";

export async function scrapeAllSephoraBrands(page: Page) {
	const allBrands = await page.evaluate(() => {
		const brandListCont = document.querySelector(".css-1yzfro9.eanm77i0");

		if (!brandListCont) return [];

		const brandSections = brandListCont.querySelectorAll('[id^="brands"]');

		if (brandSections.length === 0) return [];

		const result: SephoraBrand[] = [];
		brandSections.forEach((section) => {
			const brandSection = section.querySelector("ul");
			if (!brandSection) return;

			const brandSectionList = brandSection.querySelectorAll("li");

			if (brandSectionList.length === 0) return;

			brandSectionList.forEach((brand) => {
				const brandLinkEl = brand.querySelector(
					'[data-at="brand_link"]'
				);
				const brandPageLink = brandLinkEl
					? brandLinkEl.getAttribute("href")
					: "";

				const brandNameEl = brandLinkEl
					? brandLinkEl.querySelector("span")
					: "";

				const brandName = brandNameEl ? brandNameEl.textContent : "";

				result.push({
					brand_id: crypto.randomUUID(),
					brand_name: brandName,
					brand_page_link: `https://www.sephora.com${brandPageLink}`,
					created_at: new Date(),
					updated_at: new Date(),
				});
			});
		});
		return result;
	});
	return allBrands;
}
