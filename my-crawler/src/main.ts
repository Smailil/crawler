// For more information, see https://crawlee.dev/
import { PuppeteerCrawler } from 'crawlee';
import { router } from './routes.js';


const startUrls = ['https://demo-site.at.ispras.ru/product/1'];

const crawler = new PuppeteerCrawler({
    // proxyConfiguration: new ProxyConfiguration({ proxyUrls: ['...'] }),
    headless: true,
    requestHandler: router,
});

await crawler.run(startUrls);
