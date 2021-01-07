import { AxiosInstance } from 'axios'
import { HttpClient } from '../httpClient'
import { API } from '../interfaces'
import util from '../util'

/**
 * Service that handles the Working Monthly web API.
 *
 * @remarks
 *
 * See detail on the official doc: {@link https://developer.kingtime.jp/#%E5%8B%A4%E6%80%A0}
 */
export class Montly extends HttpClient {
  constructor(httpClient: AxiosInstance) {
    super(httpClient)
  }
}
