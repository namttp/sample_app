import React, { useState, useEffect, useMemo } from 'react'
import styles from './index.module.scss'
import clsx from 'clsx'

type Props = {
  start: number
  max: number
  value: number
  variant?: 'primary' | 'secondary'
  hideLabel?: boolean
  isAnimationFinish?: () => void
}

const LinearProgress = ({
  start, // 開始
  value, // 目標値
  max, // 最大
  variant = 'primary',
  hideLabel = false,
  isAnimationFinish,
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
    const updateProgress = () => setWidth(width + step)
    if (width < goalPos) {
      setTimeout(updateProgress, interval)
    }
    if (width === goalPos) {
      !!isAnimationFinish && isAnimationFinish()
    }
  }, [width])

  return (
    <div
      className={clsx(
        styles.content,
        styles[variant],
        variant === 'secondary' && max >= 100 && styles.threeDigits
      )}
    >
      <div className={styles.value} style={{ width: `${width}%` }}>
        {hideLabel ? null : (
          <span className={styles.label}>
            <span className={clsx(styles.molecule, value === 0 && styles.zero)}>
              {value}
            </span>
            /<span className={styles.denominator}>{max}</span>
          </span>
        )}
      </div>
    </div>
  )
}

export default LinearProgress
