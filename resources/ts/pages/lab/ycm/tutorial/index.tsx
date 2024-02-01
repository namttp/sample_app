import React from 'react'
import styles from './index.module.scss'
import { useNavigate } from 'react-router-dom'
import { ChildProps } from '..'
import { useMe, useIsMeLoaded, useProfile } from '@/store/user/selectors'
import { isGuest } from '@/libs/user'

const DURATION = 2000

const Tutorial = (props: ChildProps) => {
  const navigate = useNavigate()
  const me = useMe()
  const profile = useProfile()
  const isMeLoaded = useIsMeLoaded()
  const close = () => {
    navigate('/hearing')
  }
  React.useEffect(() => {
    if (isMeLoaded) {
      setTimeout(() => {
        props.setScene('note')
      }, DURATION)
    }
  }, [isMeLoaded])

  if (!isMeLoaded) return null

  return (
    <div className={styles.content}>
      <div className={styles.close} onClick={close}>
        <img src="/icons/close.svg" alt="close" />
      </div>
      <div className={styles.inner}>
        <div className={styles.image}>
          <img src="/images/diagnosis/tutorial.svg" alt="イメージ" />
        </div>
        <div className={styles.msg}>
          {isGuest(me) ? (
            <div>
              お肌の調子はいかがでしょうか？
              <br />
              <br />
              顔写真の撮影から始まるので 撮影環境を準備しましょう
            </div>
          ) : (
            <div>
              {profile?.firstName} さん
              <br />
              お肌の調子はいかがでしょうか？
              <br />
              <br />
              顔写真の撮影から始まるので
              <br />
              撮影環境を準備しましょう
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Tutorial
