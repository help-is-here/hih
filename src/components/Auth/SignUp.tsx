'use client'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { validateEmail, validatePassword } from '../Form/Validators'
import client from '@/database/client'
import ValidatedInput from '../Form/ValidatedInput'
import { Alert } from 'flowbite-react'
import { FaCheck, FaExclamationCircle } from 'react-icons/fa'

type TSignUpProps = {
    setState: (state: string) => void
}
export default function SignUp({ setState }: TSignUpProps) {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [formValid, setValid] = useState<boolean>(false)
    const [successAlert, setSuccessAlert] = useState<boolean>(false)
    const [errorAlert, setErrorAlert] = useState<boolean>(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (validateEmail(email) && password.trim().length > 0) {
            setValid(true)
        } else {
            setValid(false)
        }
    }, [email, password])

    const signUpNewUser = async () => {
        const { error } = await client.auth.signUp({
            email: email,
            password: password,
            options: {
                emailRedirectTo: String(import.meta.env.DEPLOY_URL),
            },
        })
        if (!error) {
            navigate('/')
        } else {
            setErrorAlert(true)
        }
    }

    return (
        <form
            name="signup"
            data-netlify-recaptcha="true"
            data-netlify="true"
            onSubmit={() => setSuccessAlert(true)}
            onError={() => setErrorAlert(true)}
        >
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
            <div className="my-4">
                <ValidatedInput
                    type="text"
                    validator={validateEmail}
                    onChange={setEmail}
                    placeholder="email@example.com"
                />
            </div>
            <ValidatedInput
                type="password"
                validator={validatePassword}
                onChange={setPassword}
                placeholder="my-special-password"
            />
            <div className="text-sm">
                Password must be 8 characters long and have at least one of each
                of these: <br />
                - lowercase letters <br />
                - uppercase letters <br />
                - numbers <br />- symbols
            </div>

            <div className="my-2" data-netlify-recaptcha="true"></div>

            <button
                type="submit"
                title={!formValid ? 'All fields must be valid' : ''}
                className="my-4 block w-full rounded-full bg-orange-400 py-2 disabled:bg-orange-200 disabled:text-gray-600"
                disabled={!formValid}
                onClick={(e) => {
                    e.preventDefault()
                    signUpNewUser()
                }}
            >
                Sign up
            </button>
            <button
                className="w-full text-center text-sm underline"
                onClick={() => setState('signIn')}
            >
                Already have an account? Sign in!
            </button>
        </form>
    )
}
