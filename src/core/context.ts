import {Logger} from './logger'
import {ResourceOptions} from './cache-storage'
import {Bounds} from '../css/layout/bounds'

export type ContextOptions = {
  logging: boolean
} & ResourceOptions

export class Context {
  private readonly instanceName = `#${Context.instanceCount++}`
  readonly logger: Logger

  private static instanceCount = 1

  constructor(
    options: ContextOptions,
    public windowBounds: Bounds
  ) {
    this.logger = new Logger({id: this.instanceName, enabled: options.logging})
  }
}
