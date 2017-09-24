// a library to wrap and simplify api calls
import apisauce from 'apisauce'

const base = 'http://localhost:8000'

// our "constructor"
const create = (baseURL = base) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {},
    // 10 second timeout...
    timeout: 10000,
  })

  const saveModel = (modelName, modelCode) =>
    api.post('model/save/', {
      code: modelCode,
      modelName,
    })
      .then(resp => resp.data)

  const trainModel = (modelName, dataset) =>
    api.post('model/train/', {
      modelName,
      dataset,
    })
      .then(resp => resp.data)

  const predictModel = (modelName, dataset) =>
    api.post('model/predict/', {
      modelName,
      dataset,
    })
      .then(resp => resp.data)

  const list = () =>
    api.get(`model/`)
      .then(resp => resp.data.models)

  const get = (modelCode, modelName) =>
    api.get(`model/${modelName}`)
      .then(resp => resp.data)

  const listDatasets = () =>
    api.get('datasets/')
      .then(resp => resp.data.datasets)

  return {
    listDatasets,
    predictModel,
    trainModel,
    saveModel,
    list,
    get,
  }
}

// let's return back our create method as the default.
export default {
  create,
}
