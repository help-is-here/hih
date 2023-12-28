import { FilterButtons } from '@/components/Resources/FilterButtons.tsx'
import { Search } from '@/components/Resources/Search.tsx'
import { EFilters } from '@/types'

export const SidebarDesktop = (props: {
    className: string
    onFilter: (filterType: EFilters, payload: boolean) => void
}) => {
    const { className, onFilter } = props
    return (
        <div
            className={`w-[300px] bg-gray-100 p-3 ${className} h-full rounded`}
        >
            <Search />
            <FilterButtons
                onFilter={(filterType, filterPayload) =>
                    onFilter(filterType, filterPayload)
                }
            />
            <div className="my-3 font-bold text-slate-900">Filter Tags</div>
        </div>
    )
}
