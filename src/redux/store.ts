import { configureStore } from '@reduxjs/toolkit'
import { modalSlice } from './slice/modalSlice'

export const store = configureStore({
  reducer: {
    modal: modalSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['modal/setModal'],
        ignoredPaths: ['modal.data'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
