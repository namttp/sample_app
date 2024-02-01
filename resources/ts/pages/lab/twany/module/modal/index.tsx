import React, { useState } from 'react'
import styles from './index.module.scss'
import 'simplebar-react/dist/simplebar.min.css'

const Module = () => {
  const [open, setOpen] = useState(true)
  if (!open) return null
  return (
    <div className={styles.content} onClick={() => setOpen(false)}>
      <div className={styles.list}>
        <div className={styles.inner}>
          <div className={styles.item}>
            <div className={styles.image}>
              <img src="/images/diagnosis/note4.svg" alt="1" />
            </div>
            <div className={styles.text}>
              毎回同じ環境下
              で撮影してください。明るさ、場所、画角などを変えると正しく測定できない場合があります。
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.image}>
              <img src="/images/diagnosis/note1.svg" alt="3" />
            </div>
            <div className={styles.text}>
              顔全体がはっきり見えるように、マスク、メガネ、サングラス、帽子ははずして撮影してください。
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.image}>
              <img src="/images/diagnosis/note2.svg" alt="4" />
            </div>
            <div className={styles.text}>
              明るい場所で正面を向いて撮影してください。
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Module
