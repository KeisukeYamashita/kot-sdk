import axios from 'axios'
import {Employee} from './employee'

export interface KotOptions {
    token: string
    timeout: number
    baseUrl: string
}

export default class Kot {
    employee: Employee

    static baseUrl: string = 'https://api.kingtime.jp/v1.0'
    static timeout: number = 1000
    static userAgent: string = 'KOT SDK/0.1.0'

    constructor(options: KotOptions){
        const httpClient = axios.create({
            baseURL: options.baseUrl ?? Kot.baseUrl,
            timeout: options.timeout ?? Kot.timeout,
            headers: {
                'User-Agent': Kot.userAgent,
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${options.token}`
            }
        })

        this.employee = new Employee(httpClient)
    }
}
