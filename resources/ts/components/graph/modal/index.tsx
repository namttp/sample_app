import React, { useEffect } from 'react'
import styles from './index.module.scss'
import { backfaceFixed } from '@/libs/util'
import { Review } from '@/types/diagnosis'
import { nl2br } from '@/libs/util'
import { useMe } from '@/store/user/selectors'

interface Props {
  image: string | undefined
  score: number
  name: string
  isShowModal: boolean
  isImage: boolean
  comment: string
  avg: number
  review: Review
  setIsShowModal: (modalStatus: boolean) => void
}

const GraphModal = ({
  name,
  score,
  image,
  isShowModal,
  isImage = false,
  comment,
  avg,
  review,
  setIsShowModal,
}: Props) => {
  const closeModal = () => {
    setIsShowModal(false)
  }

  useEffect(() => {
    if (isShowModal) backfaceFixed(true)
    return () => {
      backfaceFixed(false)
    }
  }, [isShowModal])

  useEffect(() => {
    const thumbnailEl: (Element & { src: string }) | null =
      document.querySelector('#thumbnail')
    if (thumbnailEl) {
      thumbnailEl.addEventListener('error', () => {
        thumbnailEl.src = '/images/error.png'
      })
    }
  }, [image])

  const me = useMe()

  return (
    <div className={styles.content}>
      {isShowModal && (
        <div className={styles.modal}>
          <div className={styles.icon}>
            <img
              src="/icons/close.png"
              alt="closeアイコン"
              onClick={closeModal}
            />
          </div>
          <div className={styles.container}>
            <div className={styles.title}>詳しい測定結果</div>
            {isImage && !!image && (
              <div className={styles.image}>
                <img id="thumbnail" src={image} alt="肌診断画像" />
              </div>
            )}

            <div className={styles.main}>
              <div className={styles.inner}>
                <div className={styles.heading}>
                  <span>{name}</span>
                </div>
                <div className={styles.troubles}>
                  <div className={styles.score}>
                    あなたのスコア<b>{score}</b>点
                  </div>
                </div>
                <div className={styles.avg}>
                  （{me?.is_guest ? '全年代平均' : '同年代平均'} {avg}点）
                </div>
                <div className={styles.review}>
                  {!!avg && score && (
                    <img src={`/icons/${review.image}`} alt="アイコン" />
                  )}
                  <span>{review.short_review}</span>
                </div>
                <div className={styles.comment}>{nl2br(comment)}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GraphModal
