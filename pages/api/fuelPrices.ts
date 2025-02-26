import { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // fake a real website
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36");

    await page.goto("https://www.autocentrum.pl/paliwa/ceny-paliw/", { waitUntil: "networkidle2" });

    // wait for the table to load
    await page.waitForSelector("table.petrols-table", { visible: true, timeout: 10000 });

    // get all fuel types 
    const fuelTypes = ["Benzyna 95", "Benzyna 98", "Diesel", "Diesel+", "LPG"];

    const fuelPrices = await page.evaluate((fuelTypes) => {
      let data: Record<string, number> = {};
      let rows = document.querySelectorAll("table.petrols-table tbody tr");
      let lastRow = rows[rows.length - 1]; // last table row

      if (lastRow) {
        let cells = lastRow.querySelectorAll("td");
        //get the prices
        fuelTypes.forEach((fuel, index) => {
          let price = cells[index + 1]?.textContent?.trim().replace(",", ".") || "";
          if (fuel && price) {
            data[fuel] = parseFloat(price);
          }
        });
      }

      return data;
    }, fuelTypes);

    await browser.close();
    res.status(200).json(fuelPrices);
  } catch (error) {
    res.status(500).json({ error: "Błąd pobierania danych", details: (error as Error).message });
  }
}
