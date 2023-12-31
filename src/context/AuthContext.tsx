import { defaultStaleTime, getUserAdmin } from '@/api/api'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import { useQuery } from 'react-query'

export type TAuthContext = {
    authenticated: boolean
    updateAuthenticated: (val: boolean) => void
    admin: boolean
    updateAdmin: (val: boolean) => void
}
export const AuthContext = createContext<TAuthContext>({} as TAuthContext)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [admin, setAdmin] = useState(false)
    const [authenticated, setAuthenticated] = useState(false)
    const { getItem, setItem } = useLocalStorage()

    const updateAdmin = (adminVal: boolean) => {
        setItem('admin', JSON.stringify(adminVal))
        setAdmin(adminVal)
    }
    const updateAuthenticated = (auth: boolean) => {
        refetch()
        setItem('authenticated', JSON.stringify(auth))
        setAdmin(auth)
    }
    useEffect(() => {
        const storageAdmin = getItem('admin')
        setAdmin(storageAdmin ? JSON.parse(storageAdmin) : '')
        const storageAuth = getItem('authenticated')
        setAuthenticated(storageAuth ? JSON.parse(storageAuth) : '')
    }, [getItem])

    const { data, refetch } = useQuery(['admin'], getUserAdmin, {
        enabled: false,
        staleTime: defaultStaleTime,
    })

    useEffect(() => {
        if (data && data.count && data.count > 0) {
            setItem('admin', JSON.stringify(true))
            setAdmin(true)
        } else if (data && data.count && data.count === 0) {
            setItem('admin', JSON.stringify(false))
            setAdmin(false)
        }
    }, [data, data?.count, setItem])

    return (
        <AuthContext.Provider
            value={{ authenticated, updateAuthenticated, admin, updateAdmin }}
        >
            {children}
        </AuthContext.Provider>
    )
}
