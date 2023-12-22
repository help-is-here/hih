import Auth from '@/components/Auth/Auth'
import SessionWrapper from '@/components/Auth/SessionWrapper'
import LoginButton from '@/components/Auth/LoginButton'
import AuthPageLayout from '@/components/Auth/AuthPageLayout'

const LoginPage = () => {
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
            <SessionWrapper ifSession={ifSession} notSession={notSession} />
        </AuthPageLayout>
    )
}

export default LoginPage
