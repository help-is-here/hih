import { useRouteError } from 'react-router-dom'
import PageLayout from '@/components/Layouts/PageLayout'
type TError = {
    statusText: string
    message: string
}

export default function NotFoundPage() {
    const error = useRouteError() as TError
    console.error(error)

    return (
        <PageLayout>
            <div
                id="error-page"
                className="flex h-screen flex-wrap items-center justify-center p-8 text-center"
            >
                <h1 className="text-4xl md:text-8xl">Oops!</h1>
                <div className="mx-4 h-32 border-b-2 border-gray-600 sm:mx-8 sm:block sm:border-e-2"></div>
                <p>Sorry, an unexpected error has occurred.</p>
                {error && (
                    <p>
                        <i>{error?.statusText || error?.message}</i>
                    </p>
                )}
            </div>
        </PageLayout>
    )
}
