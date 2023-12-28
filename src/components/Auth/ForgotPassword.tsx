'use client'
import { useState, useEffect } from 'react'
import { validateEmail } from '../Form/Validators'
import client from '@/database/client'
import ValidatedInput from '../Form/ValidatedInput'
import { FaCheck, FaExclamationCircle } from 'react-icons/fa'
import { Alert } from 'flowbite-react'

type TForgotPasswrodProps = {
    setState: (state: string) => void
}
export default function ForgotPassword({ setState }: TForgotPasswrodProps) {
    const [email, setEmail] = useState<string>('')
    const [formValid, setValid] = useState<boolean>(false)
    const [successAlert, setSuccessAlert] = useState<boolean>(false)
    const [errorAlert, setErrorAlert] = useState<boolean>(false)

    useEffect(() => {
        if (validateEmail(email)) {
            setValid(true)
        } else {
            setValid(false)
        }
    }, [email])

    const sendResetEmail = async () => {
        const { error } = await client.auth.resetPasswordForEmail(email, {
            redirectTo: '/change-password',
        })
        if (error) {
            setErrorAlert(true)
        } else {
            setSuccessAlert(true)
        }
    }

    return (
        <>
            <Alert
                className={`${successAlert ? 'block' : 'hidden'} mb-4  `}
                color="success"
                icon={FaCheck}
                onDismiss={() => setSuccessAlert(false)}
            >
                An email with a password reset link has been sent.
            </Alert>
            <Alert
                className={`${errorAlert ? 'block' : 'hidden'} mb-4  `}
                color="failure"
                icon={FaExclamationCircle}
                onDismiss={() => setErrorAlert(false)}
            >
                We're sorry, an error occurred. Try again later or contact us.
            </Alert>
            <ValidatedInput
                type="text"
                validator={validateEmail}
                onChange={setEmail}
                placeholder="email@example.com"
            />
            <button
                title={!formValid ? 'Email required' : ''}
                className="my-4 block w-full rounded-full bg-orange-400 py-2 disabled:bg-orange-200 disabled:text-gray-600"
                disabled={!formValid}
                onClick={sendResetEmail}
            >
                Send email
            </button>
            <button
                className="block w-full text-center text-sm underline"
                onClick={() => setState('signIn')}
            >
                Remembered? Login here
            </button>
        </>
    )
}
