import axios from 'axios'
import { CLIENT_URL } from './url'

export const clientInstance = axios.create({
  baseURL: CLIENT_URL,
  validateStatus: status => status < 600,
  timeout: 30_000
})
