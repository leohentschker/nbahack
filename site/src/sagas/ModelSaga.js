// external
import {
  takeEvery,
  call,
  put,
} from 'redux-saga/effects'

// internal
import ModelActions, { ModelTypes } from '../redux/models'

function * handleSave(api, action) {
  console.log(action)
  console.log(action.data.code, action.data.modelName, "THE CODE AND HUR")
  yield call(api.saveModel, 'testName', action.data.code)
}

function * handleFetch(api) {
  const models = yield call(api.list)
  yield put(ModelActions.fetchSuccess(models))

  yield put(ModelActions.selectModel(models[0]))
}

export default function * flow(api) {
  yield takeEvery(ModelTypes.SAVE_MODEL, handleSave, api)
  yield takeEvery(ModelTypes.FETCH_MODELS, handleFetch, api)
}
