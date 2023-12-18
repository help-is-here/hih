import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import '../../index.css'
import client from '@/database/client.tsx'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { QueryData } from '@supabase/supabase-js'

export const SearchBar = ({
    setSearch,
}: {
    setSearch: Dispatch<SetStateAction<string>>
}) => {
    const resourcesQuery = client.from('resources').select()
    type ResourcesType = QueryData<typeof resourcesQuery>
    const [items, setItems] = useState<any>()
    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await resourcesQuery
            if (error) throw error
            const resources: ResourcesType = data
            setItems(resources)
        }
        fetchData()
    }, [])
    return (
        <ReactSearchAutocomplete
            items={items}
            onSearch={(keyword) => {
                setSearch(keyword)
            }}
        />
    )
}
