import { AppDispatch } from '@/store'
import { useError } from '@/store/networkError/selectors'
import networkErrorSlice from '@/store/networkError/slice'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Modal from '../modal'
import styles from './index.module.scss'
import ModalContent from './modalContent'

const NetworkErrorModal = () => {
  const [open, setOpen] = useState<boolean>(false)
  const error = useError()
  const dispatch: AppDispatch = useDispatch()

  const close = () => {
    setOpen(false)
    dispatch(networkErrorSlice.actions.reset())
  }

  useEffect(() => {
    if (error) setOpen(true)
    return () => {
      setOpen(false)
    }
  }, [error])

  return (
    <div className={styles.content}>
      {error && (
        <Modal
          children={<ModalContent onClick={close} />}
          isShowModal={open}
          setIsShowModal={() => close()}
        />
      )}
    </div>
  )
}

export default NetworkErrorModal
