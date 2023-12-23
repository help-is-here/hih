import TagSection from '@/components/TagSection.tsx'
import client from '@/database/client'
import { Tooltip } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { FaHeart, FaSun } from 'react-icons/fa'
import { useLoaderData } from 'react-router-dom'
import SessionWrapper from '../Auth/SessionWrapper'

export interface IResource {
    id: number
    name: string
    description: string
    link: string
    num_helped: number
}

export default function ResourceTable() {
    const { data = [] } = useLoaderData() as { data: IResource[] }
    const [tableData, setTableData] = useState<IResource[]>([] as IResource[])

    // TODO: Pass this responsibility to a context provider so we can reduce calls on panic pages where table is rendered
    useEffect(() => {
        const fetchResources = async () => {
            try {
                const resourcesQuery = client.from('resources').select()
                const { data, error } = await resourcesQuery
                if (error) {
                    throw error
                }
                const resources = data as IResource[]
                setTableData(resources)
            } catch (error) {
                console.error('unable to fetch resources', error)
            }
        }

        if (data.length === 0 || tableData.length === 0) {
            fetchResources()
        }
    }, [tableData.length, data.length])

    const favorite = async (row: Resource) => {
        const new_helped = row.num_helped + 1
        const idx = data.map((o) => o.id).indexOf(row.id)
        const temp = [...data]
        temp[idx].num_helped = new_helped
        setTableData([...temp])
        await client
            .from('resources')
            .update({ num_helped: new_helped })
            .eq('id', row.id)
    }
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
                {tableData.length > 0 &&
                    tableData.map((d) => {
                        return (
                            <tr
                                className="border-orange-50 hover:bg-gray-100"
                                key={d.name}
                            >
                                <td className="w-96 p-4">
                                    <a
                                        className="text-orange-900 hover:underline"
                                        href={d.link}
                                        rel="noreferrer noopener"
                                        target="_blank"
                                    >
                                        {d.name}
                                    </a>
                                </td>
                                <td className="p-4">{d.description}</td>
                                <td className="flex w-48 flex-wrap gap-1 p-4">
                                    <TagSection resourceId={d.id} />
                                </td>
                                <td className="w-32 p-4 text-xs">
                                    <Tooltip
                                        content={
                                            d.num_helped
                                                ? `This resource has helped ${d.num_helped} people`
                                                : `New resource`
                                        }
                                        animation="duration-1000"
                                        className="bg-gray-900 text-white dark:bg-gray-700"
                                        arrow={false}
                                    >
                                        <span
                                            data-tooltip-target="tooltip-default"
                                            className="flex justify-end text-right text-xs font-bold"
                                        >
                                            {' '}
                                            <span>
                                                {d.num_helped ? (
                                                    `Helped ${d.num_helped}`
                                                ) : (
                                                    <div className="flex items-center">
                                                        <FaSun className="ml-1 text-orange-500" />{' '}
                                                        New!
                                                    </div>
                                                )}
                                            </span>
                                            <SessionWrapper
                                                ifSession={
                                                    <button
                                                        onClick={async () =>
                                                            await favorite(d)
                                                        }
                                                    >
                                                        <FaHeart className="ml-1 text-orange-500 " />
                                                    </button>
                                                }
                                                notSession={<></>}
                                            />
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
