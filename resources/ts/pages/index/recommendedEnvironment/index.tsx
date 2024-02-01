import { isSmartPhone } from '@/libs/util'
import React from 'react'
import styles from './index.module.scss'
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'

const RecommendedEnvironment = () => {
  return (
    <div className={styles.content}>
      <div className={styles.container}>
        <div className={styles.wrap}>
          <h2 className={styles.heading}>推奨環境</h2>
          {!isSmartPhone() && (
            <p className={styles.description}>
              スマートフォンよりご利用ください
            </p>
          )}
          <div className={styles.body}>
            <SimpleBar className={styles.inner} autoHide={false}>
              <div className={styles.section}>
                <div className={styles.label}>iPhone</div>
                <div className={styles.target}>
                  iPhone8 以降
                  <br />
                  iOS 14.3 以降に対応している機種
                  <br />
                  <a
                    className={styles.link}
                    href="https://www.kao-kirei.com/ja/news/information/2022/20221215-03/"
                  >
                    ※iOS16における会員登録時の不具合について
                  </a>
                </div>
              </div>
              <div className={styles.section}>
                <div className={styles.label}>Android</div>
                <div className={styles.target}>
                  OS9.0以上、Chrome v102.0以上
                </div>
              </div>
              <div className={styles.section}>
                <div className={styles.target}>
                  ※Safari、Chromeは最新バージョンを推奨しています。
                  <br />
                  ※機種によっては解析処理に時間を要する場合がございます。
                  <br />
                  ※推奨環境に該当している場合も、通信環境や端末の種類、他アプリの動作環境によりカメラの起動や結果の表示に時間を要する場合がございます。
                  <br />
                  また、一部対応できていない機種もございますので予めご了承ください。
                  <br />
                  また、肌測定の計測項目を随時アップデートしている関係で、以前より結果表示までに処理時間を要する可能性がございます。
                  <br />
                  <br />
                  ※結果画面が表示されない場合は、時間をおいて再度アクセスいただけますようお願いいたします。
                  <br />
                  <br />
                  ※起動しない状態が複数回続く場合は、お手数ですが、ご使用の端末情報と合わせて花王のお問い合わせフォームよりお問い合わせください。
                  <br />
                  <br />
                  ※ご利用機種のフロントカメラの設定において「美肌効果」が有効になっている場合、正常なスコアが診断されない可能性がございますので「美肌効果」機能を無効にした上でご使用ください。（設定方法についてはご利用機種の説明書、もしくはメーカーへお問い合わせください）
                </div>
              </div>
            </SimpleBar>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecommendedEnvironment
