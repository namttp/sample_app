import React, { useEffect, useMemo, useState } from 'react'
import styles from './index.module.scss'
import { ChildProps } from '..'
import clsx from 'clsx'
import DiagnosisLinearProgress from '@/components/diagnosisLinerProgress'

const Report = ({ grdType }: ChildProps) => {
  const [score, setSore] = useState(0)

  const text = useMemo(() => {
    switch (grdType) {
      case 'blue':
        return <>blue</>

      case 'orange':
        return <>orange</>

      case 'green':
        return <>green</>
    }
  }, [grdType])

  useEffect(() => {
    for (let i = 0; i < 25; i++) {
      setSore((prev) => prev + 1)
    }
  }, [grdType])

  return (
    <div
      className={clsx(
        styles.content,
        grdType === 'green' && styles.green,
        grdType === 'orange' && styles.orange
      )}
    >
      <div className={styles.inner}>
        <div className={styles.liner}>
          <DiagnosisLinearProgress
            start={score}
            max={90}
            grdType={grdType}
            value={90}
            variant={''}
          />
        </div>
      </div>
    </div>
  )
}

export default Report
