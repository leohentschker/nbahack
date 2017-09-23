import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  fetchDatasets: [],
  fetchDatasetsSuccess: ['datasets'],
  selectDataset: ['activeDataset'],
  datasetError: ['error'],
})

export const DatasetTypes = Types
export default Creators

/* ------------- Initial State ------------- */
const INITIAL_STATE = Immutable({
  activeDataset: null,
  datasets: [],
  fetching: false,
  error: null,
})

/* ------------- Reducer ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_DATASETS]: state =>
    state.merge({ fetching: true }),

  [Types.FETCH_DATASETS_SUCCESS]: (state, { datasets }) =>
    state.merge({ fetching: false, datasets }),

  [Types.SELECT_DATASET]: (state, { activeDataset }) =>
    state.merge({ fetching: false, activeDataset }),

  [Types.DATASET_ERROR]: (state, { error }) =>
    state.merge({ error }),
})
