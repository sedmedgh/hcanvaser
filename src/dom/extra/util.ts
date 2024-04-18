export function resolveUrl(url: string, baseUrl: string | null): string {
  // url is absolute already
  if (url.match(/^[a-z]+:\/\//i)) {
    return url
  }

  // url is absolute already, without protocol
  if (url.match(/^\/\//)) {
    return window.location.protocol + url
  }

  // dataURI, mailto:, tel:, etc.
  if (url.match(/^[a-z]+:/i)) {
    return url
  }

  const doc = document.implementation.createHTMLDocument()
  const base = doc.createElement('base')
  const a = doc.createElement('a')

  doc.head.appendChild(base)
  doc.body.appendChild(a)

  if (baseUrl) {
    base.href = baseUrl
  }

  a.href = url

  return a.href
}

export function toArray<T>(arrayLike: CSSRuleList): T[] {
  const arr: T[] = []

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  for (let i = 0, l = arrayLike.length; i < l; i++) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    arr.push(arrayLike[i])
  }

  return arr
}
export const isInstanceOfElement = <T extends typeof Element | typeof HTMLElement | typeof SVGImageElement>(
  node: Element | HTMLElement | SVGImageElement,
  instance: T
): node is T['prototype'] => {
  if (node instanceof instance) return true

  const nodePrototype = Object.getPrototypeOf(node)

  if (nodePrototype === null) return false

  return nodePrototype.constructor.name === instance.name || isInstanceOfElement(nodePrototype, instance)
}
