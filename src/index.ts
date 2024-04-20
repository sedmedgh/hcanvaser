import {Bounds, parseBounds, parseDocumentSize} from './css/layout/bounds'
import {COLORS, isTransparent, parseColor} from './css/types/color'
import {CloneConfigurations, CloneOptions, DocumentCloner, WindowOptions} from './dom/document-cloner'
import {isBodyElement, isHTMLElement} from './dom/node-parser'
import {CacheStorage} from './core/cache-storage'
import {RenderConfigurations, RenderOptions} from './render/canvas/canvas-renderer'
import {ForeignObjectRenderer} from './render/canvas/foreignobject-renderer'
import {Context, ContextOptions} from './core/context'
import {CSSRuleSelector, FilterFontFace} from './dom/extra/embed-webfonts'

export type Options = CloneOptions &
  WindowOptions &
  RenderOptions &
  ContextOptions & {
    backgroundColor: string | null
    filterFontFace?: FilterFontFace
    cssRuleSelector?: CSSRuleSelector
  }
type ImageTypes = 'image/png' | 'image/jpeg' | 'image/webp'
const imageMap: Record<string, ImageTypes> = {
  png: 'image/png',
  jpeg: 'image/jpeg',
  webp: 'image/webp',
}
type ImageType = keyof typeof imageMap
type ToImage = (type?: ImageType, quality?: number) => string
type ReturnType = HTMLCanvasElement & {toImage: ToImage}

const hcanvaser = (element: HTMLElement, options: Partial<Options> = {}): Promise<ReturnType> => {
  return renderElement(element, options)
}

export default hcanvaser

if (typeof window !== 'undefined') {
  CacheStorage.setContext(window)
}


const renderElement = async (element: HTMLElement, opts: Partial<Options>): Promise<ReturnType> => {
  if (!element || typeof element !== 'object') {
    return Promise.reject('Invalid element provided as first argument')
  }
  const ownerDocument = element.ownerDocument

  if (!ownerDocument) {
    throw new Error(`Element is not attached to a Document`)
  }

  const defaultView = ownerDocument.defaultView

  if (!defaultView) {
    throw new Error(`Document is not attached to a Window`)
  }

  const resourceOptions = {
    allowTaint: opts.allowTaint ?? false,
    imageTimeout: opts.imageTimeout ?? 15000
  }

  const contextOptions = {
    logging: opts.logging ?? true,
    ...resourceOptions
  }

  const windowOptions = {
    windowWidth: opts.windowWidth ?? defaultView.innerWidth,
    windowHeight: opts.windowHeight ?? defaultView.innerHeight,
    scrollX: opts.scrollX ?? defaultView.pageXOffset,
    scrollY: opts.scrollY ?? defaultView.pageYOffset
  }

  const windowBounds = new Bounds(
    windowOptions.scrollX,
    windowOptions.scrollY,
    windowOptions.windowWidth,
    windowOptions.windowHeight
  )

  const context = new Context(contextOptions, windowBounds)

  const cloneOptions: CloneConfigurations = {
    allowTaint: opts.allowTaint ?? false,
    onclone: opts.onclone,
    ignoreElements: opts.ignoreElements,
    cssRuleSelector: opts.cssRuleSelector,
    inlineImages: true
  }

  context.logger.debug(
    `Starting document clone with size ${windowBounds.width}x${
      windowBounds.height
    } scrolled to ${-windowBounds.left},${-windowBounds.top}`
  )

  const documentCloner = new DocumentCloner(context, element, cloneOptions)
  const clonedElement = documentCloner.documentElement
  if (!clonedElement) {
    return Promise.reject(`Unable to find element in cloned iframe`)
  }
  await documentCloner.embed(opts.filterFontFace)

  const {width, height, left, top} =
    isBodyElement(clonedElement) || isHTMLElement(clonedElement)
      ? parseDocumentSize(clonedElement.ownerDocument)
      : parseBounds(context, clonedElement)

  const backgroundColor = parseBackgroundColor(context, clonedElement, opts.backgroundColor)

  const renderOptions: RenderConfigurations = {
    canvas: opts.canvas,
    backgroundColor,
    scale: opts.scale ?? defaultView.devicePixelRatio ?? 1,
    x: (opts.x ?? 0) + left,
    y: (opts.y ?? 0) + top,
    width: opts.width ?? Math.ceil(width),
    height: opts.height ?? Math.ceil(height)
  }

  const renderer = new ForeignObjectRenderer(context, renderOptions)
  const canvas = await renderer.render(clonedElement)

  context.logger.debug(`Finished rendering`)
  Object.assign(canvas, {
    toImage:(type?: ImageType, quality?: number) => {
      const _type = type ? imageMap[type] : undefined
      const _quality = quality && typeof quality === 'number' && quality > 0.9 ? 0.9 : quality
      if (_type) return canvas.toDataURL(_type, _quality);
    }
  })
  return canvas as ReturnType
}

const parseBackgroundColor = (context: Context, element: HTMLElement, backgroundColorOverride?: string | null) => {
  const ownerDocument = element.ownerDocument
  // http://www.w3.org/TR/css3-background/#special-backgrounds
  const documentBackgroundColor = ownerDocument.documentElement
    ? parseColor(context, getComputedStyle(ownerDocument.documentElement).backgroundColor as string)
    : COLORS.TRANSPARENT
  const bodyBackgroundColor = ownerDocument.body
    ? parseColor(context, getComputedStyle(ownerDocument.body).backgroundColor as string)
    : COLORS.TRANSPARENT

  const defaultBackgroundColor =
    typeof backgroundColorOverride === 'string'
      ? parseColor(context, backgroundColorOverride)
      : backgroundColorOverride === null
        ? COLORS.TRANSPARENT
        : 0xffffffff

  return element === ownerDocument.documentElement
    ? isTransparent(documentBackgroundColor)
      ? isTransparent(bodyBackgroundColor)
        ? defaultBackgroundColor
        : bodyBackgroundColor
      : documentBackgroundColor
    : defaultBackgroundColor
}
