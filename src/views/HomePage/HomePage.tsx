import { IconNav } from '@/components/Home/IconNav.tsx'
import { About } from '@/components/Home/About.tsx'
import { CTA } from '@/components/Home/CTA.tsx'

export const HomePage = () => {
    return (
        <>
            <IconNav />
            <About />
            <CTA />
        </>
    )
}
