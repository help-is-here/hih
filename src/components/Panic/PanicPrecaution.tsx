import prepareImage from '@/assets/panic - prepare.svg'
import { H1 } from '@/components/Text/Headings.tsx'
import PromptGenerator from './PromptGenerator'
import { ResourceCard } from '../Resources/ResourceCard'

export const PanicPrecaution = () => {
    return (
        <div className="p-12">
            <H1 title="Precaution" />
            <div className="text-gray mb-6 w-full text-center text-sm">
                Here are a few resources for you if you're feeling safe but
                still need to reach out to someone
            </div>
            <div className="flex">
                <div className="flex w-full flex-col items-center justify-center p-8">
                    <img src={prepareImage} alt="Precaution" width="320rem" />
                </div>
                <div className="w-full">
                    <PromptGenerator />
                </div>
                <div>
                    {resources.map((r) => {
                        return <ResourceCard resource={r} />
                    })}
                </div>
            </div>
        </div>
    )
}
