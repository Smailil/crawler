import {Page} from "puppeteer";
import path from "path";
import fs from "fs";
import {Scrape} from "../src/scrape.js";
import {Dataset} from "crawlee";
import {fileURLToPath} from "url";
import {SArray, IncludeStruct, StoObject} from "../auxiliary/type.js";
import {findToS} from "../auxiliary/auxiliaryFunction.js";
import PageManager from "../src/pageManager.js";


const __dirname = path.dirname(fileURLToPath(import.meta.url));


class Scrapemap {
    label: string;
    browserController: PageManager;
    page: Page;
    S: SArray;
    constructor(browserController : PageManager, include: IncludeStruct, page: Page, S: SArray) {
        this.browserController = browserController;
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

        const scrape = new Scrape(this.browserController, jsonObj, jsonObj.beginProgram, this.page);
        await scrape.LaunchProgram();

        scrape.S.push(["URL", this.page.url()]);
        const SObject: StoObject = scrape.S.reduce((acc: StoObject, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});

        await Dataset.pushData(SObject);
        await this.browserController.closePage(this.page);
    }
}
export {Scrapemap};
