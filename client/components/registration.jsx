import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { useDispatch, useSelector } from 'react-redux'
import {
  passwordField,
  phoneField,
  lastNameField,
  firstNameField,
  tryRegister,
  clearFields
} from '../redux/reducers/registration'
import './styles.scss'
import Modal from './modal'

const Registration = () => {
  const { phone, lastName, firstName, register_password, message_text, register_errors } =
    useSelector((s) => s.registration)
  const [isActive, setIsActive] = useState(true)
  const [isText, setIsText] = useState('password')
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isActive) {
      dispatch(clearFields())
      setIsActive(true)
    }
  }, [isActive])

  const phoneNormalize = (value) => {
    const phoneNumber = parsePhoneNumberFromString(value)

    if (!phoneNumber) return value
    return phoneNumber.formatInternational()
  }
  return (
    <div>
      <div className="main bg-gray-100 relative">
        <div className="form-container shadow-lg">
          <h2 className="form__text">Registration</h2>
          <form className="form-seacrh">
            <label htmlFor="firstName" className="text-gray-600">
              FirstName
            </label>
            <input
              type="text"
              className="form-search__input py-2 outline-none border-b-2 border-gray-300"
              id="name"
              placeholder="first name"
              value={firstName}
              onChange={(e) => dispatch(firstNameField(e.target.value))}
            />

            <label htmlFor="lastName" className="text-gray-600">
              LastName
            </label>
            <input
              id="lastName"
              type="text"
              className="form-search__input py-2 outline-none border-b-2 border-gray-300"
              placeholder="last name"
              value={lastName}
              onChange={(e) => dispatch(lastNameField(e.target.value))}
            />

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
                dispatch(phoneField(e.target.value))
              }}
            />

            <label htmlFor="password-input">Password</label>
            <input
              id="password-input"
              type={isText}
              className="form-search__input py-2 outline-none border-b-2 border-gray-300"
              placeholder="password"
              value={register_password}
              onChange={(e) => dispatch(passwordField(e.target.value))}
            />

            <div className="flex justify-between">
              <span>{isText  === "password" ? "Show password" : "Hide password"}</span>
              <button
                type="button"
                onClick={() => setIsText(isText === 'password' ? 'text' : 'password')}
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
            <button
              type="button"
              className="form-search__button bg-gray-800 w-full text-white py-3 mt-5 font-bold"
              onClick={() => dispatch(tryRegister())}
            >
              Create an account
            </button>

            <div className="form-search__links items-center mt-4">
              <Link className="form-search__link hover:underline" to="/login">
                Sign in
              </Link>
            </div>
          </form>
        </div>
        {isActive && message_text && (
          <Modal
            message={message_text}
            errors={register_errors}
            active={isActive}
            setActive={setIsActive}
          />
        )}
      </div>
    </div>
  )
}

export default React.memo(Registration)
