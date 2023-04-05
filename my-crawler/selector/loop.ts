import {Page} from "puppeteer";
import {ForeachStruct, SArray, WhileStruct, LoopOnExistsStruct, JSONStruct} from "../auxiliary/type.js";
import {changeType, findToS} from "../auxiliary/auxiliaryFunction.js";
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
        if(withoutSFirstOperand && withoutSSecondOperand &&
            !(withoutSFirstOperand instanceof Array) && !(withoutSSecondOperand instanceof Array)) {
            let rawFirstOperand = changeType(withoutSFirstOperand, this.typeOfOperand);
            let rawSecondOperand = changeType(withoutSSecondOperand, this.typeOfOperand);
            switch (this.logicalOperation) {
                case "<=":
                    while (rawFirstOperand <= rawSecondOperand) {
                        const scrape = new Scrape(this.browserController, this.json, this.program, this.page, this.S);
                        await scrape.LaunchProgram();
                        const withoutSFirstOperand = this.firstOperand.startsWith("S:") ?
                            findToS(this.firstOperand.substring(2), this.S): this.firstOperand;
                        const withoutSSecondOperand = this.secondOperand.startsWith("S:") ?
                            findToS(this.secondOperand.substring(2), this.S): this.secondOperand;
                        if(withoutSFirstOperand && withoutSSecondOperand &&
                            !(withoutSFirstOperand instanceof Array) && !(withoutSSecondOperand instanceof Array)) {
                            rawFirstOperand = changeType(withoutSFirstOperand, this.typeOfOperand);
                            rawSecondOperand = changeType(withoutSSecondOperand, this.typeOfOperand);
                        }
                    }
                    break;
                case ">=":
                    while (rawFirstOperand >= rawSecondOperand) {
                        const scrape = new Scrape(this.browserController, this.json, this.program, this.page, this.S);
                        await scrape.LaunchProgram();
                        const withoutSFirstOperand = this.firstOperand.startsWith("S:") ?
                            findToS(this.firstOperand.substring(2), this.S): this.firstOperand;
                        const withoutSSecondOperand = this.secondOperand.startsWith("S:") ?
                            findToS(this.secondOperand.substring(2), this.S): this.secondOperand;
                        if(withoutSFirstOperand && withoutSSecondOperand &&
                            !(withoutSFirstOperand instanceof Array) && !(withoutSSecondOperand instanceof Array)) {
                            rawFirstOperand = changeType(withoutSFirstOperand, this.typeOfOperand);
                            rawSecondOperand = changeType(withoutSSecondOperand, this.typeOfOperand);
                        }
                    }
                    break;
                case "<":
                    while (rawFirstOperand < rawSecondOperand) {
                        const scrape = new Scrape(this.browserController, this.json, this.program, this.page, this.S);
                        await scrape.LaunchProgram();
                        const withoutSFirstOperand = this.firstOperand.startsWith("S:") ?
                            findToS(this.firstOperand.substring(2), this.S): this.firstOperand;
                        const withoutSSecondOperand = this.secondOperand.startsWith("S:") ?
                            findToS(this.secondOperand.substring(2), this.S): this.secondOperand;
                        if(withoutSFirstOperand && withoutSSecondOperand &&
                            !(withoutSFirstOperand instanceof Array) && !(withoutSSecondOperand instanceof Array)) {
                            rawFirstOperand = changeType(withoutSFirstOperand, this.typeOfOperand);
                            rawSecondOperand = changeType(withoutSSecondOperand, this.typeOfOperand);
                        }
                    }
                    break;
                case ">":
                    while (rawFirstOperand > rawSecondOperand) {
                        const scrape = new Scrape(this.browserController, this.json, this.program, this.page, this.S);
                        await scrape.LaunchProgram();
                        const withoutSFirstOperand = this.firstOperand.startsWith("S:") ?
                            findToS(this.firstOperand.substring(2), this.S): this.firstOperand;
                        const withoutSSecondOperand = this.secondOperand.startsWith("S:") ?
                            findToS(this.secondOperand.substring(2), this.S): this.secondOperand;
                        if(withoutSFirstOperand && withoutSSecondOperand &&
                            !(withoutSFirstOperand instanceof Array) && !(withoutSSecondOperand instanceof Array)) {
                            rawFirstOperand = changeType(withoutSFirstOperand, this.typeOfOperand);
                            rawSecondOperand = changeType(withoutSSecondOperand, this.typeOfOperand);
                        }
                    }
                    break;
                case "==":
                    while (rawFirstOperand === rawSecondOperand) {
                        const scrape = new Scrape(this.browserController, this.json, this.program, this.page, this.S);
                        await scrape.LaunchProgram();
                        const withoutSFirstOperand = this.firstOperand.startsWith("S:") ?
                            findToS(this.firstOperand.substring(2), this.S): this.firstOperand;
                        const withoutSSecondOperand = this.secondOperand.startsWith("S:") ?
                            findToS(this.secondOperand.substring(2), this.S): this.secondOperand;
                        if(withoutSFirstOperand && withoutSSecondOperand &&
                            !(withoutSFirstOperand instanceof Array) && !(withoutSSecondOperand instanceof Array)) {
                            rawFirstOperand = changeType(withoutSFirstOperand, this.typeOfOperand);
                            rawSecondOperand = changeType(withoutSSecondOperand, this.typeOfOperand);
                        }
                    }
                    break;
                case "!=":
                    while (rawFirstOperand !== rawSecondOperand) {
                        const scrape = new Scrape(this.browserController, this.json, this.program, this.page, this.S);
                        await scrape.LaunchProgram();
                        const withoutSFirstOperand = this.firstOperand.startsWith("S:") ?
                            findToS(this.firstOperand.substring(2), this.S): this.firstOperand;
                        const withoutSSecondOperand = this.secondOperand.startsWith("S:") ?
                            findToS(this.secondOperand.substring(2), this.S): this.secondOperand;
                        if(withoutSFirstOperand && withoutSSecondOperand &&
                            !(withoutSFirstOperand instanceof Array) && !(withoutSSecondOperand instanceof Array)) {
                            rawFirstOperand = changeType(withoutSFirstOperand, this.typeOfOperand);
                            rawSecondOperand = changeType(withoutSSecondOperand, this.typeOfOperand);
                        }
                    }
                    break;
                default:
                    console.log("Logical operation is not supported");
            }
        }
    }
}

class LoopOnExists {
    selector: string;
    numberOfLoops: string;
    program: string[];
    browserController: PageManager;
    json: JSONStruct;
    page: Page;
    S: SArray;
    constructor(browserController: PageManager, json: JSONStruct,
                loopOnExists: LoopOnExistsStruct, page: Page, S: SArray) {
        this.browserController = browserController;
        this.json = json;
        this.page = page;
        this.S = S;
        this.selector = loopOnExists.selector;
        this.numberOfLoops = loopOnExists.numberOfLoops;
        this.program = loopOnExists.program;
    }

    async LoopOnExistsDone() {
        let element = await this.page.$(this.selector);
        const rawNumberOfLoops = this.numberOfLoops.startsWith("S:") ?
            findToS(this.numberOfLoops.substring(2), this.S) : this.numberOfLoops;
        if (!(rawNumberOfLoops instanceof Array) && rawNumberOfLoops !== null) {
            if (rawNumberOfLoops === "") {
                while (element) {
                    const scrape = new Scrape(this.browserController, this.json, this.program, this.page, this.S);
                    await scrape.LaunchProgram();
                    element = await this.page.$(this.selector);
                }
            } else {
                const intNumberOfLoops = parseInt(rawNumberOfLoops);
                for (let i = 0; element && i < intNumberOfLoops; i++) {
                    const scrape = new Scrape(this.browserController, this.json, this.program, this.page, this.S);
                    await scrape.LaunchProgram();
                    element = await this.page.$(this.selector);
                }
            }
        }
    }
}

export {Foreach, WhileLoop, LoopOnExists};