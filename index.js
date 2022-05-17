'use strict';

const puppeteer = require('puppeteer-extra');
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const readjson = require('./readjson.js');
const { bold, green,bgRed,yellow, blue } = require('kleur');

const fill = require('./fill.js');
const CF=require('./textcolor.js');
const sleep = require('./sleep.js');
// puppeteer.use(StealthPlugin());

(async () => {
    /////Config/////
    let URL_json =  await Promise.all([readjson('Gform','URL_')]);
    let URL = (URL_json[0])[0]
    ////////////////
    const headless = false
    
    //const pathToExtension = require('path').join(__dirname, './mpbjkejclgfgadiemmefgebjfooflfhl');



    try{
        var browser = await puppeteer.launch({
            headless: false,
            executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
            //executablePath: "chromedriver.exe",
            ignoreDefaultArgs: ["--enable-automation"],
            args: headless ? null : [
                `--app=${URL}`,
                '--disable-infobars','--start-maximized',
                '--window-size=900,800',
                //`--disable-extensions-except=${pathToExtension}`,
                //`--load-extension=${pathToExtension}`,
                '--disable-web-security',
                '--sampling-heap-profiler',
                '--disable-features=site-per-process',
                '--disable-dev-shm-usage',
                //'--no-sandbox',
                '--sampling-heap-profiler'],

            // defaultViewport: {
            //     width: 1920,
            //     height: 1080
            // }
            defaultViewport : null
            
        });
        }catch(e){
            var browser = await puppeteer.launch({
                headless: headless,
                executablePath: './chrome-win/chrome.exe',
                defaultViewport : null,
                ignoreDefaultArgs: ["--enable-automation"],
                args: headless ? null : [
                    `--app=${URL}`,
                    '--disable-infobars','--start-maximized',
                    '--window-size=900,800',
                    //`--disable-extensions-except=${pathToExtension}`,
                    //`--load-extension=${pathToExtension}`,
                    '--disable-web-security',
                    '--sampling-heap-profiler',
                    '--disable-features=site-per-process',
                    '--disable-dev-shm-usage',
                    //'--no-sandbox',
                    '--sampling-heap-profiler',
                ]
            })
            
        }
        
    

    var  page;
    page = (await browser.pages())[0];
    


    ///////////////////////////////////////
    const client = await page.target().createCDPSession();
    await client.send('Network.setCacheDisabled', {cacheDisabled: true});
    //หรือใช้แบบนี้เพื่อล้างแรม   await page.setCacheEnabled(false);
 
    ///////////////////////////////////////
    //await client.send('Overlay.setShowFPSCounter', { show: true });
    // await client.send('Network.clearBrowserCache');


//--------fill--------//
 await Promise.all([fill(page)])
//---------------------//



//--------Backtest--------//
    //await Promise.all([backtest(page)])
//---------------------//

// console.clear();    
// console.log(bold().white().bgGreen().italic('successfully...'));

CF('successfully..','shade','center')
await sleep(3)

await browser.close();
process.exit(1);
})();
