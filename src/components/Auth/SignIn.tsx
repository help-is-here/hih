'use client'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { validateEmail } from '../Form/Validators'
import client from '@/database/client'
import { FcGoogle } from 'react-icons/fc'
import ValidatedInput from '../Form/ValidatedInput'

type TSignInProps = {
    setState: (state: string) => void
}
export default function SignIn({ setState }: TSignInProps) {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [formValid, setValid] = useState<boolean>(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (validateEmail(email) && password.trim().length > 0) setValid(true)
        else setValid(false)
    }, [email, password])
    const signInWithEmail = async () => {
        const { error } = await client.auth.signInWithPassword({
            email: email,
            password: password,
        })
        if (!error) navigate('/')
        else alert("We're so sorry, an error occured.")
    }

    const signInWithGoogle = async () => {
        const { error } = await client.auth.signInWithOAuth({
            provider: 'google',
        })
        if (!error) navigate('/')
        else alert("We're so sorry, an error occured.")
    }

    return (
        <>
            <button
                onClick={signInWithGoogle}
                className="mb-4 flex w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-2"
            >
                <FcGoogle size="1rem" />
                <div>Sign in with Google</div>
            </button>
            <hr className="bg-neutral" />
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
                validator={null}
                onChange={setPassword}
                placeholder="my-special-password"
            />
            <button
                title={!formValid ? 'All fields must be valid' : ''}
                className="my-4 block w-full rounded-full bg-orange-400 py-2 disabled:bg-orange-200 disabled:text-gray-600"
                disabled={!formValid}
                onClick={signInWithEmail}
            >
                Sign in
            </button>
            <button
                className="mb-2 w-full text-center text-sm underline"
                onClick={() => setState('signUp')}
            >
                Don't have an account? Sign up!
            </button>
            <button
                className="w-full text-center text-sm underline"
                onClick={() => setState('forgottenPassword')}
            >
                Forgot password?
            </button>
        </>
    )
}
