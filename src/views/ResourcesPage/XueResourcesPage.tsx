import { Navigation } from '@/components/Navigation/Navigation.tsx'
import { Sidebar } from '@/components/Resources/Sidebar.tsx'
import { H1 } from '@/components/Text/Headings.tsx'
import { Card } from '@/components/Resources/Card.tsx'
import client from '@/database/client.tsx'
import { QueryData } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

export const XueResourcesPage = () => {
    // Getting the data
    const resourcesQuery = client
        .from('resources')
        .select(
            'id, name, description, num_helped, link, tag_resource(...tags(name))'
        )
    type ResourcesType = QueryData<typeof resourcesQuery>

    const [data, setData] = useState<ResourcesType>([])
    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await resourcesQuery
            if (error) throw error
            const resources: ResourcesType = data
            setData(resources)
        }
        fetchData()
    }, [])
    return (
        <div className="bg-orange-100">
            <Navigation />
            <H1 title="Resources" />
            <section>
                <Sidebar />
            </section>
            <section>
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
    )
}
