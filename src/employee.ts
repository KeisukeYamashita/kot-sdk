import { AxiosInstance } from 'axios'
import { HttpClient } from './httpClient'
import {API} from './interfaces'
import util from './util'

export class Employee extends HttpClient {
    constructor(httpClient:AxiosInstance){
        super(httpClient)
    }

    async get(req: API.EmployeeAPI.GetRequest): Promise<API.EmployeeAPI.GetResponse> {
        const {employeeCode, date,includeResigner, additionalFields} = req
        const formatEmployeeCode = util.padEmployeeCode(employeeCode)

        return (await this.createRequest<API.EmployeeAPI.GetRequest, API.EmployeeAPI.GetResponse>(
            'get', 
            `/employees/${formatEmployeeCode}`, 
            undefined, 
            {date, includeResigner, additionalFields: additionalFields?.join(',')}
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
