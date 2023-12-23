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
import client from './database/client.tsx'
import AdminPage from './views/AdminPage/AdminPage.tsx'
import { ResourcesPage } from './views/ResourcesPage/ResourcesPage.tsx'

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
        loader: async () => {
            return await client
                .from('resources')
                .select(
                    'id, name, description, num_helped, link, in_review, tag_resource(...tags(name))'
                )
        },
    },
    {
        path: '/resources',
        element: <ResourcesPage />,
        loader: async () => {
            return await client
                .from('resources')
                .select(
                    'id, name, description, num_helped, link, in_review, tag_resource(...tags(name))'
                )
        },
    },
    {
        path: '/panic',
        element: <PanicPage />,
    },

    {
        // level: prevent | prepare | predicament
        path: '/panic/:level',
        element: <PanicPage />,
        loader: async () => {
            return await client.from('resources').select()
        },
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
