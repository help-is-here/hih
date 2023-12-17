import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFoundPage from '@/views/ErrorPage/NotFoundPage.tsx'
import { SuggestionPage } from '@/views/SuggestionPage/SuggestionPage.tsx'
import LoginPage from '@/views/AuthPages/LoginPage.tsx'
import ChangePasswordPage from '@/views/AuthPages/ChangePasswordPage.tsx'
import { ResourcesPage } from '@/views/ResourcesPage/ResourcesPage.tsx'

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
        path: '/resources',
        element: <ResourcesPage />,
    },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
