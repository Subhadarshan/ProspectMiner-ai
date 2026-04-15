import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import randomUseragent from "random-useragent";

puppeteer.use(StealthPlugin());

export const launchBrowser = async () => {
  const userAgent = randomUseragent.getRandom();

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();
  await page.setUserAgent(userAgent);

  return { browser, page };
};