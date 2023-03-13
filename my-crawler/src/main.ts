// For more information, see https://crawlee.dev/
import { PuppeteerCrawler } from 'crawlee';
import { router } from './routes.js';


const startUrls = ['https://www.liberte-algerie.com/actualite/la-csa-annonce-un-mouvement-de-protestation-376434'];

const crawler = new PuppeteerCrawler({
    // proxyConfiguration: new ProxyConfiguration({ proxyUrls: ['...'] }),
    headless: true,
    requestHandler: router,
});

await crawler.run(startUrls);
