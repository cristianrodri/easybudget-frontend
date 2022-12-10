import { BudgetType } from '@utils/enums'
import { AxiosRequestConfig } from 'axios'
import { ChangeEvent } from 'react'
import { Schema } from 'mongoose'

export interface IUser {
  username: string
  email: string
  password: string
  provider: string
  confirmed: boolean
  blocked: boolean
}

export interface IBudget extends Pick<Budget, 'description' | 'money'> {
  date: Date
  owner: Schema.Types.ObjectId
  category: Schema.Types.ObjectId
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
  avatar: AvatarUser | null
  categories: CategoryTypes[]
}

export type UpdateUser = Omit<User, 'categories'>

type ProviderMetaData = {
  public_id: string
  resource_type: string
}

export interface Formats {
  thumbnail: AvatarUser & { provider_metadata: ProviderMetaData }
  large: AvatarUser & { provider_metadata: ProviderMetaData }
  medium: AvatarUser & { provider_metadata: ProviderMetaData }
  small: AvatarUser & { provider_metadata: ProviderMetaData }
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
  status?: number
}

type ApiResponse<T> = ApiResponseSuccess<T> | ApiResponseError

export type StrapiErrorResponse = {
  data: {
    errors: {
      id: string
      message: string
    }[]
  }
}

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
