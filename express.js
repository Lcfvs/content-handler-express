import ContentHandler from 'content-handler'
import emit from 'content-handler/utils/emit.js'
import ContentRequest from './content-request.js'
import ContentResponse from './content-response.js'

export default function express (app) {
  return config => {
    return new Promise(resolve => {
      const body = config.init && config.init.body
      const route = app.route(config.input.pathname, body)

      if (!route) {
        return resolve(config)
      }

      config.supervisor.abort()
      config.supervisor.preventDefault()

      const request = new ContentRequest(app, route.path, route.params, config)
      const response = new ContentResponse(app)

      response.addEventListener('content', ({content}) => {
        if (content instanceof window.Node) {
          ContentHandler.getByDocument(config.element.ownerDocument)
            .addContainer(content)

          emit(content, 'DOMContentLoaded', {
            source: config.element,
            url: config.input
          })
        }
      })

      route.callback.call(app, request, response)
    })
  }
}
