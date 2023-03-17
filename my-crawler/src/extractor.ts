import {Page} from "puppeteer";
import {SArray, ExtractorStruct} from "../auxiliary/type.js";
import {findToS} from "../auxiliary/auxiliaryFunction.js";

class Extractor {
    selector: string;
    name: string;
    multiple: boolean;
    page: Page
    S: SArray;
    constructor(extractor: ExtractorStruct, page:Page, S: SArray) {
        this.selector = extractor.selector;
        this.name = extractor.name;
        this.multiple = extractor.multiple;
        this.page = page;
        this.S = S;
    }
}

class TextExtractor extends Extractor {
    constructor(selectorObject: ExtractorStruct, page: Page, S: SArray) {
        super(selectorObject, page, S);
    }
    async GetTexts() {
        const rawSelector = this.selector.startsWith("S:") ?
            findToS(this.selector.substring(2), this.S): this.selector;
        if (!(rawSelector instanceof Array) && rawSelector) {
            try {
                if (this.multiple) {
                    this.S.push([
                        this.name.substring(2),
                        await this.page.$$eval(rawSelector, (elements) => {
                            return elements.map(element => element.textContent);
                        })
                    ]);
                } else {
                    this.S.push([
                        this.name.substring(2),
                        await this.page.$eval(rawSelector, element => element.textContent)
                    ]);
                }
            } catch (error) {
                this.S.push([this.name.substring(2), '']);
            }
        }
    }
}

class ImageExtractor extends Extractor {
    constructor(selectorObject: ExtractorStruct, page: Page, S: SArray) {
        super(selectorObject, page, S);
    }
    async GetImages() {
        const rawSelector = this.selector.startsWith("S:") ?
            findToS(this.selector.substring(2), this.S): this.selector;
        if (!(rawSelector instanceof Array) && rawSelector) {
            try {
                if (this.multiple) {
                    this.S.push([
                        this.name.substring(2),
                        await this.page.$$eval(rawSelector, (elements) => {
                            return elements.map(element => element.src);
                        })
                    ]);
                } else {
                    this.S.push([
                        this.name.substring(2),
                        await this.page.$eval(rawSelector, element => element.src)
                    ]);
                }
            } catch (error) {
                this.S.push([this.name.substring(2), '']);
            }
        }
    }
}

class UrlExtractor extends Extractor {
    constructor(selectorObject: ExtractorStruct, page: Page, S: SArray) {
        super(selectorObject, page, S);
    }
    async GetUrls() {
        const rawSelector = this.selector.startsWith("S:") ?
            findToS(this.selector.substring(2), this.S): this.selector;
        if (!(rawSelector instanceof Array) && rawSelector) {
            try {
                if (this.multiple) {
                    this.S.push([
                        this.name.substring(2),
                        await this.page.$$eval(rawSelector, (elements) => {
                            return elements.map(element => element.href);
                        })
                    ]);
                } else {
                    this.S.push([
                        this.name.substring(2),
                        await this.page.$eval(rawSelector, element => element.href)
                    ]);
                }
            } catch (error) {
                this.S.push([this.name.substring(2), '']);
            }
        }
    }
}



export {Extractor, TextExtractor, ImageExtractor, UrlExtractor};