const startWithUpCase = string =>
  `${string.substr(0, 1).toUpperCase()}${string.substr(1)}`

export const getExpectedComponentName = filename => filename
  // Remove `/index.js` in the end
  .replace(/\/index\.js$/, '')

  // Make all items start with up-case
  .split('/')
  .map(startWithUpCase)
  .join('/')

  // Remove slashes
  .replace(/\//g, '')

  // Remove `.js` in the end
  .replace(/(\w+)\.js$/g, '$1')

export const getComponentName = (component) => {
  if (component) {
    return component.displayName || component.name || 'Unknown'
  }

  return undefined
}

export const getComponent = (component) => {
  if (component && component.WrappedComponent) {
    return component.WrappedComponent
  }

  return component
}
