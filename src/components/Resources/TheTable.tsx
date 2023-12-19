// @ts-nocheck
import { useEffect, useMemo, useState } from 'react'
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
} from 'material-react-table'
import client from '@/database/client.tsx'
import { QueryData } from '@supabase/supabase-js'
import MiniTag from '@/components/Resources/MiniTag.tsx'

export const TheTable = () => {
    const resourcesQuery = client
        .from('resources')
        .select(
            `id, name, link, description, num_helped, tag_resource(id, tags(id,name))`
        )
    type ResourcesType = QueryData<typeof resourcesQuery>

    const [data, setData] = useState<ResourcesType[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await resourcesQuery
            if (error) throw error
            // @ts-ignore
            setData(data)
        }
        fetchData()
    }, [])
    console.log(data)
    const columns = useMemo<MRT_ColumnDef<ResourcesType>[]>(
        () => [
            {
                accessorFn: (resource) => {
                    return (
                        <a
                            href={resource.link}
                            className="rounded-full p-2 hover:bg-orange-500 hover:text-white"
                        >
                            {resource.name}
                        </a>
                    )
                },
                header: 'Name',
            },
            {
                accessorKey: 'description',
                header: 'Description',
                size: 700,
            },
            {
                accessorFn: (resource) => {
                    // @ts-ignore
                    return resource.tag_resource.map((tag) => (
                        <MiniTag key={tag.tags.name}>{tag.tags.name}</MiniTag>
                    ))
                },
                header: 'Tags',
            },
            {
                accessorKey: 'num_helped',
                header: 'Hearts',
                maxSize: 1,
            },
        ],
        []
    )

    //pass table options to useMaterialReactTable
    const table = useMaterialReactTable({
        columns,
        data,
        enableRowSelection: false, //enable some features
        enableColumnOrdering: false, //enable a feature for all columns
        enableGlobalFilter: true, //turn off a feature
    })

    //note: you can also pass table options as props directly to <MaterialReactTable /> instead of using useMaterialReactTable
    //but the useMaterialReactTable hook will be the most recommended way to define table options
    return <MaterialReactTable table={table} />
}
