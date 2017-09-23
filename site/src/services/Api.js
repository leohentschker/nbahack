// a library to wrap and simplify api calls
import apisauce from 'apisauce'

const base = 'asdasd.com'

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
    timeout: 10000
  })

  const getData = () =>
    api.post('wat', {
    })
      .then(resp => resp.data)

  return {
    getData,
  }
}

// let's return back our create method as the default.
export default {
  create
}
