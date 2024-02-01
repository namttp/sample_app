import { useEffect } from 'react'
import { useIsMeLoaded, useMe } from '@/store/user/selectors'
import { useLocation, useNavigate } from 'react-router-dom'

type State = {
  backUrl: string
}

const Index = () => {
  const isMeLoaded = useIsMeLoaded()
  const navigate = useNavigate()
  const me = useMe()
  // stateをうけとるbackUrl
  const location = useLocation()
  const state = location.state as State
  const backUrl = state?.backUrl
  useEffect(() => {
    if (!isMeLoaded) return
    if (me) {
      window.location.href = backUrl ? backUrl : '/diagnosis'
    } else {
      const url = '/signin'
      navigate(url, { state: { backUrl: backUrl } })
    }
  }, [isMeLoaded, me])
  return null
}

export default Index
