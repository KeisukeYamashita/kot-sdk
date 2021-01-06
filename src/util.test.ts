import util from './util';

describe('util', () => {
    describe('padEmployeeCode', () => {
        describe('with string', () => {
            test('can construct string url with 1 digit', () => {
                const employeeCode = "1";
                expect(util.padEmployeeCode(employeeCode)).toBe(`0000${employeeCode}`);
            });

            test('can construct string url with 5 digit', () => {
                const employeeCode = "13820";
                expect(util.padEmployeeCode(employeeCode)).toBe(`${employeeCode}`);
            });

            test('can construct string url with code that starts with 0', () => {
                const employeeCode = "00300";
                expect(util.padEmployeeCode(employeeCode)).toBe(`${employeeCode}`);
            });
        })

        describe('with number', () => {
            test('can construct number url with 1 digit', () => {
                const employeeCode = 1;
                expect(util.padEmployeeCode(employeeCode)).toBe(`0000${employeeCode}`);
            });

            test('can construct number url with 5 digit', () => {
                const employeeCode = 13820;
                expect(util.padEmployeeCode(employeeCode)).toBe(`${employeeCode}`);
            });
        })
    })
})
