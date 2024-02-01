import React, { useState, forwardRef } from 'react'
import styles from './index.module.scss'
import clsx from 'clsx'

type Props = {
  placeholder: string
  type?: string
  name: string
  register?: any
  onChange?: any
  onBlue?: any
  className?: string
  error?: string
  fullWidth?: boolean
  max?: number | string
  min?: number | string
  icon?: React.ReactNode
  multiline?: boolean
  rows?: number
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
}

const textField = (
  {
    name,
    type,
    placeholder,
    register = null,
    onChange = null,
    onBlue = null,
    className = '',
    error = '',
    fullWidth = false,
    max,
    min,
    icon,
    multiline = false,
    rows = 5,
    onKeyDown,
  }: Props,
  ref: any
) => {
  const [focus, setFocus] = useState(false)
  const props = register ? { ...register(name) } : {}

  return (
    <div
      className={clsx(
        className,
        styles.wrap,
        focus && styles.focus,
        fullWidth && styles.fullWidth
      )}
    >
      <div
        className={clsx(
          styles.content,

          !!error && styles.error
        )}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        ref={ref}
      >
        {multiline ? (
          <textarea
            placeholder={placeholder}
            max={max}
            min={min}
            onChange={onChange && onChange}
            onBlur={onBlue && onBlue}
            onKeyDown={onKeyDown && onKeyDown}
            {...props}
            name={name}
            rows={rows}
          />
        ) : (
          <input
            type={!!type ? type : 'text'}
            placeholder={placeholder}
            max={max}
            min={min}
            onChange={onChange && onChange}
            onBlur={onBlue && onBlue}
            onKeyDown={onKeyDown && onKeyDown}
            {...props}
            name={name}
          />
        )}
        {!!icon && <div className={styles.icon}>{icon}</div>}
      </div>
      {!!error && <div className={styles.errorMsg}>{error}</div>}
    </div>
  )
}

export default forwardRef(textField)
