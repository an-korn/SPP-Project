import AbstractAction from 'src/lib/AbstractAction'

class Action extends AbstractAction {
  _namespace = 'Example'
}

export const fetch = new Action('fetch')
