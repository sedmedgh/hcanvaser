---
title: "Getting Started"
description: "Learn how to start using take-shot"
previousUrl: "/documentation"
previousTitle: "About"
nextUrl: "/configuration"
nextTitle: "Configuration"
---

## Installing

You can install `take-shot` through npm or [download a built release](https://github.com/sedmedgh/take-shot/releases).

### npm

    npm install take-shot

```javascript
import takeShot from 'take-shot';
```

## Usage

To render an `element` with take-shot with some (optional) [options](/configuration/), simply call `takeShot(element, options);`

```javascript
takeShot(document.body).then(function(src) {
    const DOM_img = document.createElement("img");
    DOM_img.src = src;
    document.body.appendChild(DOM_img);
});
```
