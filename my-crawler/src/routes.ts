import {createPuppeteerRouter} from 'crawlee';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import {Scrape} from "./scrape.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const router = createPuppeteerRouter();

router.addDefaultHandler(async ({ page }) => {
    const pathToFile = path.join(__dirname, '../json/static_scrapemap_v4.json');
    const jsonString = fs.readFileSync(pathToFile).toString();
    const jsonObj = JSON.parse(jsonString);

    const scrape = new Scrape(jsonObj, jsonObj.beginProgram, page);
    scrape.LaunchProgram();
    // await Dataset.pushData(JSON.parse(JSON.stringify(scrape.S)));
});

