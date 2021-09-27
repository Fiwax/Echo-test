import React from 'react'
import './styles.scss'

const Modal = ({ message, setActive, active, errors, error_message}) => {
  const handelModal = () => {
    setActive(!active)
  }
  return (
    <div className="modal h-screen w-full flex justify-center items-center bg-gray- z-10 absolute top-0">
      <div
        className="modal__content w-6/12 py-2
        h-24 overflow-hidden overflow-y-auto
    bg-white flex justify-center flex-col items-center rounded-md"
      >
        <h2 className="md:text-3xl py-2">{message}</h2>
        {errors?.map((it, index) => {
          const { param, msg } = it
          return (
            <div key={index}>
              {param}: {msg}
            </div>
          )
        })}
        <h2 className="md:text-3xl py-2">{error_message}</h2>
        <button
          onClick={handelModal}
          type="button"
          className="bg-gray-800 px-2 py-1 mt-2 rounded text-white"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}

export default React.memo(Modal)
