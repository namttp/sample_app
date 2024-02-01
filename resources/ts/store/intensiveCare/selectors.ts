import { useSelector } from 'react-redux'
import { AppState } from '@/store'

export const useIntensiveCareState = () =>
  useSelector((state: AppState) => state.intensiveCare)

export const useList = () => useIntensiveCareState().list
export const useResult = () => useIntensiveCareState().result
