import { Auth } from '@supabase/auth-ui-react'
import client from '@/database/client'
import { Navigation } from '@/components/Navigation/Navigation'
import { useState, useEffect } from 'react'
import { Session } from '@supabase/supabase-js'
import { customTheme } from './AuthTheme'

const LoginPage = () => {
    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
        client.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        const {
            data: { subscription },
        } = client.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])
    return (
        <>
            <Navigation />
            <div className="w-screen h-screen flex justify-center items-center bg-orange-950">
                {session ? (
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
                ) : (
                    <div className="text-xl text-white">
                        Welcome to our site! You are already logged in.
                        <div className="flex justify-center my-12">
                            <button className="bg-white text-orange-950 rounded-full px-4 py-2">
                                Change Password
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default LoginPage
