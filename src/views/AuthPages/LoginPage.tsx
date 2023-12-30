import Auth from '@/components/Auth/Auth'
import SessionWrapper from '@/components/Auth/SessionWrapper'
import AuthPageLayout from '@/components/Layouts/AuthPageLayout'

const LoginPage = () => {
    const ifSession = (
        <div className="text-xl text-white">
            Welcome to our site! You are logged in.
            <div className="my-12 flex justify-center gap-4">
                <a href="/">
                    <button className="rounded-full bg-white px-4 py-2 text-orange-950">
                        Find out More
                    </button>
                </a>
                <a href="/change-password">
                    <button className="rounded-full bg-white px-4 py-2 text-orange-950">
                        Change Password
                    </button>
                </a>
            </div>
        </div>
    )
    const notSession = (
        <div className="w-96 rounded-lg bg-orange-50 p-8">
            <Auth view="signIn" />
        </div>
    )
    return (
        <AuthPageLayout>
            <SessionWrapper ifSession={ifSession} notSession={notSession} />
        </AuthPageLayout>
    )
}

export default LoginPage
