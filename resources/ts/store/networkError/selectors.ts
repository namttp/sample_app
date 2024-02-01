import { useSelector } from 'react-redux'
import { AppState } from '@/store'

export const useNetworkErrorState = () =>
  useSelector((state: AppState) => state.networkError)
export const useError = () => useNetworkErrorState().error
