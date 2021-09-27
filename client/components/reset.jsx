import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { useSelector, useDispatch } from 'react-redux'
import Modal from './modal'
import {
  getSmsCode,
  sendSmsCodeToPhone,
  phoneResetPassword,
  sendSmsCodeToServer,
  isCodeCorrectToggle,
  getNewPassword,
  clearResetErrors
} from '../redux/reducers/reset'
import './styles.scss'

const Reset = () => {
  const [isActive, setIsActive] = useState(true)
  const [isText, setIsText] = useState('password')
  const {
    confirmation_message,
    smsCode,
    phone_reset_password,
    error_message,
    reset_errors,
    codeFromServer,
    isCodeCorrect,
    newPassword
  } = useSelector((s) => s.reset)
  const dispatch = useDispatch()

  const checkCode = (code) => {
    if (code === codeFromServer) {
      dispatch(isCodeCorrectToggle(true))
    } else {
      dispatch(isCodeCorrectToggle(false))
    }
  }

  useEffect(() => {
    checkCode(smsCode)
  }, [smsCode])

  useEffect(() => {
    if (!isActive) {
      dispatch(clearResetErrors())
      setIsActive(true)
    }
  }, [isActive])

  useEffect(() => {
    const popUp = document.querySelector('.pop-up')
    if (confirmation_message && smsCode) {
      setTimeout(() => {
        popUp.classList.add('-translate-y-full')
      }, 4000)
    }
  }, [confirmation_message, smsCode])

  useEffect(() => {
    const popUp = document.querySelector('.pop-up')
    if (confirmation_message && !smsCode) {
      setTimeout(() => {
        popUp.classList.remove('-translate-y-full')
      }, 500)
    }
  }, [confirmation_message, smsCode])

  const phoneNormalize = (value) => {
    const phoneNumber = parsePhoneNumberFromString(value)

    if (!phoneNumber) return value
    return phoneNumber.formatInternational()
  }

  return (
    <div>
      <div className="main bg-gray-100 relative">
        <div className="form-container shadow-lg">
          <h2 className="form__text">Reset Password</h2>
          <form className="form-seacrh">
            <label htmlFor="input-tel" className="text-gray-600">
              Phone
            </label>
            <input
              id="input-tel"
              type="tel"
              placeholder="phone +7 (999) ..."
              className="form-search__input text-gray-800 py-2 outline-none border-b-2 border-gray-300"
              value={phone_reset_password}
              onChange={(e) => {
                e.target.value = phoneNormalize(e.target.value)
                dispatch(phoneResetPassword(e.target.value))
              }}
            />

            {confirmation_message && (
              <label htmlFor="input-tel" className="text-gray-600">
                Sms code
              </label>
            )}
            {confirmation_message && (
              <input
                id="input-tel"
                type="text"
                placeholder="code"
                className="form-search__input text-gray-800 py-2 outline-none border-b-2 border-gray-300"
                value={smsCode}
                onChange={(e) => dispatch(getSmsCode(e.target.value))}
              />
            )}

            {isCodeCorrect && (
              <label htmlFor="new-password" className="text-gray-600">
                New password
              </label>
            )}
            {isCodeCorrect && (
              <input
                id="new-password"
                type={isText}
                placeholder="new password"
                className="form-search__input text-gray-800 py-2 outline-none border-b-2 border-gray-300"
                value={newPassword}
                onChange={(e) => dispatch(getNewPassword(e.target.value))}
              />
            )}

            {isCodeCorrect && (
              <div className="flex justify-between">
                <span>{isText === 'password' ? 'Show password' : 'Hide password'}</span>
                <button
                  type="button"
                  onClick={() => setIsText(isText === 'text' ? 'password' : 'text')}
                >
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
            )}

            <Buttons />

            <div className="form-search__links items-center mt-4">
              <div>
                <Link className="form-search__link hover:underline" to="/login">
                  I remember password
                </Link>
              </div>
              <span>or</span>
              <div>
                <Link className="form-search__link hover:underline" to="/registration">
                  Create an account
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
      {isActive && error_message && (
        <Modal
          errors={reset_errors}
          error_message={error_message}
          active={isActive}
          setActive={setIsActive}
        />
      )}
      <div className="pop-up text-white px-10 py-5 z-10 bg-gray-800 rounded transform transition duration-500 -translate-y-full">
        {confirmation_message}
      </div>
    </div>
  )
}

export default React.memo(Reset)

const Buttons = () => {
  const dispatch = useDispatch()
  const { isCodeCorrect, error_message } = useSelector((s) => s.reset)
  const [timer, setTimer] = useState(20)
  const [isCodeSent, setIsCodeSent] = useState(false)

  useEffect(() => {
    const codeButton = document.querySelector('.form-search__button_code')
    if (codeButton && !error_message) {
      if (timer !== 0 && isCodeSent) {
        codeButton.setAttribute('disabled', 'disabled')
      } else {
        codeButton.removeAttribute('disabled')
        setIsCodeSent(false)
        setTimer(20)
      }
    }
  }, [timer, isCodeSent, error_message])

  useEffect(() => {
    if (timer !== 0 && isCodeSent && !error_message) {
      setTimeout(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
    }
  }, [timer, isCodeSent, error_message])

  const sendCode = () => {
    dispatch(sendSmsCodeToPhone())
    if (!error_message) {
      setIsCodeSent(true)
    }
  }

  return (
    <div>
      {!isCodeCorrect ? (
        <div>
          <button
            type="button"
            className="form-search__button form-search__button_code bg-gray-800 w-full text-white py-3 mt-5 font-bold"
            onClick={sendCode}
          >
            {timer !== 0 && !isCodeSent ? 'Get code' : `Get code again in (${timer} sec)`}
          </button>
        </div>
      ) : (
        <div>
          <button
            type="button"
            className="form-search__button form-search__button_code bg-gray-800 w-full text-white py-3 mt-5 font-bold"
            onClick={() => dispatch(sendSmsCodeToServer())}
          >
            Finish Reset
          </button>
        </div>
      )}
    </div>
  )
}
