const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.163.com/');
    await page.screenshot({
        path: `163-${new Date().getTime()}.png`,
        fullPage: false,
        clip: {
            x: 0,
            y: 0,
            width: 1000,
            height: 500,
        },
        omitBackground: true,
    });
    await browser.close();
})();