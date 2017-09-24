import { takeLatest, fork } from 'redux-saga/effects'

/* ------------- Sagas ------------- */
import modelSaga from './ModelSaga'
import datasetSaga from './DatasetSaga'
import predictionSaga from './PredictionSaga'

/* ------------- Services ------------- */
import Api from '../services/Api'

const api = Api.create()

export default function * root () {
  yield [
    // startup saga
    fork(modelSaga, api),

    fork(datasetSaga, api),

    fork(predictionSaga, api),
  ]
}
