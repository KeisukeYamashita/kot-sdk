import { AxiosInstance } from 'axios'
import { HttpClient } from './httpClient'
import {API} from './interfaces'

export class Employee extends HttpClient {
    constructor(httpClient:AxiosInstance){
        super(httpClient)
    }

    async get(req: API.EmployeeAPI.GetRequest): Promise<API.EmployeeAPI.GetResponse> {
        const {date,includeResigner, additionalFields} = req
        return (await this.createRequest<API.EmployeeAPI.GetRequest, API.EmployeeAPI.GetResponse>(
            'get', 
            `/employees/${req.employeeCode}`, 
            undefined, 
            {date, includeResigner, additionalFields}
        ))
    }

    async list(req: API.EmployeeAPI.ListRequest): Promise<API.EmployeeAPI.ListResponse> {
        const {date,includeResigner, additionalFields} = req
        return (await this.createRequest<API.EmployeeAPI.ListRequest, API.EmployeeAPI.ListResponse>(
            'get', 
            `/employees`, 
            undefined, 
            {date, includeResigner, additionalFields}
        ))
    }
}
