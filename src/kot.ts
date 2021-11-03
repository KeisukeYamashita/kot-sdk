import axios from 'axios'
import { Employee } from './employee'
import { Working } from './working/working'

export interface KotOptions {
  token: string
  timeout?: number
  baseUrl?: string
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

  constructor(options: KotOptions) {
    const httpClient = axios.create({
      baseURL: options.baseUrl ?? this._baseUrl,
      timeout: options.timeout ?? this._timeout,
      headers: {
        Authorization: `Bearer ${options.token}`,
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': this._userAgent,
      },
    })

    this.employee = new Employee(httpClient)
    this.working = new Working(httpClient)
  }

  baseUrl(): string {
    return this._baseUrl
  }

  timeout(): number {
    return this._timeout
  }

  userAgent(): string {
    return this._userAgent
  }

  setTimeout(timeout: number): Kot {
    this._timeout = timeout
    return this
  }

  setBaseUrl(url: string): Kot {
    this._baseUrl = url
    return this
  }

  setUserAgent(ua: string): Kot {
    this._baseUrl = ua
    return this
  }
}
