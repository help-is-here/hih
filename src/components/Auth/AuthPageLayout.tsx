import { Footer } from '../Footer/Footer'
import { Navigation } from '../Navigation/Navigation'

type AuthPageLayoutProps = {
    children: React.ReactNode
}

export default function AuthPageLayout({ children }: AuthPageLayoutProps) {
    return (
        <>
            <Navigation />
            <div className="flex h-screen w-screen items-center justify-center bg-orange-950">
                {children}
            </div>
            <Footer />
        </>
    )
}
