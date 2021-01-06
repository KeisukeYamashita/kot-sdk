export {APIError} from './errors/APIError'
export namespace API {
    export namespace EmployeeAPI {
        export type EmployeeAdditionalFields = 'lastNamePhonetics' 
        | 'firstNamePhonetics' 
        | 'hiredDate' 
        | 'birthDate'
        | 'resignationDate'
        | 'emailAddresses'
        | 'allDayRegardingWorkInMinute'

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

    export namespace WorkingAPI {
        export namespace Daily {
            export interface Record extends RecordRequest {
                employeeKey: string
            }

            export interface RecordRequest {
                date: string
                time: string
                divisionCode: string
                credentialCode?: number
                credentialName?: string
                latitude?: number
                longtitude?: number
            }

            export type RecordResponse = RecordRequest
        }
    }
}
