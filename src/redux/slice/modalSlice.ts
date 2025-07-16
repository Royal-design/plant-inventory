import { Plant } from '@/generated/prisma'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type ModalState = {
  isOpen?: boolean
  type?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | string
  data?: Plant | null
}

const initialState: ModalState = {
  isOpen: false,
  type: undefined,
  size: 'md',
  data: null,
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModal: (
      state,
      action: PayloadAction<{
        isOpen?: boolean
        type?: string
        size?: 'sm' | 'md' | 'lg' | 'xl' | string
        data?: Plant | null
      }>
    ) => {
      return { ...state, ...action.payload }
    },

    closeModal: (state) => {
      state.isOpen = false
      state.data = null
      state.type = ''
    },

    resetModal: () => initialState,
  },
})

export const { setModal, closeModal, resetModal } = modalSlice.actions
