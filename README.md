# Electron Desktop app

This is my first electron app using Node.js. I'm trying things.

## Installation

Clone the repo and use the package manager [npm](https://www.npmjs.com/) to install dependencies.

```bash
npm install
```

## Usage

To run the application in dev mode, you can use this command :
```bash
npm start
```
I use [electron-forge](https://www.electronforge.io/) to package the app.
To create both a folder of distributable files and the packaged application code, you just need to run :
```bash
npm run make
```
A distribution for each configured “maker” will be generated.

```bash
# MacOS output example
out/
├── out/make/zip/darwin/x64/electron-desktop-app-darwin-x64-1.0.0.zip
├── ...
└── out/electron-desktop-app-darwin-x64/electron-desktop-app.app/Contents/MacOS/electron-desktop-app
```

## Publish
And if you want to publish your app, Electron provides publisher plugins to automate the packaged app distribution to manage versions.
```bash
npm run publish
```
Don't forget to update your .env file to the root folder with your private values :
```env
# For Apple app signature
APPLE_ID=""
APPLE_PASSWORD=""
APPLE_TEAM_ID=""

# For Windows app signature
CERTIFICATE_PASSWORD=""
```

And uncomment the following lines in the config file forge.config.js :
```javascript
module.exports = {
  packagerConfig: {
    asar: true,
    /*osxSign: {},
    osxNotarize: {
      tool: 'notarytool',
      appleId: process.env.APPLE_ID,
      appleIdPassword: process.env.APPLE_PASSWORD,
      teamId: process.env.APPLE_TEAM_ID
    }*/
  },
  ...
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        /*certificateFile: './cert.pfx',
        certificatePassword: process.env.CERTIFICATE_PASSWORD*/
      },
    },
```

## License

[ISC](https://www.isc.org/licenses/)
