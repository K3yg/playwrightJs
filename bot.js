const { chromium } = require('playwright');
(async () => {
    const browser = await chromium.launch({
        headless: false,
        downloadsPath: './downloads'
    });
    const context = await browser.newContext({
        acceptDownloads: true
    });
    // Abre uma nova página	
    const page = await context.newPage();
    // Vai pro link
    await page.goto('http://speedtest.tele2.net/');
    // Clica no link de download
    const [ download ] = await Promise.all([
        page.waitForEvent('download'), // Espera o download
        await page.click('text=1MB')
    ]);
    // Garante que o arquivo já está na pasta
    const path = await download.path()

    // Salva o arquivo com o caminho e nome desejado
    await download.saveAs("./downloads/arquiv.txt")

    // ---------------------
    await context.close();
    await browser.close();
})();