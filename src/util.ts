/**
 * Returns zero padding formatted employee code
 *
 * @param code - employee code that can by any foramt
 * @returns Formatted string employee code
 *
 * @example
 * Here's an example with string employee codes:
 * ```ts
 * // Prints "00300"
 * console.log(util.padEmployeeCode("00300"))
 * ```
 *
 * @example
 * Here's an example with number employee codes:
 * ```ts
 * // Prints "01300"
 * console.log(util.padEmployeeCode(1300))
 * ```
 */

export function padEmployeeCode(code: number | string): string {
  const paddingNum = 5
  return ('0000000000' + code).slice(-paddingNum)
}

export default {
  padEmployeeCode,
}
