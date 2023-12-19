import { Navigation } from '@/components/Navigation/Navigation.tsx'
import { ResourceForm } from '@/components/Suggestion/SuggestForms.tsx'

export const SuggestionPage = () => {
    return (
        <>
            <Navigation />
            <div className="container mx-auto flex justify-center bg-orange-200 px-4 py-8">
                <ResourceForm />
            </div>
        </>
    )
}
