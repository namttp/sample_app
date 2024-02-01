import { isGuest } from '@/libs/user'
import { useIsMeLoaded, useMe } from '@/store/user/selectors'
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './index.module.scss'

const Mask = () => {
  const me = useMe()
  const isMeLoaded = useIsMeLoaded()
  if (!isGuest(me) || !isMeLoaded) return null
  return (
    <div className={styles.content}>
      <div className={styles.mask}>
        <div className={styles.inner}></div>
      </div>
      <div className={styles.box}>
        <Link to="/signin?from=top">
          <div className={styles.boxContent}>
            <div className={styles.image}>
              <img src="/icons/key.svg" alt="アイコン" />
            </div>
            <span className={styles.text}>
              ログインして
              <br />
              チェック
            </span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Mask
