import {Page} from "puppeteer";
import {SArray, InputStruct} from "../auxiliary/type.js";
import {findToS} from "../auxiliary/auxiliaryFunction.js";

class Input {
    selector: string;
    value: string;
    page: Page;
    S: SArray;

    constructor(input: InputStruct, page: Page, S: SArray) {
        this.selector = input.selector;
        this.value = input.value;
        this.page = page;
        this.S = S;
    }

    async InputDone() {
        const rawSelector = this.selector.startsWith("S:") ? findToS(this.selector.substring(2), this.S) : this.selector;
        if (!(rawSelector instanceof Array) && rawSelector) {
            try {
                const element = await this.page.$(rawSelector);
                if (element) {
                    await element.type(this.value);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
}

export {Input};