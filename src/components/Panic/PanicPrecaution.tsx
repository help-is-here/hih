import prepareImage from '@/assets/panic - prepare.svg'
import { H1 } from '@/components/Text/Headings.tsx'
import PromptGenerator from './PromptGenerator'
import { ResourceCard } from '../Resources/ResourceCard'
import LoadingPage from '../States/LoadingPage'
import ErrorPage from '../States/ErrorPage'
import { IResource } from '@/types'
import { defaultStaleTime, getPrecautionResources } from '@/api/api'
import { useQuery } from 'react-query'

export const PanicPrecaution = () => {
    const { isLoading, isError, data } = useQuery(
        ['resources'],
        getPrecautionResources,
        {
            staleTime: defaultStaleTime,
        }
    )

    if (isLoading) {
        return <LoadingPage />
    }
    if (isError) {
        return <ErrorPage />
    }
    return (
        <div className="p-12">
            <H1 title="Precaution" />
            <div className="text-gray mb-6 w-full text-center text-sm">
                Here are a few resources for you if you're feeling safe but
                still need to reach out to someone
            </div>
            <div className="align-start flex">
                <div className="align-start flex w-full flex-col items-center justify-center p-8">
                    <img src={prepareImage} alt="Precaution" width="320rem" />
                </div>
                <div className="flex w-full flex-col gap-4">
                    <PromptGenerator />
                    <div className="flex flex-col gap-2 md:flex-row">
                        {data && data.data ? (
                            // @ts-ignore-error: join type problems
                            data.data[0].tag_resource.map((r: IResource) => {
                                return <ResourceCard resource={r} />
                            })
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
