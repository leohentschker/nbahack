import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getGames: ['date'],
})

export const ApiTypes = Types
export default Creators

/* ------------- Initial State ------------- */
const INITIAL_STATE = Immutable({
  querying: false,
})

/* ------------- Reducer ------------- */
export const reducer = createReducer(INITIAL_STATE, {

  // when we successfully get the teammate
  [Types.GET_GAMES]: (state, { reservation }) => {
    console.log("I AM GETTING THE GAMES")
    return state.merge({querying: true})
  }
})
