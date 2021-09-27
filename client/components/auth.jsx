import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { useSelector, useDispatch } from 'react-redux'
import { getPhone, getPassword, singIn, clearErrorMessage } from '../redux/reducers/login'
import Modal from './modal'

const Auth = () => {
  const [isActive, setIsActive] = useState(true)
  const [isText, setIsText] = useState('password')
  const { phone, password, message } = useSelector((s) => s.login)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isActive) {
      dispatch(clearErrorMessage())
      setIsActive(true)
    }
  }, [isActive])

  const phoneNormalize = (value) => {
    const phoneNumber = parsePhoneNumberFromString(value)

    if (!phoneNumber) return value
    return phoneNumber.formatInternational()
  }

  const Login = () => {
    if (phone && password) {
      dispatch(singIn())
    }
  }

  return (
    <div>
      <div className="main bg-gray-100 relative">
        <div className="form-container shadow-lg">
          <h2 className="form__text">Login</h2>
          <form className="form-seacrh">
            <label htmlFor="input-tel" className="text-gray-600">
              Phone
            </label>
            <input
              id="input-tel"
              type="tel"
              placeholder="phone  +7 (999) ..."
              className="form-search__input text-gray-800 py-2 outline-none border-b-2 border-gray-300"
              value={phone}
              onChange={(e) => {
                e.target.value = phoneNormalize(e.target.value)
                dispatch(getPhone(e.target.value))
              }}
            />

            <label htmlFor="input-password" className="text-gray-600">
              Password
            </label>
            <input
              id="input-password"
              type={isText}
              placeholder="password"
              className="form-search__input text-gray-800 py-2 border-b-2 border-gray-300 outline-none"
              value={password}
              onChange={(e) => dispatch(getPassword(e.target.value))}
            />

            <div className="flex items-center justify-between space-x-2 mt-2">
              <div className="flex items-center">
                <label htmlFor="rememberMe">Remember me</label>
                <input className="mt-1 mx-2 " type="checkbox" name="rememberMe" id="rememberMe" />
              </div>
              <button
                type="button"
                onClick={() => setIsText(isText === 'text' ? 'password' : 'text')}
                className="flex items-center"
              >
                <span className="mr-3">
                  {isText === 'password' ? 'Show password' : 'Hide password'}
                </span>
                {isText !== 'text' ? (
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                ) : (
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  </div>
                )}
              </button>
            </div>

            <button
              type="button"
              className="form-search__button bg-gray-800 w-full text-white py-3 mt-2 font-bold"
              onClick={Login}
            >
              Login
            </button>

            <div className="form-search__links mt-4">
              <div>
                <Link className="form-search__link hover:underline" to="/reset">
                  Forgot Password
                </Link>
              </div>
              <span>or</span>
              <div>
                <Link className="form__link hover:underline" to="/registration">
                  Create an account
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
      {isActive && message && <Modal setActive={setIsActive} active={isActive} message={message} />}
    </div>
  )
}

Auth.propTypes = {}

export default React.memo(Auth)
