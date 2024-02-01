import React from 'react'
import styles from './index.module.scss'
import Graph from '@/components/graph'
import Button from '@/components/button'
import { useFindRow } from '@/store/diagnosis/hooks'
import { useLocation, useNavigate } from 'react-router-dom'
import Layout from '@/layout'
import { Helmet } from 'react-helmet'
import { RECORD_IMAGE_VARIABLES_TYPE } from '../diagnosis'
import Loading from '@/components/loading'
import { useAuth } from '@/auth'

type Params = {
  id: number
  raw: Blob
} & RECORD_IMAGE_VARIABLES_TYPE

const Result = () => {
  const state = useLocation().state as Params
  const navigate = useNavigate()
  const auth = useAuth()

  if (!state?.id) {
    window.location.href = '/'
    return null
  }
  const { row, isRowLoaded, error } = useFindRow(
    state?.id,
    false,
    state && !!state?.id
  )

  // エラーハンドリング
  if (error) {
    console.warn(error)
    return null
  }

  // データ無し
  if (!row && isRowLoaded && !state.raw) {
    window.location.href = '/'
  }

  const handleClick = async () => {
    await auth.logout()
    navigate('/')
  }

  return (
    <Layout isLoading={!row}>
      <Helmet>
        <title>skindiagnosis-survey</title>
        <meta name="description" content="" />
      </Helmet>
      {!row && <Loading />}
      <div className={styles.content}>
        <div className={styles.section}>
          <div className={styles.graph}>
            <div className={styles.inner}>
              <div className={styles.heading}>すべての測定結果</div>
              {row && <Graph diagnosis={row} isImage={true} {...state} />}
            </div>
          </div>
        </div>
        <div className={styles.actions}>
          <Button
            onClick={handleClick}
            className={styles.btn}
            variant="contained"
            bgWhite={false}
          >
            終了
          </Button>
        </div>
      </div>
    </Layout>
  )
}

export default Result
