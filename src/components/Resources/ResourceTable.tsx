import { useEffect, useState } from 'react'
import { QueryData } from '@supabase/supabase-js'
import client from '@/database/client.tsx'
import { FaHeart } from 'react-icons/fa'
import { Tooltip } from 'flowbite-react'
import MiniTag from '@/components/Resources/MiniTag.tsx'

export default function ResourceTable({
    search,
    filterTags,
}: {
    search: string
    filterTags: string[]
}) {
    const resourcesQuery = client
        .from('resources')
        .select(
            `id, name, link, description, num_helped, tag_resource(id, tags(id,name))`
        )
    type ResourcesType = QueryData<typeof resourcesQuery>

    const [data, setData] = useState<ResourcesType>([])
    const [filteredData, setFilteredData] = useState<ResourcesType>([])

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await resourcesQuery
            if (error) throw error
            const resources: ResourcesType = data
            setData(resources)
            setFilteredData(resources)
        }
        fetchData()
    }, [])

    useEffect(() => {
        setFilteredData(
            data.filter(
                (item) =>
                    (search.length > 0 &&
                        item?.name
                            ?.toLowerCase()
                            .includes(search.toLowerCase())) ||
                    (search.length > 0 &&
                        item?.description
                            ?.toLowerCase()
                            .includes(search.toLowerCase())) ||
                    item?.tag_resource?.some((i) => {
                        return (
                            filterTags.length == 0 ||
                            filterTags.includes(i?.tags?.name || '')
                        )
                    })
            )
        )
    }, [search, filterTags])
    return (
        <table className="w-full bg-white rounded-lg">
            <thead className="border-solid border-0 border-b-8 border-orange-50 ">
                <tr>
                    <th className="text-left p-4">Resource</th>
                    <th className="text-left p-4">Description</th>
                    <th className="text-left p-4">Tags</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {filteredData.map((d) => {
                    return (
                        <tr
                            className="border-orange-50 hover:bg-gray-100"
                            key={d.name}
                        >
                            <td className="p-4 w-96">
                                <a
                                    className="text-orange-900 hover:underline"
                                    href={d.link || ''}
                                >
                                    {d.name}
                                </a>
                            </td>
                            <td className="p-4">{d.description}</td>
                            <td className="flex flex-wrap p-4 gap-1 w-48">
                                {d.tag_resource.map((item) => {
                                    return (
                                        <MiniTag key={item?.tags?.name}>
                                            {item?.tags?.name}
                                        </MiniTag>
                                    )
                                })}
                            </td>
                            <td className="text-xs p-4">
                                <Tooltip
                                    content={`This resource has helped ${d.num_helped} people`}
                                    animation="duration-1000"
                                    className="bg-gray-900 text-white dark:bg-gray-700"
                                    arrow={false}
                                >
                                    <span
                                        data-tooltip-target="tooltip-default"
                                        className="text-xs font-bold flex justify-end text-right"
                                    >
                                        {d.num_helped}
                                        <FaHeart className="ml-1 text-orange-500 " />
                                    </span>
                                </Tooltip>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
