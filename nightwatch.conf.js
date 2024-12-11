// Refer to the online docs for more details:
// https://nightwatchjs.org/gettingstarted/configuration/
//

//  _   _  _         _      _                     _          _
// | \ | |(_)       | |    | |                   | |        | |
// |  \| | _   __ _ | |__  | |_ __      __  __ _ | |_   ___ | |__
// | . ` || | / _` || '_ \ | __|\ \ /\ / / / _` || __| / __|| '_ \
// | |\  || || (_| || | | || |_  \ V  V / | (_| || |_ | (__ | | | |
// \_| \_/|_| \__, ||_| |_| \__|  \_/\_/   \__,_| \__| \___||_| |_|
//             __/ |
//            |___/

module.exports = {
  // An array of folders (excluding subfolders) where your tests are located;
  // if this is not specified, the test source must be passed as the second argument to the test runner.
  globals: {
    asyncHookTimeout: 150000, // Set the timeout to 30 seconds (30000 milliseconds)
    waitForConditionTimeout: 60000,  // Wait for conditions to be met
    waitForConditionPollInterval: 500,  // Polling interval
    retryAssertionTimeout: 60000,  // Retry assertions within this timeout
    abortOnAssertionFailure: false,  // Continue tests even after assertion failure
    waitForConditionPollInterval: 500,  // How often to poll for wait conditions (ms)
    retryAssertionTimeout: 60000,  // Default time to retry failed assertions (ms)
    // Other global settings if needed...
  },
  
  src_folders: ['test','nightwatch'],
  output_folder: 'tests_output',

  // See https://nightwatchjs.org/guide/concepts/page-object-model.html
  page_objects_path: [],

  // See https://nightwatchjs.org/guide/extending-nightwatch/adding-custom-commands.html
  custom_commands_path: [],

  // See https://nightwatchjs.org/guide/extending-nightwatch/adding-custom-assertions.html
  custom_assertions_path: [],

  // See https://nightwatchjs.org/guide/extending-nightwatch/adding-plugins.html
  plugins: [],
  
  // See https://nightwatchjs.org/guide/concepts/test-globals.html
  globals_path: '',
  
  webdriver: {},

  test_workers: {
    enabled: false,
    workers: 'auto'
  },

  test_settings: {
    default: {
      disable_error_log: false,
      launch_url: '',

      screenshots: {
        enabled: false,
        path: 'tests_output/screenshots',
        on_failure: true,
        on_error: true,
      },

      desiredCapabilities: {
        browserName: ''
      },
      
      output_folder: 'tests_output',

      webdriver: {
        start_process: true,
        server_path: ''
      },
      
    },
    
    app: {
      selenium: {
        start_process: true,
        use_appium: true,
        host: 'localhost',
        port: 4723,
        server_path: '',
        // args to pass when starting the Appium server
        cli_args: [
          // automatically download the required chromedriver
          // '--allow-insecure=chromedriver_autodownload'
        ],
        // Remove below line if using Appium v1
        default_path_prefix: ''
      },
      webdriver: {
        timeout_options: {
          timeout: 150000,
          retry_attempts: 3
        },
        keep_alive: false,
        start_process: false
      }
    },
    
    'app.android.emulator': {
      extends: 'app',
      'desiredCapabilities': {
        // More capabilities can be found at https://github.com/appium/appium-uiautomator2-driver#capabilities
        browserName: null,
        platformName: 'android',
        'appium:options': {
          automationName: 'UiAutomator2',
          autoGrantPermissions: true,  // Automatically grants permissions
          autoAcceptAlerts: true, 
          // Android Virtual Device to run tests on
          avd: 'sdk_gphone64_arm64',
          enablemultiwindows: true,
          // While Appium v1 supports relative paths, it's more safe to use absolute paths instead.
          // Appium v2 does not support relative paths.
          app: `${__dirname}/nightwatch/apps/androidSample.apk`,
          //local app setup
          appActivity: 'com.wdiodemoapp.MainActivity',
          adbExecTimeout: 1200000, // Increased timeout value
          uiautomator2ServerInstallTimeout: 1200000,
          // chromedriver executable to use for testing web-views in hybrid apps
          chromedriverExecutable: `${__dirname}/chromedriver-mobile/chromedriver.exe`,
          newCommandTimeout: 1200000,
        },
        screenshots: {
          enabled: true,
          on_failure: true,
          on_error: true,
          path: 'tests_output/screenshots'
        },
      }
    },

    'app.android.real': {
      extends: 'app',
      'desiredCapabilities': {
        // More capabilities can be found at https://github.com/appium/appium-uiautomator2-driver#capabilities
        browserName: null,
        platformName: 'android',
        // `appium:options` is not natively supported in Appium v1, but works with Nightwatch.
        // If copying these capabilities elsewhere while using Appium v1, make sure to remove `appium:options`
        // and add `appium:` prefix to each one of its capabilities, e.g. change 'app' to 'appium:app'.
        'appium:options': {
          automationName: 'UiAutomator2',
          // While Appium v1 supports relative paths, it's more safe to use absolute paths instead.
          // Appium v2 does not support relative paths.
          app: `${__dirname}/nightwatch/apps/android.wdio.native.app.v1.0.8.apk`,
          appPackage: 'org.wikipedia',
          appActivity: 'org.wikipedia.main.MainActivity',
          appWaitActivity: 'org.wikipedia.onboarding.InitialOnboardingActivity',
          adbExecTimeout: 1200000,
          chromedriverExecutable: '',
          newCommandTimeout: 0,
          // add device id of the device to run tests on, if multiple devices are online
          // Run command: `$ANDROID_HOME/platform-tools/adb devices` to get all connected devices
          // udid: '',
        }
      }
    },
    
    'app.ios.simulator': {
      extends: 'app',
      'desiredCapabilities': {
        // More capabilities can be found at https://github.com/appium/appium-xcuitest-driver#capabilities
        browserName: null,
        platformName: 'ios',
        // `appium:options` is not natively supported in Appium v1, but works with Nightwatch.
        // If copying these capabilities elsewhere while using Appium v1, make sure to remove `appium:options`
        // and add `appium:` prefix to each one of its capabilities, e.g. change 'app' to 'appium:app'.
        'appium:options': {
          automationName: 'XCUITest',
          // platformVersion: '17.5',
          deviceName: 'iPhone 15 Pro',
          autoAcceptAlerts: true,
          autoGrantPermissions: true, 
          // While Appium v1 supports relative paths, it's more safe to use absolute paths instead.
          // Appium v2 does not support relative paths.
          app: `${__dirname}/nightwatch/apps/iOSSampleApp.app`,
          adbExecTimeout: 1200000, // Increased timeout value
          uiautomator2ServerInstallTimeout: 1200000,
          XCUITESTServerInstallTimeout: 1200000,
          chromedriverExecutable: `${__dirname}/chromedriver-mobile/chromedriver.exe`,
          bundleId: 'org.reactjs.native.example.wdiodemoapp',
          newCommandTimeout: 1200000,
        },
        screenshots: {
          enabled: true,
          on_failure: true,
          on_error: true,
          path: 'tests_output/screenshots'
        },
        }
    },

    'app.ios.real': {
      extends: 'app',
      'desiredCapabilities': {
        // More capabilities can be found at https://github.com/appium/appium-xcuitest-driver#capabilities
        browserName: null,
        platformName: 'ios',
        // `appium:options` is not natively supported in Appium v1, but works with Nightwatch.
        // If copying these capabilities elsewhere while using Appium v1, make sure to remove `appium:options`
        // and add `appium:` prefix to each one of its capabilities, e.g. change 'app' to 'appium:app'.
        'appium:options': {
          automationName: 'XCUITest',
          // While Appium v1 supports relative paths, it's more safe to use absolute paths instead.
          // Appium v2 does not support relative paths.
          app: `${__dirname}/nightwatch/sample-apps/wikipedia.zip`,
          bundleId: 'org.wikimedia.wikipedia',
          newCommandTimeout: 0,
          // add udid of the device to run tests on. Or, pass the id to `--deviceId` flag when running tests.
          // device id could be retrieved from Xcode > Window > "Devices and Simulators" window.
          // udid: '00008030-00024C2C3453402E'
        }
      }
    },
    
  },
  
};