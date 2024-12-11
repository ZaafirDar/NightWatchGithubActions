// src/utils/platformHelper.ts
export function getPlatform(): 'android' | 'ios' {
    return browser.options?.desiredCapabilities?.platformName?.toLowerCase() === 'android' ? 'android' : 'ios';
}
