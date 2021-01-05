export namespace API {
    export namespace Employee {
        export interface GetRequest {
            employeeCode: string
            date?: string
            includeResigner?: boolean
            additionalFields?: 'emailAddresses'
        }
        
        export interface GetResponse {
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
    }
}
