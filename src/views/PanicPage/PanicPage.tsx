import PageLayout from '@/components/Layouts/PageLayout'
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
                return <PanicPrevent />
            case 'precaution':
                return <PanicPrecaution />
            case 'predicament':
                return <PanicPredicament />
            default:
                return <PanicMain />
        }
    }, [level])
    return <PageLayout>{activePage}</PageLayout>
}
