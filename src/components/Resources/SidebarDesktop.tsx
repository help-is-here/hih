import { FilterButtons } from '@/components/Resources/FilterButtons.tsx'
import TagFilters from './TagFilters'

export const SidebarDesktop = (props: {
    className: string
    onHeartedFilter: (payload: boolean) => void
    onTagsFilter: (payload: string[]) => void
}) => {
    const { className, onHeartedFilter, onTagsFilter } = props
    return (
        <div
            className={`w-[300px] bg-orange-950 p-3 ${className} h-full rounded`}
        >
            <FilterButtons
                onHeartedFilter={(filterPayload) =>
                    onHeartedFilter(filterPayload)
                }
            />
            <div className="my-3 font-bold text-white">Filter Tags</div>
            <TagFilters onFilter={(filters) => onTagsFilter(filters)} />
        </div>
    )
}
