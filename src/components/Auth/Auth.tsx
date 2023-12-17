import { useEffect, useState } from 'react'

type AuthProps = {
    view: string
    redirectTo: string
}
export default function Auth({ view, redirectTo }: AuthProps) {
    const [curState, setState] = useState<string>('signin')

    useEffect(() => {
        setState(view)
    }, [view])

    const forgottenPassword = (
        <>
            <input></input>
            <button>Send email</button>
            <button onClick={() => setState('signIn')}>
                Remembered? Login here
            </button>
        </>
    )
    const signIn = (
        <>
            <div>Sign in with Google</div>
            <input></input>
            <input></input>
            <button>Sign In</button>
            <button onClick={() => setState('signUp')}>
                Don't have an account? Sign up!
            </button>
            <button onClick={() => setState('forgottenPassword')}>
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

    switch (curState) {
        case 'signUp':
            return signUp
        case 'forgottenPassword':
            return forgottenPassword
        default:
            return signIn
    }
}
