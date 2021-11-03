import { Kot } from './kot'
import nock from 'nock'
import axios from 'axios'
import { API, APIError } from './interfaces'
import httpAdapter from 'axios/lib/adapters/http'
import { ErrorResponse, KotError } from './interfaces/kot-api/v1/errors/response'
axios.defaults.adapter = httpAdapter

const token = 'xxxyyyzzz'
const baseUrl = 'https://api.kingtime.jp/v1.0'
const employeeCode = '1000'

describe('Kot', () => {
  describe('constructor()', () => {
    test('should not tiemeout', async () => {
      nock(baseUrl)
        .get(`/employees/0${employeeCode}`)
        .delay(2000)
        .reply(200, {
          divisionCode: 10,
          divisionName: 'Engineer',
          code: '1010',
        } as API.EmployeeAPI.GetResponse)

      const kot = new Kot({ token, timeout: 3000 })
      await expect(kot.employee.get({ employeeCode })).resolves.not.toThrow()
    })

    test('should timeouet', async () => {
      nock(baseUrl)
        .get(`/employees/0${employeeCode}`)
        .delay(2000)
        .reply(200, {
          divisionCode: 10,
          divisionName: 'Engineer',
          code: '1010',
        } as API.EmployeeAPI.GetResponse)

      const kot = new Kot({ token })
      await expect(kot.employee.get({ employeeCode })).rejects.toThrow('Error:timeout of 1000ms exceeded')
    })
  })

  describe('Employee', () => {
    describe('get()', () => {
      test('should return results', async () => {
        nock(baseUrl)
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

      test('should return addissional fields', async () => {
        nock(baseUrl)
          .get(`/employees/0${employeeCode}`)
          .query({
            additionalFields: 'emailAddresses',
          })
          .reply(200, {
            divisionCode: 10,
            divisionName: 'Engineer',
            code: '1010',
            emailAddresses: ['keke@keke.com'],
          } as API.EmployeeAPI.GetResponse)

        const kot = new Kot({ token })
        const employee = await kot.employee.get({ employeeCode, additionalFields: ['emailAddresses'] })
        expect(employee.emailAddresses).not.toBeUndefined()
        expect(employee.emailAddresses?.length).toBe(1)
        expect(employee.emailAddresses![0]).toBe('keke@keke.com')
      })

      test('return errors', async () => {
        const kotErr: KotError = {
          message: 'employee not found',
          code: 100,
        }

        nock(baseUrl)
          .get(`/employees/0${employeeCode}`)
          .reply(400, {
            errors: [kotErr],
          } as ErrorResponse)

        const kot = new Kot({ token })
        try {
          const employee = await kot.employee.get({ employeeCode })
        } catch (err) {
          if (err instanceof APIError) {
            expect(err.url).toBe(`/employees/0${employeeCode}`)
            expect(err.name).toBe('APIError')
            expect(err.message).toBe('Error:Request failed with status code 400 Error:employee not found')
            expect(err.errors).not.toBeUndefined()
            expect(err.errors?.length).toBe(1)
            expect(err.errors![0]).toEqual(kotErr)
          }
        }
      })
    })

    describe('setBaseUrl', () => {
      test('base url is updated', () => {
        const url = 'https://local.host'
        const kot = new Kot({ token, baseUrl: url }).setBaseUrl(url)
        expect(kot.baseUrl()).toBe(url)
      })

      test('other headers are not modified', () => {
        const url = 'https://local.host'
        const kot = new Kot({ token, baseUrl: url }).setBaseUrl(url)
        expect(kot.timeout()).toBe(1000)
      })
    })

    describe('setTimeout', () => {
      const timeout = 100
      const kot = new Kot({ token, timeout }).setTimeout(100)
      expect(kot.timeout()).toBe(timeout)
    })

    describe('setUserAgent', () => {
      const ua = 'KOT SDK/test'
      const kot = new Kot({ token, userAgent: ua }).setUserAgent(ua)
      expect(kot.userAgent()).toBe(ua)
    })

    describe('setRetry', () => {
      test('no retry on default', () => {
        const kot = new Kot({ token })
        expect(kot.retry()).toBe(undefined)
      })

      test('constructor', () => {
        const retry = {
          retries: 3,
        }
        const kot = new Kot({ token, retry })

        expect(kot.retry()).toBe(retry)
      })

      test('configure with method', () => {
        const retry = {
          retries: 3,
        }
        const kot = new Kot({ token }).setRetry(retry)
        expect(kot.retry()).toBe(retry)
      })
    })

    describe('list()', () => {
      test('should return results', async () => {
        nock(baseUrl)
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

          nock(baseUrl)
            .post(`/daily-workings/timerecord/${employeeKey}`)
            .reply(200, req as API.WorkingAPI.Daily.RecordResponse)

          const kot = new Kot({ token, baseUrl })
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

          nock(baseUrl)
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
