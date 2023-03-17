import {Page} from "puppeteer";
import {SArray, ExtractorStruct, FromHTMLExtractorStruct} from "../auxiliary/type.js";
import {findToS} from "../auxiliary/auxiliaryFunction.js";
import { JSDOM } from 'jsdom';

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

class FromHTMLExtractor {
    html: string;
    selector: string;
    name: string;
    multiple: boolean;
    page: Page;
    S: SArray;
    constructor(fromHTMLExtractor: FromHTMLExtractorStruct, page: Page, S: SArray) {
        this.html = fromHTMLExtractor.html;
        this.selector = fromHTMLExtractor.selector;
        this.name = fromHTMLExtractor.name;
        this.multiple = fromHTMLExtractor.multiple;
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
                            return elements.map(element => (element.textContent ?? '').trim());
                        })
                    ]);
                } else {
                    this.S.push([
                        this.name.substring(2),
                        await this.page.$eval(rawSelector, element => (element.textContent ?? '').trim())
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

class HTMLExtractor extends Extractor {
    constructor(selectorObject: ExtractorStruct, page: Page, S: SArray) {
        super(selectorObject, page, S);
    }
    async GetHTMLs() {
        const rawSelector = this.selector.startsWith("S:") ?
            findToS(this.selector.substring(2), this.S) : this.selector;
        if (!(rawSelector instanceof Array) && rawSelector) {
            try {
                if (this.multiple) {
                    this.S.push([
                        this.name.substring(2),
                        await this.page.$$eval(rawSelector, (elements) => {
                            return elements.map(element => element.innerHTML);
                        })
                    ]);
                } else {
                    this.S.push([
                        this.name.substring(2),
                        await this.page.$eval(rawSelector, element => element.innerHTML)
                    ]);
                }
            } catch (error) {
                this.S.push([this.name.substring(2), '']);
            }
        }
    }
}

class TextFromHTMLExtractor extends FromHTMLExtractor {
    constructor(fromHTMLExtractor: FromHTMLExtractorStruct, page: Page, S: SArray) {
        super(fromHTMLExtractor, page, S);
    }
    async GetTextFromHTMLs() {
        const rawSelector = this.selector.startsWith("S:") ?
            findToS(this.selector.substring(2), this.S) : this.selector;
        const rawHTML = this.html.startsWith("S:") ?
            findToS(this.html.substring(2), this.S) : this.html;
        if (!(rawSelector instanceof Array) && rawSelector && !(rawHTML instanceof Array) && rawHTML) {
            try {
                // Parse the HTML string using JSDOM
                const { window } = new JSDOM(rawHTML);
                const { document } = window;

                if (this.multiple) {
                    const elements = document.querySelectorAll(rawSelector as keyof HTMLElementTagNameMap);
                    const textContents = Array.from(elements).map(element => (element as Element).textContent?.trim() ?? '');
                    this.S.push([
                        this.name.substring(2),
                        textContents,
                    ]);
                } else {
                    const element = document.querySelector(rawSelector as keyof HTMLElementTagNameMap);
                    const textContent = (element as Element)?.textContent?.trim() ?? '';
                    this.S.push([
                        this.name.substring(2),
                        textContent,
                    ]);
                }
            } catch (error) {
                this.S.push([this.name.substring(2), '']);
            }
        }
    }
}

class UrlFromHTMLExtractor extends FromHTMLExtractor {
    constructor(fromHTMLExtractor: FromHTMLExtractorStruct, page: Page, S: SArray) {
        super(fromHTMLExtractor, page, S);
    }
    async GetUrlsFromHTMLs() {
        const rawSelector = this.selector.startsWith("S:") ?
            findToS(this.selector.substring(2), this.S) : this.selector;
        const rawHTML = this.html.startsWith("S:") ?
            findToS(this.html.substring(2), this.S) : this.html;
        if (!(rawSelector instanceof Array) && rawSelector && !(rawHTML instanceof Array) && rawHTML) {
            try {
                // Parse the HTML string using JSDOM
                const { window } = new JSDOM(rawHTML);
                const { document } = window;

                if (this.multiple) {
                    const elements = document.querySelectorAll(rawSelector as keyof HTMLElementTagNameMap);
                    const hrefs = Array.from(elements).map(element => (element as HTMLAnchorElement).href ?? '');
                    this.S.push([
                        this.name.substring(2),
                        hrefs,
                    ]);
                } else {
                    const element = document.querySelector(rawSelector as keyof HTMLElementTagNameMap);
                    const href = (element as HTMLAnchorElement)?.href ?? '';
                    this.S.push([
                        this.name.substring(2),
                        href,
                    ]);
                }
            } catch (error) {
                this.S.push([this.name.substring(2), '']);
            }
        }
    }
}

export {TextExtractor, ImageExtractor, UrlExtractor, HTMLExtractor, FromHTMLExtractor,
    TextFromHTMLExtractor, UrlFromHTMLExtractor};