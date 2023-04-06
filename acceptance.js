const {remote} = require('webdriverio');
const assert = require('assert');

let browser;

;(async () =>{
    browser = await remote({
        capabilities: {browserName: 'chrome'}
    })

    await browser.navigateTo('https://bmi-app-web-service.onrender.com')

    const heighInput = await browser.$('#height')
    await heighInput.setValue('1.88')

    const weightInput = await browser.$('#weight')
    await weightInput.setValue('70')

    const submitBtn = await browser.$('#calculateBtn')
    await submitBtn.click()

    const pageTitle = await browser.getTitle();

    assert(pageTitle === 'BMI Results');
    await browser.deleteSession();
})().catch((err) =>{
    console.error(err);
    return browser.deleteSession();
})