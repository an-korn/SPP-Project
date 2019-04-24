export const subscribeGetUser = (cb) => {
  return {
    type: 'socket',
    types: ['SET_USER', 'SET_USER_SUCCESS', 'SET_USER_FAIL'],
    promise: (socket) => socket.on('get_user', (data) => cb(data)),
  }
}

export function getUser(token) {
  const message = { token };
  return {
    type: 'socket',
    types: ['SET_USER', 'SET_USER_SUCCESS', 'SET_USER_FAIL'],
    promise: (socket) => socket.emit('get_user', message),
  }
}
