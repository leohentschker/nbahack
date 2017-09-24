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

function* waitSeconds(ms, result=true) {
  return yield call(() => new Promise(resolve => setTimeout(() => resolve(result), ms)))
}

function * handleTrain(api, action) {
  yield call(api.trainModel, action.modelName, action.dataset)
  let progress = 1.01
  while (true) {
    const model = yield call(api.get, action.modelName)
    if (model.trained) {
      yield put(ModelActions.trainSuccess())
      yield put(ModelActions.updateProgress(1.01))
      break
    } else {
      const percentage = (progress / (progress + 5.0)) * 100
      yield put(ModelActions.updateProgress(percentage))
      progress += 1.01
    }
    yield call(waitSeconds, 1000)
  }
}

export default function * flow(api) {
  yield takeEvery(ModelTypes.SAVE_MODEL, handleSave, api)
  yield takeEvery(ModelTypes.FETCH_MODELS, handleFetch, api)
  yield takeEvery(ModelTypes.TRAIN_MODEL, handleTrain, api)
}
