import {createPuppeteerRouter} from 'crawlee';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import {Scrape} from "./scrape.js";
import PageManager from "./pageManager.js";
import {JSONStruct} from "../auxiliary/type.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const router = createPuppeteerRouter();



router.addDefaultHandler(async ({ browserController, page }) => {
    const pathToFile = path.join(__dirname, '../json/liberte_root.json');
    const jsonString = fs.readFileSync(pathToFile).toString();
    const jsonObj : JSONStruct = JSON.parse(jsonString);

    const pageManager = new PageManager(browserController, 10);

    const scrape = new Scrape(pageManager, jsonObj, jsonObj.beginProgram, page);
    await scrape.LaunchProgram();
});

