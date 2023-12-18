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
    const [isMain, setIsMain] = useState(false)
    const [isPrevent, setIsPrevent] = useState(false)
    const [isPrepare, setIsPrepare] = useState(false)
    const [isPredicament, setIsPredicament] = useState(false)
    const location = useLocation()
    useEffect(() => {
        switch (level) {
            case 'main':
                setIsMain(true)
                setIsPrevent(false)
                setIsPrepare(false)
                setIsPredicament(false)
                break
            case 'prevent':
                setIsMain(false)
                setIsPrevent(true)
                setIsPrepare(false)
                setIsPredicament(false)
                break
            case 'prepare':
                setIsMain(false)
                setIsPrevent(false)
                setIsPrepare(true)
                setIsPredicament(false)
                break
            case 'predicament':
                setIsMain(false)
                setIsPrevent(false)
                setIsPrepare(false)
                setIsPredicament(true)
                break
            default:
                setIsMain(true)
                setIsPrevent(false)
                setIsPrepare(false)
                setIsPredicament(false)
        }
    }, [location])
    return (
        <div className="relative w-screen min-h-screen bg-orange-50">
            <Navigation />
            {isMain && <PanicMain />}
            {isPrevent && <PanicPrevent />}
            {isPrepare && <PanicPrepare />}
            {isPredicament && <PanicPredicament />}
            <Footer />
        </div>
    )
}
