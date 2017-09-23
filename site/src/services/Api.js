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

  const save = (modelCode) =>
    api.post('model/save/', {
      code: modelCode,
      modelName: 'testName',
    })
      .then(resp => resp.data)

  const get = (modelCode, modelName) =>
    api.get(`model/${modelName}`)

  return {
    save,
    get,
  }
}

// let's return back our create method as the default.
export default {
  create,
}
