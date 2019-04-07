import { promises } from 'fs'

export default function load (name) {
  if (typeof window === 'object') {
    return window.fetch(name)
      .then(response => response.text())
  }

  if (typeof promises === 'object') {
    return promises.readFile(name)
      .then(response => response.toString())
  }
}
