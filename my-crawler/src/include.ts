import {findToS, SArray} from "./extractor.js";
import {Page} from "puppeteer";
import path from "path";
import fs from "fs";
import {Scrape} from "./scrape.js";
import {Dataset} from "crawlee";
import {fileURLToPath} from "url";

type IncludeStruct = {
    id: string;
    type: string;
    label: string;
};
interface StoObject {
    [key: string]: string | null | (string | null)[];
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));


class Scrapemap {
    label: string;
    page: Page;
    S: SArray;
    constructor(include: IncludeStruct, page: Page, S: SArray) {
        this.label = include.label;
        this.page = page;
        this.S = S;
    };

    async ScrapemapDone() {
        const rawLabel = this.label.startsWith("S:") ?
            findToS(this.label.substring(2), this.S): this.label;
        const pathToFile = path.join(__dirname, '../json/' + rawLabel + '.json');
        const jsonString = fs.readFileSync(pathToFile).toString();
        const jsonObj = JSON.parse(jsonString);

        const scrape = new Scrape(jsonObj, jsonObj.beginProgram, this.page);
        await scrape.LaunchProgram();
        scrape.S.push(["URL", this.page.url()]);
        const SObject: StoObject = scrape.S.reduce((acc: StoObject, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});

        await Dataset.pushData(SObject);
    }
}
export {Scrapemap};
