import { Navigation } from '../Navigation/Navigation'
import { Footer } from '../Footer/Footer'
import React from 'react'

type THomeLayout = {
    children: React.ReactNode
}
export default function HomeLayout({ children }: THomeLayout) {
    return (
        <>
            <Navigation />
            <div className="flex min-h-screen w-full justify-center bg-orange-50">
                <div className="w-page">{children}</div>
            </div>
            <Footer />
        </>
    )
}
