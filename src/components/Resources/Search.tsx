import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

type TSearch = {
    onSearch: (val: string) => void
}
export const Search = ({ onSearch }: TSearch) => {
    const [search, setSearch] = useState('')

    return (
        <div className="relative flex items-center">
            <input
                type="text"
                placeholder="search"
                className="w-full rounded-lg border-none py-2 ps-8"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value)
                    onSearch(e.target.value)
                }}
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2">
                <FaSearch />
            </div>
        </div>
    )
}
