import { configureStore } from '@reduxjs/toolkit'
import issuesReducer from './listSlice'

export const store = configureStore({
  reducer: issuesReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});