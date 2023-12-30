import client from '@/database/client'
import { Session } from '@supabase/supabase-js'
import { createContext, useEffect, useState } from 'react'
import { isExpired, decodeToken, reEvaluateToken } from 'react-jwt'

interface IAuthContext {
    userSession: Session | null
    refreshToken: string
    doLogout: () => void
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [userSession, setUserSession] = useState<Session | null>(null)

    useEffect(() => {
        client.auth.getSession().then(({ data }) => {
            if (data?.session && !isExpired(data.session.access_token)) {
                setUserSession(data.session)
            } else {
                setUserSession(null)
            }
        })

        const {
            data: { subscription },
        } = client.auth.onAuthStateChange((_event, session) => {
            setUserSession(session)
            console.log('session event: ', session)
        })

        return () => subscription.unsubscribe()
    }, [])

      const reValidateUser = () => {
          const newToken = 'A new JWT'
          reEvaluateToken(newToken) // decodedToken and isExpired will be updated
      }

    const doLogout = async () => {
        try {
            await client.auth.signOut()
        } catch (error) {
            console.error('Unable to log out user.', error)
        }
    }
    return (
        <AuthContext.Provider value={{ userSession, doLogout, refreshToken }}>
            {children}
        </AuthContext.Provider>
    )
}
