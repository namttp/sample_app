import Button from '@/components/button'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import 'simplebar-react/dist/simplebar.min.css'
import { useAuth } from '@/auth'

const MyError = () => {
  const navigator = useNavigate()
  const auth = useAuth()
  const close = () => {
    navigator('/')
  }

  const handleClick = async () => {
    await auth.logout()
    window.location.href = '/'
  }
  return (
    <div className={styles.content}>
      <div className={styles.icon}>
        <img src="/icons/close.png" alt="closeアイコン" onClick={close} />
      </div>
      <div className={styles.modal}>
        <div className={styles.alert}>
          <img src="/icons/alert.png" alt="alertアイコン" />
        </div>
        <p className={styles.title}>エラーが発生しました</p>
        <div className={styles.description}>
          申し訳ございません。 <br />
          解析の段階でエラーが発生しました。
          <br />
          <br />
          大変お手数ですが、
          <br />
          もう一度撮影をやり直してください。
        </div>
        <div className={styles.actions}>
          <Button onClick={() => location.reload()} variant="outlined">
            撮影をもう一度
          </Button>
          <Button onClick={handleClick} variant="outlined">
            測定トップに戻る
          </Button>
        </div>
      </div>
    </div>
  )
}

export default MyError
