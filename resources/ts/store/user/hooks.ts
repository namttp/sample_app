import { useEffect, useMemo, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { getMe } from './asyncActions'
import userSlice from './slice'
import { useSelector } from 'react-redux'
import { AppDispatch, AppState } from '@/store'
import { useLocation } from 'react-router-dom'
import moment from 'moment'

type GetJWTResponse = {
  apiVersion: number
  id_token: string
  errorCode: number
  errorMessage: string
  operation: string
  status: string
  statusMessage: string
  time: string
}

export const useGetMe = () => {
  const { pathname } = useLocation()
  const isTop = useMemo(() => pathname === '/', [pathname])
  const { me, isMeLoaded, jwtReady, jwtExpired } = useSelector(
    (state: AppState) => state.user
  )
  const dispatch: AppDispatch = useDispatch()
  const reload = useCallback(() => {
    dispatch(getMe({ markConfirmedScore: isTop }))
  }, [isTop])

  /* eslint-disable */
  const getJWT = () => {
    dispatch(userSlice.actions.setJwtReady())
  }
  /* eslint-enabled */

  useEffect(() => {
    getJWT()
    if (!jwtReady) return
    reload()

    // 1分に1回jwtを取得する
    const interval = setInterval(() => {
      getJWT()
    }, 1000 * 60)

    return () => {
      dispatch(userSlice.actions.resetIsMeloaded())
      // 現在の時間がjwtExpired(unixtimeスタンプ)よりも大きい場合は、resetJwtReadyを実行する
      if (jwtExpired && moment().unix() > jwtExpired) {
        dispatch(userSlice.actions.resetJwtReady())
      }
      // intervalをクリアする
      clearInterval(interval)
    }
  }, [pathname, jwtReady])
  return {
    me,
    isMeLoaded,
    reload,
  }
}
