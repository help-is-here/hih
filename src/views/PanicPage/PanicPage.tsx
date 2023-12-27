import { Footer } from '@/components/Footer/Footer.tsx'
import { Navigation } from '@/components/Navigation/Navigation.tsx'
import { PanicMain } from '@/components/Panic/PanicMain.tsx'
import { PanicPredicament } from '@/components/Panic/PanicPredicament.tsx'
import { PanicPrecaution } from '@/components/Panic/PanicPrecaution'
import { PanicPrevent } from '@/components/Panic/PanicPrevent.tsx'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

export const PanicPage = () => {
    const { level = 'main' } = useParams<{ level: string }>()

    const activePage = useMemo(() => {
        switch (level) {
            case 'prevent':
                return <PanicPrecaution />
            case 'prepare':
                return <PanicPrevent />
            case 'predicament':
                return <PanicPredicament />
            default:
                return <PanicMain />
        }
    }, [level])
    return (
        <div className="relative min-h-screen w-screen bg-orange-50">
            <Navigation />
            {activePage}
            <Footer />
        </div>
    )
}
