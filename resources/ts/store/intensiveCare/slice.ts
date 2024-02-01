import type IntensiveCare from '@/types/intensiveCare'
import { createSlice } from '@reduxjs/toolkit'
import { create, getResult, Result, update } from './asyncActions'

export type intensiveCareState = {
  loading: boolean
  error: boolean
  result: Result | null
  isResultLoaded: boolean
  list: IntensiveCare[]
  errorMessage: string
}

export const initialState: intensiveCareState = {
  loading: false,
  list: [],
  result: null,
  isResultLoaded: false,
  error: false,
  errorMessage: '',
}

const intensiveCareSlice = createSlice({
  name: 'intensiveCare',
  initialState,
  reducers: {
    reset: () => initialState,
    setList: (state, action) => {
      return {
        ...state,
        list: action.payload,
      }
    },
    setRow: (state, action) => {
      return {
        ...state,
        row: action.payload,
      }
    },
  },
  extraReducers: (builder) => {
    /* CREATE */
    builder.addCase(create.pending, (state) => {
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
      }
    })
    builder.addCase(create.fulfilled, (state) => {
      return {
        ...state,
        loading: false,
        error: false,
        errorMessage: '',
      }
    })
    builder.addCase(create.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload || '',
      }
    })
    /* READ */
    builder.addCase(getResult.pending, (state) => {
      return {
        ...state,
        isResultLoaded: false,
        error: false,
        errorMessage: '',
      }
    })
    builder.addCase(getResult.fulfilled, (state, action) => {
      return {
        ...state,
        result: action.payload,
        isResultLoaded: true,
        error: false,
        errorMessage: '',
      }
    })
    builder.addCase(getResult.rejected, (state, action) => {
      return {
        ...state,
        isResultLoaded: true,
        error: true,
        errorMessage: action.payload || '',
      }
    })
    /* UPDATE */
    builder.addCase(update.pending, (state) => {
      return {
        ...state,
        isRowLoaded: false,
        error: false,
        errorMessage: '',
      }
    })
    builder.addCase(update.fulfilled, (state, action) => {
      return {
        ...state,
        row: action.payload,
        isRowLoaded: true,
        error: false,
        errorMessage: '',
      }
    })
    builder.addCase(update.rejected, (state, action) => {
      return {
        ...state,
        isRowLoaded: true,
        error: true,
        errorMessage: action.payload || '',
      }
    })
  },
})

export default intensiveCareSlice
