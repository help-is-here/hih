import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFoundPage from '@/views/ErrorPage/NotFoundPage.tsx'
import { SuggestionPage } from '@/views/SuggestionPage/SuggestionPage.tsx'
import LoginPage from '@/views/AuthPages/LoginPage.tsx'
import ChangePasswordPage from '@/views/AuthPages/ChangePasswordPage.tsx'
import { PanicPage } from '@/views/PanicPage/PanicPage.tsx'
import ContactPage from './views/ContactPage/ContactPage.tsx'
import AdminPage from './views/AdminPage/AdminPage.tsx'
import { ResourcesPage } from './views/ResourcesPage/ResourcesPage.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AuthProvider } from './context/AuthContext.tsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <NotFoundPage />,
    },
    {
        path: '/login',
        element: <LoginPage />,
        errorElement: <NotFoundPage />,
    },
    {
        path: '/change-password',
        element: <ChangePasswordPage />,
        errorElement: <NotFoundPage />,
    },
    {
        path: '/suggest',
        element: <SuggestionPage />,
    },
    {
        path: '/admin',
        element: <AdminPage />,
    },
    {
        path: '/contact',
        element: <ContactPage />,
    },
    {
        path: '/resources',
        element: <ResourcesPage />,
    },
    {
        path: '/panic',
        element: <PanicPage />,
    },

    {
        // level: prevent | prepare | predicament
        path: '/panic/:level',
        element: <PanicPage />,
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
])

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </AuthProvider>
    </React.StrictMode>
)
