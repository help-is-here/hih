import { defaultStaleTime, textSearchResources } from '@/api/api'
import { H2 } from '../Text/Headings'
import { FaTag } from 'react-icons/fa'
import { ResourceCard } from '../Resources/ResourceCard'
import { useQuery } from 'react-query'
import { IResource } from '@/types'
import { useEffect } from 'react'

type TSimilarResources = {
    text: string
}

export default function SimilarResources({ text }: TSimilarResources) {
    const { isLoading, isError, data, refetch } = useQuery(
        'similar',
        () => textSearchResources(text),
        {
            staleTime: defaultStaleTime,
        }
    )

    useEffect(() => {
        let getData: string | number | NodeJS.Timeout | undefined
        if (text.trim()) {
            getData = setTimeout(() => {
                refetch()
            }, 2000)
        }

        return () => clearTimeout(getData)
    }, [text, refetch])

    if (isLoading) {
        return <FaTag className="animate-spin" />
    }
    if (isError) {
        return <div>Oops, an error occured</div>
    }
    return (
        <div className="w-full">
            <H2 title="Is this what you're looking for?" />
            {data && data.data && data.data.length ? (
                data.data.map((r: IResource) => <ResourceCard resource={r} />)
            ) : (
                <div>No matching resources found</div>
            )}
        </div>
    )
}
