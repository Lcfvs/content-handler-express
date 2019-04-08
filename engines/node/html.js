import { promises } from 'fs'
import htmlize from 'htmlize'
import ContentEngine from '../../content-engine.js'

function clone (fragment) {
  return fragment.cloneNode(true)
}

function load (name) {
  return promises.readFile(name)
    .then(response => response.toString())
}

export default function html (app) {
  const engine = new ContentEngine(app, load)

  return name => engine.render(name, clone, data => {
    const document = htmlize(data)
    const fragment = document.createDocumentFragment()
    const body = document.createElement('body')

    body.appendChild(document.documentElement)
    fragment.appendChild(body)

    return fragment
  })
}
