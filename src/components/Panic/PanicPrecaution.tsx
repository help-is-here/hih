import prepareImage from '@/assets/panic - prepare.svg'
import { H1, H2 } from '@/components/Text/Headings.tsx'
import PromptGenerator from './PromptGenerator'
import { FaTable } from 'react-icons/fa'
import ErrorPage from '../States/ErrorPage'
import { useQuery } from 'react-query'
import { defaultStaleTime, getFilteredResources } from '@/api/api'
import { ResourceCard } from '../Resources/ResourceCard'
import MasonryLayout from '../Resources/MasonryLayout'
import { Link } from 'react-router-dom'
import { precaution } from '@/data/prompts'

export const PanicPrecaution = () => {
    const { isLoading, isError, data } = useQuery(
        'filteredResourcesPrecaution',
        () => getFilteredResources(false, ['precaution']),
        {
            staleTime: defaultStaleTime,
        }
    )

    if (isLoading) {
        return <FaTable className="animate-spin" />
    }
    if (isError) {
        return <ErrorPage />
    }
    return (
        <div>
            <H1 title="Precaution" />

            <div className="mb-6 w-full text-center text-sm">
                Here are a few resources for you if you're feeling not-so-safe
                and need to talk to someone immediately
            </div>
            <div className="flex flex-col p-8 lg:flex-row">
                <div className="w-full">
                    <img src={prepareImage} alt="Prevention" />
                </div>
                <div className="w-full">
                    <PromptGenerator prompts={precaution} />
                    <div className="mt-4">
                        <MasonryLayout>
                            {data && data.data ? (
                                data.data
                                    .sort(
                                        (a, b) =>
                                            // @ts-expect-error: nested join typing problems
                                            Number(b.num_helped) -
                                            // @ts-expect-error: nested join typing problems
                                            Number(a.num_helped)
                                    )
                                    .slice(0, 3)
                                    .map((d) => (
                                        <ResourceCard
                                            // @ts-expect-error: nested join typing problems
                                            key={d.name}
                                            // @ts-expect-error: nested join typing problems
                                            resource={d}
                                        />
                                    ))
                            ) : (
                                <div>No resources available</div>
                            )}
                        </MasonryLayout>
                    </div>
                </div>
            </div>

            <div className="my-8 flex flex-col justify-center gap-8 bg-orange-800 px-4 py-8 md:flex-row">
                <Link
                    className="rounded-full bg-orange-300 px-8 py-4 text-center text-2xl hover:bg-orange-400 md:px-12 md:py-8 md:text-4xl "
                    to="/resources"
                >
                    See all resources
                </Link>
                <Link
                    className="rounded-full  bg-orange-300 px-8 py-4 text-center text-2xl hover:bg-orange-400 md:px-12 md:py-8 md:text-4xl "
                    to="/panic/predicament"
                >
                    I need a higher level of care
                </Link>
            </div>

            <H2 title="Other helpful resources" />
            <MasonryLayout>
                {data && data.data ? (
                    data.data
                        .sort(
                            (a, b) =>
                                // @ts-expect-error: nested join typing problems
                                Number(b.num_helped) - Number(a.num_helped)
                        )
                        .slice(3, data.data.length)
                        .map((d) => (
                            // @ts-expect-error: nested join typing problems
                            <ResourceCard key={d.name} resource={d} />
                        ))
                ) : (
                    <div>No resources available</div>
                )}
            </MasonryLayout>
        </div>
    )
}
