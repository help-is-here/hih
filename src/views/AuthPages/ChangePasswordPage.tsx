import Auth from '@/components/Auth/Auth'
import LoginButton from '@/components/Auth/LoginButton'
import AuthPageLayout from '@/components/Layouts/AuthPageLayout'
import { AuthContext, TAuthContext } from '@/context/AuthContext.tsx'
import { useContext } from 'react'

const LoginPage = () => {
    const { authenticated } = useContext<TAuthContext>(AuthContext)

    const ifSession = (
        <div className="w-96 rounded-lg bg-orange-50 p-8">
            <Auth view="changePassword" />
        </div>
    )
    const notSession = (
        <div className="text-xl text-white">
            You do not have access
            <div className="my-12 flex justify-center">
                <LoginButton />
            </div>
        </div>
    )

    return (
        <AuthPageLayout>
            {authenticated ? ifSession : notSession}
        </AuthPageLayout>
    )
}

export default LoginPage
