import axios from 'axios'
import { URL } from './url'

export const axiosInstance = axios.create({
  baseURL: URL
})
