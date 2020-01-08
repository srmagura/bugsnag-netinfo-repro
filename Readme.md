# Vendor Mobile

## Development Environment Prerequisites

-   Install Expo: yarn global add expo-cli
-   Install the Expo app on your phone, from Google Play or the App Store.

## Running and Debugging the App

To run the project, go to the VendorMobile folder in PowerShell and type expo start.

**To test that the code compiles**

Run the TypeScript compiler from PowerShell by typing `yarn tsc` while in the VendorMobile directory.
It's a good idea to have `tsc --watch` running while working on the code.

**IP-related setup**

1. In the launchSettings.json of CDS Next, set the applicationUrl to `http://0.0.0.0:PORT/`, where `PORT`
   is the actual port number. This tells ASP.NET Core to allow requests from both 127.0.0.1 and your PC's
   local IP address.
2. In the VendorMobile solution, open BaseUrl.ts and change the development URL to `http://LOCALIP:PORT/`,
   where LOCALIP is your PC's local IP address and PORT is the same port number.

**Live / hot reloading**

Expo supports both live and hot Reloading. Hot reloading is great when it works, but it
fails frequently depending on the type of change of you made. It usually works fine when only making changes
to a single Screen component. If hot reloading is consistently failing, you can save yourself time by
swtiching to live reloading which restarts the app each time.

**Debugging network requests with mitmproxy:**

1. Follow these steps: https://medium.com/sean3z/debugging-mobile-apps-with-mitmproxy-4596e56b3da2
2. Confirm you can access a web page from your phone's browser and that the traffic appears in mitmproxy
3. Run the app through Expo like normal. If clicking the app from the Expo app isn't working, it may be necessary
   to scan the QR code on the first time running the app through the proxy.

iOS is recommended when using the proxy. Getting my phone (Android 7) to use the proxy was extremely finicky and unreliable.

**React Native Debugger**

The React Native Debugger is a standalone application that gives you access to a JavaScript console, the Chrome JavaScript debugger,
Redux DevTools, and React DevTools.

Follow the steps under the "Debugging Redux" heading at https://docs.expo.io/versions/v32.0.0/workflow/debugging/#debugging-redux to
set up the React Native Debugger. **REDUX_DEVTOOLS_EXTENSION** is already configured so you don't need to do that.

I get a warning "react-devtools agent got no connection" when using React Native Debugger, but it doesn't seem to cause any problems.

FYI when using debugger: https://github.com/expo/expo/issues/4172

## Deployment

**Full deployment**
Android:

1. Increment the versionCode under the Android key in app.json.
2. `expo build:android` (`--release-channel test`)
3. Go to the [Google Play Developer Console](https://play.google.com/apps/publish), create a new release, and upload the APK.

iOS:

1. Update the buildNumber under the iOS key in app.json.
    - If this the first build for a new version of the app, set the buildNumber to 1
    - If you have already uploaded builds for this version of the app, increment the buildNumber
2. `expo build:ios` (`--release-channel test`)
3. Log into the Mac, go to expo.io and login.
    - Select the CDS project
    - Navigate to the builds page
    - Download the new build
4. Open the Transporter app and upload the IPA file. (Install Transporter from the Mac App Store if necessary)
5. Wait patiently - it can take a while for App Store Connect to process the build. Monitor the email that's associated with your Apple ID to receive updates. Note: warnings do not prevent the build from being uploaded.

Public TestFlight link: https://testflight.apple.com/join/JmQ8zL6Z

**Over-the-air update**
`expo publish` (`--release-channel test`)

## Production Support

Go to bugsnag.com to view logs and crash reports for the app. See the CDS 2 Production Support document for credentials.

## Development Tips

-   Expo doesn't actually run the code through the TypeScript compiler, so you should rely on the Visual Studio Intellisense for type checking
    -   If you want to typecheck the entire solution, run `tsc` direction from the command line: `.\node_modules\.bin\tsc`
-   Expo may not support the latest version of React. Use `expo init` and look at the package.json to see the currently-recommended React version.
-   Top-level folders like Components and Screens must have a package.json, with the name set to the folder name, so that imports with absolute paths can be resolved
