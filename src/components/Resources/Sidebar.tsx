import { Search } from '@/components/Resources/Search.tsx'
import { FilterButtons } from '@/components/Resources/FilterButtons.tsx'

export const Sidebar = () => {
    return (
        <div className="w-full rounded bg-gray-200 p-4 drop-shadow-2xl">
            <Search />
            <FilterButtons />
        </div>
    )
}
