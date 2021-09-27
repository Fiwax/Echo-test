import { history } from '..'

const PHONE_FIELD = 'PHONE_FIELD'
const FIRSTNAME_FIELD = 'FIRSTNAME_FIELD'
const LASTNAME_FIELD = 'LASTNAME_FIELD'
const PASSWORD_FIELD = 'PASSWORD_FIELD'
const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS'
const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR'
const CLEAR_FIELDS = 'CLEAR_FIELDS'

const initialState = {
  firstname: '',
  lastname: '',
  phoneNumber: '',
  register_password: '',
  message_text: '',
  register_token: '',
  register_errors: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case PHONE_FIELD: {
      return { ...state, phoneNumber: action.phoneNumber }
    }
    case FIRSTNAME_FIELD: {
      return { ...state, firstName: action.firstName }
    }
    case LASTNAME_FIELD: {
      return { ...state, lastName: action.lastName }
    }
    case PASSWORD_FIELD: {
      return { ...state, register_password: action.password }
    }
    case REGISTER_USER_SUCCESS: {
      return { ...state, message_text: action.message_text, register_token: action.register_token }
    }
    case REGISTER_USER_ERROR: {
      return {
        ...state,
        message_text: action.message_text,
        register_errors: action.register_errors
      }
    }
    case CLEAR_FIELDS: {
      return {
        ...state,
        message_text: action.message_text,
        register_errors: action.register_errors
      }
    }
    default:
      return state
  }
}

export function passwordField(password) {
  return { type: PASSWORD_FIELD, password }
}

export function phoneField(phone) {
  return { type: PHONE_FIELD, phoneNumber: phone }
}

export function firstNameField(firstName) {
  return { type: FIRSTNAME_FIELD, firstName }
}

export function lastNameField(lastName) {
  return { type: LASTNAME_FIELD, lastName }
}

export function tryRegister() {
  return async (dispatch, getState) => {
    const store = getState()
    const { phoneNumber, firstName, lastName, password } = store.registration
    const formatedPhone = phoneNumber.replace(/[' '+]/g, '')
    const url = 'https://backend-front-test.dev.echo-company.ru/api/user/registration'
    try {
      const result = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phone: formatedPhone,
          password,
          first_name: firstName,
          last_name: lastName
        })
      })

      const data = await result.json()

      if (data.token && data.message) {
        dispatch({
          type: REGISTER_USER_SUCCESS,
          message_text: data.message,
          register_token: data.token
        })
        history.push('/personal')
      } else {
        dispatch({
          type: REGISTER_USER_ERROR,
          message_text: data.message,
          register_errors: data.errors,
          register_success: data.success
        })
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export function clearFields() {
  return { type: CLEAR_FIELDS, message_text: '', register_errors: '' }
}
