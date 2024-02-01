import Button from '@/components/button'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import { ChildProps } from '../index'
import { useAuth } from '@/auth'

const Alert = ({ setScene }: ChildProps) => {
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
        <p className={styles.title}>カメラにアクセスできません</p>
        <div className={styles.description}>
          iPhoneの方はSafari、
          <br /> Androidの方はChromeから
          <br />
          アクセスしてください。
          <br />
          <br />
          または、カメラ機能の <br />
          拒否設定を解除する必要があります。
        </div>

        <div className={styles.actions}>
          <Button variant="outlined" onClick={() => setScene('setting')}>
            設定方法はこちら
          </Button>
          <Button onClick={handleClick} variant="outlined">
            測定トップに戻る
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Alert
