import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getPrediction: ["model", "dataset"],
})

export const DatasetTypes = Types
export default Creators

/* ------------- Initial State ------------- */
const INITIAL_STATE = Immutable({
  prediction: null,
  fetching: false,
  error: null,
})

/* ------------- Reducer ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_PREDICTION]: state =>
    state.merge({ fetching: true }),

  [Types.FETCH_DATASETS_SUCCESS]: (state, { datasets }) =>
    state.merge({ fetching: false, datasets }),

  [Types.SELECT_DATASET]: (state, { activeDataset }) =>
    state.merge({ fetching: false, activeDataset }),

  [Types.DATASET_ERROR]: (state, { error }) =>
    state.merge({ error }),
})
