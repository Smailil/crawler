import {Page} from "puppeteer";
import {DecrementStruct, IncrementStruct, SArray, VariableStruct} from "../auxiliary/type.js";
import {findToS} from "../auxiliary/auxiliaryFunction";

class Variable {
    name: string;
    value: string;
    page: Page;
    S: SArray;
    constructor(variable: VariableStruct, page: Page, S: SArray) {
        this.name = variable.name;
        this.value = variable.value;
        this.page = page;
        this.S = S;
    }
    async VariableCreate() {
        this.S.push([this.name.substring(2), this.value]);
    }
}

class Increment {
    name: string;
    page: Page;
    S: SArray;
    constructor(increment: IncrementStruct, page: Page, S: SArray) {
        this.name = increment.name;
        this.page = page;
        this.S = S;
    }
    async IncrementDone() {
        const number = findToS(this.name.substring(2), this.S);
        if (!(number instanceof Array) && number) {
            const index = this.S.indexOf([this.name.substring(2), number]);
            if (index !== -1) {
                this.S.splice(index, 1);
                this.S.push([this.name.substring(2), (Number(number) + 1).toString()]);
            }
        }
    }
}

class Decrement {
    name: string;
    page: Page;
    S: SArray;

    constructor(decrement: DecrementStruct, page: Page, S: SArray) {
        this.name = decrement.name;
        this.page = page;
        this.S = S;
    }

    async DecrementDone() {
        const number = findToS(this.name.substring(2), this.S);
        if (!(number instanceof Array) && number) {
            const index = this.S.indexOf([this.name.substring(2), number]);
            if (index !== -1) {
                this.S.splice(index, 1);
                this.S.push([this.name.substring(2), (Number(number) - 1).toString()]);
            }
        }
    }
}

export {Variable, Increment, Decrement};