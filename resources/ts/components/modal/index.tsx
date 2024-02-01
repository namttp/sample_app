import React from 'react'
import styles from './index.module.scss'

interface ModalProps {
  children: React.ReactElement
  isShowModal: boolean
  setIsShowModal: (modalStatus: boolean) => void
}

const Modal = ({ children, isShowModal, setIsShowModal }: ModalProps) => {
  const closeModal = () => {
    setIsShowModal(false)
  }

  return (
    <>
      {isShowModal && (
        <div className={styles.overlay} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              className={styles.cancel}
              src="/icons/close.png"
              alt="キャンセル"
              onClick={closeModal}
            />
            {children}
          </div>
        </div>
      )}
    </>
  )
}

export default Modal
