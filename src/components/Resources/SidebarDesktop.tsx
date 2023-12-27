import { FilterButtons } from '@/components/Resources/FilterButtons.tsx'
import { Search } from '@/components/Resources/Search.tsx'
import TagFilters from './TagFilters'

export const SidebarDesktop = (props: {
    className: string
    onHeartedFilter: (payload: boolean) => void
    onTagsFilter: (payload: string[]) => void
}) => {
    const { className, onHeartedFilter, onTagsFilter } = props
    return (
        <div
            className={`w-[300px] bg-gray-100 p-3 ${className} h-full rounded`}
        >
            <Search />
            <FilterButtons
                onHeartedFilter={(filterPayload) =>
                    onHeartedFilter(filterPayload)
                }
            />
            <div className="my-3 font-bold text-slate-900">Filter Tags</div>
            <TagFilters onFilter={(filters) => onTagsFilter(filters)} />
        </div>
    )
}
