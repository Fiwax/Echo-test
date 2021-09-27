import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import auth from './auth'
import login from './login'
import registration from './registration'
import reset from './reset'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,
    login,
    registration,
    reset
  })

export default createRootReducer
