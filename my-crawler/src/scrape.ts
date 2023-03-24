import {Page} from "puppeteer";
import {
    TextExtractor,
    ImageExtractor,
    UrlExtractor,
    HTMLExtractor,
    TextFromHTMLExtractor, UrlFromHTMLExtractor, AttributeExtractor
} from "./extractor.js";
import {Goto} from "./goto.js";
import {BranchCondition} from "./branchCondition.js";
import {Scrapemap} from "./include.js";
import {SArray} from "../auxiliary/type.js";
import {Foreach, WhileLoop, WhileOnExists} from "./loop.js";
import PageManager from "./pageManager.js";
import {Scroll} from "./scroll.js";
import {Decrement, Increment, Variable} from "./variable.js";

class Scrape {
    browserController : PageManager;
    json: object
    program: string[];
    page: Page;
    S: SArray;
    constructor(browserController : PageManager, json: object, program: string[], page: Page, S?: SArray) {
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
                        case 'attribute':
                            const attribute = new AttributeExtractor(selector, this.page, this.S);
                            await attribute.GetAttributes();
                            break;
                        case 'html':
                            const html = new HTMLExtractor(selector, this.page, this.S);
                            await html.GetHTMLs();
                            break;
                        default:
                            console.log("Unknown extractor auxiliary");
                    }
                    break;
                case 'fromHTMLExtractor':
                    switch (selector.subType) {
                        case 'text':
                            const text = new TextFromHTMLExtractor(selector, this.page, this.S);
                            await text.GetTextFromHTMLs();
                            break;
                        case 'url':
                            const url = new UrlFromHTMLExtractor(selector, this.page, this.S);
                            await url.GetUrlsFromHTMLs();
                            break;
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
                case "scroll":
                    const scroll = new Scroll(selector, this.page);
                    await scroll.ScrollDone();
                    break;
                case "variable":
                    const variable = new Variable(selector, this.page, this.S);
                    await variable.VariableCreate();
                    break;
                case "increment":
                    const increment = new Increment(selector, this.page, this.S);
                    await increment.IncrementDone();
                    break;
                case "decrement":
                    const decrement = new Decrement(selector, this.page, this.S);
                    await decrement.DecrementDone();
                    break;
                case "while":
                    const whileLoop = new WhileLoop(this.browserController, this.json, selector, this.page, this.S);
                    await whileLoop.WhileLoopDone();
                    break;
                case "whileOnExists":
                    const whileOnExists = new WhileOnExists(this.browserController,
                        this.json, selector, this.page, this.S);
                    await whileOnExists.WhileOnExistsDone();
                    break;
                default:
                    console.log(`${selector.type} is not supported`);
            }
        }
    }
}

export {Scrape};
