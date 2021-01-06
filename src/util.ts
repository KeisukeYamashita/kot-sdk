export function padEmployeeCode(code: number | string): string{
    const paddingNum = 5;
    return ('0000000000' + code).slice(-paddingNum);
};
  
export default {
    padEmployeeCode,
}
