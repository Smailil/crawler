import {Page} from "puppeteer";
import {
    SArray,
    ExtractorStruct,
    FromHTMLExtractorStruct,
    TextManipulation,
    AttributeExtractorStruct
} from "../auxiliary/type.js";
import {findToS, textManipulation} from "../auxiliary/auxiliaryFunction.js";
import { JSDOM } from 'jsdom';

class Extractor {
    selector: string;
    name: string;
    multiple: boolean;
    textManipulation: TextManipulation;
    page: Page
    S: SArray;
    constructor(extractor: ExtractorStruct, page:Page, S: SArray) {
        this.selector = extractor.selector;
        this.name = extractor.name;
        this.multiple = extractor.multiple;
        this.textManipulation = extractor.textManipulation;
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
    textManipulation: TextManipulation;
    constructor(fromHTMLExtractor: FromHTMLExtractorStruct, page: Page, S: SArray) {
        this.html = fromHTMLExtractor.html;
        this.selector = fromHTMLExtractor.selector;
        this.name = fromHTMLExtractor.name;
        this.multiple = fromHTMLExtractor.multiple;
        this.textManipulation = fromHTMLExtractor.textManipulation;
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
            const previousValue = findToS(this.name.substring(2), this.S);
            try {
                if (this.multiple) {
                    const elements = await this.page.$$eval(rawSelector, (elements) => {
                        return elements.map(element => element.textContent ?? '');
                    });
                    if (previousValue === null) {
                        this.S.push([
                            this.name.substring(2),
                            textManipulation(elements, this.textManipulation)
                        ]);
                    }
                    else if (typeof previousValue === 'string') {
                        this.S.splice(this.S.findIndex(([key]) => key === this.name.substring(2)), 1);
                        this.S.push([
                            this.name.substring(2),
                            [previousValue, ...textManipulation(elements, this.textManipulation)]
                        ]);
                    }
                    else if (previousValue instanceof Array && previousValue.every((val) => typeof val === 'string')) {
                        this.S.splice(this.S.findIndex(([key]) => key === this.name.substring(2)), 1);
                        this.S.push([
                            this.name.substring(2),
                            [...(previousValue as string[]),
                                ...textManipulation(elements, this.textManipulation)]
                        ]);
                    }
                } else {
                    const element = await this.page.$eval(rawSelector, element =>
                        element.textContent ?? '');
                    if (previousValue === null) {
                        this.S.push([
                            this.name.substring(2),
                            textManipulation(element, this.textManipulation)
                        ]);
                    }
                    else if (typeof previousValue === 'string') {
                        this.S.splice(this.S.findIndex(([key]) => key === this.name.substring(2)), 1);
                        this.S.push([
                            this.name.substring(2),
                            [previousValue, textManipulation(element, this.textManipulation) as string]
                        ]);
                    }
                    else if (previousValue instanceof Array && previousValue.every((val) => typeof val === 'string')) {
                        this.S.splice(this.S.findIndex(([key]) => key === this.name.substring(2)), 1);
                        this.S.push([
                            this.name.substring(2),
                            [...(previousValue as string[]),
                                textManipulation(element, this.textManipulation) as string]
                        ]);
                    }
                }
            } catch (error) {
                if (previousValue === null) {
                    this.S.push([this.name.substring(2), '']);
                }
                else if (typeof previousValue === 'string') {
                    this.S.splice(this.S.findIndex(([key]) => key === this.name.substring(2)), 1);
                    this.S.push([this.name.substring(2), [previousValue, '']]);
                }
                else if (previousValue instanceof Array && previousValue.every((val) => typeof val === 'string')) {
                    this.S.splice(this.S.findIndex(([key]) => key === this.name.substring(2)), 1);
                    this.S.push([this.name.substring(2), [...(previousValue as string[]), '']]);
                }
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
            const previousValue = findToS(this.name.substring(2), this.S);
            try {
                if (this.multiple) {
                    const elements = await this.page.$$eval(rawSelector, (elements) => {
                        return elements.map(element => (element as HTMLImageElement).src ?? '');
                    });
                    if (previousValue === null) {
                        this.S.push([
                            this.name.substring(2),
                            textManipulation(elements, this.textManipulation)
                        ]);
                    }
                    else if (typeof previousValue === 'string') {
                        this.S.splice(this.S.findIndex(([key]) => key === this.name.substring(2)), 1);
                        this.S.push([
                            this.name.substring(2),
                            [previousValue, ...textManipulation(elements, this.textManipulation)]
                        ]);
                    }
                    else if (previousValue instanceof Array && previousValue.every((val) => typeof val === 'string')) {
                        this.S.splice(this.S.findIndex(([key]) => key === this.name.substring(2)), 1);
                        this.S.push([
                            this.name.substring(2),
                            [...(previousValue as string[]),
                                ...textManipulation(elements, this.textManipulation)]
                        ]);
                    }
                } else {
                    const element = await this.page.$eval(rawSelector, element => (element as HTMLImageElement).src ?? '');
                    if (previousValue === null) {
                        this.S.push([
                            this.name.substring(2),
                            textManipulation(element, this.textManipulation)
                        ]);
                    }
                    else if (typeof previousValue === 'string') {
                        this.S.splice(this.S.findIndex(([key]) => key === this.name.substring(2)), 1);
                        this.S.push([
                            this.name.substring(2),
                            [previousValue, textManipulation(element, this.textManipulation) as string]
                        ]);
                    }
                    else if (previousValue instanceof Array && previousValue.every((val) => typeof val === 'string')) {
                        this.S.splice(this.S.findIndex(([key]) => key === this.name.substring(2)), 1);
                        this.S.push([
                            this.name.substring(2),
                            [...(previousValue as string[]),
                                textManipulation(element, this.textManipulation) as string]
                        ]);
                    }
                }
            } catch (error) {
                if (previousValue === null) {
                    this.S.push([this.name.substring(2), '']);
                }
                else if (typeof previousValue === 'string') {
                    this.S.splice(this.S.findIndex(([key]) => key === this.name.substring(2)), 1);
                    this.S.push([this.name.substring(2), [previousValue, '']]);
                }
                else if (previousValue instanceof Array && previousValue.every((val) => typeof val === 'string')) {
                    this.S.splice(this.S.findIndex(([key]) => key === this.name.substring(2)), 1);
                    this.S.push([this.name.substring(2), [...(previousValue as string[]), '']]);
                }
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
            const previousValue = findToS(this.name.substring(2), this.S);
            try {
                if (this.multiple) {
                    const elements = await this.page.$$eval(rawSelector, (elements) => {
                        return elements.map(element => (element as HTMLAnchorElement).href ?? '');
                    })
                    if (previousValue === null) {
                        this.S.push([
                            this.name.substring(2),
                            textManipulation(elements, this.textManipulation)
                        ]);
                    }
                    else if (typeof previousValue === 'string') {
                        this.S.splice(this.S.findIndex(([key]) => key === this.name.substring(2)), 1);
                        this.S.push([
                            this.name.substring(2),
                            [previousValue, ...textManipulation(elements, this.textManipulation)]
                        ]);
                    }
                    else if (previousValue instanceof Array && previousValue.every((val) => typeof val === 'string')) {
                        this.S.splice(this.S.findIndex(([key]) => key === this.name.substring(2)), 1);
                        this.S.push([
                            this.name.substring(2),
                            [...(previousValue as string[]),
                                ...textManipulation(elements, this.textManipulation)]
                        ]);
                    }
                } else {
                    const element = await this.page.$eval(rawSelector, element => (element as HTMLAnchorElement).href ?? '');
                    if (previousValue === null) {
                        this.S.push([
                            this.name.substring(2),
                            textManipulation(element, this.textManipulation)
                        ]);
                    }
                    else if (typeof previousValue === 'string') {
                        this.S.splice(this.S.findIndex(([key]) => key === this.name.substring(2)), 1);
                        this.S.push([
                            this.name.substring(2),
                            [previousValue, textManipulation(element, this.textManipulation) as string]
                        ]);
                    }
                    else if (previousValue instanceof Array && previousValue.every((val) => typeof val === 'string')) {
                        this.S.splice(this.S.findIndex(([key]) => key === this.name.substring(2)), 1);
                        this.S.push([
                            this.name.substring(2),
                            [...(previousValue as string[]),
                                textManipulation(element, this.textManipulation) as string]
                        ]);
                    }
                }
            } catch (error) {
                if (previousValue === null) {
                    this.S.push([this.name.substring(2), '']);
                }
                else if (typeof previousValue === 'string') {
                    this.S.splice(this.S.findIndex(([key]) => key === this.name.substring(2)), 1);
                    this.S.push([this.name.substring(2), [previousValue, '']]);
                }
                else if (previousValue instanceof Array && previousValue.every((val) => typeof val === 'string')) {
                    this.S.splice(this.S.findIndex(([key]) => key === this.name.substring(2)), 1);
                    this.S.push([this.name.substring(2), [...(previousValue as string[]), '']]);
                }
            }
        }
    }
}

class AttributeExtractor {
    selector: string;
    name: string;
    attribute: string;
    multiple: boolean;
    page: Page;
    S: SArray;
    textManipulation: TextManipulation;
    constructor(extractor: AttributeExtractorStruct, page: Page, S: SArray) {
        this.selector = extractor.selector;
        this.name = extractor.name;
        this.attribute = extractor.attribute;
        this.multiple = extractor.multiple;
        this.textManipulation = extractor.textManipulation;
        this.page = page;
        this.S = S;
    }
    async GetAttributes() {
        const rawSelector = this.selector.startsWith("S:") ?
            findToS(this.selector.substring(2), this.S): this.selector;
        if (!(rawSelector instanceof Array) && rawSelector) {
            const previousValue = findToS(this.name.substring(2), this.S);
            try {
                if (this.multiple) {
                    const elements = await this.page.$$eval(rawSelector,
                        (elements, attribute) => {
                        return elements.map(element => element.getAttribute(attribute) ?? '');
                    }, this.attribute);

                    if (previousValue === null) {
                        this.S.push([
                            this.name.substring(2),
                            textManipulation(elements, this.textManipulation)
                        ]);
                    }
                    else if (typeof previousValue === 'string') {
                        this.S.splice(this.S.findIndex(([key]) => key === this.name.substring(2)), 1);
                        this.S.push([
                            this.name.substring(2),
                            [previousValue, ...textManipulation(elements, this.textManipulation)]
                        ]);
                    }
                    else if (previousValue instanceof Array && previousValue.every((val) => typeof val === 'string')) {
                        this.S.splice(this.S.findIndex(([key]) => key === this.name.substring(2)), 1);
                        this.S.push([
                            this.name.substring(2),
                            [...(previousValue as string[]),
                                ...textManipulation(elements, this.textManipulation)]
                        ]);
                    }
                } else {
                    const element = await this.page.$eval(rawSelector,
                        (element, attribute) => element.getAttribute(attribute) ?? '', this.attribute);
                    if (previousValue === null) {
                        this.S.push([
                            this.name.substring(2),
                            textManipulation(element, this.textManipulation)
                        ]);
                    }
                    else if (typeof previousValue === 'string') {
                        this.S.splice(this.S.findIndex(([key]) => key === this.name.substring(2)), 1);
                        this.S.push([
                            this.name.substring(2),
                            [previousValue, textManipulation(element, this.textManipulation) as string]
                        ]);
                    }
                    else if (previousValue instanceof Array && previousValue.every((val) => typeof val === 'string')) {
                        this.S.splice(this.S.findIndex(([key]) => key === this.name.substring(2)), 1);
                        this.S.push([
                            this.name.substring(2),
                            [...(previousValue as string[]),
                                textManipulation(element, this.textManipulation) as string]
                        ]);
                    }
                }
            } catch (error) {
                if (previousValue === null) {
                    this.S.push([this.name.substring(2), '']);
                }
                else if (typeof previousValue === 'string') {
                    this.S.splice(this.S.findIndex(([key]) => key === this.name.substring(2)), 1);
                    this.S.push([this.name.substring(2), [previousValue, '']]);
                }
                else if (previousValue instanceof Array && previousValue.every((val) => typeof val === 'string')) {
                    this.S.splice(this.S.findIndex(([key]) => key === this.name.substring(2)), 1);
                    this.S.push([this.name.substring(2), [...(previousValue as string[]), '']]);
                }
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
            const previousValue = findToS(this.name.substring(2), this.S);
            try {
                if (this.multiple) {
                    const elements = await this.page.$$eval(rawSelector, (elements) => {
                        return elements.map(element => element.innerHTML ?? '');
                    })
                    if (previousValue === null) {
                        this.S.push([
                            this.name.substring(2),
                            textManipulation(elements, this.textManipulation)
                        ]);
                    }
                    else if (typeof previousValue === 'string') {
                        this.S.splice(this.S.findIndex(([key]) => key === this.name.substring(2)), 1);
                        this.S.push([
                            this.name.substring(2),
                            [previousValue, ...textManipulation(elements, this.textManipulation)]
                        ]);
                    }
                    else if (previousValue instanceof Array && previousValue.every((val) => typeof val === 'string')) {
                        this.S.splice(this.S.findIndex(([key]) => key === this.name.substring(2)), 1);
                        this.S.push([
                            this.name.substring(2),
                            [...(previousValue as string[]),
                                ...textManipulation(elements, this.textManipulation)]
                        ]);
                    }
                } else {
                    const element = await this.page.$eval(rawSelector, element => element.innerHTML ?? '');
                    if (previousValue === null) {
                        this.S.push([
                            this.name.substring(2),
                            textManipulation(element, this.textManipulation)
                        ]);
                    }
                    else if (typeof previousValue === 'string') {
                        this.S.splice(this.S.findIndex(([key]) => key === this.name.substring(2)), 1);
                        this.S.push([
                            this.name.substring(2),
                            [previousValue, textManipulation(element, this.textManipulation) as string]
                        ]);
                    }
                    else if (previousValue instanceof Array && previousValue.every((val) => typeof val === 'string')) {
                        this.S.splice(this.S.findIndex(([key]) => key === this.name.substring(2)), 1);
                        this.S.push([
                            this.name.substring(2),
                            [...(previousValue as string[]),
                                textManipulation(element, this.textManipulation) as string]
                        ]);
                    }
                }
            } catch (error) {
                if (previousValue === null) {
                    this.S.push([this.name.substring(2), '']);
                }
                else if (typeof previousValue === 'string') {
                    this.S.splice(this.S.findIndex(([key]) => key === this.name.substring(2)), 1);
                    this.S.push([this.name.substring(2), [previousValue, '']]);
                }
                else if (previousValue instanceof Array && previousValue.every((val) => typeof val === 'string')) {
                    this.S.splice(this.S.findIndex(([key]) => key === this.name.substring(2)), 1);
                    this.S.push([this.name.substring(2), [...(previousValue as string[]), '']]);
                }
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
            const previousValue = findToS(this.name.substring(2), this.S);
            try {
                // Parse the HTML string using JSDOM
                const { window } = new JSDOM(rawHTML);
                const { document } = window;

                if (this.multiple) {
                    const elements = document.querySelectorAll(rawSelector as keyof HTMLElementTagNameMap);
                    const textContents = Array.from(elements).map(element =>
                        (element as Element).textContent ?? '');
                    if (previousValue === null) {
                        this.S.push([
                            this.name.substring(2),
                            textManipulation(textContents, this.textManipulation)
                        ]);
                    }
                    else if (typeof previousValue === 'string') {
                        this.S.splice(this.S.findIndex(([key]) => key === this.name.substring(2)), 1);
                        this.S.push([
                            this.name.substring(2),
                            [previousValue, ...textManipulation(textContents, this.textManipulation)]
                        ]);
                    }
                    else if (previousValue instanceof Array && previousValue.every((val) => typeof val === 'string')) {
                        this.S.splice(this.S.findIndex(([key]) => key === this.name.substring(2)), 1);
                        this.S.push([
                            this.name.substring(2),
                            [...(previousValue as string[]),
                                ...textManipulation(textContents, this.textManipulation)]
                        ]);
                    }
                } else {
                    const element = document.querySelector(rawSelector as keyof HTMLElementTagNameMap);
                    const textContent = (element as Element).textContent ?? '';
                    if (previousValue === null) {
                        this.S.push([
                            this.name.substring(2),
                            textManipulation(textContent, this.textManipulation)
                        ]);
                    }
                    else if (typeof previousValue === 'string') {
                        this.S.splice(this.S.findIndex(([key]) => key === this.name.substring(2)), 1);
                        this.S.push([
                            this.name.substring(2),
                            [previousValue, textManipulation(textContent, this.textManipulation) as string]
                        ]);
                    }
                    else if (previousValue instanceof Array && previousValue.every((val) => typeof val === 'string')) {
                        this.S.splice(this.S.findIndex(([key]) => key === this.name.substring(2)), 1);
                        this.S.push([
                            this.name.substring(2),
                            [...(previousValue as string[]),
                                textManipulation(textContent, this.textManipulation) as string]
                        ]);
                    }
                }
            } catch (error) {
                if (previousValue === null) {
                    this.S.push([this.name.substring(2), '']);
                }
                else if (typeof previousValue === 'string') {
                    this.S.splice(this.S.findIndex(([key]) => key === this.name.substring(2)), 1);
                    this.S.push([this.name.substring(2), [previousValue, '']]);
                }
                else if (previousValue instanceof Array && previousValue.every((val) => typeof val === 'string')) {
                    this.S.splice(this.S.findIndex(([key]) => key === this.name.substring(2)), 1);
                    this.S.push([this.name.substring(2), [...(previousValue as string[]), '']]);
                }
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
            const previousValue = findToS(this.name.substring(2), this.S);
            try {
                // Parse the HTML string using JSDOM
                const { window } = new JSDOM(rawHTML);
                const { document } = window;

                if (this.multiple) {
                    const elements = document.querySelectorAll(rawSelector as keyof HTMLElementTagNameMap);
                    const hrefs = Array.from(elements).map(element =>
                        (element as HTMLAnchorElement).href ?? '');
                    if (previousValue === null) {
                        this.S.push([
                            this.name.substring(2),
                            textManipulation(hrefs, this.textManipulation)
                        ]);
                    }
                    else if (typeof previousValue === 'string') {
                        this.S.splice(this.S.findIndex(([key]) => key === this.name.substring(2)), 1);
                        this.S.push([
                            this.name.substring(2),
                            [previousValue, ...textManipulation(hrefs, this.textManipulation)]
                        ]);
                    }
                    else if (previousValue instanceof Array && previousValue.every((val) => typeof val === 'string')) {
                        this.S.splice(this.S.findIndex(([key]) => key === this.name.substring(2)), 1);
                        this.S.push([
                            this.name.substring(2),
                            [...(previousValue as string[]),
                                ...textManipulation(hrefs, this.textManipulation)]
                        ]);
                    }
                } else {
                    const element = document.querySelector(rawSelector as keyof HTMLElementTagNameMap);
                    const href = (element as HTMLAnchorElement)?.href ?? '';
                    if (previousValue === null) {
                        this.S.push([
                            this.name.substring(2),
                            textManipulation(href, this.textManipulation)
                        ]);
                    }
                    else if (typeof previousValue === 'string') {
                        this.S.splice(this.S.findIndex(([key]) => key === this.name.substring(2)), 1);
                        this.S.push([
                            this.name.substring(2),
                            [previousValue, textManipulation(href, this.textManipulation) as string]
                        ]);
                    }
                    else if (previousValue instanceof Array && previousValue.every((val) => typeof val === 'string')) {
                        this.S.splice(this.S.findIndex(([key]) => key === this.name.substring(2)), 1);
                        this.S.push([
                            this.name.substring(2),
                            [...(previousValue as string[]),
                                textManipulation(href, this.textManipulation) as string]
                        ]);
                    }
                }
            } catch (error) {
                if (previousValue === null) {
                    this.S.push([this.name.substring(2), '']);
                }
                else if (typeof previousValue === 'string') {
                    this.S.splice(this.S.findIndex(([key]) => key === this.name.substring(2)), 1);
                    this.S.push([this.name.substring(2), [previousValue, '']]);
                }
                else if (previousValue instanceof Array && previousValue.every((val) => typeof val === 'string')) {
                    this.S.splice(this.S.findIndex(([key]) => key === this.name.substring(2)), 1);
                    this.S.push([this.name.substring(2), [...(previousValue as string[]), '']]);
                }
            }
        }
    }
}


export {TextExtractor, ImageExtractor, UrlExtractor, AttributeExtractor, HTMLExtractor, FromHTMLExtractor,
    TextFromHTMLExtractor, UrlFromHTMLExtractor};