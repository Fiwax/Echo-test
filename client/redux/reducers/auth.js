const GET_USER = 'GET_USER'

const initialState = {
  user: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER: {
      return { ...state, user: action.user }
    }
    default:
      return state
  }
}

export function getUser() {
  return async (dispatch, getState) => {
    const store = getState()
    const { token } = store.login
    const { token_reset_success_password } = store.reset
    const avaiableToken = token || token_reset_success_password

    try {
      const url = 'https://backend-front-test.dev.echo-company.ru/api/user/'
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: avaiableToken
        }
      })

      const data = await res.json()
      dispatch({ type: GET_USER, user: data })
    } catch (e) {
      console.log(e)
    }
  }
}
