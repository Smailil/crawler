import { Dataset, createPuppeteerRouter } from 'crawlee';

export const router = createPuppeteerRouter();

router.addDefaultHandler(async ({ page, log }) => {
    const navItems = await page.$$eval('.nav ul li a', links =>
        links.map(link => link.href)
    );

    for (const item of navItems) {
        log.info(`Visiting ${item}`);
        await page.goto(item);
        let pageNumber = 0;
        while (pageNumber < 3) {
            await page.waitForSelector('li.page-item:nth-child(' +
                (pageNumber + 1) + ')');
            await page.click('li.page-item:nth-child(' +
                (pageNumber + 1) + ')');
            pageNumber++;
            const cardUrls = await page.$$eval('.card-body a', links =>
                links.map(link => link.href)
            )
            for (const url of cardUrls) {
                const title = await page.$eval('.card-title', el => el.textContent);
                const text = await page.$eval('.card-text', el => el.textContent);
                const image = await page.$eval('.text-center img', el => el.src);
                await Dataset.pushData({
                    item: item,
                    url: url,
                    title: title,
                    text: text,
                    image: image,
                });
            }
        }
    }
});

