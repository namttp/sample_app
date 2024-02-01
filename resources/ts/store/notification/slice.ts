import { createSlice } from '@reduxjs/toolkit'
import { update, updateAll } from './asyncActions'

export type NotificationState = {
  error: boolean
  errorMessage: string
}

const initialState: NotificationState = {
  error: false,
  errorMessage: '',
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    /* UPDATE */
    builder.addCase(update.pending, () => {
      return {
        error: false,
        errorMessage: '',
      }
    })

    builder.addCase(update.rejected, (state, action) => {
      return {
        ...state,
        error: true,
        errorMessage: action.payload || '',
      }
    })

    builder.addCase(update.fulfilled, (state) => {
      return {
        ...state,
        error: false,
        errorMessage: '',
      }
    })

    builder.addCase(updateAll.pending, () => {
      return {
        error: false,
        errorMessage: '',
      }
    })

    builder.addCase(updateAll.rejected, (state, action) => {
      return {
        ...state,
        error: true,
        errorMessage: action.payload || '',
      }
    })

    builder.addCase(updateAll.fulfilled, (state) => {
      return {
        ...state,
        error: false,
        errorMessage: '',
      }
    })
  },
})

export default notificationSlice
