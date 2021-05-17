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

interface Pagination {
  pageIndex: number
  pageSize: number
}

export enum Gender {
  FEMALE = 'FEMALE',
  MALE = 'MALE'
}

export enum Period {
  PRIMARY = 'PRIMARY',
  JUNIOR = 'JUNIOR',
  HIGHER = 'HIGHER',
  UNIVERSITY = 'UNIVERSITY'
}

export enum Grade {
  FIRST_PRIMARY = 'FIRST_PRIMARY',
  SECOND_PRIMARY = 'SECOND_PRIMARY',
  THIRD_PRIMARY = 'THIRD_PRIMARY',
  FOURTH_PRIMARY = 'FOURTH_PRIMARY',
  FIFTH_PRIMARY = 'FIFTH_PRIMARY',
  SIXTH_PRIMARY = 'SIXTH_PRIMARY',
  FIRST_JUNIOR = 'FIRST_JUNIOR',
  SECOND_JUNIOR = 'SECOND_JUNIOR',
  THIRD_JUNIOR = 'THIRD_JUNIOR',
  FIRST_HIGHER = 'FIRST_HIGHER',
  SECOND_HIGHER = 'SECOND_HIGHER',
  THIRD_HIGHER = 'THIRD_HIGHER',
  FIRST_UNIVERSITY = 'FIRST_UNIVERSITY',
  SECOND_UNIVERSITY = 'SECOND_UNIVERSITY',
  THIRD_UNIVERSITY = 'THIRD_UNIVERSITY',
  FOURTH_UNIVERSITY = 'FOURTH_UNIVERSITY'
}

/* Students */
export const getStudents = <
  Response extends Pageable<{
    id: string
    gender: Gender
  }>
>(
  params: Pagination
): Promise<Response> => http.get<void, Response>('/students', { params })
/* Teachers */
export const getTeachers = <
  Response extends Pageable<{ id: string }>
>(): Promise<Response> => http.get<void, Response>('/teachers')

export default http
export * from './errors'
export * from './hooks'
