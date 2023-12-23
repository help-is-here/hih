import { Navigation } from '@/components/Navigation/Navigation.tsx'
import { SidebarMobile } from '@/components/Resources/SidebarMobile.tsx'
import { H1 } from '@/components/Text/Headings.tsx'
import { SidebarDesktop } from '@/components/Resources/SidebarDesktop.tsx'
import { ResourceCard } from '@/components/Resources/ResourceCard'
import { defaultStaleTime, getResourcesWithTags } from '@/api/api'
import LoadingPage from '@/components/States/LoadingPage'
import ErrorPage from '@/components/States/ErrorPage'
import { useQuery } from 'react-query'

export const ResourcesPage = () => {
    const { isLoading, isError, data } = useQuery(
        'resources',
        getResourcesWithTags,
        {
            staleTime: defaultStaleTime,
        }
    )

    if (isLoading) return <LoadingPage />
    if (isError) return <ErrorPage />

    return (
        <div className="bg-orange-100">
            <Navigation />
            <H1 title="Resources" />
            <div className="flex flex-col md:container md:mx-auto md:flex-row md:px-4">
                <section>
                    <SidebarMobile className="block md:hidden" />
                    <SidebarDesktop className="hidden md:block" />
                </section>
                <section className="p-3 md:columns-1 md:overflow-auto lg:columns-2 xl:columns-3">
                    {data && data.data ? (
                        data.data.map((d: any) => {
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
