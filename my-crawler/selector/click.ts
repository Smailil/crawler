import {ClickStruct, SArray} from "../auxiliary/type.js";
import {Page} from "puppeteer";
import {findToS} from "../auxiliary/auxiliaryFunction.js";

class Click {
    selector: string;
    page: Page;
    S: SArray;
    constructor(click: ClickStruct, page: Page, S: SArray) {
        this.selector = click.selector;
        this.page = page;
        this.S = S;
    }
    async ClickDone() {
        const rawSelector = this.selector.startsWith("S:") ? findToS(this.selector.substring(2), this.S): this.selector;
        if (!(rawSelector instanceof Array) && rawSelector) {
            try {
                await this.page.click(rawSelector);
            } catch (error) {
                console.log(error);
            }
        }
    }
}

export {Click};