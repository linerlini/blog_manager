/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../index'

const initState = {}

const mainSlice = createSlice({
  name: 'main',
  initialState: initState,
  reducers: {},
})

export default mainSlice.reducer
