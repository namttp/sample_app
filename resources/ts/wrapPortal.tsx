import React from 'react'
import ReactDOM from 'react-dom'

type Props = {
  children: React.ReactNode
}

export const WrapPortal: React.FC<Props> = ({ children }) => {
  const el = document.getElementById('modal')
  return el && ReactDOM.createPortal(children, el)
}
