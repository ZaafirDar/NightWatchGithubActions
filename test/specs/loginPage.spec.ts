import LoginPage from '../pageObjects/loginPage';

let platform: 'android' | 'ios';

describe('Login Page E2E Test', function() {
    beforeEach(async () => {
        platform = browser.options?.desiredCapabilities?.platformName?.toLowerCase() === 'android' ? 'android' : 'ios';
    });

    it('should be able to verify notification Icon on Home Screen', async () => {  
        const loginPage = new LoginPage(platform);
        await loginPage.loginToApp();
        await browser.pause(20000);
        await app.end();
    });
});
