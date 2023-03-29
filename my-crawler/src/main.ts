import { PuppeteerCrawler } from 'crawlee';
import { router } from './routes.js';
import path from "path";
import fs from "fs";
import {fileURLToPath} from "url";
import {JSONStruct} from "../auxiliary/type.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const crawler = new PuppeteerCrawler({
    requestHandlerTimeoutSecs: 30000,
    headless: false,
    requestHandler: router,
});

const pathToFile = path.join(__dirname, '../json/mfagov_root.json');
const jsonString = fs.readFileSync(pathToFile).toString();
const jsonObj : JSONStruct = JSON.parse(jsonString);

if(jsonObj.startUrls)
    await crawler.addRequests(jsonObj.startUrls);

await crawler.run();