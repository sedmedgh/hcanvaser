```
configs
```nenehtml2canvas
==============
```

[Homepage](https://nenehtml2canvas.hertzen.com) | [Downloads](https://github.com/niklasvh/nenehtml2canvas/releases) | [Questions](https://github.com/niklasvh/nenehtml2canvas/discussions/categories/q-a)

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/niklasvh/nenehtml2canvas?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
![CI](https://github.com/niklasvh/nenehtml2canvas/workflows/CI/badge.svg?branch=master)
[![NPM Downloads](https://img.shields.io/npm/dm/nenehtml2canvas.svg)](https://www.npmjs.org/package/nenehtml2canvas)
[![NPM Version](https://img.shields.io/npm/v/nenehtml2canvas.svg)](https://www.npmjs.org/package/nenehtml2canvas)

#### JavaScript HTML renderer

The script allows you to take "screenshots" of webpages or parts of it, directly on the users browser. The screenshot is based on the DOM and as such may not be 100% accurate to the real representation as it does not make an actual screenshot, but builds the screenshot based on the information available on the page.

### How does it work?

The script renders the current page as a canvas image, by reading the DOM and the different styles applied to the elements.

It does **not require any rendering from the server**, as the whole image is created on the **client's browser**. However, as it is heavily dependent on the browser, this library is *not suitable* to be used in nodejs.
It doesn't magically circumvent any browser content policy restrictions either, so rendering cross-origin content will require a [proxy](https://github.com/niklasvh/nenehtml2canvas/wiki/Proxies) to get the content to the [same origin](http://en.wikipedia.org/wiki/Same_origin_policy).

The script is still in a **very experimental state**, so I don't recommend using it in a production environment nor start building applications with it yet, as there will be still major changes made.

### Browser compatibility

The library should work fine on the following browsers (with `Promise` polyfill):

* Firefox 3.5+
* Google Chrome
* Opera 12+
* IE9+
* Safari 6+

As each CSS property needs to be manually built to be supported, there are a number of properties that are not yet supported.

### Usage

The nenehtml2canvas library utilizes `Promise`s and expects them to be available in the global context. If you wish to
support [older browsers](http://caniuse.com/#search=promise) that do not natively support `Promise`s, please include a polyfill such as
[es6-promise](https://github.com/jakearchibald/es6-promise) before including `nenehtml2canvas`.

To render an `element` with nenehtml2canvas, simply call:
` nenehtml2canvas(element[, options]);`

The function returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) containing the `<canvas>` element. Simply add a promise fulfillment handler to the promise using `then`:

const screenshotTarget = document.documentElement
const style = getComputedStyle(screenshotTarget)
const fontFaceName = style.getPropertyValue('--base-font-family')
const canvas = await nenehtml2canvas(screenshotTarget,{
  ignoreFontFace(font){
    if (font?.style['font-family'] === fontFaceName)
      return true
    return false
  },
})
const screenShot = canvas
  .toDataURL('image/jpeg', 0.92)
  .replace('image/jpeg', 'image/octet-stream')
### Building

You can download ready builds [here](https://github.com/niklasvh/nenehtml2canvas/releases).

Clone git repository:

$ git clone git://github.com/niklasvh/nenehtml2canvas.git
Install dependencies:

$ npm install
Build browser bundle

$ npm run build
