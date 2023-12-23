import client from '@/database/client'
import { useEffect, useState } from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import '../../index.css'
import { IResource } from '@/types'

export const SearchBar = () => {
    const [searchQuery] = useState<string>('')

    // TODO: Define type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [items] = useState<IResource[]>([])
    const resourcesQuery = client.from('resources').select()

    useEffect(() => {
        const fetchData = async () => {
            // TODO: Fetch new resources that match searchQuery from user input
            // const { data, error } = await resourcesQuery
            // if (error) throw error
            // setItems(data?.resources || [])
        }
        fetchData()
    }, [searchQuery, resourcesQuery])

    return <ReactSearchAutocomplete items={items} />
}
