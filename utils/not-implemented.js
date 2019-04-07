export default function notImplemented (name) {
  return function () {
    console.log('Not implemented : %s', name)

    return this
  }
}
