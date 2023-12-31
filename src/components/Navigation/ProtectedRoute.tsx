import { AuthContext } from '@/context/AuthContext'
import { useContext } from 'react'
import { Outlet, useNavigate } from 'react-router'

export default function ProtectedRoute() {
    const navigate = useNavigate()
    const { authenticated } = useContext(AuthContext)
    if (!authenticated) {
        navigate('/login')
    }
    return <Outlet />
}
