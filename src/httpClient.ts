import { AxiosInstance } from "axios";
import {AxiosError} from 'axios'
import { APIError } from "./interfaces";
import { ErrorResponse } from "./interfaces/kot-api/v1/errors/response";

export class HttpClient {
    constructor(protected httpClient: AxiosInstance) {}

    protected async createRequest<T = Record<string, any>, K = Record<string, any>> (method: any, url: string, data?: T, params?: any): Promise<K> {
        try{
            return (await this.httpClient.request({
                method,
                url,
                params,
                data
            })).data as K
        } catch (e) {
            throw new APIError(e as AxiosError<ErrorResponse>)
        }
    }
}
