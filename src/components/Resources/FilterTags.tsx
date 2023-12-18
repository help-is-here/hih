import client from '@/database/client.tsx'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { QueryData } from '@supabase/supabase-js'
import { FilterMiniTag } from '@/components/Resources/FilterMiniTag.tsx'

export const FilterTags = ({
    setFilterTags,
}: {
    setFilterTags: Dispatch<SetStateAction<string[]>>
}) => {
    const tagsQuery = client.from('tags').select()
    type tagsType = QueryData<typeof tagsQuery>
    const [data, setData] = useState<tagsType>([])

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await tagsQuery
            if (error) throw error
            const resources: tagsType = data
            setData(resources)
        }
        fetchData()
    }, [])
    return (
        <>
            {data
                .sort((a, b) => {
                    return a.name
                        .toLowerCase()
                        .localeCompare(b.name.toLowerCase())
                })
                .map((d) => {
                    return (
                        <FilterMiniTag
                            title={d.name}
                            key={d.name}
                            setFilter={setFilterTags}
                        />
                    )
                })}
        </>
    )
}
