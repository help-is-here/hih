import { useState } from 'react'

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
    const [error, setError] = useState<string>('')

    const validate = (val: string) => {
        const isValid = validator(val)
        if (isValid) {
            onValid(val)
            return 'Looks good!'
        } else if (!val.trim()) {
            onInvalid(val)
            return 'Required'
        } else {
            onInvalid(val)
            return 'Invalid'
        }
    }
    return (
        <>
            <input
                type={type}
                className={`block w-full rounded-full border border-solid px-4 py-2 ${
                    error == 'Looks good!'
                        ? 'border-green-500'
                        : 'border-red-500'
                }`}
                id="email-password-forgot"
                placeholder={placeholder}
                onChange={(e) => setError(validate(e.target.value))}
            ></input>
            <span
                className={`ms-4 text-xs ${
                    error == 'Looks good!' ? 'text-green-500' : 'text-red-500'
                }`}
            >
                {error}
            </span>
        </>
    )
}
