import { useState } from 'react'
import SimilarResources from './SimilarResources'
import { ResourceForm } from './SuggestForms'

export default function SuggestionsLayout() {
    const [text, setText] = useState('')

    return (
        <div className="container mx-auto flex gap-4 bg-orange-50 px-24 py-8">
            <ResourceForm onUpdate={(val: string) => setText(val)} />
            <SimilarResources text={text} />
        </div>
    )
}
