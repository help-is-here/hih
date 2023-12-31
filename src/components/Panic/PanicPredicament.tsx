import predicamentImage from '@/assets/panic - predicament.svg'
import { H1, H2 } from '@/components/Text/Headings.tsx'
import PromptGenerator from './PromptGenerator'
import { FaTable } from 'react-icons/fa'
import ErrorPage from '../States/ErrorPage'
import { useQuery } from 'react-query'
import { defaultStaleTime, getFilteredResources } from '@/api/api'
import { ResourceCard } from '../Resources/ResourceCard'
import MasonryLayout from '../Resources/MasonryLayout'
import { Link } from 'react-router-dom'
import DecideModal from './DecideModal'
import { useState } from 'react'
import { predicament } from '@/data/prompts'

export const PanicPredicament = () => {
    const [openModal, setOpenModal] = useState(false)
    const { isLoading, isError, data } = useQuery(
        'filteredResourcesPrecaution',
        () => getFilteredResources(false, ['predicament']),
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
            <H1 title="Predicament" />

            <div className="mb-6 w-full text-center text-sm">
                Here are a few resources for you if you're in crisis and need
                medical attention
            </div>
            <div className="flex flex-col p-8 lg:flex-row">
                <div className="w-full">
                    <img src={predicamentImage} alt="Prevention" />
                </div>
                <div className="w-full">
                    <div className="text-center text-4xl">
                        Please consider calling your country's emergency number.
                    </div>
                    <div className="my-2 text-center text-xs text-gray-500">
                        In the US, use the below button.
                    </div>
                    <div className="my-4 flex w-full justify-center">
                        <a
                            href="tel:911"
                            className="rounded-full bg-orange-500 px-12 py-8 text-8xl text-white"
                        >
                            911
                        </a>
                    </div>
                    <a
                        className="mb-4 block w-full text-center underline"
                        href="https://en.wikipedia.org/wiki/List_of_emergency_telephone_numbers"
                    >
                        Other Emergency Numbers
                    </a>
                    <PromptGenerator prompts={predicament} />
                </div>
            </div>

            <div className="my-8 flex flex-col justify-center gap-8 bg-orange-800 px-4 py-8 md:flex-row">
                <Link
                    className="rounded-full bg-orange-300 px-8 py-4 text-center text-2xl hover:bg-orange-400 md:px-12 md:py-8 md:text-4xl "
                    to="/resources"
                >
                    See all resources
                </Link>
                <button
                    onClick={() => setOpenModal(true)}
                    className="rounded-full  bg-orange-300 px-8 py-4 text-center text-2xl hover:bg-orange-400 md:px-12 md:py-8 md:text-4xl "
                >
                    Help me decide
                </button>
            </div>

            <H2 title="Other helpful resources" />
            <MasonryLayout>
                {data && data.data ? (
                    data.data.map((d) => (
                        // @ts-expect-error: nested join typing problems
                        <ResourceCard key={d.name} resource={d} />
                    ))
                ) : (
                    <div>No resources available</div>
                )}
            </MasonryLayout>
            <DecideModal
                openModal={openModal}
                onClose={() => setOpenModal(false)}
            />
        </div>
    )
}
