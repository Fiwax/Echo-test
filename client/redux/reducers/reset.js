import { history } from '..'

const SEND_SMS_CODE = 'SEND_SMS_CODE'
const GET_SMS_CODE = 'GET_SMS_CODE'
const PHONE_RESET_PASSWORD = 'PHONE_RESET_PASSWORD'
const RESET_PASSWORD_ERRORS = 'RESET_PASSWORD_ERRORS'
const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS'
const GET_NEW_PASSWORD = 'GET_NEW_PASSWORD'
const SET_IS_CODE_CORRECT_TOGGLE = 'SET_IS_CODE_CORRECT_TOGGLE'
const CLEAR_RESET_TOKEN = 'CLEAR_RESET_TOKEN'
const CLEAR_RESET_ERRORS = 'CLEAR_RESET_ERRORS'

const initialState = {
  phone_reset_password: '',
  smsCode: '',
  confirmation_message: '',
  reset_errors: [],
  error_message: '',
  newPassword: '',
  codeFromServer: '5555',
  isCodeCorrect: false,
  token_reset_success_password: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SMS_CODE: {
      return { ...state, smsCode: action.smsCode }
    }
    case SEND_SMS_CODE: {
      return {
        ...state,
        confirmation_message: action.message
      }
    }
    case PHONE_RESET_PASSWORD: {
      return { ...state, phone_reset_password: action.phone_reset_password }
    }
    case RESET_PASSWORD_ERRORS: {
      return { ...state, reset_errors: action.errors, error_message: action.error_message }
    }
    case RESET_PASSWORD_SUCCESS: {
      return { ...state, token_reset_success_password: action.token }
    }
    case GET_NEW_PASSWORD: {
      return { ...state, newPassword: action.password }
    }
    case SET_IS_CODE_CORRECT_TOGGLE: {
      return { ...state, isCodeCorrect: action.toggle }
    }
    case CLEAR_RESET_TOKEN: {
      return { ...state, token_reset_success_password: action.token }
    }
    case CLEAR_RESET_ERRORS: {
      return { ...state, reset_errors: action.errors, error_message: action.message }
    }
    default:
      return state
  }
}

export function clearResetErrors() {
  return { type: CLEAR_RESET_ERRORS, errors: '', message: '' }
}

export function phoneResetPassword(phone) {
  return { type: PHONE_RESET_PASSWORD, phone_reset_password: phone }
}

export function getSmsCode(code) {
  return { type: GET_SMS_CODE, smsCode: code }
}

export function getNewPassword(password) {
  return { type: GET_NEW_PASSWORD, password }
}

export function sendSmsCodeToPhone() {
  return async (dispatch, getState) => {
    const store = getState()
    const { phone_reset_password } = store.reset
    const formatedPhone = phone_reset_password.replace(/[' '+]/g, '')
    const url = 'https://backend-front-test.dev.echo-company.ru/api/user/forgot-start'

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phone: formatedPhone
        })
      })

      const data = await res.json()
  
      if (data.errors || !data.success) {
        dispatch({ type: RESET_PASSWORD_ERRORS, errors: data.errors, error_message: data.message })
      }
      else {
        dispatch({ type: SEND_SMS_CODE, message: data.message })
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export function sendSmsCodeToServer() {
  return async (dispatch, getState) => {
    const store = getState()
    const { smsCode, phone_reset_password, newPassword } = store.reset
    const formatedPhone = phone_reset_password.replace(/[' '+]/g, '')
    const url = 'https://backend-front-test.dev.echo-company.ru/api/user/forgot-end'
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phone: formatedPhone,
        code: smsCode,
        password: newPassword
      })
    })

    const data = await res.json()

    if (data.success && data.token && data.message) {
      dispatch({ type: RESET_PASSWORD_SUCCESS, token: data.token })
      history.push('/personal')
    }
  }
}

export function isCodeCorrectToggle(toggle) {
  return { type: SET_IS_CODE_CORRECT_TOGGLE, toggle }
}

export function clearResetToken() {
  return { type: CLEAR_RESET_TOKEN, token: '' }
}
