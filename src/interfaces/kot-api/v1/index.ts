export { APIError } from './errors/APIError'
export namespace API {
  export namespace EmployeeAPI {
    export type EmployeeAdditionalFields =
      | 'lastNamePhonetics'
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
      additionalFields?: EmployeeAdditionalFields[]
    }

    export type GetResponse = Employee

    export type ListRequest = Omit<GetRequest, 'employeeCode'>
    export type ListResponse = Employee[]
  }

  export namespace WorkingAPI {
    export namespace Daily {
      export type Record = RecordRequest & {
        employeeKey: string
      }

      export type RecordRequest = RecordRequestWithCredentialCode | RecordRequestWithCode

      export interface RecordRequestWithCredentialCode {
        date: string
        time: string
        divisionCode: string
        credentialCode?: number
        credentialName?: string
        latitude?: number
        longtitude?: number
      }

      enum TimeRecordCode {
        ClockIn,
        ClockOut,
        StartBreak,
        EndBreak
      }

      export interface RecordRequestWithCode {
        date: string
        time: string
        code: TimeRecordCode
        divisionCode: string
      }

      export type RecordResponse = RecordRequest
    }
  }
}
