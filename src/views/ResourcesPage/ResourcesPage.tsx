import { H1 } from '@/components/Text/Headings.tsx'
import { FilterPanel } from '@/components/Resources/FilterPanel'
import { ResourceCard } from '@/components/Resources/ResourceCard'
import { defaultStaleTime, getFilteredResources } from '@/api/api'
import LoadingPage from '@/components/States/LoadingPage'
import ErrorPage from '@/components/States/ErrorPage'
import { useQuery } from 'react-query'
import { useEffect, useState } from 'react'
import MasonryLayout from '@/components/Resources/MasonryLayout'
import PageLayout from '@/components/Layouts/PageLayout'
import { Search } from '@/components/Resources/Search'

export const ResourcesPage = () => {
    const [enableHeartQuery, setEnableHeartQuery] = useState(false)
    const [tagsFilters, setTagsFilters] = useState<string[]>([])
    const [search, setSearch] = useState('')

    const { isLoading, isError, data, refetch } = useQuery(
        'filteredResources',
        () => getFilteredResources(enableHeartQuery, tagsFilters, true, search),
        {
            staleTime: defaultStaleTime,
        }
    )

    useEffect(() => {
        const getData = setTimeout(() => {
            refetch()
        }, 750)
        return () => clearTimeout(getData)
    }, [enableHeartQuery, tagsFilters.length, refetch, search])

    const updateSearch = (val: string) => {
        if (val.trim()) {
            setSearch(val)
        }
    }

    if (isLoading) {
        return <LoadingPage />
    }
    if (isError) {
        return <ErrorPage />
    }
    return (
        <PageLayout>
            <H1 title="Resources" />
            <div className="mx-12 my-12 rounded-lg border border-2 border-solid border-orange-950 md:mx-48">
                <Search onSearch={(val: string) => updateSearch(val)} />
            </div>
            <div className="flex flex-col md:container md:mx-auto md:flex-row md:px-4">
                <section>
                    <FilterPanel
                        onHeartedFilter={(filter: boolean) =>
                            setEnableHeartQuery(filter)
                        }
                        onTagsFilter={(tagFilters) =>
                            setTagsFilters(tagFilters)
                        }
                    />
                </section>
                <MasonryLayout>
                    {data && data.data ? (
                        data.data.map((d: any) => {
                            return <ResourceCard resource={d} key={d.id} />
                        })
                    ) : (
                        <></>
                    )}
                </MasonryLayout>
            </div>
        </PageLayout>
    )
}
