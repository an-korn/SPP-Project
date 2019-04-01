import ErrorGroup from './linter/ErrorGroup'
import GetFiles from './linter/GetFiles'

const errors = new ErrorGroup()

errors.inject()

const filterComponents = item =>
  /\/index\.js$/.test(item.filename)

describe('components', () => {
  const items = new GetFiles('components')

  test('have correct exported names', () => {
    items.all().filter(filterComponents).forEach((file) => {
      if (file.actualName !== file.expectedName) {
        errors.push(file.filename, file.expectedName, file.actualName)
      }
    })
  })
})

describe('containers', () => {
  const items = new GetFiles('containers', ['Form/'])

  test('have correct exported names', () => {
    items.all().forEach((file) => {
      const expectedName = `${file.expectedName}Container`

      if (file.actualName !== expectedName) {
        errors.push(file.filename, expectedName, file.actualName)
      }
    })
  })
})

describe('forms', () => {
  const items = new GetFiles('forms')

  test('have correct exported names', () => {
    items.all().forEach((file) => {
      const expectedName = `enhancedForm(Form${file.expectedName})`

      if (file.actualName !== expectedName) {
        errors.push(file.filename, expectedName, file.actualName)
      }
    })
  })
})

describe('pages', () => {
  const items = new GetFiles('pages', ['_app', '_document'])

  test('have correct exported names', () => {
    items.all().forEach((file) => {
      const expectedName = file.expectedName === 'index'
        ? 'HomePage'
        : `${file.expectedName}Page`

      if (file.actualName !== expectedName) {
        errors.push(file.filename, expectedName, file.actualName)
      }
    })
  })
})
