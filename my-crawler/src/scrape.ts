import {Page} from "puppeteer";
import {
    TextExtractor,
    ImageExtractor,
    UrlExtractor,
    HTMLExtractor,
    TextFromHTMLExtractor, UrlFromHTMLExtractor, AttributeExtractor
} from "./extractor.js";
import {Goto} from "./goto.js";
import {BranchCondition, BranchConditionOnExists} from "./branchCondition.js";
import {Scrapemap} from "./include.js";
import {JSONStruct, SArray} from "../auxiliary/type.js";
import {Foreach, WhileLoop, WhileOnExists} from "./loop.js";
import PageManager from "./pageManager.js";
import {Scroll} from "./scroll.js";
import {Decrement, Increment, Variable} from "./variable.js";
import {Timeout} from "./timeout.js";
import {Click} from "./click";
import {Input} from "./input";

class Scrape {
    browserController : PageManager;
    json: JSONStruct;
    program: string[];
    page: Page;
    S: SArray;
    constructor(browserController : PageManager, json: JSONStruct, program: string[], page: Page, S?: SArray) {
        this.browserController = browserController;
        this.json = json;
        this.program = program;
        this.page = page;
        this.S = S || [];
    }
    async LaunchProgram() {
        for (const id of this.program) {
            const selector = this.json.selectors.find(selector => selector.id === id);
            if (selector) {
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
                        const branchCondition = new BranchCondition(this.browserController, this.json,
                            selector, this.page, this.S);
                        await branchCondition.BranchConditionDone();
                        break;
                    case 'branchConditionOnExists':
                        const branchConditionOnExists = new BranchConditionOnExists(this.browserController, this.json,
                            selector, this.page, this.S);
                        await branchConditionOnExists.BranchConditionOnExistsDone();
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
                    case "timeout":
                        const timeout = new Timeout(selector);
                        await timeout.TimeoutDone();
                        break;
                    case "click":
                        const click = new Click(selector, this.page, this.S);
                        await click.ClickDone();
                        break;
                    case "input":
                        const input = new Input(selector, this.page, this.S);
                        await input.InputDone();
                        break;
                    default:
                        console.log(`${selector.type} is not supported`);
                }
            }
        }
    }
}

export {Scrape};
