import { FilterButtons } from '@/components/Resources/FilterButtons.tsx'
import { Search } from '@/components/Resources/Search.tsx'

export const SidebarDesktop = (props: { className: string }) => {
    const { className } = props
    return (
        <div
            className={`w-[300px] bg-gray-100 p-3 ${className} h-full rounded`}
        >
            <Search />
            <FilterButtons />
            <div className="my-3 font-bold text-slate-900">Filter Tags</div>
        </div>
    )
}
