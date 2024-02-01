import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '@/libs/axios'
import type IncentiveCare from '@/types/intensiveCare'
import { serialize } from 'object-to-formdata'

type CreateParams = {
  diagnosis_id?: number | string
  intensive_care_type: string
}

export type UpdateParams = {
  id: number | string
  target: number
}

// CREATE
export const create = createAsyncThunk<
  IncentiveCare,
  CreateParams,
  {
    rejectValue: string
  }
>('intensiveCare/create', async (inputs, thunkAPI) => {
  try {
    const res = await api().post('/api/intensive_cares', inputs)
    return res.data.data
  } catch (e: any) {
    console.error(e)
    return thunkAPI.rejectWithValue(e.data)
  }
})

export type Result = {
  scores: { [key: string]: number }
  daily_scores: { [key: string]: number }
  weekly_scores: { [key: string]: number[] }
  target: number
}

// READ
export const getResult = createAsyncThunk<
  Result,
  string | number,
  {
    rejectValue: string
  }
>('intensiveCare/getResult', async (id, thunkAPI) => {
  try {
    const res = await api().get('/api/intensive_cares/result?id=' + id)
    return res.data.data
  } catch (e: any) {
    console.error(e)
    return thunkAPI.rejectWithValue(e.data)
  }
})

// UPDATE
export const update = createAsyncThunk<
  IncentiveCare,
  UpdateParams,
  {
    rejectValue: string
  }
>('intensiveCare/update', async (inputs, thunkAPI) => {
  try {
    const params = serialize({ ...inputs, _method: 'PUT' }, {})
    const res = await api().post(`/api/intensive_cares/${inputs.id}`, params)
    return res.data
  } catch (e: any) {
    console.error(e)
    return thunkAPI.rejectWithValue(e.data)
  }
})
