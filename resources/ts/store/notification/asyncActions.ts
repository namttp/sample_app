import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '@/libs/axios'

// UPDATE
export const update = createAsyncThunk<
  null,
  number | string,
  {
    rejectValue: string
  }
>('notification/update', async (id, thunkAPI) => {
  try {
    const res = await api().put(`/api/notifications/${id}/read`)
    return res.data
  } catch (e: any) {
    console.error(e)
    return thunkAPI.rejectWithValue(e.data)
  }
})

export const updateAll = createAsyncThunk<
  null,
  {
    ids: number[]
  },
  {
    rejectValue: string
  }
>('notification/updateAll', async ({ ids }, thunkAPI) => {
  try {
    const res = await api().put(`/api/notifications/read_all`, {
      ids,
    })
    return res.data
  } catch (e: any) {
    console.error(e)
    return thunkAPI.rejectWithValue(e.data)
  }
})
