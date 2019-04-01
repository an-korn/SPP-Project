import ErrorGroup from './linter/ErrorGroup'
import GetFiles from './linter/GetFiles'

const errors = new ErrorGroup()

errors.inject()

describe('components', () => {
  const list = new GetFiles('components')

  test('do not have Component in name of files', () => {
    list.all().forEach((file) => {
      if (file.filename.indexOf('Component') > -1) {
        errors.push(file.filename)
      }
    })
  })
})

describe('containers', () => {
  const list = new GetFiles('containers')

  test('do not have Container in name of files', () => {
    list.all().forEach((file) => {
      if (file.filename.indexOf('Container') > -1) {
        errors.push(file.filename)
      }
    })
  })
})

describe('forms', () => {
  const list = new GetFiles('forms')

  test('do not have Form in name of files', () => {
    list.all().forEach((file) => {
      if (file.filename.indexOf('Form') > -1) {
        errors.push(file.filename)
      }
    })
  })
})

describe('pages', () => {
  const list = new GetFiles('pages')

  test('do not have Page in name of files', () => {
    list.all().forEach((file) => {
      if (file.filename.indexOf('Page') > -1) {
        errors.push(file.filename)
      }
    })
  })
})
