// external
import {
  takeEvery,
  call,
  put,
} from 'redux-saga/effects'

// internal
import { ModelTypes } from '../redux/models'

function * handleSubmit(api, action) {
  yield call(api.submitModel, action.code)
  console.log(action, "THE ACTION I GOT", api)
}

export default function * flow (api) {
  yield takeEvery(ModelTypes.SUBMIT_MODEL, handleSubmit, api)
}
