import {Page} from "puppeteer";
import {Scrape} from "./scrape.js";
import {SArray, BranchConditionStruct} from "../auxiliary/type.js";
import {findToS} from "../auxiliary/auxiliaryFunction.js";
import PageManager from "./pageManager.js";

class BranchCondition {
    firstOperand: string;
    logicalOperation: string;
    secondOperand: string;
    ifProgram: string[];
    elseProgram: string[];
    typeOfOperand: string;
    browserController: PageManager;
    json: object;
    page: Page;
    S: SArray;
    constructor(browserController : PageManager, json:object,
                branchCondition:BranchConditionStruct, page:Page, S:SArray) {
        this.browserController = browserController;
        this.json = json;
        this.page = page;
        this.S = S;
        this.firstOperand = branchCondition.firstOperand;
        this.logicalOperation = branchCondition.logicalOperation;
        this.secondOperand = branchCondition.secondOperand;
        this.ifProgram = branchCondition.ifProgram;
        this.elseProgram = branchCondition.elseProgram;
        this.typeOfOperand = branchCondition.typeOfOperand;
    }
    async BranchConditionDone() {
        const withoutSFirstOperand = this.firstOperand.startsWith("S:") ?
            findToS(this.firstOperand.substring(2), this.S): this.firstOperand;
        const withoutSSecondOperand = this.secondOperand.startsWith("S:") ?
            findToS(this.secondOperand.substring(2), this.S): this.secondOperand;
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
                case "==":
                    if (rawFirstOperand === rawSecondOperand) {
                        const scrape = new Scrape(this.browserController, this.json, this.ifProgram, this.page, this.S);
                        await scrape.LaunchProgram();
                    } else {
                        const scrape = new Scrape(this.browserController, this.json, this.elseProgram, this.page, this.S);
                        await scrape.LaunchProgram();
                    }
                    break;
                case "!=":
                    if (rawFirstOperand !== rawSecondOperand) {
                        const scrape = new Scrape(this.browserController, this.json, this.ifProgram, this.page, this.S);
                        await scrape.LaunchProgram();
                    } else {
                        const scrape = new Scrape(this.browserController, this.json, this.elseProgram, this.page, this.S);
                        await scrape.LaunchProgram();
                    }
                    break;
                case ">":
                    if (rawFirstOperand > rawSecondOperand) {
                        const scrape = new Scrape(this.browserController, this.json, this.ifProgram, this.page, this.S);
                        await scrape.LaunchProgram();
                    } else {
                        const scrape = new Scrape(this.browserController, this.json, this.elseProgram, this.page, this.S);
                        await scrape.LaunchProgram();
                    }
                    break;
                case "<":
                    if (rawFirstOperand < rawSecondOperand) {
                        const scrape = new Scrape(this.browserController, this.json, this.ifProgram, this.page, this.S);
                        await scrape.LaunchProgram();
                    } else {
                        const scrape = new Scrape(this.browserController, this.json, this.elseProgram, this.page, this.S);
                        await scrape.LaunchProgram();
                    }
                    break;
                case ">=":
                    if (rawFirstOperand >= rawSecondOperand) {
                        const scrape = new Scrape(this.browserController, this.json, this.ifProgram, this.page, this.S);
                        await scrape.LaunchProgram();
                    } else {
                        const scrape = new Scrape(this.browserController, this.json, this.elseProgram, this.page, this.S);
                        await scrape.LaunchProgram();
                    }
                    break;
                case "<=":
                    if (rawFirstOperand <= rawSecondOperand) {
                        const scrape = new Scrape(this.browserController, this.json, this.ifProgram, this.page, this.S);
                        await scrape.LaunchProgram();
                    } else {
                        const scrape = new Scrape(this.browserController, this.json, this.elseProgram, this.page, this.S);
                        await scrape.LaunchProgram();
                    }
                    break;
                case "includes":
                    if (rawFirstOperand && rawSecondOperand && typeof rawFirstOperand !== "number"
                        && typeof rawSecondOperand !== "number" && rawFirstOperand.includes(rawSecondOperand)) {
                        const scrape = new Scrape(this.browserController, this.json, this.ifProgram, this.page, this.S);
                        await scrape.LaunchProgram();
                    } else {
                        const scrape = new Scrape(this.browserController, this.json, this.elseProgram, this.page, this.S);
                        await scrape.LaunchProgram();
                    }
                    break;
                default:
                    console.log("Error: unknown logical operation");
            }
        }
    }
}

export {BranchCondition};