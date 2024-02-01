import diagnosisSlice from '@/store/diagnosis/slice'
import userSlice from '@/store/user/slice'
import { configureStore, Action, ThunkAction } from '@reduxjs/toolkit'
import networkErrorSlice from './networkError/slice'
import noticeSlice from './notice/slice'
import loadingSlice from '@/components/loading/slice'
import intensiveCareSlice from './intensiveCare/slice'

const makeStore = () =>
  configureStore({
    reducer: {
      diagnosis: diagnosisSlice.reducer,
      intensiveCare: intensiveCareSlice.reducer,
      loading: loadingSlice.reducer,
      user: userSlice.reducer,
      networkError: networkErrorSlice.reducer,
      notice: noticeSlice.reducer,
    },
    devTools: false,
  })

type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore['dispatch']
export type AppState = ReturnType<AppStore['getState']>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default makeStore()
