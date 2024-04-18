---
title: "Getting Started"
description: "Learn how to start using hcanvaser"
previousUrl: "/documentation"
previousTitle: "About"
nextUrl: "/configuration"
nextTitle: "Configuration"
---

## Installing

You can install `hcanvaser` through npm or [download a built release](https://github.com/sedmedgh/hcanvaser/releases).

### npm

    npm install hcanvaser

```javascript
import hcanvaser from 'hcanvaser';
```

## Usage

To render an `element` with hcanvaser with some (optional) [options](/configuration/), simply call `hcanvaser(element, options);`

```javascript
hcanvaser(document.body).then(function(canvas) {
    document.body.appendChild(canvas);
});
```
