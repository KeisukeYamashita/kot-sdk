import { AxiosInstance } from 'axios'
import {API} from './interfaces'

export class Employee {
    constructor(private httpClient:AxiosInstance){}

    async get(req: API.EmployeeAPI.GetRequest): Promise<API.EmployeeAPI.GetResponse> {
        const {date,includeResigner, additionalFields} = req
        return (await this.httpClient.get(`/employees/${req.employeeCode}`, {
            params: {
                additionalFields,
                date,
                includeResigner
            }
        })).data as API.EmployeeAPI.GetResponse
    }

    async list(req: API.EmployeeAPI.ListRequest): Promise<API.EmployeeAPI.ListResponse> {
        const {date,includeResigner, additionalFields} = req
        return (await this.httpClient.get(`/employees`, {
            params: {
                additionalFields,
                date,
                includeResigner
            }
        })).data as API.EmployeeAPI.ListResponse
    }
}
