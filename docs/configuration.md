---
title: "Options"
description: "Explore the different configuration options available for hcanvaser"
previousUrl: "/getting-started"
previousTitle: "Getting Started"
nextUrl: "/features"
nextTitle: "Features"
---

These are all of the available configuration options.

| Name          |                                      Default                                       | Description                                                                                                                                                                                 |
| ------------- |:----------------------------------------------------------------------------------:|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| allowTaint |                                      `false`                                       | Whether to allow cross-origin images to taint the canvas                                                                                                                                    
| backgroundColor |                                     `#ffffff`                                      | Canvas background color, if none is specified in DOM. Set `null` for transparent                                                                                                            
| canvas |                                       `null`                                       | Existing `canvas` element to use as a base for drawing on                                                                                                                                   
| imageTimeout |                                      `15000`                                       | Timeout for loading an image (in milliseconds). Set to `0` to disable timeout.                                                                                                              
| ignoreElements |                                `(element) => false`                                | Predicate function which removes the matching elements from the render.                                                                                                                     
| logging |                                       `true`                                       | Enable logging for debug purposes                                                                                                                                                           
| onclone |                                       `null`                                       | Callback function which is called when the Document has been cloned for rendering, can be used to modify the contents that will be rendered without affecting the original source document. 
| removeContainer |                                       `true`                                       | Whether to cleanup the cloned DOM elements hcanvaser creates temporarily                                                                                                              
| scale |                             `window.devicePixelRatio`                              | The scale to use for rendering. Defaults to the browsers device pixel ratio.                                                                                                                
| width |                                  `Element` width                                   | The width of the `canvas`                                                                                                                                                                   
| height |                                  `Element` height                                  | The height of the `canvas`                                                                                                                                                                  
| x |                                 `Element` x-offset                                 | Crop canvas x-coordinate                                                                                                                                                                    
| y |                                 `Element` y-offset                                 | Crop canvas y-coordinate                                                                                                                                                                    
| scrollX |                                 `Element` scrollX                                  | The x-scroll position to used when rendering element, (for example if the Element uses `position: fixed`)                                                                                   
| scrollY |                                 `Element` scrollY                                  | The y-scroll position to used when rendering element, (for example if the Element uses `position: fixed`)                                                                                   
| windowWidth |                                `Window.innerWidth`                                 | Window width to use when rendering `Element`, which may affect things like Media queries                                                                                                    
| windowHeight |                                `Window.innerHeight`                                | Window height to use when rendering `Element`, which may affect things like Media queries                                                                                                   
| ignoreFontFace |                         `(fontFace: CSSStyleRule) => true`                         | ignore embeding fontFaces in canvas foreign-object                                                                                                  
| cssRuleSelector | `(rule: string) => rule.includes('::-webkit-scrollbar') \|\| rule.includes('scrollbar')` | select cssRules for add them to canvas foreign-object

If you wish to exclude certain `Element`s from getting rendered, you can add a `hcanvaser-ignore` attribute to those elements and hcanvaser will exclude them from the rendering.
