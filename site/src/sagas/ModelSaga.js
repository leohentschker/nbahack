// external
import {
  takeEvery,
  call,
  put,
} from 'redux-saga/effects'

// internal
import ModelActions, { ModelTypes } from '../redux/models'

function * handleSave(api, { modelName, code }) {
  yield call(api.saveModel, modelName, code)
}

function * handleFetch(api) {
  const models = yield call(api.list)
  yield put(ModelActions.fetchSuccess(models))

  yield put(ModelActions.selectModel(models[0]))
}

function * handleTrain(api, { modelName, dataset }) {
  console.log("TRAINING THE MODEL", modelName, dataset, "THAT WAS IT")
  yield call(api.trainModel, modelName, dataset)
}

export default function * flow(api) {
  yield takeEvery(ModelTypes.SAVE_MODEL, handleSave, api)
  yield takeEvery(ModelTypes.FETCH_MODELS, handleFetch, api)
  console.log("WELL L")
  yield takeEvery(ModelTypes.TRAIN_MODEL, handleTrain, api)
}
