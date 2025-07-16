import { configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  type Persistor,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import combinedSlices from './slice/combinedSlices'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [''],
}

const persistedReducer = persistReducer(persistConfig, combinedSlices)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, 'modal/setModal'],
        ignoredPaths: ['modal.data'],
      },
    }),
})

export const persistor: Persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
