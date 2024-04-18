export class CacheStorage {
  private static _link?: HTMLAnchorElement
  private static _origin = 'about:blank'

  static getOrigin(url: string): string {
    const link = CacheStorage._link
    if (!link) {
      return 'about:blank'
    }

    link.href = url
    link.href = link.href // IE9, LOL!
    return link.protocol + link.hostname + link.port
  }

  static isSameOrigin(src: string): boolean {
    return CacheStorage.getOrigin(src) === CacheStorage._origin
  }

  static setContext(window: Window): void {
    CacheStorage._link = window.document.createElement('a')
    CacheStorage._origin = CacheStorage.getOrigin(window.location.href)
  }
}

export interface ResourceOptions {
  imageTimeout: number
  allowTaint: boolean
}

export class Cache {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly _cache: {[key: string]: Promise<any>} = {}

  addImage(src: string): Promise<void> {
    const result = Promise.resolve()
    if (this.has(src)) {
      return result
    }

    return result
  }

  private has(key: string): boolean {
    return typeof this._cache[key] !== 'undefined'
  }
}
