import { Navigation } from '@/components/Navigation/Navigation.tsx'
import { ResourceForm } from '@/components/Suggestion/SuggestForms.tsx'

export const SuggestionPage = () => {
    return (
        <>
            <Navigation />
            <div className="container mx-auto px-4 bg-orange-200 flex justify-center">
                <ResourceForm />
            </div>
        </>
    )
}
