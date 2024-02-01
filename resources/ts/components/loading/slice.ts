import { createSlice } from '@reduxjs/toolkit'
import { Dispatch } from 'redux'

export type LoadingState = {
  status: 'none' | 'block'
  initialHide: boolean
}

export const initialState: LoadingState = {
  status: 'block',
  initialHide: false,
}

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    show: (state) => {
      state.status = 'block'
    },
    hide: (state) => {
      state.status = 'none'
      if (state.initialHide === false) {
        state.initialHide = true
      }
    },
  },
})

export const show = () => {
  return async (dispatch: Dispatch) => {
    dispatch(loadingSlice.actions.show())
  }
}

export const hide = () => {
  return async (dispatch: Dispatch) => {
    dispatch(loadingSlice.actions.hide())
  }
}

export default loadingSlice
