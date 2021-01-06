export {APIError} from './errors/APIError'
export namespace API {

    export type EmployeeAdditionalFields = 'lastNamePhonetics' 
    | 'firstNamePhonetics' 
    | 'hiredDate' 
    | 'birthDate'
    | 'resignationDate'
    | 'emailAddresses'
    | 'allDayRegardingWorkInMinute'

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
            emailAddresses?: string[]
            [additionalKeys: string]: any
        }

        export interface GetRequest {
            employeeCode: number | string
            date?: string
            includeResigner?: boolean
            additionalFields?:  EmployeeAdditionalFields[]
        }

        export type GetResponse = Employee

        export type ListRequest = Omit<GetRequest, 'employeeCode'>
        export type ListResponse = Employee[]
    }
}
