import { Page } from "puppeteer";

export async function loadAllProducts(page: Page, loadAll: boolean) {
	function delay(time: number) {
		return new Promise(function (resolve) {
			setTimeout(resolve, time);
		});
	}

	type AutoScroll = "up" | "down";
	async function autoScroll(direction: AutoScroll) {
		await page.evaluate(async (scrollDirection) => {
			await new Promise<void>((resolve) => {
				var totalHeight =
					scrollDirection === "up" ? document.body.scrollHeight : 0;
				var distance = 100;
				var timer = setInterval(() => {
					if (scrollDirection === "down") {
						window.scrollBy(0, distance);
						totalHeight += distance;
					} else {
						window.scrollBy(0, -distance);
						totalHeight -= distance;
					}

					if (
						scrollDirection === "down" &&
						totalHeight >=
							document.body.scrollHeight - window.innerHeight
					) {
						clearInterval(timer);
						resolve();
					} else if (scrollDirection === "up" && totalHeight <= 0) {
						clearInterval(timer);
						resolve();
					}
				}, 100);
			});
		}, direction);
	}

	await page.keyboard.down("End");
	await delay(2000);

	await page.keyboard.down("PageUp");

	await page.keyboard.down("End");
	await page.keyboard.down("End");
	await delay(1000);

	if (loadAll) {
		await autoScroll("up");
		await autoScroll("down");
	}

	return;
}
