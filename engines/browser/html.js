import ContentEngine from '../../content-engine.js'

function clone (fragment) {
  return fragment.cloneNode(true)
}

export default function html (app, document) {
  const engine = new ContentEngine(app)

  return name => engine.render(name, clone, data => {
    const fragment = document.createDocumentFragment()
    const body = document.createElement('body')

    body.innerHTML = data
    fragment.appendChild(body)

    return fragment
  })
}
