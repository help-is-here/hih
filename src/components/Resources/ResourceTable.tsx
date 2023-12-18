import { useEffect, useState } from 'react'
import { QueryData } from '@supabase/supabase-js'
import client from '@/database/client.tsx'
import TagSection from '@/components/TagSection.tsx'
import { FaHeart } from 'react-icons/fa'
import { Tooltip } from 'flowbite-react'

export default function ResourceTable() {
    const resourcesQuery = client.from('resources').select()
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
        <table className="w-full rounded-lg bg-white">
            <thead className="border-0 border-b-8 border-solid border-orange-50 ">
                <tr>
                    <th className="p-4 text-left">Resource</th>
                    <th className="p-4 text-left">Description</th>
                    <th className="p-4 text-left">Tags</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.map((d) => {
                    return (
                        <tr
                            className="border-orange-50 hover:bg-gray-100"
                            key={d.name}
                        >
                            <td className="w-96 p-4">
                                <a
                                    className="text-orange-900 hover:underline"
                                    href={d.link}
                                >
                                    {d.name}
                                </a>
                            </td>
                            <td className="p-4">{d.description}</td>
                            <td className="flex w-48 flex-wrap gap-1 p-4">
                                <TagSection resourceId={d.id} />
                            </td>
                            <td className="p-4 text-xs">
                                <Tooltip
                                    content={`This resource has helped ${d.num_helped} people`}
                                    animation="duration-1000"
                                    className="bg-gray-900 text-white dark:bg-gray-700"
                                    arrow={false}
                                >
                                    <span
                                        data-tooltip-target="tooltip-default"
                                        className="flex justify-end text-right text-xs font-bold"
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
