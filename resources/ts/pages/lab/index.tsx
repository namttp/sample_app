import React, { useState } from 'react'
import styles from './index.module.scss'
import { backfaceFixed } from '@/libs/util'
import { Helmet } from 'react-helmet'
import NetworkErrorModal from '@/components/networkError'
import { remove } from '@/removeLoading'
import Ycm from './ycm/index'
import Twany from './twany/index'
import { v4 as uuidv4 } from 'uuid'

// 特記：skinAnalysisCompletedはドキュメントに無いがソースコードにある。ただ動作していない模様
const Diagnosis = () => {
  const [module, setModule] = useState<'ycm' | 'twany'>('twany')
  const [groupId, setGroupId] = useState('')

  React.useEffect(() => {
    remove()
    backfaceFixed(true)
    setGroupId(uuidv4())
    return () => {
      backfaceFixed(false)
      close()
    }
  }, [])

  return (
    <div className={styles.content}>
      <Helmet>
        <title>skindiagnosis-survey</title>
        <meta name="description" content="" />
      </Helmet>
      <>
        <NetworkErrorModal />

        {module === 'ycm' ? (
          <Ycm setModule={setModule} groupId={groupId} />
        ) : (
          <Twany setModule={setModule} groupId={groupId} />
        )}
      </>
    </div>
  )
}

export default Diagnosis
