import { Auth } from '@supabase/auth-ui-react'
import client from '@/database/client'
import { customTheme } from '../../components/Auth/AuthTheme'
import SessionWrapper from '@/components/Auth/SessionWrapper'
import LoginButton from '@/components/Auth/LoginButton'
import AuthPageLayout from '@/components/Auth/AuthPageLayout'

const LoginPage = () => {
    const ifSession = (
        <div className="w-96 bg-orange-50 rounded-lg p-8">
            <Auth
                supabaseClient={client}
                theme="default"
                appearance={{ theme: customTheme }}
                providers={['google']}
                redirectTo="/"
                view="update_password"
            />
        </div>
    )
    const notSession = (
        <div className="text-xl text-white">
            You do not have access
            <div className="flex justify-center my-12">
                <LoginButton />
            </div>
        </div>
    )

    return (
        <AuthPageLayout>
            <SessionWrapper ifSession={ifSession} notSession={notSession} />
        </AuthPageLayout>
    )
}

export default LoginPage
