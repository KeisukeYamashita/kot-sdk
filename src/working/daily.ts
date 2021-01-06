import { AxiosInstance } from 'axios'
import { HttpClient } from '../httpClient'
import {API} from '../interfaces'
import util from '../util'

/**
 * Service that handles the Working Daily web API.
 * 
 * @remarks
 * 
 * See detail on the official doc: {@link https://developer.kingtime.jp/#%E5%8B%A4%E6%80%A0}
 */
export class Daily extends HttpClient {
    constructor(httpClient:AxiosInstance){
        super(httpClient)
    }

    /**
    * Record daily time records
    * 
    * @remarks
    * 
    * See detail of this call on the official doc: {@link https://developer.kingtime.jp/#%E5%8B%A4%E6%80%A0-%E6%97%A5%E5%88%A5%E6%89%93%E5%88%BB%E3%83%87%E3%83%BC%E3%82%BF-post}
    * 
    * @param req - get employee request details
    * @returns a employee type response
    * 
    * @throws {@link APIError}
    * This exception is throw if the request to KING OF TIME web API fails.
    */
    async record(req: API.WorkingAPI.Daily.Record): Promise<API.WorkingAPI.Daily.RecordResponse> {
        return (await this.createRequest<API.WorkingAPI.Daily.RecordRequest, API.WorkingAPI.Daily.RecordResponse>(
            'post', 
            `/daily-working/timerecord/${req.employeeKey}`, 
            req, 
            null)
        )
    }
}
