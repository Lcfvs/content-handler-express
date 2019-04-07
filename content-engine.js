import load from './utils/load.js'

function resolve (name, app) {
  return new URL('.'.concat(name), new URL(app.mountPath, app.get('origin')))
    .toString()
}

export default class ContentEngine {
  constructor (app) {
    this.app = app
    this.files = {}
  }
  async register (name, input = d => d) {
    const filename = resolve(name, this.app)

    return load(filename)
      .then(data => input(data))
      .then(data => {
        this.files[filename] = data

        return data
      })
  }
  async render (name, output = d => d, input = d => d) {
    const filename = resolve(name, this.app)

    if (this.files.hasOwnProperty(filename)) {
      return output(this.files[resolve(name, this.app)])
    }

    return this.register(name, input)
      .then(output)
  }
}
