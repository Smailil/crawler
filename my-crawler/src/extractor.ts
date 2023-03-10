import {Page} from "puppeteer";

type SArray = [string, string | null | (string | null)[]][];
type ExtractorStruct = {
    id: number,
    type: string,
    subType: string,
    selector: string,
    name: string,
    multiple: boolean
}
class Extractor {
    selector: string;
    name: string;
    multiple: boolean;
    page: Page
    S: SArray;
    constructor(selectorObject: ExtractorStruct, page:Page, S: SArray) {
        this.selector = selectorObject.selector;
        this.name = selectorObject.name;
        this.multiple = selectorObject.multiple;
        this.page = page;
        this.S = S;
    }
}

class TextExtractor extends Extractor {
    constructor(selectorObject: ExtractorStruct, page: Page, S: SArray) {
        super(selectorObject, page, S);
    }
    async GetTexts() {
        const rawSelector = this.selector.startsWith("S:") ? this.selector.substring(2) : this.selector;
        await this.page.waitForSelector(rawSelector);
        if (this.multiple) {
            this.S.push([
                this.name.substring(2),
                await this.page.$$eval(rawSelector, (elements) => {
                    return elements.map(element => element.textContent);
                })
            ]);
        } else {
            this.S.push([this.name.substring(2),
                await this.page.$eval(rawSelector, element => element.textContent)]);
        }
    }
}

class ImageExtractor extends Extractor {
    constructor(selectorObject: ExtractorStruct, page: Page, S: SArray) {
        super(selectorObject, page, S);
    }
    async GetImages() {
        const rawSelector = this.selector.startsWith("S:") ? this.selector.substring(2) : this.selector;
        await this.page.waitForSelector(rawSelector);
        if (this.multiple) {
            this.S.push([
                this.name.substring(2),
                await this.page.$$eval(rawSelector, (elements) => {
                    return elements.map(element => element.src);
                })
            ]);
        } else {
            this.S.push([this.name.substring(2),
                await this.page.$eval(rawSelector, element => element.src)]);
            console.log(this.S);
        }
    }
}

class UrlExtractor extends Extractor {
    constructor(selectorObject: ExtractorStruct, page: Page, S: SArray) {
        super(selectorObject, page, S);
    }
    async GetUrls() {
        const rawSelector = this.selector.startsWith("S:") ? this.selector.substring(2) : this.selector;
        await this.page.waitForSelector(rawSelector);
        if (this.multiple) {
            this.S.push([
                this.name.substring(2),
                await this.page.$$eval(rawSelector, (elements) => {
                    return elements.map(element => element.href);
                })
            ]);
        } else {
            this.S.push([this.name.substring(2),
                await this.page.$eval(rawSelector, element => element.href)]);
        }
    }
}



export {Extractor, TextExtractor, ImageExtractor, UrlExtractor, SArray};