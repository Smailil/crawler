import { PuppeteerCrawler } from 'crawlee';
import { router } from './routes.js';
import path from "path";
import fs from "fs";
import {fileURLToPath} from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const crawler = new PuppeteerCrawler({
    headless: true,
    requestHandler: router,
});

const pathToFile = path.join(__dirname, '../json/someRootMap.json');
const jsonString = fs.readFileSync(pathToFile).toString();
const jsonObj = JSON.parse(jsonString);

await crawler.addRequests(jsonObj.startUrls);

await crawler.run();

export { jsonObj };
