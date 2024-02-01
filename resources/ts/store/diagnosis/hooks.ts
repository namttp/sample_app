import { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '@/store'
import diagnosisSlice from './slice'
// eslint-disable-next-line
import { find, latest, latestOne } from './asyncActions'
import { useJwtReady } from '@/store/user/selectors'

export const useFindRow = (
  id: number | string | null | undefined,
  mark_history_view: boolean = false,
  isReady = true
) => {
  const { row, isRowLoaded, error } = useSelector(
    (state: AppState) => state.diagnosis
  )
  const dispatch: AppDispatch = useDispatch()
  const jwtReady = useJwtReady()

  const reload = useCallback(
    async (id: number | string | null | undefined) => {
      if (!isReady || !id) return
      dispatch(find({ id, mark_history_view }))
    },
    [id, isReady, mark_history_view]
  )

  useEffect(() => {
    if (!jwtReady) return
    reload(id)
    return () => {
      dispatch(diagnosisSlice.actions.reset())
    }
  }, [isReady, jwtReady, id])
  return {
    row,
    error,
    isRowLoaded,
    reload,
  }
}

export const useGetLatestRow = (isReady = true) => {
  const { row, isRowLoaded } = useSelector((state: AppState) => state.diagnosis)
  const dispatch: AppDispatch = useDispatch()
  const jwtReady = useJwtReady()

  const reload = useCallback(async () => {
    if (!isReady) return
    dispatch(latestOne())
  }, [isReady])

  useEffect(() => {
    if (!jwtReady) return
    reload()
    return () => {
      dispatch(diagnosisSlice.actions.reset())
    }
  }, [isReady, jwtReady])
  return {
    row,
    isRowLoaded,
    reload,
  }
}

export const useGetLatest = (page: number | string = 1, isReady = true) => {
  const jwtReady = useJwtReady()
  const { list, isListLoaded, paginate } = useSelector(
    (state: AppState) => state.diagnosis
  )
  const dispatch: AppDispatch = useDispatch()

  const reload = useCallback(
    async (page: number | string) => {
      if (!isReady) return
      dispatch(latest({ page }))
    },
    [isReady]
  )

  useEffect(() => {
    if (!jwtReady) return
    reload(page)
    return () => {
      dispatch(diagnosisSlice.actions.reset())
    }
  }, [page, isReady, jwtReady])

  return {
    list,
    isListLoaded,
    paginate,
    reload,
  }
}
