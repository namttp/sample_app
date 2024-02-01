import { createSlice } from '@reduxjs/toolkit'

export type NoticeState = {
  open: boolean
  msg: string
}

const initialState: NoticeState = {
  open: false,
  msg: '',
}

const noticeSlice = createSlice({
  name: 'notice',
  initialState,
  reducers: {
    reset: () => initialState,
    setMsg: (state, action) => {
      return {
        ...state,
        msg: action.payload,
      }
    },
    open: (state, action) => {
      return {
        ...state,
        open: true,
        msg: action.payload,
      }
    },
  },
  extraReducers: () => {},
})

export default noticeSlice
