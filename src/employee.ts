import { AxiosInstance } from 'axios'
import { HttpClient } from './httpClient'
import { API } from './interfaces'
import util from './util'

/**
 * Service that handles the Employee web API.
 *
 * @remarks
 *
 * See detail on the official doc: {@link https://developer.kingtime.jp/#%E5%BE%93%E6%A5%AD%E5%93%A1}
 */
export class Employee extends HttpClient {
  constructor(httpClient: AxiosInstance) {
    super(httpClient)
  }

  /**
   * Gets a employee based on employee code.
   *
   * @remarks
   *
   * See detail of this call on the official doc: {@link https://developer.kingtime.jp/#%E5%BE%93%E6%A5%AD%E5%93%A1-%E5%BE%93%E6%A5%AD%E5%93%A1%E3%83%87%E3%83%BC%E3%82%BF-get-1}
   *
   * @param req - get employee request details
   * @returns a employee type response
   *
   * @throws {@link APIError}
   * This exception is throw if the request to KING OF TIME web API fails.
   */
  async get(req: API.EmployeeAPI.GetRequest): Promise<API.EmployeeAPI.GetResponse> {
    const { employeeCode, date, includeResigner, additionalFields } = req
    const formatEmployeeCode = util.padEmployeeCode(employeeCode)

    return await this.createRequest<API.EmployeeAPI.GetRequest, API.EmployeeAPI.GetResponse>('get', `/employees/${formatEmployeeCode}`, undefined, {
      date,
      includeResigner,
      additionalFields: additionalFields?.join(','),
    })
  }

  /**
   * List employees.
   *
   * @remarks
   *
   * See detail of this call on the official doc: {@link https://developer.kingtime.jp/#%E5%BE%93%E6%A5%AD%E5%93%A1-%E5%BE%93%E6%A5%AD%E5%93%A1%E3%83%87%E3%83%BC%E3%82%BF-get}
   *
   * @param req - list emploee request details
   * @returns employee array type response
   *
   * @throws {@link APIError}
   * This exception is throw if the request to KING OF TIME web API fails.
   */
  async list(req?: API.EmployeeAPI.ListRequest): Promise<API.EmployeeAPI.ListResponse> {
    return await this.createRequest<API.EmployeeAPI.ListRequest, API.EmployeeAPI.ListResponse>('get', `/employees`, undefined, {
      ...req,
    })
  }
}
