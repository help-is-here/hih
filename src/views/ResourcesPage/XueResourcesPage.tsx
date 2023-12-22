import { Navigation } from '@/components/Navigation/Navigation.tsx'
import { SidebarMobile } from '@/components/Resources/SidebarMobile.tsx'
import { H1 } from '@/components/Text/Headings.tsx'
import { Card } from '@/components/Resources/Card.tsx'
import client from '@/database/client.tsx'
import { QueryData } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { SidebarDesktop } from '@/components/Resources/SidebarDesktop.tsx'

export const XueResourcesPage = () => {
    // Getting the data
    const resourcesQuery = client
        .from('resources')
        .select(
            'id, name, description, num_helped, link, tag_resource(...tags(name))'
        )
    type TResourcesType = QueryData<typeof resourcesQuery>

    const [data, setData] = useState<TResourcesType>([])
    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await resourcesQuery
            if (error) {
                throw error
            }
            const resources: TResourcesType = data
            setData(resources)
        }
        fetchData()
    }, [resourcesQuery])
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
                    {data.map((d: any) => {
                        return (
                            <Card
                                title={d.name}
                                description={d.description}
                                numHearted={d.num_helped}
                                link={d.link}
                                tags={d.tag_resource.map((tag: any) => {
                                    return tag.name
                                })}
                                key={d.id}
                            />
                        )
                    })}
                </section>
            </div>
        </div>
    )
}
