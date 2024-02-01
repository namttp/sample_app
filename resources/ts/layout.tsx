import React from 'react'
import NetworkErrorModal from './components/networkError'
import Notice from './components/notice'
import RemoveLoading from '@/removeLoading'

export type Scene = 'reward' | 'score'

type Props = {
  children: React.ReactNode
  isLoading?: boolean
}

const Layout = ({ children }: Props) => {
  return (
    <div id="layout">
      {/* 初回ローディングが終わっている場合 */}
      <NetworkErrorModal />
      <Notice />
      <RemoveLoading />
      {children}
    </div>
  )
}

export default Layout
