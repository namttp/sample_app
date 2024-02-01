import React, { useEffect } from 'react'
import styles from './index.module.scss'
import { remove, show } from '@/removeLoading'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'
import {
  show as showAction,
  hide as hideAction,
} from '@/components/loading/slice'

const Loading = () => {
  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    show()
    dispatch(showAction())
    return () => {
      remove()
      dispatch(hideAction())
    }
  }, [])
  return <div className={styles.content}></div>
}

export default Loading
