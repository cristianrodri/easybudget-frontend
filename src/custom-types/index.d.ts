import { BudgetType } from '@utils/enums'
import { AxiosRequestConfig } from 'axios'
import { ChangeEvent } from 'react'
import { Document, Schema } from 'mongoose'
import { UploadApiResponse } from 'cloudinary'

interface Id {
  id: string
}

export interface IUserDocument extends Document {
  username: string
  email: string
  password: string
  provider: string
  confirmed: boolean
  blocked: boolean
  avatar: UploadApiResponse
  categories: CategoryTypes[]
}

export interface IUser extends IUserDocument {
  generateAuthToken(): string
}

export interface IBudget extends Pick<Budget, 'description' | 'money'> {
  date: Date
  user: Schema.Types.ObjectId
  category: Schema.Types.ObjectId
}

export interface ICategory extends Document {
  name: string
  type: BudgetType
  user: Schema.Types.ObjectId
  budgets: Omit<IBudget, 'id' | 'user'>[]
}

export interface User extends Id {
  username: string
  email: string
  provider: string
  confirmed: boolean
  blocked: null
  role: number
  createdAt: string
  updatedAt: string
  avatar: UploadApiResponse
  categories: CategoryTypes[]
}

export type UpdateUser = Omit<User, 'categories'>

export interface CategoryTypes extends Id {
  name: string
  type: BudgetType.INCOME | BudgetType.EXPENSE
  budgets: Budget[]
  money: number
}

export interface Budget extends Id {
  description: string
  money: number
  category: string | AddCategory
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
