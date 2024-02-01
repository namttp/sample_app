import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { isSmartPhone } from '@/libs/util'

export default function NonCompatible() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (isSmartPhone() === false && pathname !== '/signin') {
      window.location.href = '/signin'
    }
  }, [pathname])

  return null
}
