import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../utils/api'

export const fetchDashboard = createAsyncThunk('dashboard/fetch', async () => {
  const { data } = await api.get('/dashboard')
  return data
})

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: { loading: false, error: '', data: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to load dashboard'
      })
  },
})

export default dashboardSlice.reducer

