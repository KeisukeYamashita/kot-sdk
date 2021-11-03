import axios, { AxiosRequestConfig } from 'axios'
import { Employee } from './employee'
import { Working } from './working/working'
import axiosRetry, { IAxiosRetryConfig } from 'axios-retry'

export interface KotOptions {
  token: string
  timeout?: number
  baseUrl?: string
  userAgent?: string
  retry?: IAxiosRetryConfig
}

/**
 * Client for KING OF TIME web API.
 */
export class Kot {
  employee: Employee
  working: Working

  private _baseUrl = 'https://api.kingtime.jp/v1.0'
  private _timeout = 1000
  private _userAgent = 'KOT SDK/0.1.0'
  private _retry?

  private config: AxiosRequestConfig

  constructor(options: KotOptions) {
    this.config = {
      baseURL: options.baseUrl ?? this._baseUrl,
      timeout: options.timeout ?? this._timeout,
      headers: {
        Authorization: `Bearer ${options.token}`,
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': options.userAgent ?? this._userAgent,
      },
    }

    const httpClient = axios.create(this.config)
    if (options.retry) {
      this._retry = options.retry
      axiosRetry(httpClient, options.retry)
    }

    this.employee = new Employee(httpClient)
    this.working = new Working(httpClient)
  }

  baseUrl(): string {
    return this._baseUrl
  }

  retry(): IAxiosRetryConfig | undefined {
    return this._retry
  }

  timeout(): number {
    return this._timeout
  }

  userAgent(): string {
    return this._userAgent
  }

  setTimeout(timeout: number): Kot {
    this._timeout = timeout

    const config: AxiosRequestConfig = {
      ...this.config,
      timeout,
    }

    this.configureClients(config)
    return this
  }

  setRetry(config: IAxiosRetryConfig): Kot {
    this._retry = config
    const httpClient = axios.create(this.config)
    axiosRetry(httpClient, config)

    return this
  }

  setBaseUrl(baseURL: string): Kot {
    this._baseUrl = baseURL

    const config: AxiosRequestConfig = {
      ...this.config,
      baseURL,
    }

    this.configureClients(config)
    return this
  }

  setUserAgent(userAgent: string): Kot {
    this._userAgent = userAgent

    const config: AxiosRequestConfig = {
      ...this.config,
      headers: {
        ...this.config.headers,
        'User-Agent': userAgent,
      },
    }

    this.configureClients(config)
    return this
  }

  private configureClients(config: AxiosRequestConfig): void {
    const httpClient = axios.create(config)

    this.employee = new Employee(httpClient)
    this.working = new Working(httpClient)
  }
}
