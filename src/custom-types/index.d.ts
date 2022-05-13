import { BudgetType } from '@utils/enums'
import { ChangeEvent } from 'react'

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
  categories: CategoryTypes[]
}

export type UpdateUser = Omit<User, 'categories'>

export interface Formats {
  thumbnail: AvatarUser
  large: AvatarUser
  medium: AvatarUser
  small: AvatarUser
}

export interface AvatarUser {
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

export interface CategoryTypes {
  id: number
  name: string
  type: BudgetType.INCOME | BudgetType.EXPENSE
  budgets: Budget[]
  money: number
}

export interface Budget {
  id: number
  description: string
  money: number
  category: AddCategory | number
  date: string
}

type AddCategory = Omit<CategoryTypes, 'budgets' | 'money'>
type GetCategory = Omit<CategoryTypes, 'budgets'>
export type CategoryApi = Omit<CategoryTypes, 'money'>

/* API TYPES */
export type Url = string
export type BodyRequest = { [key: string]: string }
export type RequestConfig = AxiosRequestConfig
export type Token = string
export interface AuthResponse {
  jwt: string
  user: User
}

export type ApiResponseSuccess<T> = {
  success: true
  data?: T
}

type ApiResponseError = {
  success: false
  message: string
}

type ApiResponse<T> = ApiResponseSuccess<T> | ApiResponseError

/* FORMIK CUSTOM TYPES */
type FormikHandleChange = {
  (e: ChangeEvent): void
  <T_1 = string | ChangeEvent>(field: T_1): T_1 extends ChangeEvent
    ? void
    : (e: string | ChangeEvent) => void
}

type FormikSetFieldType<T, D> = (
  field: T,
  value: D,
  shouldValidate?: boolean | undefined
) => Promise<FormikErrors<{ [T]: D }>> | Promise<void>
