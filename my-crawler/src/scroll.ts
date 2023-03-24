import {Page} from "puppeteer";
import {ScrollStruct} from "../auxiliary/type.js";

class Scroll {
    subType: string;
    page: Page;

    constructor(scroll: ScrollStruct, page: Page) {
        this.subType = scroll.subType;
        this.page = page;
    }

    async ScrollDone() {
        switch (this.subType) {
            case "byOneWindow":
                await this.page.evaluate(() => {
                    window.scrollBy(0, window.innerHeight);
                })
                break;
            case "onBottom":
                await this.page.evaluate(() => {
                    window.scrollBy(0, document.body.scrollHeight);
                })
                break;
        }
    }
}

export {Scroll};