import { AxiosError } from 'axios'
import { ErrorResponse } from './response'

export class APIError extends Error {
  name = 'APIError'
  status?: number
  url?: string

  constructor(err: AxiosError<ErrorResponse>) {
    super()
    Object.setPrototypeOf(this, APIError.prototype)
    this.message = `${err.name}:${err.message}`

    if (err.response) {
      err.response.data.errors.forEach((error) => {
        this.message += ` Error:${error.message}`
      })
      this.status = err.response.status
      this.url = err.response.config.url
    }
  }
}
