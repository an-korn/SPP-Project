import { all, call } from 'redux-saga/effects'

// START imports

import ExampleReducer from './Example/reducer'
import ExampleSaga from './Example/saga'
import SessionReducer from './Session/reducer'
import SessionSaga from './Session/saga'
import ProjectReducer from './Project/reducer'
import StoryReducer from './Story/reducer'

// END imports

export default {
  reducers: {
    example: ExampleReducer,
    session: SessionReducer,
    project: ProjectReducer,
    story: StoryReducer,
  },
  sagas: function* sagas() {
    yield all([
      call(ExampleSaga),
      call(SessionSaga),
    ])
  },
}
