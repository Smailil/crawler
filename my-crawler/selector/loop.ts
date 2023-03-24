import {Page} from "puppeteer";
import {ForeachStruct, SArray, WhileStruct, WhileOnExistsStruct, JSONStruct} from "../auxiliary/type.js";
import {findToS} from "../auxiliary/auxiliaryFunction.js";
import {Scrape} from "../src/scrape.js";
import PageManager from "../src/pageManager.js";

class Foreach {
    array: string;
    name: string;
    program: string[];
    browserController: PageManager;
    json: JSONStruct;
    page: Page;
    S: SArray;

    constructor(browserController: PageManager, json: JSONStruct, foreach: ForeachStruct,
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
        await this.browserController.closePage(this.page);
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

class WhileLoop {
    firstOperand: string;
    logicalOperation: string;
    secondOperand: string;
    program: string[];
    typeOfOperand: string;
    browserController: PageManager;
    json: JSONStruct;
    page: Page;
    S: SArray;

    constructor(browserController: PageManager, json: JSONStruct, whileLoop: WhileStruct, page: Page, S: SArray) {
        this.browserController = browserController;
        this.json = json;
        this.page = page;
        this.S = S;
        this.firstOperand = whileLoop.firstOperand;
        this.logicalOperation = whileLoop.logicalOperation;
        this.secondOperand = whileLoop.secondOperand;
        this.program = whileLoop.program;
        this.typeOfOperand = whileLoop.typeOfOperand;
    }

    async WhileLoopDone() {
        const withoutSFirstOperand = this.firstOperand.startsWith("S:") ?
            findToS(this.firstOperand.substring(2), this.S): this.firstOperand;
        const withoutSSecondOperand = this.secondOperand.startsWith("S:") ?
            findToS(this.secondOperand.substring(2), this.S): this.secondOperand;
        const url = this.page.url();
        await this.browserController.closePage(this.page);
        if(withoutSFirstOperand && withoutSSecondOperand &&
            !(withoutSFirstOperand instanceof Array) && !(withoutSSecondOperand instanceof Array)) {
            let rawFirstOperand;
            let rawSecondOperand;
            switch (this.typeOfOperand) {
                case "string":
                    rawFirstOperand = withoutSFirstOperand;
                    rawSecondOperand = withoutSSecondOperand;
                    break;
                case "integer":
                    rawFirstOperand = parseInt(withoutSFirstOperand);
                    rawSecondOperand = parseInt(withoutSSecondOperand);
                    break;
                case "float":
                    rawFirstOperand = parseFloat(withoutSFirstOperand);
                    rawSecondOperand = parseFloat(withoutSSecondOperand);
                    break;
                case "date":
                    rawFirstOperand = Date.parse(withoutSFirstOperand);
                    rawSecondOperand = Date.parse(withoutSSecondOperand);
                    break;
                default:
                    rawFirstOperand = withoutSFirstOperand;
                    rawSecondOperand = withoutSSecondOperand;
                    console.log("Type of operand is not supported");
            }
            switch (this.logicalOperation) {
                case "<=":
                    while (rawFirstOperand <= rawSecondOperand) {
                        const S = [...this.S];
                        const newPage = await this.browserController.newPage();
                        await newPage.goto(url);
                        const scrape = new Scrape(this.browserController, this.json, this.program, newPage, S);
                        await scrape.LaunchProgram();
                    }
                    this.S = [];
                    break;
                case ">=":
                    while (rawFirstOperand >= rawSecondOperand) {
                        const S = [...this.S];
                        const newPage = await this.browserController.newPage();
                        await newPage.goto(url);
                        const scrape = new Scrape(this.browserController, this.json, this.program, newPage, S);
                        await scrape.LaunchProgram();
                    }
                    this.S = [];
                    break;
                case "<":
                    while (rawFirstOperand < rawSecondOperand) {
                        const S = [...this.S];
                        const newPage = await this.browserController.newPage();
                        await newPage.goto(url);
                        const scrape = new Scrape(this.browserController, this.json, this.program, newPage, S);
                        await scrape.LaunchProgram();
                    }
                    this.S = [];
                    break;
                case ">":
                    while (rawFirstOperand > rawSecondOperand) {
                        const S = [...this.S];
                        const newPage = await this.browserController.newPage();
                        await newPage.goto(url);
                        const scrape = new Scrape(this.browserController, this.json, this.program, newPage, S);
                        await scrape.LaunchProgram();
                    }
                    this.S = [];
                    break;
                case "==":
                    while (rawFirstOperand === rawSecondOperand) {
                        const S = [...this.S];
                        const newPage = await this.browserController.newPage();
                        await newPage.goto(url);
                        const scrape = new Scrape(this.browserController, this.json, this.program, newPage, S);
                        await scrape.LaunchProgram();
                    }
                    this.S = [];
                    break;
                case "!=":
                    while (rawFirstOperand !== rawSecondOperand) {
                        const S = [...this.S];
                        const newPage = await this.browserController.newPage();
                        await newPage.goto(url);
                        const scrape = new Scrape(this.browserController, this.json, this.program, newPage, S);
                        await scrape.LaunchProgram();
                    }
                    this.S = [];
                    break;
                default:
                    console.log("Logical operation is not supported");
            }
        }
    }
}

class WhileOnExists {
    selector: string;
    program: string[];
    browserController: PageManager;
    json: JSONStruct;
    page: Page;
    S: SArray;
    constructor(browserController: PageManager, json: JSONStruct,
                whileOnExists: WhileOnExistsStruct, page: Page, S: SArray) {
        this.browserController = browserController;
        this.json = json;
        this.page = page;
        this.S = S;
        this.selector = whileOnExists.selector;
        this.program = whileOnExists.program;
    }

    async WhileOnExistsDone() {
        const url = this.page.url();
        await this.browserController.closePage(this.page);
        let element = await this.page.$(this.selector);
        while (element) {
            const S = [...this.S];
            const newPage = await this.browserController.newPage();
            await newPage.goto(url);
            const scrape = new Scrape(this.browserController, this.json, this.program, newPage, S);
            await scrape.LaunchProgram();
            element = await this.page.$(this.selector);
        }
        this.S = [];
    }
}

export {Foreach, WhileLoop, WhileOnExists};