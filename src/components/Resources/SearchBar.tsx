// TODO: Implement search bar
/* eslint-disable @typescript-eslint/no-unused-vars */
import client from '@/database/client'
import { useEffect, useState } from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import '../../index.css'

export const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState<string>('')

    // TODO: Define type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [items, setItems] = useState<any>([])
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
