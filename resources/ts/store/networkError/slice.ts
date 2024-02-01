import { createSlice } from '@reduxjs/toolkit'

export type NetworkErrorState = {
  error: boolean
  errorMessage: string
}

const initialState: NetworkErrorState = {
  error: false,
  errorMessage: '',
}

const networkErrorSlice = createSlice({
  name: 'networkError',
  initialState,
  reducers: {
    reset: () => initialState,
    error: (state) => {
      return {
        ...state,
        error: true,
      }
    },
  },
  extraReducers: () => {},
})

export default networkErrorSlice
