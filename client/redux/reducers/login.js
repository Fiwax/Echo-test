import { history } from '..'

const LOGIN_FIELD = 'LOGIN_FIELD'
const PASSWORD_FIELD = 'PASSWORD_FIELD'
const LOGIN = 'LOGIN'
const INCORRECT_LOGIN = 'INCORRECT_LOGIN'
const CLEAR_LOGIN_TOKEN = 'CLEAR_LOGIN_TOKEN'
const CLEAR_ERROR_MESSAGE = 'CLEAR_ERROR_MESSAGE'

const initialState = {
  phone: '',
  password: '',
  token: '',
  success: false,
  message: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_FIELD: {
      return { ...state, phone: action.phone }
    }
    case PASSWORD_FIELD: {
      return { ...state, password: action.password }
    }
    case LOGIN: {
      return { ...state, token: action.token, success: action.success, password: '', phone: '' }
    }
    case INCORRECT_LOGIN: {
      return { ...state, message: action.message, success: action.success, password: '', phone: '' }
    }
    case CLEAR_LOGIN_TOKEN: {
      return { ...state, token: action.token }
    }
    case CLEAR_ERROR_MESSAGE: {
      return { ...state, message: action.message }
    }
    default:
      return state
  }
}

export function getPhone(phone) {
  return { type: LOGIN_FIELD, phone }
}

export function getPassword(password) {
  return { type: PASSWORD_FIELD, password }
}

export function singIn() {
  return async (dispatch, getState) => {
    const store = getState()
    const { phone, password } = store.login
    const formatedPhone = phone.replace(/[' '+]/g, '')

    try {
      const url = 'https://backend-front-test.dev.echo-company.ru/api/auth/login'
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phone: formatedPhone,
          password
        })
      })
      const data = await res.json()

      if (data.message) {
        dispatch({ type: INCORRECT_LOGIN, message: data.message, success: data.success })
      } else {
        dispatch({ type: LOGIN, token: data.token, success: data.success })
        history.push('/personal')
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export function clearLoginToken() {
  return { type: CLEAR_LOGIN_TOKEN, token: '' }
}

export function clearErrorMessage() {
  return { type: CLEAR_ERROR_MESSAGE, message: '' }
}
