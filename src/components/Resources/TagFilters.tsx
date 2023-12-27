import { useQuery } from 'react-query'
import { getTags, defaultStaleTime } from '@/api/api'
import ErrorPage from '../States/ErrorPage'
import { FaTag } from 'react-icons/fa'
import { useState } from 'react'
import ToggleTag from './ToggleTag'

type TTagFilters = {
    onFilter: (filters: string[]) => void
}
export default function TagFilters({ onFilter }: TTagFilters) {
    const [filters, updateFilters] = useState<string[]>([])
    const { isLoading, isError, data } = useQuery(['tags'], getTags, {
        staleTime: defaultStaleTime,
    })
    const addFilter = (tagName: string) => {
        updateFilters([...filters, tagName])
        onFilter([...filters, tagName])
    }
    const removeFilter = (tagName: string) => {
        const temp = [...filters]
        temp.splice(temp.indexOf(tagName), 1)
        console.log(temp)
        updateFilters(temp)
        onFilter(temp)
    }

    if (isLoading) {
        return <FaTag className="animate-spin" />
    }
    if (isError) {
        return <ErrorPage />
    }
    return (
        <div className="flex flex-wrap gap-2">
            {data && data.data ? (
                data.data
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((d) => (
                        <ToggleTag
                            key={d.name}
                            // @ts-expect-error: typing for inner joins doesn't work in supabase
                            tagData={d}
                            onToggle={(toggled) => {
                                toggled
                                    ? addFilter(d.name)
                                    : removeFilter(d.name)
                            }}
                        />
                    ))
            ) : (
                <span>No tags available</span>
            )}
        </div>
    )
}
