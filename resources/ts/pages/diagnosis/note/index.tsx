import React from 'react'
import styles from './index.module.scss'
import { ChildProps } from '../index'
import Button from '../../../components/button'
import { useNavigate } from 'react-router-dom'

const Note = (props: ChildProps) => {
  const navigate = useNavigate()
  const close = () => {
    navigate('/hearing')
  }
  const next = () => {
    props.setScene('module')
  }
  return (
    <div className={styles.content}>
      <div className={styles.close} onClick={close}>
        <img src="/icons/close.svg" alt="close" />
      </div>
      <div className={styles.inner}>
        <div className={styles.heading}>撮影時の注意点</div>
        <div className={styles.scrollable}>
          <div className={styles.list}>
            <div className={styles.item}>
              <div className={styles.image}>
                <img src="/images/diagnosis/note4.png" alt="1" />
              </div>
              <div className={styles.text}>
                <b>毎回同じ環境下</b>
                で撮影してください。明るさ、場所、画角などを変えると正しく測定できない場合があります。
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.image}>
                <img src="/images/diagnosis/note3.png" alt="2" />
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.image}>
                <img src="/images/diagnosis/note1.png" alt="3" />
              </div>
              <div className={styles.text}>
                顔全体がはっきり見えるように、マスク、メガネ、サングラス、帽子ははずして撮影してください。
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.image}>
                <img src="/images/diagnosis/note2.png" alt="4" />
              </div>
              <div className={styles.text}>
                明るい場所で正面を向いて撮影してください。
              </div>
            </div>
          </div>
        </div>
        <div className={styles.actions}>
          <Button className={styles.button} onClick={next} size="lg">
            次へ
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Note
