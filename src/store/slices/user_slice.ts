import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserModel } from 'types/server'
import { UserRole } from 'utils/constants'
import { getLocalStorage } from 'utils/index'
import type { RootState } from '../index'

let initState: UserModel = {
  name: '',
  password: '',
  createdAt: '',
  updatedAt: '',
  account: '',
  desc: '',
  imgURL: '',
  status: '',
  thumbUpCount: 0,
  uuid: '',
  role: UserRole.TOURISTS,
}
const cacheResult = getLocalStorage('user')
if (cacheResult) {
  initState = cacheResult
}
const userSlice = createSlice({
  name: 'user',
  initialState: initState,
  reducers: {
    setUser(state, action: PayloadAction<UserModel>) {
      return action.payload
    },
    updateUser(state, action: PayloadAction<Partial<UserModel>>) {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
})

export const selectUser = (state: RootState) => state.userReducers
export const selectRole = (state: RootState) => state.userReducers.role
export const { setUser, updateUser } = userSlice.actions
export default userSlice.reducer
