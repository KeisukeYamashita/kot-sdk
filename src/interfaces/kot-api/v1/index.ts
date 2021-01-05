export {APIError} from './errors/APIError'
export namespace API {
    export namespace EmployeeAPI {
        export interface Employee {
            divisionCode: number
            divisionName: string
            gender: string
            typeCode: string
            typeName: string
            code: string
            lastname: string
            firstname: string
            key: string
            [additionalKeys: string]: any
        }
        export interface GetRequest {
            employeeCode: string
            date?: string
            includeResigner?: boolean
            additionalFields?: 'emailAddresses'
        }
        export type GetResponse = Employee

        export type ListRequest = Omit<GetRequest, 'employeeCode'>
        export type ListResponse = Employee[]
    }
}
