function onKey (value, key) {
  define(this, 'target', value, key.replace(/]/g, '').split(/[.[]/))
}

function define (context, target, value, keys) {
  let name = keys.shift()
  const parsed = parseInt(name.length ? name : '0', 10)

  if (Number.isInteger(parsed)) {
    if (!Array.isArray(context[target])) {
      context[target] = []
    }

    if (!name.length) {
      name = context[target].length
    }
  } else {
    if (Object.getPrototypeOf(context[target]) !== null) {
      context[target] = {}
    }
  }

  if (!keys.length) {
    context[target][name] = value

    return
  }

  if (!context[target].hasOwnProperty(name)) {
    context[target][name] = {}
  }

  define(context[target], name, value, keys)
}

export default function toObject (map) {
  const context = {
    target: {}
  }

  map.forEach(onKey, context)

  return context.target
}
