// external
import {
  takeLatest,
  select,
  call,
  put,
} from 'redux-saga/effects'

// internal
import { DatasetTypes } from '../redux/datasets'
import ModelActions, { ModelTypes } from '../redux/models'
import PredictionActions from '../redux/predictions'

const getModelName = (state) => {
  return state.data.activeModel ? state.data.activeModel.name : null
}

const getDatasetName = (state) => {
  return state.datasets.activeDataset ? state.datasets.activeDataset.name : null
}

function * fetchPrediction(api) {
  const modelName = yield select(getModelName)
  const datasetName = yield select(getDatasetName)

  if (modelName != null && datasetName != null) {
    const output = yield call(api.fetchPrediction, modelName, datasetName)
    if (output) {
      yield put(PredictionActions.setPrediction(output))
    }
  }
}

function* waitSeconds(ms, result=true) {
  return yield call(() => new Promise(resolve => setTimeout(() => resolve(result), ms)))
}

function * handlePredict(api, { modelName, dataset }) {
  yield call(api.predictModel, modelName, dataset)
  let progress = 1.01
  while (true) {
    const prediction = yield call(api.fetchPrediction, modelName, dataset)
    if (prediction.complete) {
      yield put(ModelActions.predictSuccess())
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
  yield takeLatest(DatasetTypes.SELECT_DATASET, fetchPrediction, api)
  yield takeLatest(ModelTypes.SELECT_MODEL, fetchPrediction, api)
  yield takeLatest(ModelTypes.PREDICT_MODEL, handlePredict, api)
}
