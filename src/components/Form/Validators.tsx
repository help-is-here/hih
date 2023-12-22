export const validateEmail = (val: string) => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)
}
export const validatePassword = (val: string) => {
    if (val.length < 8) return false
    return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(val)
}
