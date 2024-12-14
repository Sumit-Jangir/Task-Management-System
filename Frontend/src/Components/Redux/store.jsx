import { configureStore } from '@reduxjs/toolkit'
import loginSystem from './slice'
export const store = configureStore({
  reducer: {
    auth:loginSystem,
  },
})