Replaces YouTube comments with random herp derps. This is modification of github.com/twstokes/herpderp

Note: Ignores iframe embedded videos, including the chat replay iframe on YouTube livestream vids.

## Install

* I have a signed xpi that you can immediately install. Open `build/` and drag the xpi into Firefox.

## Development

### Local Testing

In Firefox, open about:debugging and click `Load Temporary Add-on...` then select `manifest.json`.
file.

### Signing and Building

* Install web-ext with `$ npm install --global web-ext`
* Generate an unlisted xpi with 'web-ext sign --channel unlisted --api-key <your add-on signing key> --api-secret <your add-on signing secret>`. Those keys can be obtained from https://addons.mozilla.org/en-US/developers/addon/api/key/
* Drag downloaded xpi into Firefox.
