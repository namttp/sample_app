import { useSelector } from 'react-redux'
import { AppState } from '@/store'

export const useUserState = () => useSelector((state: AppState) => state.user)

export const useMe = () => useUserState().me
export const useProfile = () => useUserState().profile
export const useIsMeLoaded = () => useUserState().isMeLoaded
export const useJwtReady = () => useUserState().jwtReady
