import { useState } from 'react'

type TValidatedInputProps = {
    validator: ((val: string) => boolean) | null
    onChange: (val: string) => void
    placeholder: string
    type?: string | undefined
    value?: string | undefined
}

export default function ValidatedInput({
    validator,
    onChange,
    placeholder,
    type = 'text',
    value = '',
}: TValidatedInputProps) {
    const [error, setError] = useState<string>('')

    const validate = (val: string) => {
        const isValid = validator ? validator(val) : true
        if (isValid) {
            return 'Looks good!'
        } else if (!val.trim()) {
            return 'Required'
        } else {
            return 'Invalid'
        }
    }
    return (
        <>
            <input
                type={type}
                className={`block w-full rounded-full border border-solid px-4 py-2 ${
                    error === 'Looks good!'
                        ? 'border-green-500'
                        : 'border-red-500'
                }`}
                id="email-password-forgot"
                placeholder={placeholder}
                onChange={(e) => {
                    setError(validate(e.target.value))
                    onChange(e.target.value)
                }}
                defaultValue={value}
            ></input>
            <span
                className={`ms-4 text-xs ${
                    error === 'Looks good!' ? 'text-green-500' : 'text-red-500'
                }`}
            >
                {validator ? error : ''}
            </span>
        </>
    )
}
