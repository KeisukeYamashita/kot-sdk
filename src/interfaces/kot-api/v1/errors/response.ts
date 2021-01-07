export interface ErrorResponse {
  errors: KotError[]
}

export interface KotError {
  message: string
  code: number
}
