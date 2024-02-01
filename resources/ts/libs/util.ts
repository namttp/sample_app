import { UAParser } from 'ua-parser-js'
import React from 'react'

// @ts-ignore
const MODE = import.meta.env.MODE

export const cfDomain = () => {
  switch (MODE) {
    case 'development':
      return 'd1qah0tyniil5y.cloudfront.net'
    case 'staging':
      return 'dozv24kykiy42.cloudfront.net'
    case 'production':
      return 'd27icv88nfd5ru.cloudfront.net'
    default:
      return 'd27icv88nfd5ru.cloudfront.net'
  }
}

export function isSmartPhone() {
  if (
    navigator.userAgent.match(
      /iPhone|iPad|Android|Android.+Mobile|Macintosh/
    ) &&
    'ontouchend' in document
  ) {
    return true
  } else {
    return false
  }
}

export function isEnablesYCM() {
  const uaParserResult = UAParser(window.navigator.userAgent)
  const osName = uaParserResult.os.name
  const osVer = parseFloat(uaParserResult.os.version as string)
  const browseName = uaParserResult.browser.name
  const browseVer = parseFloat(uaParserResult.browser.version as string)
  const deviceType = uaParserResult.device.model

  if (osName === 'iOS' && deviceType === 'iPhone') {
    // iPhone8以降＋iOS 14.3以降 (iOS 16対応機種) iPadは除く
    return osVer >= 14.3
  } else if (osName === 'Android') {
    // Android OS 9.0 以降に対応している機種＋Chrome ブラウザ v95以降
    return osVer >= 9.0 && browseName === 'Chrome' && browseVer >= 95
  } else {
    return false
  }
}

export const backfaceFixed = (fixed: boolean) => {
  /**
   * 表示されているスクロールバーとの差分を計測し、背面固定時はその差分body要素に余白を生成する
   */
  const scrollbarWidth = window.innerWidth - document.body.clientWidth
  document.body.style.paddingRight = fixed ? `${scrollbarWidth}px` : ''

  /**
   * スクロール位置を取得する要素を出力する(`html`or`body`)
   */
  const scrollingElement = () => {
    const browser = window.navigator.userAgent.toLowerCase()
    if ('scrollingElement' in document) return document.scrollingElement
    // @ts-ignore
    if (browser.indexOf('webkit') > 0) return document.body
    // @ts-ignore
    return document.documentElement
  }

  /**
   * 変数にスクロール量を格納
   */
  const scrollY = fixed
    ? // @ts-ignore
      scrollingElement().scrollTop
    : parseInt(document.body.style.top || '0')

  /**
   * CSSで背面を固定
   */
  const styles = {
    height: '100vh',
    left: '0',
    overflow: 'hidden',
    position: 'fixed',
    top: `${scrollY * -1}px`,
    width: '100vw',
  }

  Object.keys(styles).forEach((key) => {
    // @ts-ignore
    document.body.style[key] = fixed ? styles[key] : ''
  })

  /**
   * 背面固定解除時に元の位置にスクロールする
   */
  if (!fixed) window.scrollTo(0, scrollY * -1)
}

export const nl2br = (text: string) => {
  const regex = /(\\n|\n)/g
  return text.split(regex).map(function (line, id) {
    if (line.match(regex)) {
      return React.createElement('br', { key: `br-${id}` })
    } else {
      return line
    }
  })
}

// 別タブで開く
export const openLinkInNewTab = (href: string) => {
  const a = document.createElement('a')
  a.setAttribute('href', href)
  a.setAttribute('target', '_blank')
  a.setAttribute('rel', 'noopener noreferrer')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

// Androidかどうか
export const isAndroid = () => {
  const uaParserResult = UAParser(window.navigator.userAgent)
  return uaParserResult.os.name === 'Android'
}
