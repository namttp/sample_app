import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '@/libs/axios'
import type User from '@/types/user'

// READ
export const getMe = createAsyncThunk<
  User,
  {
    markConfirmedScore?: boolean | null
    finished_intensive_care?: boolean | null
  },
  {
    rejectValue: string
  }
>('user/getMe', async (_, thunkAPI) => {
  let params = {}
  try {
    const res = await api().get('/api/me', {
      params,
    })
    return res.data.data
  } catch (e: any) {
    console.error(e)
    return thunkAPI.rejectWithValue(e.data)
  }
})
