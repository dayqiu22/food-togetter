import { configureStore } from '@reduxjs/toolkit'
import deviceLocationReducer from './location/deviceLocationSlice'

export const store = configureStore({
  reducer: {
    deviceLocation: deviceLocationReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})


export type RootState = ReturnType<typeof store.getState>;