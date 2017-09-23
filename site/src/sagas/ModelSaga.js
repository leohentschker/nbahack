// external
import {
  takeEvery,
  call,
  put,
} from 'redux-saga/effects'

// internal
import ModelActions, { ModelTypes } from '../redux/models'

function * handleSubmit(api, action) {
  yield call(api.saveModel, action.code, 'testName')
}

function * handleFetch(api) {
  const models = yield call(api.list)
  console.log('GOT THE MODELS', models)
  yield put(ModelActions.fetchSuccess({ models }))
}

export default function * flow(api) {
  yield takeEvery(ModelTypes.SAVE_MODEL, handleSubmit, api)
  yield takeEvery(ModelTypes.FETCH_MODELS, handleFetch, api)
}
