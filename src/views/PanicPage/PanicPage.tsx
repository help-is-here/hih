import { Footer } from '@/components/Footer/Footer.tsx'
import { Navigation } from '@/components/Navigation/Navigation.tsx'
import { PanicMain } from '@/components/Panic/PanicMain.tsx'
import { useEffect, useState } from 'react'
import { PanicPredicament } from '@/components/Panic/PanicPredicament.tsx'
import { PanicPrepare } from '@/components/Panic/PanicPrepare.tsx'
import { PanicPrevent } from '@/components/Panic/PanicPrevent.tsx'
import { useLocation } from 'react-router-dom'

export const PanicPage = (props: { level: string }) => {
    const { level } = props
    const [activePage, setActivePage] = useState(<PanicMain />)
    const location = useLocation()
    useEffect(() => {
        switch (level) {
            case 'main':
                setActivePage(<PanicMain />)
                break
            case 'prevent':
                setActivePage(<PanicPrevent />)
                break
            case 'prepare':
                setActivePage(<PanicPrepare />)
                break
            case 'predicament':
                setActivePage(<PanicPredicament />)
                break
            default:
                setActivePage(<PanicMain />)
        }
    }, [location])
    return (
        <div className="relative w-screen min-h-screen bg-orange-50">
            <Navigation />
            {activePage}
            <Footer />
        </div>
    )
}
