import React from 'react'

const Form = ({onSubmit, children}) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        {children}
      </form>
    </div>
  )
}

export default Form
