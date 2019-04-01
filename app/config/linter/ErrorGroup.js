function textRed(text) {
  return `\x1b[31m${text}\x1b[0m`
}

function textGreen(text) {
  return `\x1b[32m${text}\x1b[0m`
}

export default class ErrorGroup {
  constructor() {
    this.errors = []
  }

  get message() {
    return this.errors.join('\n\n')
  }

  get hasErrors() {
    return this.errors.length > 0
  }

  refresh() {
    this.errors = []
  }

  inject() {
    beforeEach(() => this.refresh())
    afterEach(() => this.hasErrors && this.throw())
  }

  push(description, expected, received) {
    if (expected || received) {
      return this.errors.push(`${description} \n  expected: ${textGreen(expected)} \n  received: ${textRed(received)}`)
    }

    return this.errors.push(textRed(description))
  }

  throw(prefix) {
    const content = this.message

    this.refresh()

    if (prefix) {
      throw new Error(`${prefix}\n\n${content}`)
    }

    throw new Error(content)
  }
}
