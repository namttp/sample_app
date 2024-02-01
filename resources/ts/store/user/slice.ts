import { createSlice } from '@reduxjs/toolkit'
import { getMe } from './asyncActions'
import type User from '@/types/user'
import type GuestUser from '@/types/guestUser'
import moment from 'moment'

type Profile = {
  firstName: string
  lastName: string
}

export type UserState = {
  jwtReady: boolean
  // unixtimeスタンプ
  jwtExpired: number | null
  profile: Profile | null
  me: User | GuestUser | null
  isMeLoaded: boolean
  error: boolean
  errorMessage: string
}

export const initialState: UserState = {
  jwtReady: false,
  jwtExpired: null,
  profile: null,
  me: null,
  isMeLoaded: false,
  error: false,
  errorMessage: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // 過去のjwtExpiredと比較して、現在のjwtExpiredが新しい場合のみjwtReadyをtrueにする
    setJwtReady: (state) => {
      if (state.jwtExpired === null) {
        state.jwtReady = true
      }

      // 期限切れの場合はjwtReadyをfalseにする
      if (state.jwtExpired && moment().unix() > state.jwtExpired) {
        state.jwtReady = false
      } else {
        // 5分後のunixtimeスタンプを設定
        state.jwtExpired = moment().add(5, 'minutes').unix()
      }
    },
    setProfile: (state, action) => {
      state.profile = action.payload
    },
    reset: () => initialState,
    resetIsMeloaded: (state) => {
      state.isMeLoaded = false
    },
    resetJwtReady: (state) => {
      state.jwtReady = false
    },
  },
  extraReducers: (builder) => {
    /* READ */
    builder.addCase(getMe.pending, (state) => {
      return {
        ...state,
        isMeLoaded: false,
        error: false,
        errorMessage: '',
      }
    })
    builder.addCase(getMe.fulfilled, (state, action) => {
      return {
        ...state,
        me: action.payload,
        isMeLoaded: true,
        error: false,
        errorMessage: '',
      }
    })
    builder.addCase(getMe.rejected, (state, action) => {
      return {
        ...state,
        isMeLoaded: true,
        error: true,
        errorMessage: action.payload || '',
      }
    })
  },
})

export default userSlice
