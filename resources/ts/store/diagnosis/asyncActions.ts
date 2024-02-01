import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '@/libs/axios'
import type Diagnosis from '@/types/diagnosis'
import { serialize } from 'object-to-formdata'
import type Paginate from '@/types/paginate'

export type Report = {
  ageSpots: number
  skinAge: number
  wrinkles: number
  texture: number
  darkCirclesV2: number
  moisture: number
  oiliness: number
  radiance: number
  pore: number
}

export type LatestParams = {
  page?: number | string
  limit?: number
}

export type FindParams = {
  id: number | string
  mark_history_view: boolean
}

export type CreateParams = {
  report: Report
  answer_ids: number[]
}

export type DownloadParams = {
  id: number | string
  all: Blob
  graph: File
}

// CREATE
export const create = createAsyncThunk<
  Diagnosis,
  CreateParams,
  {
    rejectValue: string
  }
>('diagnosis/create', async (inputs, thunkAPI) => {
  try {
    const params = serialize(inputs, {})
    const res = await api().post('/api/diagnoses', params)
    return res.data.data
  } catch (e: any) {
    console.error(e)
    return thunkAPI.rejectWithValue(e.data)
  }
})

export const download = createAsyncThunk<
  any,
  DownloadParams,
  {
    rejectValue: string
  }
>('diagnosis/download', async (inputs, thunkAPI) => {
  try {
    const params = serialize(inputs, {})
    const res = await api().post(`/api/diagnoses/${inputs.id}/download`, params)
    return res.data
  } catch (e: any) {
    console.error(e)
    return thunkAPI.rejectWithValue(e.data)
  }
})

type HariParams = {
  id: number | string
  raw: Blob
}

type KireiParams = HariParams

// READ
export const hari = createAsyncThunk<
  Diagnosis,
  HariParams,
  {
    rejectValue: string
  }
>('diagnosis/hari', async (inputs, thunkAPI) => {
  try {
    const params = serialize(inputs, {})
    const res = await api().post(`/api/diagnoses/${inputs.id}/hari`, params)
    return res.data.data
  } catch (e: any) {
    console.error(e)
    return thunkAPI.rejectWithValue(e.data)
  }
})

export const kirei = createAsyncThunk<
  Diagnosis,
  KireiParams,
  {
    rejectValue: string
  }
>('diagnosis/kirei', async (inputs, thunkAPI) => {
  try {
    const params = serialize(inputs, {})
    const res = await api().post(`/api/diagnoses/${inputs.id}/kirei`, params)
    return res.data.data
  } catch (e: any) {
    console.error(e)
    return thunkAPI.rejectWithValue(e.data)
  }
})

// eslint-disable-next-line
export const find = createAsyncThunk<
  Diagnosis,
  FindParams,
  {
    rejectValue: string
  }
>('diagnosis/find', async (inputs, thunkAPI) => {
  try {
    let params = {} as any
    if (inputs.mark_history_view)
      params['mark_history_view'] = inputs.mark_history_view
    const res = await api().get(`/api/diagnoses/${inputs.id}`, { params })
    return res.data.data
  } catch (e: any) {
    console.error(e)
    return thunkAPI.rejectWithValue(e.data)
  }
})

export const latest = createAsyncThunk<
  Paginate<Diagnosis>,
  LatestParams,
  {
    rejectValue: string
  }
>('diagnosis/latest', async (inputs, thunkAPI) => {
  try {
    const res = await api().get(`/api/diagnoses/latest`, { params: inputs })
    return res.data.data
  } catch (e: any) {
    console.error(e)
    return thunkAPI.rejectWithValue(e.data)
  }
})

export const latestOne = createAsyncThunk<
  Diagnosis,
  undefined,
  {
    rejectValue: string
  }
>('diagnosis/latestOne', async (_, thunkAPI) => {
  try {
    const params = {
      limit: 1,
    }
    const res = await api().get(`/api/diagnoses/latest`, { params })
    return res.data.data.data[0]
  } catch (e: any) {
    console.error(e)
    return thunkAPI.rejectWithValue(e.data)
  }
})
