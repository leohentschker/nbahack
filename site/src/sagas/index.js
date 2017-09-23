import { takeLatest, fork } from 'redux-saga/effects'

/* ------------- Sagas ------------- */
import modelSaga from './ModelSaga'

/* ------------- Services ------------- */
import Api from '../services/Api'

const api = Api.create()

export default function * root () {
  yield [
    // startup saga
    fork(modelSaga, api),
  ]
}
