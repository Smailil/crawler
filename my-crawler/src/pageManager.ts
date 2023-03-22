import { Page } from 'puppeteer';
import {PuppeteerController} from "@crawlee/browser-pool";

class PageManager {
    browser: PuppeteerController;
    maxConcurrency: number;
    queue: Array<(page: Page) => void>;
    activePages: number;

    constructor(browser: PuppeteerController, maxConcurrency: number) {
        this.browser = browser;
        this.maxConcurrency = maxConcurrency;
        this.queue = [];
        this.activePages = 0;
    }

    async newPage(): Promise<Page> {
        if (this.activePages < this.maxConcurrency) {
            this.activePages++;
            return await this.browser.newPage();
        } else {
            return new Promise((resolve) => {
                this.queue.push(resolve);
            });
        }
    }

    async closePage(page: Page): Promise<void> {
        await page.close();
        this.activePages--;

        if (this.queue.length > 0) {
            const resolve = this.queue.shift();
            const newPage = await this.browser.newPage();
            if (resolve) {
                resolve(newPage);
            }
        }
    }
}
export default PageManager;
