import {Page} from "puppeteer";
import {PuppeteerController} from "@crawlee/browser-pool";
import {TextExtractor, ImageExtractor, UrlExtractor} from "./extractor.js";
import {Goto} from "./goto.js";
import {BranchCondition} from "./branchCondition.js";
import {Scrapemap} from "./include.js";
import {SArray} from "../auxiliary/type.js";
import {Foreach} from "./loop.js";

class Scrape {
    browserController: PuppeteerController;
    json: object
    program: string[];
    page: Page;
    S: SArray;
    constructor(browserController : PuppeteerController, json: object, program: string[], page: Page, S?: SArray) {
        this.browserController = browserController;
        this.json = json;
        this.program = program;
        this.page = page;
        this.S = S || [];
    }
    async LaunchProgram() {
        for (const id of this.program) {
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
                            console.log("Unknown extractor auxiliary");
                    }
                    break;
                case 'goto':
                    const goto = new Goto(selector, this.page, this.S);
                    await goto.GotoDone();
                    break;
                case 'branchCondition':
                    const branchCondition = new BranchCondition(this.browserController, this.json, selector, this.page, this.S);
                    await branchCondition.BranchConditionDone();
                    break;
                case "include":
                    const include = new Scrapemap(this.browserController, selector, this.page, this.S);
                    await include.ScrapemapDone();
                    break;
                case "foreach":
                    const foreach = new Foreach(this.browserController, this.json, selector, this.page, this.S);
                    await foreach.ForeachDone();
                    break;
                default:
                    console.log(`${selector.type} is not supported`);
            }
        }
    }
}

export {Scrape};
