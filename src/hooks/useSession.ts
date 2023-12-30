import client from '@/database/client'
import { AuthError, Session } from '@supabase/supabase-js'
import { SetStateAction, useEffect, useState } from 'react'

function useSession() {
    const [session, setSession] = useState<Session | null>(null) as [
        Session | null,
        React.Dispatch<SetStateAction<Session | null>>,
    ]

    const doSignOut = async () => {
        try {
            await client.auth.signOut()
            setSession(null)
        } catch (error) {
            console.error('Error logging out:', error)
        }
    }

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const response: {
                    data: { session: Session | null }
                    error: AuthError | null
                } = await client.auth.getSession()

                if (response?.data?.session) {
                    console.log('session', response.data.session)
                    setSession(response.data.session)
                }
            } catch (error) {
                console.error('Error fetching session:', error)
            }
        }

        fetchSession()

        return () => {
            const cleanup = async () => {
                const {
                    data: { subscription },
                } = await client.auth.onAuthStateChange((event, session) => {
                    console.log(event, session)
                })
                // console.log('onAuthStateChange', session)
                // setSession(session)
                // return session
                subscription.unsubscribe()
            }

            cleanup()
        }
    }, [])

    return [session, doSignOut]
}

export default useSession
