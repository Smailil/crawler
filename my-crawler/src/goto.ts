import {Page} from "puppeteer";
import {findToS} from "./extractor.js";

type SArray = [string, string | null | (string | null)[]][];
type GotoStruct = {
    id: number,
    type: string,
    link: string
}
class Goto {
    type: string;
    link: string;
    page: Page;
    S: SArray;

    constructor(goto: GotoStruct, page: Page, S: SArray) {
        this.type = goto.type;
        this.link = goto.link;
        this.page = page;
        this.S = S;
    }
    async GotoDone() {
        const rawLink = this.link.startsWith("S:") ? findToS(this.link.substring(2), this.S): this.link;
        if (!(rawLink instanceof Array) && rawLink) {
            try {
                await this.page.goto(rawLink, {waitUntil: "networkidle2"});
                console.log(`Goto ${this.type} ${rawLink}`);
            } catch (error) {
                console.log(error);
            }
        }
    }
}

export {Goto};