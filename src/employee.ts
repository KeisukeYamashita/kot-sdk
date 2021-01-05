import { AxiosInstance } from 'axios'
import {API} from './interfaces'

export class Employee {
    constructor(private httpClient:AxiosInstance){}

    async get(req: API.EmployeeAPI.GetRequest): Promise<API.EmployeeAPI.GetResponse> {
        const {date,includeResigner, additionalFields} = req
        return (await this.httpClient.post(`/employees/${req.employeeCode}`, null, {
            params: {
                additionalFields,
                date,
                includeResigner
            }
        })).data as API.EmployeeAPI.GetResponse
    }
}
