import { useEffect, useState } from 'react'

type ValidatedInputProps = {
    validator: (val: string) => boolean
    onValid: (val: string) => void
    onInvalid: (val: string) => void
    placeholder: string
    type: string
}

export default function ValidatedInput({
    validator,
    onValid,
    onInvalid,
    placeholder,
    type = 'text',
}: ValidatedInputProps) {
    useEffect(() => {
        setError(validate(''))
    }, [])

    const validate = (val: string) => {
        if (!val.trim()) {
            onInvalid(val)
            return 'Required'
        } else if (!validator(val)) {
            onInvalid(val)
            return 'Invalid'
        } else {
            onValid(val)
            return 'Looks good!'
        }
    }
    const [error, setError] = useState<string>('Looks good!')
    return (
        <>
            <input
                type={type}
                className={`px-4 py-2 rounded-full block w-full border border-solid ${
                    error == 'Looks good!'
                        ? 'border-green-500'
                        : 'border-red-500'
                }`}
                id="email-password-forgot"
                placeholder={placeholder}
                onChange={(e) => setError(validate(e.target.value))}
            ></input>
            <span
                className={`text-xs ms-4 ${
                    error == 'Looks good!' ? 'text-green-500' : 'text-red-500'
                }`}
            >
                {error}
            </span>
        </>
    )
}
