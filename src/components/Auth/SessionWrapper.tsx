import client from '@/database/client'
import { useState, useEffect } from 'react'
import { Session } from '@supabase/supabase-js'

type TSessionWrapperProps = {
    ifSession: React.ReactNode
    notSession: React.ReactNode
}
const SessionWrapper = ({ ifSession, notSession }: TSessionWrapperProps) => {
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
    return <>{session ? ifSession : notSession}</>
}

export default SessionWrapper
