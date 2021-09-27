import React from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'

const ResetStep2 = () => {
  return (
    <div>
      <div className="main bg-gray-100">
        <div className="form-container shadow-lg">
          <h2 className="form-container__text">Reset Password</h2>
          <form className="form-seacrh">
            {/* Phone input  */}
            <label htmlFor="input-tel" className="text-gray-600">
              Sms code
            </label>
            <input
              id="input-tel"
              type="text"
              placeholder="code"
              className="form-search__input text-gray-800 py-2 outline-none border-b-2 border-gray-300"
            />

            {/* Button */}
            <button
              type="button"
              className="form-search__button bg-gray-800 w-full text-white py-3 mt-5 font-bold"
            >
              Finish
            </button>

            <div className="flex justify-between items-center mt-4">
              <div>
                <Link className="hover:underline" to="/">
                  I remember password
                </Link>
              </div>
              <span>or</span>
              <div>
                <Link className="hover:underline" to="/registration">
                  Create an account
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ResetStep2
