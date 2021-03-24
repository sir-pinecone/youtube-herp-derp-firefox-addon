Replaces YouTube comments with random herp derps. Click on the comment text to reveal the original.
This is a fork of [twstokes/herpderp](https://github.com/twstokes/herpderp) with some modifications.

Note: Ignores iframe embedded videos, including the chat replay iframe on YouTube livestream vids.

**Known bugs**
1. As of 2021-03-24, sometimes when showing the original comment the first few lines are missing.
   This tends to happen when you've transitioned to the page from another video. Refreshing the page
   tends to fix the problem. I'll eventually try to fix this.

## Install

**Firefox**
* I have a signed xpi that you can immediately install. Open `build/` and drag the xpi into Firefox.
  It may take a few seconds for the browser to display the extension installation dialog box.
* You can also find the signed Firefox files in the project's [Releases page](https://github.com/sir-pinecone/youtube-herp-derp-browser-extension/releases).

**Chrome**
* Go to Chrome extensions page.
* Toggle the developer mode (top-right of page). 
* Click `Load unpacked`.
* Select this project's root folder.

## Development

### Local Testing

* Firefox: open about:debugging and click `Load Temporary Add-on...` then select `manifest.json` file.
* Chrome: follow the install steps from above.

## Signing and Building

### Firefox
* Install web-ext with `$ npm install --global web-ext`
* Generate an unlisted xpi with:
  `web-ext sign --api-key <your JWT issuer> --api-secret <your JWT secret>`
    * You can obtain these keys from https://addons.mozilla.org/en-US/developers/addon/api/key/
* The signed xpi will be in `web-ext-artifacts/`. Drag this into Firefox to install it.
* Alternatively use the private sign-firefox-extension.sh script (not included in the repo) which places the xpi in `build/`.

