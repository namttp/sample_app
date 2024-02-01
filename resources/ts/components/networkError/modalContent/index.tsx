import React from 'react'
import Button from '@/components/button'
import styles from './index.module.scss'

interface Props {
  onClick: () => void
}

const ModalContent = ({ onClick }: Props) => {
  return (
    <div className={styles.content}>
      <p className={styles.title}>通信エラー</p>
      <img src={`/images/networkError.png`} className={styles.image} />
      <div className={styles.description}>
        通信エラーが発生しました。
        <br />
        ネットワークの接続状態を確認してください。
        <br />
        <br />
        解決しない場合は、しばらく時間を置いて
        <br />
        ブラウザの再読み込みをお試しください。
      </div>
      <div className={styles.actions}>
        <Button onClick={onClick} variant="outlinedBorderGray3">
          閉じる
        </Button>
      </div>
    </div>
  )
}

export default ModalContent
