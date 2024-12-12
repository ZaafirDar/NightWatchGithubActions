import loginPageLocator from '../locators/loginPage.json';
import loginPageData from '../data/loginPage.json';

export default class LoginPage {
    readonly emailLocator: string;
    readonly passwordLocator: string;
    readonly loginBtnLocator: string;

    constructor(platform: 'android' | 'ios') {
        const locators = platform === 'android' ? loginPageLocator.android : loginPageLocator.ios;
        this.emailLocator = locators.emailLocator;
        this.passwordLocator = locators.passwordLocator;
        this.loginBtnLocator = locators.loginBtnLocator;
    }

    async addEmail() {
        await app.useXpath().waitForElementVisible(this.emailLocator, 90000);
        app.useXpath().setValue(this.emailLocator, loginPageData.emailData);
    }

    async addPassword() {
        await app.useXpath().waitForElementPresent(this.passwordLocator, 50000);
        await app.useXpath().setValue(this.passwordLocator, loginPageData.passwordData);
    }

    async clickLoginButton() {
        await app.useXpath().waitForElementPresent(this.loginBtnLocator, 50000);
        await app.useXpath().click(this.loginBtnLocator);
    }

    async tapLogin() {
        await app.useXpath().waitForElementPresent(this.loginBtnLocator, 90000);
        await app.useXpath().click(this.loginBtnLocator)
    }
    
    async loginToApp() {
        await this.addEmail();
        await this.addPassword();
        await this.clickLoginButton();
    }

    async loginToAppWithCreds(email: string, password: string) {
        await app.useXpath().setValue(this.emailLocator, email);
        await app.useXpath().setValue(this.passwordLocator, password);
        await this.clickLoginButton();
    }
}