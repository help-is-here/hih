import { useQuery } from 'react-query'
import { getTags, defaultStaleTime } from '@/api/api'
import ErrorPage from '../States/ErrorPage'
import { FaTag } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import ToggleTag from './ToggleTag'
import { Search } from './Search'
import { ITag } from '@/types'

type TTagFilters = {
    onFilter: (filters: string[]) => void
}
export default function TagFilters({ onFilter }: TTagFilters) {
    const [filters, updateFilters] = useState<string[]>([])
    const [filteredTags, setFilteredTags] = useState<ITag[]>([])
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
        updateFilters(temp)
        onFilter(temp)
    }
    const searched = (val: string) => {
        if (val.trim()) {
            setFilteredTags(
                // @ts-expect-error: supabase join typing problems
                data && data.data
                    ? data?.data.filter((t) => t.name.includes(val))
                    : []
            )
        } else {
            // @ts-expect-error: supabase join typing problems
            setFilteredTags(data && data.data ? data?.data : [])
        }
    }

    useEffect(() => {
        // @ts-expect-error: supabase join typing problems
        setFilteredTags(data && data.data ? data?.data : [])
    }, [data])

    if (isLoading) {
        return <FaTag className="animate-spin" />
    }
    if (isError) {
        return <ErrorPage />
    }
    return (
        <div className="flex flex-col gap-2">
            <Search onSearch={(val) => searched(val)} />
            <div className="flex flex-wrap gap-2">
                {filteredTags
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((d) => (
                        <ToggleTag
                            key={d.name}
                            tagData={d}
                            onToggle={(toggled) => {
                                toggled
                                    ? addFilter(d.name)
                                    : removeFilter(d.name)
                            }}
                        />
                    ))}
            </div>
        </div>
    )
}
