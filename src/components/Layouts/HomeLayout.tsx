import { Navigation } from '../Navigation/Navigation'
import { Footer } from '../Footer/Footer'
import React from 'react'
import { HeroImage } from '../Home/HeroImage'

type THomeLayout = {
    children: React.ReactNode
}
export default function HomeLayout({ children }: THomeLayout) {
    return (
        <>
            <Navigation />
            <HeroImage />
            <div className="flex justify-center bg-orange-50">
                <div className="w-page">{children}</div>
            </div>
            <Footer />
        </>
    )
}
