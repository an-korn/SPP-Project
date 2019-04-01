import path from 'path'
import fs from 'fs'

import { getComponent, getComponentName, getExpectedComponentName } from './helpers'

const filterJSFiles = input => /\.js$/.test(input)
const filterOutDevFiles = input => !/(styles\.js$|\.(spec|test)\.js$|data\.js$|\/data\/|__tests__)/.test(input)

const getPaths = dir => fs.readdirSync(dir)
  .reduce((files, file) => {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      return files.concat(getPaths(path.join(dir, file)))
    }

    return files.concat(path.join(dir, file))
  }, [])

export default class GetFiles {
  constructor(dirname = '', ignored = []) {
    this.path = path.resolve(process.cwd(), 'src', dirname)
    this.ignored = ignored
    this.files = []

    this.load()
  }

  all() {
    return this.files
  }

  load() {
    console.error = jest.fn() // eslint-disable-line no-console

    const files = getPaths(this.path)
      .filter(filterJSFiles)
      .filter(filterOutDevFiles)
      .filter((filename) => {
        const normalizedName = filename.replace(/^.+src\/[^/]+\//, '')

        return !this.ignored.some(name => normalizedName.indexOf(name) > -1)
      })
      .map((reference) => {
        const filename = reference.replace(this.path, '').replace(/^\//, '')
        // eslint-disable-next-line import/no-dynamic-require, global-require
        const content = require(reference)

        return {
          filename,
          expectedName: getExpectedComponentName(filename),
          actualName: getComponentName(getComponent(content.default)),
        }
      })

    delete console.error // eslint-disable-line no-console

    this.files = files
  }
}
