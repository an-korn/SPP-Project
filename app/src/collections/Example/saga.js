import {
  all,
  call,
  put,
  takeEvery,
} from 'redux-saga/effects'

import * as actions from './actions'
import * as Api from './api'

function* fetch() {
  try {
    const result = yield call(Api.fetch)
    yield put(actions.fetch.success(result))
  } catch (error) {
    yield put(actions.fetch.failure(error))
  }
}

export default function* () {
  yield all([
    call(function* watcher() {
      yield takeEvery(actions.fetch.INIT_TYPE, fetch)
    }),
  ])
}
