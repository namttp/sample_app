import React, { useState, useEffect, useMemo } from 'react'
import styles from './index.module.scss'
import clsx from 'clsx'
import { GrdType } from '@/pages/diagnosis'

type Props = {
  start: number
  max: number
  value: number
  grdType: GrdType
  variant: string
}

const DiagnosisLinearProgress = ({
  start, // 開始
  value, // 目標値
  max, // 最大
  grdType,
  variant = 'primary',
}: Props) => {
  const step = 1
  const interval = 10
  const goalPos = (value / max) * 100

  const startPos = useMemo(() => {
    if (typeof start === 'undefined') return null
    return start <= 1 ? 0 : (start / max) * 100
  }, [start, max])

  const [width, setWidth] = useState<number>(
    startPos === null ? goalPos : startPos
  )

  useEffect(() => {
    if (startPos === goalPos) return () => {}
    const updateProgress = (isWait: boolean) =>
      setWidth(isWait ? width + 0.1 : width + step)
    if (width <= 45 && grdType === 'blue') {
      setTimeout(updateProgress, interval)
    } else if (grdType === 'blue' && width <= 50) {
      setTimeout(() => updateProgress(true), 100)
    } else if (width <= 80 && grdType === 'orange') {
      setTimeout(updateProgress, interval)
    } else if (grdType === 'orange' && width <= 90) {
      setTimeout(() => updateProgress(true), 100)
    } else if (width < goalPos && grdType === 'green') {
      setTimeout(updateProgress, interval)
    }
  }, [width, grdType])

  return (
    <div
      className={clsx(
        styles.content,
        styles[variant],
        variant === 'secondary' && max >= 100 && styles.threeDigits
      )}
    >
      <div
        className={styles.value}
        style={{ width: `${width > 100 ? 100 : width}%` }}
      ></div>
    </div>
  )
}

export default DiagnosisLinearProgress
