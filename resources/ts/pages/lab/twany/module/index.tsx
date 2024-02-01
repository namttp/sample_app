import React from 'react'
import styles from './index.module.scss'
import { ChildProps } from '..'
import 'simplebar-react/dist/simplebar.min.css'
import Modal from './modal'

const Module = ({ start }: ChildProps) => {
  React.useEffect(() => {
    // YCM判定
    start()
  }, [])
  return (
    <div className={styles.content}>
      <Modal />
    </div>
  )
}

export default Module
