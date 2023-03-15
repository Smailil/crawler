import {Page} from "puppeteer";
import {findToS, SArray} from "./extractor.js";
import {Scrape} from "./scrape.js";

type BranchConditionStruct = {
    id: number,
    type: string,
    firstOperand: string,
    logicalOperation: string,
    secondOperand: string,
    ifProgram: string[],
    elseProgram: string[]
}
class BranchCondition {
    firstOperand: string;
    logicalOperation: string;
    secondOperand: string;
    ifProgram: string[];
    elseProgram: string[];
    json: object;
    page: Page;
    S: SArray;
    constructor(json:Object, branchCondition:BranchConditionStruct, page:Page, S:SArray) {
        this.json = json;
        this.page = page;
        this.S = S;
        this.firstOperand = branchCondition.firstOperand;
        this.logicalOperation = branchCondition.logicalOperation;
        this.secondOperand = branchCondition.secondOperand;
        this.ifProgram = branchCondition.ifProgram;
        this.elseProgram = branchCondition.elseProgram;
    }
    async BranchConditionDone() {
        const rawFirstOperand = this.firstOperand.startsWith("S:") ? 
            findToS(this.firstOperand.substring(2), this.S): this.firstOperand;
        const rawSecondOperand = this.secondOperand.startsWith("S:") ?
            findToS(this.secondOperand.substring(2), this.S): this.secondOperand;
        switch (this.logicalOperation) {
            case "==":
                if (rawFirstOperand === rawSecondOperand) {
                    const scrape = new Scrape(this.json, this.ifProgram, this.page, this.S);
                    await scrape.LaunchProgram();
                }
                else {
                    const scrape = new Scrape(this.json, this.elseProgram, this.page, this.S);
                    await scrape.LaunchProgram();
                }
                break;
            case "!=":
                if (rawFirstOperand !== rawSecondOperand) {
                    const scrape = new Scrape(this.json, this.ifProgram, this.page, this.S);
                    await scrape.LaunchProgram();
                }
                else {
                    const scrape = new Scrape(this.json, this.elseProgram, this.page, this.S);
                    await scrape.LaunchProgram();
                }
                break;
            case ">":
                if (Number(rawFirstOperand) > Number(rawSecondOperand)) {
                    const scrape = new Scrape(this.json, this.ifProgram, this.page, this.S);
                    await scrape.LaunchProgram();
                }
                else {
                    const scrape = new Scrape(this.json, this.elseProgram, this.page, this.S);
                    await scrape.LaunchProgram();
                }
                break;
            case "<":
                if (Number(rawFirstOperand) < Number(rawSecondOperand)) {
                    const scrape = new Scrape(this.json, this.ifProgram, this.page, this.S);
                    await scrape.LaunchProgram();
                }
                else {
                    const scrape = new Scrape(this.json, this.elseProgram, this.page, this.S);
                    await scrape.LaunchProgram();
                }
                break;
            case ">=":
                if (Number(rawFirstOperand) >= Number(rawSecondOperand)) {
                    const scrape = new Scrape(this.json, this.ifProgram, this.page, this.S);
                    await scrape.LaunchProgram();
                }
                else {
                    const scrape = new Scrape(this.json, this.elseProgram, this.page, this.S);
                    await scrape.LaunchProgram();
                }
                break;
            case "<=":
                if (Number(rawFirstOperand) <= Number(rawSecondOperand)) {
                    const scrape = new Scrape(this.json, this.ifProgram, this.page, this.S);
                    await scrape.LaunchProgram();
                }
                else {
                    const scrape = new Scrape(this.json, this.elseProgram, this.page, this.S);
                    await scrape.LaunchProgram();
                }
                break;
            default:
                console.log("Error: unknown logical operation");
        }
    }
}

export {BranchCondition};