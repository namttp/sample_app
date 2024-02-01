import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '@/store'
import styles from './index.module.scss'
import noticeSlice from '@/store/notice/slice'

const LIMIT_TIME = 4000
const Notice = () => {
  const { open, msg } = useSelector((state: AppState) => state.notice)
  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      dispatch(noticeSlice.actions.reset())
    }, LIMIT_TIME)
  }, [open])

  return (
    <div className={styles.content}>
      {open && (
        <div className={styles.notice}>
          <div className={styles.inner}>
            <img src="/icons/check.png" alt="チェックアイコン" />
            <div className={styles.text}>{msg}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Notice
