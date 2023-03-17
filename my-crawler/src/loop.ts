import {PuppeteerController} from "@crawlee/browser-pool";
import {Page} from "puppeteer";
import {ForeachStruct, SArray} from "../auxiliary/type.js";
import {findToS} from "../auxiliary/auxiliaryFunction.js";
import {Scrape} from "./scrape.js";

class Foreach {
    array: string;
    name: string;
    program: string[];
    browserController: PuppeteerController;
    json: object;
    page: Page;
    S: SArray;

    constructor(browserController: PuppeteerController, json: object, foreach: ForeachStruct,
                page: Page, S: SArray) {
        this.browserController = browserController;
        this.json = json;
        this.page = page;
        this.S = S;
        this.array = foreach.array;
        this.name = foreach.name;
        this.program = foreach.program;
    }

    async ForeachDone() {
        const rawArray = this.array.startsWith("S:") ?
            findToS(this.array.substring(2), this.S): this.array;
        const url = this.page.url();
        await this.page.close()
        if(rawArray && (rawArray instanceof Array)) {
            for(const element of rawArray) {
                // copy S array and add element to it
                const S = [...this.S];
                S.push([this.name.substring(2), element]);
                const newPage = await this.browserController.newPage();
                await newPage.goto(url);
                const scrape = new Scrape(this.browserController, this.json, this.program, newPage, S);
                await scrape.LaunchProgram();
            }
        }
        this.S = [];
    }
}

export {Foreach};