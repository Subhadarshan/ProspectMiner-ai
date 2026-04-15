import { launchBrowser } from "./stealthBrowser.js";

export const scrapeGoogleMaps = async (query, jobId) => {

  const { browser, page } = await launchBrowser();

  const url = `https://www.google.com/maps/search/${encodeURIComponent(query)}`;

  await page.goto(url, { waitUntil: "networkidle2" });

  await new Promise(r => setTimeout(r, 5000));

  await page.evaluate(async () => {

    const scrollable = document.querySelector('div[role="feed"]');

    if (!scrollable) return;

    for (let i = 0; i < 8; i++) {

      scrollable.scrollBy(0, 1000);

      await new Promise(r => setTimeout(r, 2000));
    }

  });

  const [inputCategory, inputLocation] = query.split(" in ");

  const leads = await page.evaluate(({ jobId, inputCategory, inputLocation }) => {

    const data = [];
    const listings = document.querySelectorAll('div[role="article"]');

    listings.forEach(item => {

      const name = item.querySelector(".qBF1Pd")?.innerText || "";
      const rating = item.querySelector(".MW4etd")?.innerText || "";

      const infoSpans = Array.from(item.querySelectorAll(".W4Efsd span"))
        .map(el => el.innerText.trim())
        .filter(t => t !== "");

      let category = "";
      let address = "";
      let phone = "";

      infoSpans.forEach(text => {

        if (!category && text.match(/hospital|clinic|gym|restaurant|school|company|store|shop/i)) {
          category = text;
        }

        if (!address && text.match(/road|rd|street|st|ave|nagar|colony|area|india/i)) {
          address = text;
        }

        if (!phone && text.match(/\d{5,}/)) {
          phone = text.replace(/[^\d+]/g, "");
        }

      });

      if (!category) {
        category = inputCategory || "";
      }

      if (!address) {
        address = inputLocation || "";
      } else if (!address.toLowerCase().includes(inputLocation.toLowerCase())) {
        address = address + ", " + inputLocation;
      }

      const website =
        item.querySelector('a[data-value="Website"]')?.href || "";

      data.push({
        name,
        category,
        address,
        rating,
        website,
        phone,
        jobId
      });

    });

    return data;

  }, { jobId, inputCategory, inputLocation });

  await browser.close();

  return leads;

};