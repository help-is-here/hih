import client from '@/database/client'
import { useEffect, useState } from 'react'
import ValidatedInput from '../Form/ValidatedInput'
import { FcGoogle } from 'react-icons/fc'
import { useNavigate } from 'react-router-dom'

type AuthProps = {
    view: string
    redirectTo: string
}
export default function Auth({ view }: AuthProps) {
    const [curState, setState] = useState<string>('signin')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [formValid, setValid] = useState<boolean>(false)
    const navigate = useNavigate()

    useEffect(() => {
        setState(view)
    }, [view])

    const signUpNewUser = async () => {
        const { data, error } = await client.auth.signUp({
            email: email,
            password: password,
            options: {
                emailRedirectTo: 'http://localhost:5173/',
            },
        })
    }
    const signInWithEmail = async () => {
        const { data, error } = await client.auth.signInWithPassword({
            email: email,
            password: password,
        })
        if (!error) navigate('/')
    }

    const signInWithGoogle = async () => {
        await client.auth.signInWithOAuth({
            provider: 'google',
        })
    }

    const updatePassword = async () => {
        await client.auth.updateUser({ password: password })
    }

    const sendResetEmail = async () => {
        await client.auth.resetPasswordForEmail(email, {
            redirectTo: 'http://localhost:5173/change-password',
        })
    }

    const validateEmail = (val: string) => {
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)
    }
    const forgottenPassword = (
        <>
            <ValidatedInput
                type="text"
                validator={validateEmail}
                onValid={(val) => {
                    setEmail(val)
                    setValid(true)
                }}
                onInvalid={() => setValid(false)}
                placeholder="email@example.com"
            />
            <button
                title={!formValid ? 'Email required' : ''}
                className="block my-4 disabled:bg-orange-200 disabled:text-gray-600 rounded-full bg-orange-400 w-full py-2"
                disabled={!formValid}
                onClick={sendResetEmail}
            >
                Send email
            </button>
            <button
                className="block underline"
                onClick={() => setState('signIn')}
            >
                Remembered? Login here
            </button>
        </>
    )
    const signIn = (
        <>
            <button
                onClick={signInWithGoogle}
                className="w-full mb-4 flex bg-white rounded-full gap-2 items-center px-4 py-2 justify-center"
            >
                <FcGoogle size="1rem" />
                <div>Sign in with Google</div>
            </button>
            <hr className="bg-neutral" />
            <div className="my-4">
                <ValidatedInput
                    type="text"
                    validator={validateEmail}
                    onValid={(val) => {
                        setEmail(val)
                        setValid(true)
                    }}
                    onInvalid={() => setValid(false)}
                    placeholder="email@example.com"
                />
            </div>
            <ValidatedInput
                type="password"
                validator={() => true}
                onValid={(val) => {
                    setPassword(val)
                    setValid(true)
                }}
                onInvalid={() => setValid(false)}
                placeholder="my-special-password"
            />
            <button
                title={!formValid ? 'All fields must be valid' : ''}
                className="block my-4 disabled:bg-orange-200 disabled:text-gray-600 rounded-full bg-orange-400 w-full py-2"
                disabled={!formValid}
                onClick={signInWithEmail}
            >
                Sign in
            </button>
            <button
                className="underline text-sm text-center w-full mb-2"
                onClick={() => setState('signUp')}
            >
                Don't have an account? Sign up!
            </button>
            <button
                className="underline text-sm text-center w-full"
                onClick={() => setState('forgottenPassword')}
            >
                Forgot password?
            </button>
        </>
    )
    const signUp = (
        <>
            <div>Sign up with Google</div>
            <input></input>
            <input></input>
            <button>Sign Up</button>
            <button onClick={() => setState('signIn')}>
                Already have an account? Sign in!
            </button>
        </>
    )
    const changePassword = (
        <>
            <div>Sign up with Google</div>
            <input></input>
            <input></input>
            <button>Sign Up</button>
            <button onClick={() => setState('signIn')}>
                Already have an account? Sign in!
            </button>
        </>
    )

    switch (curState) {
        case 'signUp':
            return signUp
        case 'forgottenPassword':
            return forgottenPassword
        case 'changePassword':
            return changePassword
        default:
            return signIn
    }
}
