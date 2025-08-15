import { ReactNode } from 'react'

export type Role = 'ADMIN' | 'USER'

export interface MenuItem {
  name: string
  icon: ReactNode
  submenu?: MenuItem[]
  path?: string
}
