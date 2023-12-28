import { Navigation } from '@/components/Navigation/Navigation.tsx'
import { SidebarMobile } from '@/components/Resources/SidebarMobile.tsx'
import { H1 } from '@/components/Text/Headings.tsx'
import { SidebarDesktop } from '@/components/Resources/SidebarDesktop.tsx'
import { ResourceCard } from '@/components/Resources/ResourceCard'
import {
    defaultStaleTime,
    getResourcesWithTags,
    getUserHearted,
} from '@/api/api'
import LoadingPage from '@/components/States/LoadingPage'
import ErrorPage from '@/components/States/ErrorPage'
import { useQuery } from 'react-query'
import { useEffect, useState } from 'react'
import { EFilters, IResource } from '@/types'

export const ResourcesPage = () => {
    const [enableHeartQuery, setEnableHeartQuery] = useState(false)
    const [filtered, setFiltered] = useState<IResource[]>([])

    const { isLoading, isError, data } = useQuery(
        'resources',
        getResourcesWithTags,
        {
            staleTime: defaultStaleTime,
        }
    )
    const heartedQuery = useQuery('userHearted', getUserHearted, {
        enabled: enableHeartQuery,
        staleTime: defaultStaleTime,
    })

    const handleFilters = (filterType: EFilters, filterPayload: boolean) => {
        switch (filterType) {
            case EFilters.Hearted:
                setEnableHeartQuery(filterPayload)
        }
    }

    useEffect(() => {
        if (enableHeartQuery && heartedQuery && heartedQuery.data) {
            // @ts-expect-error: Same ol thing with nested join types
            setFiltered(heartedQuery.data.data.map((r) => r.resource_id))
        } else if (data && data.data) {
            // @ts-expect-error: Same ol thing with nested join types
            setFiltered(data.data)
        }
    }, [enableHeartQuery, heartedQuery, data])

    if (heartedQuery.isLoading || isLoading) {
        return <LoadingPage />
    }
    if (heartedQuery.isError || isError) {
        return <ErrorPage />
    }
    return (
        <div className="bg-orange-100">
            <Navigation />
            <H1 title="Resources" />
            <div className="flex flex-col md:container md:mx-auto md:flex-row md:px-4">
                <section>
                    <SidebarMobile className="block md:hidden" />
                    <SidebarDesktop
                        className="hidden md:block"
                        onFilter={(filterType, filterPayload) =>
                            handleFilters(filterType, filterPayload)
                        }
                    />
                </section>
                <section className="p-3 md:columns-1 md:overflow-auto lg:columns-2 xl:columns-3">
                    {filtered ? (
                        filtered.map((d: any) => {
                            return <ResourceCard resource={d} key={d.id} />
                        })
                    ) : (
                        <></>
                    )}
                </section>
            </div>
        </div>
    )
}
