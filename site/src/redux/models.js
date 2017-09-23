import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
const DEFAULT_CODE =`class Model:
  """
  Write your code here!
  """

  def train(self, dataframe):
    """
    Takes in dataframe containing all
    of the relevant data we will need
    """

  def predict(self, data):
    """
    Takes in the data for an upcoming game
    and makes a guess as to the value
    """
`

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  fetchModels: [],
  fetchSuccess: ['models'],

  updateCode: ['code'],

  selectModel: ['activeModel'],
  newModel: ['name'],

  saveModel: ['code', 'modelName'],
  saveSuccess: [],

  trainModel: ['modelName'],
  trainSuccess: [],

  codeError: ['codeError'],
  success: [],
})

export const ModelTypes = Types
export default Creators

/* ------------- Initial State ------------- */
const INITIAL_STATE = Immutable({
  activeModel: null,
  saving: false,
  training: false,
  models: [],
  datasets: [],
  codeError: null,
  code: DEFAULT_CODE,
})

/* ------------- Reducer ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_CODE]: (state, { code }) =>
    state.merge({ code }),

  [Types.FETCH_MODELS]: state =>
    state.merge({ fetching: true }),

  [Types.FETCH_SUCCESS]: (state, { models }) =>
    state.merge({ models }),

  [Types.SELECT_MODEL]: (state, { activeModel }) =>
    state.merge({ activeModel }),

  [Types.NEW_MODEL]: (state, { name }) => {
    const newModel = {
      parameterJSON: '',
      code: '',
      name,
      id: Math.round(Math.random() * 100000),
    }
    return state.merge({
      models: [newModel].concat(state.models),
    })
  },

  [Types.SAVE_MODEL]: state =>
    state.merge({ saving: true }),

  [Types.SAVE_SUCCESS]: state =>
    state.merge({ saving: false }),

  [Types.TRAIN_MODEL]: state =>
    state.merge({ training: true }),

  [Types.TRAIN_SUCCESS]: state =>
    state.merge({ training: false }),

  [Types.CODE_ERROR]: (state, { codeError }) =>
    state.merge({ codeError }),
})
