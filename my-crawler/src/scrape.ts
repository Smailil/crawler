import {Page} from "puppeteer";
import {SArray, TextExtractor, ImageExtractor, UrlExtractor} from "./extractor.js";

class Scrape {
    json: object
    program: number[];
    page: Page;
    S: SArray;
    constructor(json: object, program: number[], page: Page) {
        this.json = json;
        this.program = program;
        this.page = page;
        this.S = [];
    }
    // this function used to foreach the program array
    LaunchProgram() {
        this.program.forEach(async id => {
            const selector = this.json.selectors.find(selector => selector.id === id);
            switch (selector.type) {
                case 'extractor':
                    switch (selector.subType) {
                        case 'text':
                            const text = new TextExtractor(selector, this.page, this.S);
                            await text.GetTexts();
                            break;
                        case 'image':
                            const image = new ImageExtractor(selector, this.page, this.S);
                            await image.GetImages();
                            break;
                        case 'url':
                            const url = new UrlExtractor(selector, this.page, this.S);
                            await url.GetUrls();
                            break;
                        default:
                            console.log("Unknown extractor type");
                    }
                    break;
                    default:
                        console.log(`${selector.type} is not supported`);
            }
        })
    }
}

export {Scrape};
