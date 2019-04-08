# <a name="reference">content-handler-express</a>

Emulate [expressjs](https://expressjs.com) in your browser, using [content-handler](https://github.com/Lcfvs/content-handler)

## <a name="install">Install</a>

`npm i content-handler-express`

## <a name="usage">Usage</a>

### <a name="create-an-app">Create an app</a>

#### <a name="browser-side">Browser side</a>

```js
import ContentApplication from 'content-handler-express/content-application.js'
import html from 'content-handler-express/engines/browser/html.js'

const document = window.document
const app = new ContentApplication()

export default app
  .engine('html', html(app, document))
  .set('origin', document.location.origin)

```

#### <a name="server-side">Server side</a>

```js
import express from 'express'
import 'content-handler-express/engines/node/html.js'

export default app
  .engine('html', html(app))
  .set('origin', 'https://sub.domain.tld')
```

### <a name="add-the-express-controller-to-your-listeners">Add the express controller to your listeners</a>

```js
// ...
import express from 'content-handler-express/express.js'

ContentHandler
  .getByDocument()
  .addEventListener(anchor.selector, anchor.listen([
    cache.default,
    headers.xhr,
    credentials.sameOrigin,
    mode.sameOrigin,
    redirect.follow,
    referrer.client,
    express(global)
  ]))
```

### <a name="listen-a-route">Listen a route</a>

```js
const template = '/home.html'

app.get(template, (request, response) => {
  response.render(template, (error, html) => {
    if (error) {
      throw error
    }

    response.send(html)
  })
})
```

### <a name="fill-the-html-with-some-data">Fill the HTML with some data</a>

```js
response.render(template, (error, html) => {
  if (error) {
    throw error
  }

  html.querySelector('main > h1').textContent = 'Hello world'
  response.send(html)
})
```

### <a name="for-the-rest-see-the-expressjs-doc">For the rest, see the expressjs doc</a>

[https://expressjs.com/en/4x/api.html](https://expressjs.com/en/4x/api.html)

## <a name="license">License</a>

[MIT](https://github.com/Lcfvs/content-handler-express/blob/master/licence.md)
