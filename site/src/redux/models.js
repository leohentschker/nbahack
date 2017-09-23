import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  submitModel: ['code'],
  modelError: ['error'],
  submitSuccess: [],
})

export const ModelTypes = Types
export default Creators

/* ------------- Initial State ------------- */
const INITIAL_STATE = Immutable({
  submitting: false,
  error: null,
})

/* ------------- Reducer ------------- */
export const reducer = createReducer(INITIAL_STATE, {

  // when we successfully get the teammate
  [Types.SUBMIT_MODEL]: () =>
    INITIAL_STATE.merge({ submitting: true }),

  [Types.MODEL_ERROR]: (state, { error }) =>
    INITIAL_STATE.merge({ error }),

  [Types.SUBMIT_SUCCESS]: () =>
    INITIAL_STATE,
})
