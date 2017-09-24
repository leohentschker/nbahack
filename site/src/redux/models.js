import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const DEFAULT_CODE = `class Model:
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

    @classmethod
    def from_parameters(params):
        """
        Instantiates a trained model
        from parameters
        """
        return Model()
`

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  fetchModels: [],
  fetchSuccess: ['models'],

  updateCode: ['code'],

  selectModel: ['activeModel'],
  newModel: ['name'],

  saveModel: ['modelName', 'code'],
  saveSuccess: [],

  trainModel: ['modelName', 'dataset'],
  trainSuccess: [],

  predictModel: ['modelName', 'dataset'],

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
  trainingProgress: 1.01,
  models: [],
  datasets: [],
  codeError: null,
  code: DEFAULT_CODE,
})

/* ------------- Reducer ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_CODE]: (state, { code }) => {
    const newModels = state.models.asMutable().map(m => {
      if (m.id === state.activeModel.id) {
        const newModel = m.asMutable()
        newModel.code = code
        return newModel
      } else {
        return m
      }
    })
    return state.merge({ code, models: newModels })
  },

  [Types.FETCH_MODELS]: state =>
    state.merge({ fetching: true }),

  [Types.FETCH_SUCCESS]: (state, { models }) =>
    state.merge({ models }),

  [Types.SELECT_MODEL]: (state, { activeModel }) =>
    state.merge({ code: activeModel.code, activeModel }),

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

  [Types.PREDICT_MODEL]: state => state,

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
