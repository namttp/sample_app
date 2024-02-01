import React from 'react'
import styles from './index.module.scss'
import clsx from 'clsx'
import { Link } from 'react-router-dom'

export type ButtonSize = 'lg' | 'sm' | 'xs'

export type ButtonVariant =
  | 'contained'
  | 'outlined'
  | 'outlinedBorderGray'
  | 'outlinedBorderGray2'
  | 'outlinedBorderGray3'
  | 'outlinedBorderGray4'
  | 'outlinedSmallLabel'
  | 'hearing'

export type ButtonPosition = 'outline' | 'inline'

interface ButtonProps {
  href?: string
  size?: ButtonSize
  variant?: ButtonVariant
  children: React.ReactElement | string
  // eslint-disable-next-line
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
  position?: ButtonPosition
  className?: string
  bgWhite?: boolean
  disabled?: boolean
  isTargetBlank?: boolean
}

const Button = ({
  href,
  size = 'lg',
  variant = 'contained',
  children,
  onClick,
  className,
  position = 'outline',
  bgWhite = false,
  disabled = false,
  isTargetBlank = false,
}: ButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    onClick && onClick(e)
  }

  const isInternalURL = (to: string) => {
    try {
      const url = new URL(to, window.location.origin)
      return url.hostname === window.location.hostname
    } catch {
      return false
    }
  }

  return (
    <div
      className={clsx(
        styles.content,
        styles[size],
        styles[variant],
        styles[position],
        bgWhite && styles['bgWhite'],
        disabled && styles['disabled'],
        className
      )}
      onClick={handleClick}
    >
      {href ? (
        <>
          {isInternalURL(href) ? (
            <Link to={href} className={styles.button}>
              {children}
            </Link>
          ) : isTargetBlank ? (
            <a
              href={href}
              className={styles.button}
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ) : (
            <a href={href} className={styles.button}>
              {children}
            </a>
          )}
        </>
      ) : (
        <button disabled={disabled} className={styles.button}>
          {children}
        </button>
      )}
    </div>
  )
}

export default Button
