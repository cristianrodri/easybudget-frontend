import axios from 'axios'
import { CLIENT_URL, SERVER_URL } from './url'

export const clientInstance = axios.create({
  baseURL: CLIENT_URL,
  validateStatus: status => status < 600
})

export const serverInstance = axios.create({
  baseURL: SERVER_URL,
  timeout: 30000
})
