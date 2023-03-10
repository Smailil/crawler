import {createPuppeteerRouter, Dataset} from 'crawlee';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import {Scrape} from "./scrape.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const router = createPuppeteerRouter();

interface StoObject {
    [key: string]: string | null | (string | null)[];
}

router.addDefaultHandler(async ({ page }) => {
    const pathToFile = path.join(__dirname, '../json/static_scrapemap_v4.json');
    const jsonString = fs.readFileSync(pathToFile).toString();
    const jsonObj = JSON.parse(jsonString);

    const scrape = new Scrape(jsonObj, jsonObj.beginProgram, page);
    await scrape.LaunchProgram();

    const SObject: StoObject = scrape.S.reduce((acc: StoObject, [key, value]) => {
        acc[key] = value;
        return acc;
    }, {});

    await Dataset.pushData(SObject);
});

