import { AxiosInstance } from 'axios'
import { HttpClient } from '../httpClient'
import { Daily } from './daily'
import { Montly } from './monthly'

/**
 * Service that handles the Working web API.
 *
 * @remarks
 *
 * See detail on the official doc: {@link https://developer.kingtime.jp/#%E5%8B%A4%E6%80%A0}
 */
export class Working {
  daily: Daily
  monthly: Montly

  constructor(httpClient: AxiosInstance) {
    this.daily = new Daily(httpClient)
    this.monthly = new Montly(httpClient)
  }
}
