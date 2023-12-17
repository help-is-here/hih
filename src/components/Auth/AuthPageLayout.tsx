import { Navigation } from '../Navigation/Navigation'

type AuthPageLayoutProps = {
    children: React.ReactNode
}

export default function AuthPageLayout({ children }: AuthPageLayoutProps) {
    return (
        <>
            <Navigation />
            <div className="w-screen h-screen flex justify-center items-center bg-orange-950">
                {children}
            </div>
        </>
    )
}
