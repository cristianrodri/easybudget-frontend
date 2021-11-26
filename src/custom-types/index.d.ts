export interface Type {
  jwt: string
  user: User
}

export interface User {
  id: number
  username: string
  email: string
  provider: string
  confirmed: boolean
  blocked: null
  role: number
  created_at: string
  updated_at: string
  avatar: Avatar | null
  categories: Category[]
}

export interface Formats {
  thumbnail: Avatar
  large: Avatar
  medium: Avatar
  small: Avatar
}

export interface Avatar {
  id?: number
  name: string
  width: number
  height: number
  formats?: Formats
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  path?: null
}

export interface Category {
  id: number
  name: string
  type: string
  budgets: Budget[]
  money: number
}

export interface Budget {
  id: number
  description: string
  money: number
  category: number
  date: string
}

export enum BudgetType {
  INCOME = 'income',
  EXPENSE = 'expense'
}

type CustomCategory = Pick<Category, 'id' | 'name' | 'type'>
