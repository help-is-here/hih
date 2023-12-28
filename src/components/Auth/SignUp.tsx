'use client'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { validateEmail, validatePassword } from '../Form/Validators'
import client from '@/database/client'
import ValidatedInput from '../Form/ValidatedInput'

type TSignUpProps = {
    setState: (state: string) => void
}
export default function SignUp({ setState }: TSignUpProps) {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [formValid, setValid] = useState<boolean>(false)
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
            alert('Oops, an error occured')
        }
    }

    return (
        <form
            name="signup"
            method="POST"
            onSubmit={() =>
                alert(
                    'Thanks for signing up! Check your email for verification.'
                )
            }
            onError={() => alert('Please verify captcha')}
        >
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
            <button
                type="submit"
                title={!formValid ? 'All fields must be valid' : ''}
                className="my-4 block w-full rounded-full bg-orange-400 py-2 disabled:bg-orange-200 disabled:text-gray-600"
                disabled={!formValid}
                onClick={signUpNewUser}
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
