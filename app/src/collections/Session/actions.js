import AbstractAction from 'src/lib/AbstractAction'

class Action extends AbstractAction {
  _namespace = 'Session'
}

export const setToken = new Action('setToken', {
  init: token => ({ token }),
  success: token => ({ token }),
})

export const pull = new Action('pull', {
  success: token => ({ token }),
})

export const removeToken = new Action('removeToken')
