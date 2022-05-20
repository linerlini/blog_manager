import { configureStore } from '@reduxjs/toolkit'
import userReducers from './slices/user_slice'
import mainReducers from './slices/main_slice'

const store = configureStore({
  reducer: {
    userReducers,
    mainReducers,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type RootDispatch = typeof store.dispatch
export default store
