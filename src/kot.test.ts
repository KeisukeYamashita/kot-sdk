import { Kot } from './Kot'
import nock from 'nock'
import axios from 'axios'
import { API } from './interfaces'
import httpAdapter from 'axios/lib/adapters/http'
axios.defaults.adapter = httpAdapter

const token = 'xxxyyyzzz'
const employeeCode = '1000'

describe('Kot', () => {
  describe('Employee', () => {
    describe('get()', () => {
      test('should return results', async () => {
        nock(Kot.baseUrl)
          .get(`/employees/0${employeeCode}`)
          .reply(200, {
            divisionCode: 10,
            divisionName: 'Engineer',
            code: '1010',
          } as API.EmployeeAPI.GetResponse)

        const kot = new Kot({ token })
        const employee = await kot.employee.get({ employeeCode })
        expect(employee.code).toBe('1010')
        expect(employee.divisionName).toBe('Engineer')
        expect(employee.divisionCode).toBe(10)
      })
    })

    describe('list()', () => {
      test('should return results', async () => {
        nock(Kot.baseUrl)
          .get(`/employees`)
          .reply(200, [
            {
              divisionCode: 10,
              divisionName: 'Engineer',
              code: '1010',
            },
          ] as API.EmployeeAPI.ListResponse)

        const kot = new Kot({ token })
        const employees = await kot.employee.list()
        expect(employees[0].code).toBe('1010')
        expect(employees[0].divisionName).toBe('Engineer')
        expect(employees[0].divisionCode).toBe(10)
      })
    })
  })

  describe('Working', () => {
    describe('Daily', () => {
      describe('record()', () => {
        const employeeKey = 'my-key'
        test('should success with example 1', async () => {
          const req: API.WorkingAPI.Daily.Record = {
            employeeKey,
            date: '2016-05-01',
            time: '2016-05-01T09:00:00+09:00',
            divisionCode: '1000',
            credentialCode: 300,
            latitude: 35.6672237,
            longtitude: 139.7422207,
          }

          nock(Kot.baseUrl)
            .post(`/daily-workings/timerecord/${employeeKey}`)
            .reply(200, req as API.WorkingAPI.Daily.RecordResponse)

          const kot = new Kot({ token })
          const resp = await kot.working.daily.record(req)
          expect(resp).toStrictEqual(req)
        })

        test('should success with example 2', async () => {
          const req: API.WorkingAPI.Daily.Record = {
            employeeKey,
            date: '2016-05-01',
            time: '2016-05-01T09:00:00+09:00',
            code: 1,
            divisionCode: '1000',
          }

          nock(Kot.baseUrl)
            .post(`/daily-workings/timerecord/${employeeKey}`)
            .reply(200, req as API.WorkingAPI.Daily.RecordResponse)

          const kot = new Kot({ token })
          const resp = await kot.working.daily.record(req)
          expect(resp).toStrictEqual(req)
        })
      })
    })
  })
})
