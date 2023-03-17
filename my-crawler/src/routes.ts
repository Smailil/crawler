import {createPuppeteerRouter} from 'crawlee';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import {Scrape} from "./scrape.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const router = createPuppeteerRouter();



router.addDefaultHandler(async ({ browserController, page }) => {
    const pathToFile = path.join(__dirname, '../json/tagesschau_root.json');
    const jsonString = fs.readFileSync(pathToFile).toString();
    const jsonObj = JSON.parse(jsonString);

    const scrape = new Scrape(browserController, jsonObj, jsonObj.beginProgram, page);
    await scrape.LaunchProgram();
});

