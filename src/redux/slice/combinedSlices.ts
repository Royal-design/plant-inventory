import { combineReducers } from '@reduxjs/toolkit'
import { modalSlice } from './modalSlice'

const combinedSlices = combineReducers({
  modal: modalSlice.reducer,
})

export default combinedSlices
