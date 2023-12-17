import Auth from '@/components/Auth/Auth'
import SessionWrapper from '@/components/Auth/SessionWrapper'
import LoginButton from '@/components/Auth/LoginButton'
import AuthPageLayout from '@/components/Auth/AuthPageLayout'

const LoginPage = () => {
    const ifSession = (
        <div className="w-96 bg-orange-50 rounded-lg p-8">
            <Auth redirectTo="/" view="forgottenPassword" />
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
