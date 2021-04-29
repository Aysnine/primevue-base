import { AxiosResponse } from 'axios'

class BaseError extends Error {}

export class MyUnknownError<R> extends BaseError {
  readonly response: R
  constructor(response: R) {
    super()
    this.response = response
  }
}

export class MyExampleError<R> extends BaseError {
  readonly response: R
  constructor(response: R) {
    super()
    this.response = response
  }
}

export const customErrorRecognizer = (
  response: AxiosResponse
): AxiosResponse<unknown> | Promise<AxiosResponse<unknown>> => {
  const { data } = response
  if (typeof data === 'object' && data.code) {
    const { code } = data
    if (typeof code === 'string') {
      if (code === 'MY_EXAMPLE_ERROR') {
        throw new MyExampleError(response)
      }
    }

    throw new MyUnknownError(response)
  }
  return response
}
