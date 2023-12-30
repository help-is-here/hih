import { useRouteError } from 'react-router-dom'
import PageLayout from '@/components/Layouts/PageLayout'
import { H1 } from '@/components/Text/Headings'
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
                className="flex h-screen items-center justify-center text-center"
            >
                <H1 title="Oops!" />
                <div className="mx-8 h-32 border-e-4 border-gray-600"></div>
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
