import { FilterButtons } from '@/components/Resources/FilterButtons.tsx'
import TagFilters from './TagFilters'

export const FilterPanel = (props: {
    onHeartedFilter: (payload: boolean) => void
    onTagsFilter: (payload: string[]) => void
}) => {
    const { onHeartedFilter, onTagsFilter } = props
    return (
        <div className="mx-8 h-full rounded bg-orange-950 p-3 md:w-[300px]">
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
