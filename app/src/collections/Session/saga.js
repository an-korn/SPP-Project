import {
  all,
  call,
  put,
  takeEvery,
} from 'redux-saga/effects'

import * as actions from './actions'

const LOCAL_STORAGE_KEY = 'SESSION_TOKEN'

function* setToken({ payload }) {
  try {
    yield localStorage.setItem(LOCAL_STORAGE_KEY, payload.token)
    yield put(actions.setToken.success(payload.token))
  } catch (error) {
    yield put(actions.setToken.failure())
  }
}

function* pull() {
  try {
    const token = yield localStorage.getItem(LOCAL_STORAGE_KEY)
    yield put(actions.pull.success(token))
  } catch (error) {
    yield put(actions.pull.failure())
  }
}

function* removeToken() {
  try {
    yield localStorage.setItem(LOCAL_STORAGE_KEY, '')
    yield put(actions.removeToken.success())
  } catch (error) {
    yield put(actions.removeToken.failure())
  }
}

export default function* () {
  yield all([
    call(function* watcher() {
      yield takeEvery(actions.setToken.INIT_TYPE, setToken)
      yield takeEvery(actions.pull.INIT_TYPE, pull)
      yield takeEvery(actions.removeToken.INIT_TYPE, removeToken)
    }),
  ])
}
