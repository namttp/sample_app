import Button from '@/components/button'
import React from 'react'
import styles from './index.module.scss'
import { ChildProps } from '../index'
import clsx from 'clsx'

const Setting = ({ setScene }: ChildProps) => {
  const close = () => {
    setScene('alert')
  }

  return (
    <div className={styles.content}>
      <div className={styles.icon}>
        <img src="/icons/close.png" alt="closeアイコン" onClick={close} />
      </div>
      <div className={styles.modal}>
        <div className={styles.conntainer}>
          <div className={styles.box}>
            <span className={styles.number}>1.</span>
            <p className={styles.title}>ブラウザをご確認ください</p>
            <div className={styles.description}>
              LINEやTwitterなどのアプリから本サイトを開いている場合、カメラ機能が利用できません。
              iPhoneの方はSafari、Androidの方はChromeでサイトを表示してください。
              または、URLをコピーした後ホーム画面に戻り、iPhoneの方はSafari、Androidの方はChromeでサイトを表示してください。
            </div>
          </div>

          <div className={clsx(styles.box, styles.mt)}>
            <span className={styles.number}>2.</span>
            <p className={styles.title}>
              カメラのアクセスの拒否設定をしていないかご確認ください。
            </p>

            <div className={styles.setting}>
              <span className={styles.model}>・iPhoneの方</span>
              <p className={styles.description}>
                ホーム画面の「設定」から「Safari」をタップし、「WEBサイトの設定」の「カメラ」を許可に切り替えてください。
              </p>

              <span className={clsx(styles.model, styles.mt)}>
                ・Androidの方
              </span>
              <p className={styles.description}>
                Chromeアプリを開き、アドレスバーの右のその他アイコンから「設定」をタップした後、「サイト設定」をタップし、次に「カメラ」をオンに切り替えてください。
              </p>
            </div>
          </div>

          <div className={styles.actions}>
            <Button
              onClick={() => setScene('alert')}
              variant="outlinedBorderGray3"
            >
              閉じる
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Setting
