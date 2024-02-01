import React from 'react'
import { Navigate } from 'react-router-dom'
import { useMe, useIsMeLoaded } from '@/store/user/selectors'
import Loading from '@/components/loading'
import { useSearchParams } from 'react-router-dom'

type Props = {
  children: React.ReactNode
  passUrl?: boolean
}

const PrivateRoute = ({ children }: Props) => {
  const me = useMe()
  const isMeLoaded = useIsMeLoaded()
  const [searchParams] = useSearchParams()
  const diagnosisId = searchParams.get('diagnosis_id')

  const backUrl = location.pathname + location.search

  if (!isMeLoaded) return <Loading />

  if (me === null || me?.is_guest) {
    const url = '/'
    return (
      <Navigate
        to={url}
        state={{ diagnosisId: diagnosisId, backUrl: backUrl }}
      />
    )
  }
  return <>{children}</>
}

export default PrivateRoute
