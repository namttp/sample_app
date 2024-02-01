import { createSlice } from '@reduxjs/toolkit'
import type Diagnosis from '@/types/diagnosis'
// eslint-disable-next-line
import { create, find, latest, latestOne } from './asyncActions'
import type Paginate from '@/types/paginate'
import { uniqBy } from 'lodash'

export type DiagnosisState = {
  row: Diagnosis | null
  isRowLoaded: boolean
  list: Diagnosis[]
  paginate: Paginate<Diagnosis> | null
  isListLoaded: boolean
  error: boolean
  errorMessage: string
}

export const initialState: DiagnosisState = {
  row: null,
  isRowLoaded: false,
  list: [],
  paginate: null,
  isListLoaded: false,
  error: false,
  errorMessage: '',
}

const diagnosisSlice = createSlice({
  name: 'diagnosis',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    /* CRATE */
    /* READ */
    builder.addCase(latest.pending, (state) => {
      return {
        ...state,
        isListLoaded: false,
        error: false,
        errorMessage: '',
      }
    })
    builder.addCase(latest.fulfilled, (state, action) => {
      return {
        ...state,
        list: uniqBy([...state.list, ...action.payload.data], 'id'),
        paginate: action.payload,
        isListLoaded: true,
        error: false,
        errorMessage: '',
      }
    })
    builder.addCase(latest.rejected, (state, action) => {
      return {
        ...state,
        isListLoaded: true,
        error: true,
        errorMessage: action.payload || '',
      }
    })
    builder.addCase(find.pending, (state) => {
      return {
        ...state,
        isRowLoaded: false,
        error: false,
        errorMessage: '',
      }
    })
    builder.addCase(find.fulfilled, (state, action) => {
      return {
        ...state,
        row: action.payload,
        isRowLoaded: true,
        error: false,
        errorMessage: '',
      }
    })
    builder.addCase(find.rejected, (state, action) => {
      return {
        ...state,
        isRowLoaded: true,
        error: true,
        errorMessage: action.payload || '',
      }
    })
    builder.addCase(latestOne.pending, (state) => {
      return {
        ...state,
        isRowLoaded: false,
        error: false,
        errorMessage: '',
      }
    })
    builder.addCase(latestOne.fulfilled, (state, action) => {
      return {
        ...state,
        row: action.payload,
        isRowLoaded: true,
        error: false,
        errorMessage: '',
      }
    })
    builder.addCase(latestOne.rejected, (state, action) => {
      return {
        ...state,
        isRowLoaded: true,
        error: true,
        errorMessage: action.payload || '',
      }
    })

    /* CREATE */
    builder.addCase(create.pending, (state) => {
      return {
        ...state,
        isRowLoaded: false,
        error: false,
        errorMessage: '',
      }
    })

    builder.addCase(create.fulfilled, (state) => {
      return {
        ...state,
        isRowLoaded: true,
        error: false,
        errorMessage: '',
      }
    })

    builder.addCase(create.rejected, (state, action) => {
      return {
        ...state,
        isRowLoaded: true,
        error: true,
        errorMessage: action.payload || '',
      }
    })

    /* UPDATE */
  },
})

export default diagnosisSlice
