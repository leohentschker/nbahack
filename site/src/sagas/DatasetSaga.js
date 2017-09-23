// external
import {
  takeEvery,
  call,
  put,
} from 'redux-saga/effects'

// internal
import DatasetActions, { DatasetTypes } from '../redux/datasets'

function * handleFetch(api) {
  const datasets = yield call(api.listDatasets)
  yield put(DatasetActions.fetchDatasetsSuccess(datasets))
  console.log(datasets, "THE DS WE GOT")

  yield put(DatasetActions.selectDataset(datasets[0]))
}

export default function * flow(api) {
  yield takeEvery(DatasetTypes.FETCH_DATASETS, handleFetch, api)
}
