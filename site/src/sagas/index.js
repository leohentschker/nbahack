import { takeLatest, fork } from 'redux-saga/effects'

/* ------------- Sagas ------------- */
import gameSaga from './GameSaga'

/* ------------- Services ------------- */
import Api from '../services/Api'

const api = Api.create()

export default function * root () {
  yield [
    // startup saga
    fork(gameSaga, api),
  ]
}
