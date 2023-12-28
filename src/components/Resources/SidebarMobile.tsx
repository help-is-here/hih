import { Search } from '@/components/Resources/Search.tsx'
import { FilterButtons } from '@/components/Resources/FilterButtons.tsx'

export const SidebarMobile = (props: { className: string }) => {
    const { className } = props
    return (
        <div
            className={`w-full rounded bg-gray-200 p-4 drop-shadow-2xl ${className}`}
        >
            <Search />
            <FilterButtons onHeartedFilter={() => {}} />
        </div>
    )
}
