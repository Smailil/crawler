import {Page} from "puppeteer";
import {SArray, GotoStruct} from "../auxiliary/type.js";
import {findToS} from "../auxiliary/auxiliaryFunction.js";

class Goto {
    link: string;
    page: Page;
    S: SArray;

    constructor(goto: GotoStruct, page: Page, S: SArray) {
        this.link = goto.link;
        this.page = page;
        this.S = S;
    }
    async GotoDone() {
        const rawLink = this.link.startsWith("S:") ? findToS(this.link.substring(2), this.S): this.link;
        if (!(rawLink instanceof Array) && rawLink) {
            try {
                await this.page.goto(rawLink, {waitUntil: "networkidle2"});
            } catch (error) {
                console.log(error);
            }
        }
    }
}

export {Goto};