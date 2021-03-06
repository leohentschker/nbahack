import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getPrediction: ['model', 'dataset'],
  setPrediction: ['prediction'],
})

export const DatasetTypes = Types
export default Creators

/* ------------- Initial State ------------- */

const randomValue = () => Math.random() * 5

const DEFAULT_PREDICTION = {
  results: [
    {
      team1: 'OKC',
      team2: 'ATL',
      date: '12/12/17',
      score: '110-150',
      value: randomValue(),
    },
    {
      team1: 'NYK',
      team2: 'LAL',
      date: '12/12/17',
      score: '110-150',
      value: randomValue(),
    },
    {
      team1: 'LAL',
      team2: 'MEM',
      date: '12/12/17',
      score: '110-150',
      value: randomValue(),
    },
    {
      team1: 'LAC',
      team2: 'PHI',
      date: '12/12/17',
      score: '110-150',
      value: randomValue(),
    },
  ],
}
const INITIAL_STATE = Immutable({
  prediction: DEFAULT_PREDICTION,
  fetching: false,
  error: null,
})

/* ------------- Reducer ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_PREDICTION]: state =>
    state.merge({ fetching: true, error: null }),

  [Types.SET_PREDICTION]: (state, { prediction }) =>
    state.merge({ fetching: false, prediction }),
})
