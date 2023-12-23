import { useEffect, useState } from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'
import ForgotPassword from './ForgotPassword'
import ChangePassword from './ChangePassword'

type TAuthProps = {
    view: string
}

export default function Auth({ view }: TAuthProps) {
    const [curState, setState] = useState<string>('signin')

    useEffect(() => {
        setState(view)
    }, [view])

    switch (curState) {
        case 'signUp':
            return <SignUp setState={setState} />
        case 'forgottenPassword':
            return <ForgotPassword setState={setState} />
        case 'changePassword':
            return <ChangePassword />
        default:
            return <SignIn setState={setState} />
    }
}
