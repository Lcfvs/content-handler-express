import notImplemented from './utils/not-implemented.js'
import emit from 'content-handler/utils/emit.js'

export default class ContentResponse extends window.EventTarget {
  constructor (app) {
    super()
    this.app = app
    this.headers = {}
    this.headersSent = false
    this.locals = app.locals

    Object.assign(this, {
      cookie: notImplemented('response.cookie(name, value, options)'),
      clearCookie: notImplemented('response.clearCookie(name, options)'),
      download: notImplemented('response.download(path, filename, options, fn)'),
      end: notImplemented('response.end(data, encoding)'),
      format: notImplemented('response.format(object)'),
      json: notImplemented('response.json(body)'),
      jsonp: notImplemented('response.jsonp(body)'),
      redirect: notImplemented('response.redirect(status, path)'),
      sendFile: notImplemented('response.sendFile(path, options, fn)'),
      sendStatus: notImplemented('response.sendStatus(statusCode)'),
      status: notImplemented('response.status(statusCode)'),
      type: notImplemented('response.type(type)'),
      vary: notImplemented('response.vary(field)')
    })
  }
  append (field, value) {
    const headers = this.headers
    const key = this.field(field)

    if (typeof key === 'string') {
      delete headers[key]
    }

    if (Array.isArray(value)) {
      headers[field] = value
    } else if (typeof value === 'string' && value.length) {
      headers[field] = [value]
    }

    return this
  }
  get (field) {
    const headers = this.headers
    const key = this.field(field)

    return headers[key]
  }
  field (field) {
    const name = field.toLowerCase()

    return Object.keys(this.headers)
      .find(key => key.toLowerCase() === name)
  }
  links (links) {
    this.append('Link', Object.keys(links)
      .map(key => `<${links[key]}>; rel="key"`))

    return this
  }
  location (path) {
    this.append('Location', path)

    return this
  }
  render (view, locals, fn) {
    this.app.render(view, locals, fn)

    return this
  }
  send (content) {
    emit(this, 'content', {content})

    return this
  }
  set (field, value) {
    if (typeof field === 'string') {
      return this.append(field, value)
    }

    Object.keys(field).forEach(key => this.append(key, field[key]))

    return this
  }
}
