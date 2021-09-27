import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../redux/reducers/auth'
import { clearFields } from '../redux/reducers/registration'
import { history } from '../redux'
import { clearLoginToken } from '../redux/reducers/login'
import { clearResetToken } from '../redux/reducers/reset'
import Head from './head'

const Personal = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((s) => s.auth)
  const tokenResetPassword = useSelector((state) => state.reset.token_reset_success_password)
  const token = useSelector((state) => state.login.token)
  useEffect(() => {
    dispatch(getUser())
    dispatch(clearFields())
  }, [])

  const Exit = () => {
    if (token) {
      dispatch(clearLoginToken())
      history.push('/login')
    }
    if (tokenResetPassword) {
      dispatch(clearResetToken())
      history.push('/login')
    }
  }
  return (
    <div>
      <Head title="Pesonal" />
      <div className="flex justify-center h-screen items-center">
        <div className="bg-gray-800 text-white fold-bold rounded-lg text-center p-10 text-xl ">
          <div>Personal account</div>
          <div>
            {user.first_name} {user.last_name}
          </div>
          <button onClick={Exit} type="button" className="bg-gray-600 p-1 px-5 rounded-lg mt-2">
            Exit
          </button>
        </div>
      </div>
    </div>
  )
}

Personal.propTypes = {}

export default React.memo(Personal)
