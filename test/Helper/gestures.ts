const TIMEOUT = 8000;

export default class Gestures {
    private platform: 'android' | 'ios';

    constructor(platform: 'android' | 'ios') {
        this.platform = platform;
    }

    // Instance-based method to wait for element presence, suppressing errors (Android only)
    async waitForElementPresentSuppressError(elementXPath: string, timeout: number): Promise<boolean> {
        try {
            await app.isVisible('xpath', {
                selector: elementXPath,
                timeout: timeout,
                suppressNotFoundErrors: true,
            });
            return true;
        } catch (error) {
            return false;
        }
    }

    // Instance-based method for scrolling (Android only)
    async scroll(startingCoordinatesX: number, startingCoordinatesY: number, EndingCoordinatesY: number): Promise<void> {
        await app.pause(6000);
        await app.perform(() => {
            const actions: any = app.actions();
            return actions.move({ x: startingCoordinatesX, y: startingCoordinatesY, duration: 1000 })
                .press()
                .move({ origin: 'pointer', y: EndingCoordinatesY, duration: 50 })
                .release();
        });
        await app.pause(2000);
    }

    // Instance-based method for WebView scroll to bottom (Android only)
    async webViewscrollToBottom(startingCoordinatesX: number, startingCoordinatesY: number, EndingCoordinatesY: number): Promise<void> {
        await browser.pause(6000);
        await browser.perform(() => {
            const actions: any = browser.actions();
            return actions.move({ x: startingCoordinatesX, y: startingCoordinatesY, duration: 1000 })
                .press()
                .move({ origin: 'pointer', y: EndingCoordinatesY, duration: 50 })
                .release();
        });
        await browser.pause(2000);
    }

    // Instance-based method to find element with scrolling (Android only)
    async findElementWithScroll(elementXPath: string, maxScrolls: number = 10): Promise<void> {
        let found = false;
        let attempts = 0;
        const startX = 165;
        const startY = 1719;
        const endYDown = -50;
        const endYUp = 50;

        while (!found && attempts < maxScrolls) {
            const isPresent = await this.waitForElementPresentSuppressError(elementXPath, TIMEOUT);
            if (isPresent) {
                found = true;
                break;
            }
            await this.scroll(startX, startY, endYDown);
            attempts++;
        }

        if (!found) {
            attempts = 0;
            while (!found && attempts < maxScrolls) {
                const isPresent = await this.waitForElementPresentSuppressError(elementXPath, TIMEOUT);
                if (isPresent) {
                    found = true;
                    break;
                }
                await this.scroll(startX, startY, endYUp);
                attempts++;
            }
        }

        if (!found) {
            console.warn(`Element with XPath ${elementXPath} not found after ${maxScrolls} scroll attempts.`);
        }
    }

    // Instance-based method for scrolling to element by text
    async scrollToElement(text: string): Promise<void> {
        if (this.platform === 'android') {
            const uiautomatorSelector = `new UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView("${text}")`;
            const scrollSelector = {
                selector: uiautomatorSelector,
                strategy: '-android uiautomator',
                toVisible: true,
                direction: 'down',
                suppressNotFoundErrors: true,
            };
            await browser.executeScript('mobile: scroll', [scrollSelector]);
        } else if (this.platform === 'ios') {
            await browser.execute('mobile: scroll', [{ direction: 'down' }]);
            await browser.isPresent({
                selector: `//XCUIElementTypeStaticText[@name="${text}"]`,
                suppressNotFoundErrors: true,
                timeout: 5000 
            }); // Adjust the selector for iOS if needed
        }
    }
}

