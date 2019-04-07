import notImplemented from './utils/not-implemented.js'
import toObject from './utils/to-object.js'

export default class ContentRequest extends window.AbortController {
  constructor (app, route, params, config) {
    super()
    this.app = app
    this.config = config
    this.params = params
    this.route = route

    Object.assign(this, {
      cookies: notImplemented('request.cookies'),
      fresh: notImplemented('request.fresh'),
      ip: notImplemented('request.ip'),
      ips: notImplemented('request.ips'),
      signedCookies: notImplemented('request.signedCookies'),
      stale: notImplemented('request.stale'),
      subdomains: notImplemented('request.subdomains'),
      xhr: notImplemented('request.xhr'),
      accepts: notImplemented('request.accepts(types)'),
      acceptsCharsets: notImplemented('request.acceptsCharsets(charset, ...charsets)'),
      acceptsEncodings: notImplemented('request.acceptsEncodings(encoding, ...encodings)'),
      acceptsLanguages: notImplemented('request.acceptsLanguages(language, ...languages)'),
      get: notImplemented('request.get(field)'),
      is: notImplemented('request.is(type)'),
      range: notImplemented('request.range(size, options)')
    })
  }
  get baseUrl () {
    return this.app.mountPath.replace(/^$/, '/')
  }
  get body () {
    return toObject(this.config.init.body)
  }
  get hostname () {
    return this.config.input.hostname
  }
  get method () {
    return this.config.init.method
  }
  get originalUrl () {
    const input = this.config.input
    const path = input.path
    const search = input.search

    if (search.length) {
      return path.concat('?', search)
    }

    return path
  }
  get path () {
    return this.config.input.pathname
  }
  get protocol () {
    return this.config.input.protocol.substring(0, -1)
  }
  get query () {
    return toObject(this.config.input.searchParams)
  }
  get secure () {
    return this.protocol === 'https'
  }
  get url () {
    return this.config.input.toString()
  }
}
