import { Navigation } from '../Navigation/Navigation'

type TAuthPageLayoutProps = {
    children: React.ReactNode
}

export default function AuthPageLayout({ children }: TAuthPageLayoutProps) {
    return (
        <>
            <Navigation />
            <div className="flex h-screen w-screen items-center justify-center bg-orange-950">
                {children}
            </div>
        </>
    )
}
