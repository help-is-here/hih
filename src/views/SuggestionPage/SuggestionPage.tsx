import { Footer } from '@/components/Footer/Footer'
import { Navigation } from '@/components/Navigation/Navigation.tsx'
import SuggestionsLayout from '@/components/Suggestion/SuggestionsLayout'

export const SuggestionPage = () => {
    return (
        <>
            <Navigation />
            <SuggestionsLayout />
            <Footer />
        </>
    )
}
