---
title: "Getting Started"
description: "Learn how to start using nehtml2canvas"
previousUrl: "/documentation"
previousTitle: "About"
nextUrl: "/configuration"
nextTitle: "Configuration"
---

## Installing

You can install `nehtml2canvas` through npm or [download a built release](https://github.com/niklasvh/nehtml2canvas/releases).

### npm

    npm install nehtml2canvas

```javascript
import nehtml2canvas from 'nehtml2canvas';
```

## Usage

To render an `element` with nehtml2canvas with some (optional) [options](/configuration/), simply call `nehtml2canvas(element, options);`

```javascript
nehtml2canvas(document.body).then(function(canvas) {
    document.body.appendChild(canvas);
});
```
