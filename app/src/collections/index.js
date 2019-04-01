import { all, call } from 'redux-saga/effects'

// START imports

import ExampleReducer from './Example/reducer'
import ExampleSaga from './Example/saga'
import SessionReducer from './Session/reducer'
import SessionSaga from './Session/saga'
import OrganizationReducer from './Organization/reducer'
import UserReducer from './User/reducer'

// END imports

export default {
  reducers: {
    example: ExampleReducer,
    session: SessionReducer,
    organization: OrganizationReducer,
    user: UserReducer
  },
  sagas: function* sagas() {
    yield all([
      call(ExampleSaga),
      call(SessionSaga),
    ])
  },
}
