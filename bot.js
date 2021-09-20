const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({
        headless: false,
        downloadsPath: './downloads'
    })
    // Inicia um contexto de navegação com as configurações aqui também
    const context = await browser.newContext({
        acceptDownloads: true
    })

    // Abre uma nova página	
    const page = await context.newPage()

    // Vai pro link
    await page.goto('https://mve.vivo.com.br/login/cpf')

    await page.fill('#cpf', '10156010909')
    await page.keyboard.press('Enter')

    await page.fill('#email', 'faturas02@outlook.com')
    await page.fill('#password', 'Giovanella1407')
    await page.keyboard.press('Enter')


    if (page.innerText('#subtitle','Telefone do Gestor')) {
        await page.click('text=Atualizar depois')
    } else {
        await page.goBack()
        await page.goForward()
    }

    catch (error) {
        console.log('Não tem atualização')
    }








    
    const [ download ] = await Promise.all([
        page.waitForEvent('download'), // Espera o download
        await page.click('') // Clica no link de download
    ])

    // Garante que o arquivo já está na pasta
    const path = await download.path()

    // Salva o arquivo com o caminho e nome desejado
    await download.saveAs("./downloads/arquiv.txt")

    // ---------------------
    await context.close()
    await browser.close()
})

()