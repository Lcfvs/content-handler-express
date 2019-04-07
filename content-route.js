const pattern = /\/:([^/]+)/g

function validateMethod (method, body, hasId) {
  return (!body && method === 'GET') ||
    (hasId && body.length && method === 'POST') ||
    (hasId && body.length && method === 'PUT') ||
    (hasId && !body.length && method === 'DELETE')
}

export default class ContentRoute {
  constructor (method, path, callback) {
    this.callback = callback
    this.method = method
    this.names = []
    this.path = path
    this.pattern = new RegExp(['^', path.replace(pattern, (match, name) => {
      this.names.push(name)

      return '/([^/]+)'
    }), '$'].join(''))
  }
  match (path, body) {
    const method = this.method
    const names = this.names

    if (!validateMethod(method, body, names[names.length - 1] === 'id')) {
      return
    }

    const matches = path.match(this.pattern)

    if (!matches || !matches.shift()) {
      return
    }

    return matches.reduce((result, value, key) => {
      result[names[key]] = value

      return result
    }, {})
  }
}
