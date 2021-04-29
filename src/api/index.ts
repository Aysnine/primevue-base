import axios from 'axios'
import { customErrorRecognizer } from './errors'

const http = axios.create({ baseURL: '/api' })
http.interceptors.response.use(customErrorRecognizer)
http.interceptors.response.use((response) => {
  if ((response.headers['content-type'] || '').includes('application/json')) {
    return response.data
  }
  return response
})

interface Pageable<Record> {
  data: Array<Record>
  total: number
}

/* Students */
export const getStudents = <
  Response extends Pageable<{ id: string }>
>(): Promise<Response> => http.get<void, Response>('/students')
/* Teachers */
export const getTeachers = <
  Response extends Pageable<{ id: string }>
>(): Promise<Response> => http.get<void, Response>('/teachers')

export default http
