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
        const { error } = await client.auth.signUp({
            email: email,
            password: password,
            options: {
                emailRedirectTo: import.meta.env.BASE_URL,
            },
        })
        if (!error) {
            navigate('/')
        } else {
            alert('Oops, an error occured')
        }
    }
    const signInWithEmail = async () => {
        const { error } = await client.auth.signInWithPassword({
            email: email,
            password: password,
        })
        if (!error) {
            navigate('/')
        } else {
            alert("We're so sorry, an error occured.")
        }
    }

    const signInWithGoogle = async () => {
        const { error } = await client.auth.signInWithOAuth({
            provider: 'google',
        })
        if (!error) {
            navigate('/')
        } else {
            alert("We're so sorry, an error occured.")
        }
    }

    const updatePassword = async () => {
        const { error } = await client.auth.updateUser({
            password: password,
        })
        if (!error) {
            navigate('/')
        } else {
            alert("We're so sorry, an error occured.")
        }
    }

    const sendResetEmail = async () => {
        await client.auth.resetPasswordForEmail(email, {
            redirectTo: '/change-password',
        })
    }

    const validateEmail = (val: string) => {
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)
    }
    const validatePassword = (val: string) => {
        if (val.length < 8) {
            return false
        }
        return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(val)
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
                className="my-4 block w-full rounded-full bg-orange-400 py-2 disabled:bg-orange-200 disabled:text-gray-600"
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
                validator={null}
                onValid={(val) => {
                    setPassword(val)
                    setValid(true)
                }}
                onInvalid={() => setValid(false)}
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
    const signUp = (
        <>
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
                validator={validatePassword}
                onValid={(val) => {
                    setPassword(val)
                    setValid(true)
                }}
                onInvalid={() => setValid(false)}
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
                title={!formValid ? 'All fields must be valid' : ''}
                className="my-4 block w-full rounded-full bg-orange-400 py-2 disabled:bg-orange-200 disabled:text-gray-600"
                disabled={!formValid}
                onClick={signUpNewUser}
            >
                Sign up
            </button>
            <button onClick={() => setState('signIn')}>
                Already have an account? Sign in!
            </button>
        </>
    )
    const changePassword = (
        <>
            <ValidatedInput
                type="password"
                validator={validatePassword}
                onValid={(val) => {
                    setPassword(val)
                    setValid(true)
                }}
                onInvalid={() => setValid(false)}
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
                title={!formValid ? 'All fields must be valid' : ''}
                className="my-4 block w-full rounded-full bg-orange-400 py-2 disabled:bg-orange-200 disabled:text-gray-600"
                disabled={!formValid}
                onClick={updatePassword}
            >
                Change Password
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
