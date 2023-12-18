import Auth from '@/components/Auth/Auth'
import SessionWrapper from '@/components/Auth/SessionWrapper'
import AuthPageLayout from '@/components/Auth/AuthPageLayout'

const LoginPage = () => {
    const ifSession = (
        <div className="text-xl text-white">
            Welcome to our site! You are logged in.
            <div className="flex justify-center my-12 gap-4">
                <a href="/">
                    <button className="bg-white text-orange-950 rounded-full px-4 py-2">
                        Find out More
                    </button>
                </a>
                <a href="/change-password">
                    <button className="bg-white text-orange-950 rounded-full px-4 py-2">
                        Change Password
                    </button>
                </a>
            </div>
        </div>
    )
    const notSession = (
        <div className="w-96 bg-orange-50 rounded-lg p-8">
            <Auth view="signIn" redirectTo="/" />
        </div>
    )
    return (
        <AuthPageLayout>
            <SessionWrapper ifSession={ifSession} notSession={notSession} />
        </AuthPageLayout>
    )
}

export default LoginPage
