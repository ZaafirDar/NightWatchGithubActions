import LoginPage from '../pageObjects/loginPage';

let platform: 'android' | 'ios';

describe('Login Page E2E Test', function() {
    beforeEach(async () => {
        platform = browser.options?.desiredCapabilities?.platformName?.toLowerCase() === 'android' ? 'android' : 'ios';
    });

    it('should be able to traverse to login screen', async () => {  
        const loginPage = new LoginPage(platform);
        await loginPage.tapLogin()
        await browser.pause(5000);
        await app.end();
    });
});
